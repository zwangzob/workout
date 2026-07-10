import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Program, ProgramDay } from '@/types';
import { generateId } from '@/lib/id';
import { SEED_PROGRAM } from '@/data/seedProgram';
import { SEED_MAY_BLOCK } from '@/data/seedMayBlock';
import { CORE_DAY, HIP_THRUST_DAY } from '@/data/seedExtraDays';

function cloneDayWithNewIds(day: ProgramDay): ProgramDay {
  return {
    ...day,
    id: generateId('day'),
    blocks: day.blocks.map((block) => ({
      ...block,
      id: generateId('block'),
      exercises: block.exercises.map((ex) => ({ ...ex, id: generateId('pex') })),
    })),
  };
}

interface ProgramCursor {
  weekIndex: number;
  dayIndex: number;
}

interface ProgramStore {
  programs: Program[];
  activeProgramId: string | null;
  cursor: ProgramCursor;
  /** Timestamp the current lap through the rotation began. Only sessions completed
   * on/after this count toward "day complete" — otherwise a day stays checked off
   * forever after its very first completion, even in later laps. */
  cycleStartedAt: string | null;

  addProgram: (program: Omit<Program, 'id' | 'createdAt'>) => Program;
  updateProgram: (id: string, patch: Partial<Omit<Program, 'id'>>) => void;
  removeProgram: (id: string) => void;
  setActiveProgram: (id: string) => void;
  advanceCursor: () => void;
  resetCursor: () => void;
  setCursor: (weekIndex: number, dayIndex: number) => void;
  setDaysPerWeek: (programId: string, count: number) => void;

  getActiveProgram: () => Program | undefined;
  getCurrentDay: () => ProgramDay | undefined;
}

export const useProgramStore = create<ProgramStore>()(
  persist(
    (set, get) => ({
      programs: [],
      activeProgramId: null,
      cursor: { weekIndex: 0, dayIndex: 0 },
      cycleStartedAt: null,

      addProgram: (program) => {
        const newProgram: Program = { ...program, id: generateId('prog'), createdAt: new Date().toISOString() };
        set((state) => ({
          programs: [...state.programs, newProgram],
          activeProgramId: state.activeProgramId ?? newProgram.id,
        }));
        return newProgram;
      },

      updateProgram: (id, patch) => {
        set((state) => ({
          programs: state.programs.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        }));
      },

      removeProgram: (id) => {
        set((state) => {
          const programs = state.programs.filter((p) => p.id !== id);
          const activeProgramId = state.activeProgramId === id ? (programs[0]?.id ?? null) : state.activeProgramId;
          return { programs, activeProgramId };
        });
      },

      setActiveProgram: (id) =>
        set({ activeProgramId: id, cursor: { weekIndex: 0, dayIndex: 0 }, cycleStartedAt: new Date().toISOString() }),

      advanceCursor: () => {
        const program = get().getActiveProgram();
        if (!program) return;
        set((state) => {
          const week = program.weeks[state.cursor.weekIndex];
          if (!week) return state;
          const nextDayIndex = state.cursor.dayIndex + 1;
          if (nextDayIndex < week.days.length) {
            return { cursor: { weekIndex: state.cursor.weekIndex, dayIndex: nextDayIndex } };
          }
          const nextWeekIndex = state.cursor.weekIndex + 1;
          if (nextWeekIndex < program.weeks.length) {
            return { cursor: { weekIndex: nextWeekIndex, dayIndex: 0 } };
          }
          // Program complete: loop back to the start of a fresh lap.
          return { cursor: { weekIndex: 0, dayIndex: 0 }, cycleStartedAt: new Date().toISOString() };
        });
      },

      resetCursor: () => set({ cursor: { weekIndex: 0, dayIndex: 0 }, cycleStartedAt: new Date().toISOString() }),

      setCursor: (weekIndex, dayIndex) => set({ cursor: { weekIndex, dayIndex } }),

      setDaysPerWeek: (programId, count) => {
        set((state) => ({
          programs: state.programs.map((p) => {
            if (p.id !== programId) return p;
            const weeks = p.weeks.map((week) => {
              // Recompute from the underlying base pattern every time (not the
              // previous day list) so toggling frequency back and forth is
              // idempotent instead of compounding.
              const base = week.days.filter((d) => d.id !== CORE_DAY.id && d.id !== HIP_THRUST_DAY.id);
              if (base.length === 0) return week;

              let days: ProgramDay[] = base.slice(0, Math.min(count, base.length));
              if (count >= 4) days = [...days, CORE_DAY];
              if (count >= 5) days = [...days, HIP_THRUST_DAY];

              // Fallback for frequencies beyond what the fixed slots cover:
              // repeat the base pattern rather than leaving days missing.
              if (days.length < count) {
                const extra: ProgramDay[] = [];
                for (let i = days.length; i < count; i++) {
                  extra.push(cloneDayWithNewIds(base[(i - days.length) % base.length]));
                }
                days = [...days, ...extra];
              }

              return { ...week, days };
            });
            return { ...p, weeks };
          }),
          cursor: { weekIndex: 0, dayIndex: 0 },
          cycleStartedAt: new Date().toISOString(),
        }));
      },

      getActiveProgram: () => get().programs.find((p) => p.id === get().activeProgramId),

      getCurrentDay: () => {
        const program = get().getActiveProgram();
        if (!program) return undefined;
        const week = program.weeks[get().cursor.weekIndex];
        return week?.days[get().cursor.dayIndex];
      },
    }),
    {
      name: 'forge/programs',
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<ProgramStore>;
        let programs = persisted.programs ?? [];
        let activeProgramId = persisted.activeProgramId ?? null;
        let injected = false;

        if (!programs.some((p) => p.id === SEED_PROGRAM.id)) {
          programs = [SEED_PROGRAM, ...programs];
          activeProgramId = SEED_PROGRAM.id;
          injected = true;
        }

        // Injected after SEED_PROGRAM so it wins as the active program on fresh
        // installs too, without disturbing an already-persisted install's state
        // beyond adding this program and switching to it.
        if (!programs.some((p) => p.id === SEED_MAY_BLOCK.id)) {
          programs = [...programs, SEED_MAY_BLOCK];
          activeProgramId = SEED_MAY_BLOCK.id;
          injected = true;
        }

        if (!injected) {
          return {
            ...currentState,
            ...persisted,
            // One-time migration for installs from before cycleStartedAt existed:
            // without this, every historically-completed day would stay checked off forever.
            cycleStartedAt: persisted.cycleStartedAt ?? new Date().toISOString(),
          } as ProgramStore;
        }
        return {
          ...currentState,
          ...persisted,
          programs,
          activeProgramId,
          cursor: { weekIndex: 0, dayIndex: 0 },
          cycleStartedAt: new Date().toISOString(),
        } as ProgramStore;
      },
    },
  ),
);
