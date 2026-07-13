import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise } from '@/types';
import { SEED_EXERCISES } from '@/data/seedExercises';
import { generateId } from '@/lib/id';

interface ExerciseStore {
  exercises: Exercise[];
  addExercise: (exercise: Omit<Exercise, 'id' | 'isCustom'>) => Exercise;
  updateExercise: (id: string, patch: Partial<Omit<Exercise, 'id'>>) => void;
  removeExercise: (id: string) => void;
  getExercise: (id: string) => Exercise | undefined;
}

export const useExerciseStore = create<ExerciseStore>()(
  persist(
    (set, get) => ({
      exercises: SEED_EXERCISES,

      addExercise: (exercise) => {
        const newExercise: Exercise = { ...exercise, id: generateId('ex'), isCustom: true };
        set((state) => ({ exercises: [...state.exercises, newExercise] }));
        return newExercise;
      },

      updateExercise: (id, patch) => {
        set((state) => ({
          exercises: state.exercises.map((ex) => (ex.id === id ? { ...ex, ...patch } : ex)),
        }));
      },

      removeExercise: (id) => {
        set((state) => ({ exercises: state.exercises.filter((ex) => ex.id !== id) }));
      },

      getExercise: (id) => get().exercises.find((ex) => ex.id === id),
    }),
    {
      name: 'forge/exercises',
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<ExerciseStore>;
        if (!persisted.exercises) return { ...currentState, ...persisted } as ExerciseStore;
        // One-time backfill: fill in workoutSubtype for exercises persisted before that
        // field existed, without touching one a user has since set explicitly.
        const seedById = new Map(SEED_EXERCISES.map((e) => [e.id, e]));
        const exercises = persisted.exercises.map((ex) => {
          if (ex.workoutSubtype) return ex;
          const seedSubtype = seedById.get(ex.id)?.workoutSubtype;
          return seedSubtype ? { ...ex, workoutSubtype: seedSubtype } : ex;
        });
        return { ...currentState, ...persisted, exercises } as ExerciseStore;
      },
    },
  ),
);
