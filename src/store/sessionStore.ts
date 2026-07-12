import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoggedSet, Program, ProgramDay, SessionBlock, SetGroup, WorkoutSession } from '@/types';
import { totalSets } from '@/types/program';
import { generateId } from '@/lib/id';
import { SEED_SESSIONS } from '@/data/seedHistory';

function buildSetsForBlock(setGroups: SetGroup[]): LoggedSet[] {
  return Array.from({ length: totalSets(setGroups) }, (_, i) => ({
    id: generateId('set'),
    setIndex: i,
    isWarmup: false,
    weight: null,
    reps: null,
    rpe: null,
    completedAt: null,
  }));
}

function buildSessionFromDay(program: Program, day: ProgramDay): WorkoutSession {
  const blocks: SessionBlock[] = day.blocks.map((block) => ({
    id: generateId('sblock'),
    type: block.type,
    restSeconds: block.restSeconds,
    exercises: block.exercises.map((ex) => ({
      id: generateId('sex'),
      exerciseId: ex.exerciseId,
      setGroups: ex.setGroups,
      sets: buildSetsForBlock(ex.setGroups),
    })),
  }));

  return {
    id: generateId('session'),
    programId: program.id,
    programDayId: day.id,
    dayLabel: day.label,
    date: new Date().toISOString().slice(0, 10),
    status: 'not_started',
    blocks,
    startedAt: undefined,
    completedAt: undefined,
  };
}

interface SessionStore {
  sessions: WorkoutSession[];
  activeSessionId: string | null;

  startSession: (program: Program, day: ProgramDay) => WorkoutSession;
  getActiveSession: () => WorkoutSession | undefined;
  getSession: (id: string) => WorkoutSession | undefined;

  logSet: (
    sessionId: string,
    blockId: string,
    sessionExerciseId: string,
    setId: string,
    patch: Partial<Pick<LoggedSet, 'weight' | 'reps' | 'rpe'>>,
  ) => void;
  toggleSetComplete: (sessionId: string, blockId: string, sessionExerciseId: string, setId: string) => void;
  setBlockComplete: (sessionId: string, blockId: string, complete: boolean) => void;
  setExerciseComplete: (sessionId: string, blockId: string, sessionExerciseId: string, complete: boolean) => void;
  addSet: (sessionId: string, blockId: string, sessionExerciseId: string, isWarmup: boolean) => void;
  removeSet: (sessionId: string, blockId: string, sessionExerciseId: string, setId: string) => void;
  swapExercise: (sessionId: string, blockId: string, sessionExerciseId: string, newExerciseId: string) => void;
  completeSession: (sessionId: string) => void;
  discardSession: (sessionId: string) => void;

  getHistoryForExercise: (exerciseId: string) => { date: string; weight: number; reps: number }[];
}

