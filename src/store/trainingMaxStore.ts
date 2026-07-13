import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TrainingMaxes {
  squat: number;
  deadlift: number;
  benchPress: number;
  overheadPress: number;
  hipThrust: number;
}

export const TRAINING_MAX_LIFTS: { key: keyof TrainingMaxes; label: string }[] = [
  { key: 'squat', label: 'Squat' },
  { key: 'deadlift', label: 'Deadlift' },
  { key: 'benchPress', label: 'Bench Press' },
  { key: 'overheadPress', label: 'Overhead Press' },
  { key: 'hipThrust', label: 'Hip Thrust' },
];

const DEFAULT_TRAINING_MAXES: TrainingMaxes = {
  squat: 160,
  deadlift: 190,
  benchPress: 85,
  overheadPress: 55,
  hipThrust: 135,
};

/** Maps the seed library's exercise ids for the 5 tracked lifts to their training max key. */
export const TRAINING_MAX_EXERCISE_IDS: Record<string, keyof TrainingMaxes> = {
  ex_back_squat: 'squat',
  ex_deadlift: 'deadlift',
  ex_barbell_bench_press: 'benchPress',
  ex_overhead_press: 'overheadPress',
  ex_hip_thrust: 'hipThrust',
};

/** The inverse of TRAINING_MAX_EXERCISE_IDS: lift key -> its seed exercise id. */
export const TRAINING_MAX_LIFT_EXERCISE_ID: Record<keyof TrainingMaxes, string> = Object.fromEntries(
  Object.entries(TRAINING_MAX_EXERCISE_IDS).map(([id, key]) => [key, id]),
) as Record<keyof TrainingMaxes, string>;

export type TrainingMaxHistoryEntry = { date: string; value: number };
type TrainingMaxHistory = Record<keyof TrainingMaxes, TrainingMaxHistoryEntry[]>;

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function initialHistory(maxes: TrainingMaxes): TrainingMaxHistory {
  const today = todayKey();
  return {
    squat: [{ date: today, value: maxes.squat }],
    deadlift: [{ date: today, value: maxes.deadlift }],
    benchPress: [{ date: today, value: maxes.benchPress }],
    overheadPress: [{ date: today, value: maxes.overheadPress }],
    hipThrust: [{ date: today, value: maxes.hipThrust }],
  };
}

interface TrainingMaxStore {
  trainingMaxes: TrainingMaxes;
  trainingMaxHistory: TrainingMaxHistory;
  setTrainingMax: (lift: keyof TrainingMaxes, value: number) => void;
  getTrainingMaxHistory: (lift: keyof TrainingMaxes) => TrainingMaxHistoryEntry[];
}

export const useTrainingMaxStore = create<TrainingMaxStore>()(
  persist(
    (set, get) => ({
      trainingMaxes: DEFAULT_TRAINING_MAXES,
      trainingMaxHistory: initialHistory(DEFAULT_TRAINING_MAXES),

      setTrainingMax: (lift, value) => {
        set((state) => {
          const today = todayKey();
          const existing = state.trainingMaxHistory[lift];
          // One point per day: update today's entry if it already exists instead of
          // stacking duplicate points from repeated edits in the same sitting.
          const history =
            existing.length > 0 && existing[existing.length - 1].date === today
              ? [...existing.slice(0, -1), { date: today, value }]
              : [...existing, { date: today, value }];
          return {
            trainingMaxes: { ...state.trainingMaxes, [lift]: value },
            trainingMaxHistory: { ...state.trainingMaxHistory, [lift]: history },
          };
        });
      },

      getTrainingMaxHistory: (lift) => get().trainingMaxHistory[lift],
    }),
    {
      name: 'forge/training-maxes',
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<TrainingMaxStore>;
        const trainingMaxes = { ...currentState.trainingMaxes, ...persisted.trainingMaxes };
        // Backfill history for stores persisted before it existed, so every lift
        // starts with at least a flat point at its current value.
        const trainingMaxHistory = persisted.trainingMaxHistory ?? initialHistory(trainingMaxes);
        return { ...currentState, ...persisted, trainingMaxes, trainingMaxHistory } as TrainingMaxStore;
      },
    },
  ),
);
