import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Program, ProgramDay } from '@/types';
import { generateId } from '@/lib/id';
import { SEED_PROGRAM } from '@/data/seedProgram';

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
              const original = week.days;
              if (original.length === 0 || original.length === count) return week;
              if (original.length > count) {
                return { ...week, days: original.slice(0, count) };
              }
              const extra: ProgramDay[] = [];
              for (let i = original.length; i < count; i++) {
                extra.push(cloneDayWithNewIds(original[i % original.length]));
              }
              return { ...week, days: [...original, ...extra] };
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
        const programs = persisted.programs ?? [];
        const hasSeed = programs.some((p) => p.id === SEED_PROGRAM.id);
        if (hasSeed) {
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
          programs: [SEED_PROGRAM, ...programs],
          activeProgramId: SEED_PROGRAM.id,
          cursor: { weekIndex: 0, dayIndex: 0 },
          cycleStartedAt: new Date().toISOString(),
        } as ProgramStore;
      },
    },
  ),
);