function updateSessionExercise(
  session: WorkoutSession,
  blockId: string,
  sessionExerciseId: string,
  update: (ex: WorkoutSession['blocks'][number]['exercises'][number]) => WorkoutSession['blocks'][number]['exercises'][number],
): WorkoutSession {
  return {
    ...session,
    blocks: session.blocks.map((block) =>
      block.id !== blockId
        ? block
        : {
            ...block,
            exercises: block.exercises.map((ex) => (ex.id === sessionExerciseId ? update(ex) : ex)),
          },
    ),
  };
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      activeSessionId: null,

      startSession: (program, day) => {
        const session = buildSessionFromDay(program, day);
        session.status = 'in_progress';
        session.startedAt = new Date().toISOString();
        set((state) => ({ sessions: [...state.sessions, session], activeSessionId: session.id }));
        return session;
      },

      getActiveSession: () => get().sessions.find((s) => s.id === get().activeSessionId),

      getSession: (id) => get().sessions.find((s) => s.id === id),

      logSet: (sessionId, blockId, sessionExerciseId, setId, patch) => {
        set((state) => ({
          sessions: state.sessions.map((s) => {
            if (s.id !== sessionId) return s;
            return updateSessionExercise(s, blockId, sessionExerciseId, (ex) => ({
              ...ex,
              sets: ex.sets.map((set) => (set.id === setId ? { ...set, ...patch } : set)),
            }));
          }),
        }));
      },

      toggleSetComplete: (sessionId, blockId, sessionExerciseId, setId) => {
        set((state) => ({
          sessions: state.sessions.map((s) => {
            if (s.id !== sessionId) return s;
            return updateSessionExercise(s, blockId, sessionExerciseId, (ex) => ({
              ...ex,
              sets: ex.sets.map((set) =>
                set.id === setId ? { ...set, completedAt: set.completedAt ? null : new Date().toISOString() } : set,
              ),
            }));
          }),
        }));
      },

      setBlockComplete: (sessionId, blockId, complete) => {
        set((state) => ({
          sessions: state.sessions.map((s) => {
            if (s.id !== sessionId) return s;
            return {
              ...s,
              blocks: s.blocks.map((block) =>
                block.id !== blockId
                  ? block
                  : {
                      ...block,
                      exercises: block.exercises.map((ex) => ({
                        ...ex,
                        sets: ex.sets.map((set) => ({
                          ...set,
                          completedAt: complete ? (set.completedAt ?? new Date().toISOString()) : null,
                        })),
                      })),
                    },
              ),
            };
          }),
        }));
      },

      setExerciseComplete: (sessionId, blockId, sessionExerciseId, complete) => {
        set((state) => ({
          sessions: state.sessions.map((s) => {
            if (s.id !== sessionId) return s;
            return updateSessionExercise(s, blockId, sessionExerciseId, (ex) => ({
              ...ex,
              sets: ex.sets.map((set) => ({
                ...set,
                completedAt: complete ? (set.completedAt ?? new Date().toISOString()) : null,
              })),
            }));
          }),
        }));
      },

      addSet: (sessionId, blockId, sessionExerciseId, isWarmup) => {
        set((state) => ({
          sessions: state.sessions.map((s) => {
            if (s.id !== sessionId) return s;
            return updateSessionExercise(s, blockId, sessionExerciseId, (ex) => {
              const workingSets = ex.sets.filter((st) => !st.isWarmup);
              const warmupSets = ex.sets.filter((st) => st.isWarmup);
              const newSet: LoggedSet = {
                id: generateId('set'),
                setIndex: isWarmup ? warmupSets.length : workingSets.length,
                isWarmup,
                weight: null,
                reps: null,
                rpe: null,
                completedAt: null,
              };
              return { ...ex, sets: isWarmup ? [...warmupSets, newSet, ...workingSets] : [...warmupSets, ...workingSets, newSet] };
            });
          }),
        }));
      },

      removeSet: (sessionId, blockId, sessionExerciseId, setId) => {
        set((state) => ({
          sessions: state.sessions.map((s) => {
            if (s.id !== sessionId) return s;
            return updateSessionExercise(s, blockId, sessionExerciseId, (ex) => ({
              ...ex,
              sets: ex.sets.filter((set) => set.id !== setId),
            }));
          }),
        }));
      },

      swapExercise: (sessionId, blockId, sessionExerciseId, newExerciseId) => {
        set((state) => ({
          sessions: state.sessions.map((s) => {
            if (s.id !== sessionId) return s;
            return updateSessionExercise(s, blockId, sessionExerciseId, (ex) => ({
              ...ex,
              originalExerciseId: ex.originalExerciseId ?? ex.exerciseId,
              exerciseId: newExerciseId,
            }));
          }),
        }));
      },

      completeSession: (sessionId) => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId ? { ...s, status: 'completed', completedAt: new Date().toISOString() } : s,
          ),
          activeSessionId: state.activeSessionId === sessionId ? null : state.activeSessionId,
        }));
      },

      discardSession: (sessionId) => {
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== sessionId),
          activeSessionId: state.activeSessionId === sessionId ? null : state.activeSessionId,
        }));
      },

      getHistoryForExercise: (exerciseId) => {
        const results: { date: string; weight: number; reps: number }[] = [];
        for (const session of get().sessions) {
          if (session.status !== 'completed') continue;
          for (const block of session.blocks) {
            for (const ex of block.exercises) {
              if (ex.exerciseId !== exerciseId) continue;
              for (const set of ex.sets) {
                if (set.isWarmup || !set.completedAt || set.weight == null || set.reps == null) continue;
                results.push({ date: session.date, weight: set.weight, reps: set.reps });
              }
            }
          }
        }
        return results.sort((a, b) => a.date.localeCompare(b.date));
      },
    }),
    {
      name: 'forge/sessions',
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<SessionStore>;
        const sessions = persisted.sessions ?? [];
        const seedIds = new Set(SEED_SESSIONS.map((s) => s.id));
        const hasSeed = sessions.some((s) => seedIds.has(s.id));
        if (hasSeed) {
          return { ...currentState, ...persisted } as SessionStore;
        }
        return { ...currentState, ...persisted, sessions: [...SEED_SESSIONS, ...sessions] } as SessionStore;
      },
    },
  ),
);
