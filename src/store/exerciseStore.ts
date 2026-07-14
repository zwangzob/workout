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
        // One-time reclassification: Hip Abduction Machine moved from Glutes to the new
        // Abductor category. Only apply if the persisted value still matches the old
        // default, so a user's own edit to this exercise is never overwritten.
        const RECLASSIFIED_PRIMARY_MUSCLE: Record<string, { from: string; to: Exercise['primaryMuscle'] }> = {
          ex_hip_abduction_machine: { from: 'glutes', to: 'abductor' },
        };
        const backfilled = persisted.exercises.map((ex) => {
          let next = ex;
          const reclass = RECLASSIFIED_PRIMARY_MUSCLE[next.id];
          if (reclass && next.primaryMuscle === reclass.from) {
            next = { ...next, primaryMuscle: reclass.to };
          }
          if (!next.workoutSubtype) {
            const seedSubtype = seedById.get(next.id)?.workoutSubtype;
            if (seedSubtype) next = { ...next, workoutSubtype: seedSubtype };
          }
          return next;
        });
        // Append any seed exercises added to the library since this device last persisted -
        // otherwise new seed exercises would silently never show up for existing installs.
        const persistedIds = new Set(persisted.exercises.map((ex) => ex.id));
        const newSeedExercises = SEED_EXERCISES.filter((ex) => !persistedIds.has(ex.id));
        const exercises = [...backfilled, ...newSeedExercises];
        return { ...currentState, ...persisted, exercises } as ExerciseStore;
      },
    },
  ),
);
