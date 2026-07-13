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

interface TrainingMaxStore {
  trainingMaxes: TrainingMaxes;
  setTrainingMax: (lift: keyof TrainingMaxes, value: number) => void;
}

export const useTrainingMaxStore = create<TrainingMaxStore>()(
  persist(
    (set) => ({
      trainingMaxes: DEFAULT_TRAINING_MAXES,
      setTrainingMax: (lift, value) => {
        set((state) => ({ trainingMaxes: { ...state.trainingMaxes, [lift]: value } }));
      },
    }),
    {
      name: 'forge/training-maxes',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
