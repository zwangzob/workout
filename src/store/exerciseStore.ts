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
        // Core was renamed to Abs outright - every 'core' tag (primary or secondary)
        // means the same thing it always did, so this rename applies unconditionally.
        const renameCoreToAbs = (m: string) => (m === 'core' ? 'abs' : m);
        // One-time addition: these exercises gained 'core_trunk' as a secondary muscle
        // when the Core/Trunk category was introduced (they were also in that list).
        // Purely additive - nothing is removed or overwritten, so no "unedited" gate needed.
        const ADD_CORE_TRUNK_IDS = new Set([
          'ex_ab_fallout', 'ex_ab_wheel', 'ex_ab_walkout', 'ex_alternating_vups', 'ex_barbell_rollouts',
          'ex_cable_crunch', 'ex_captains_chair_knee_tuck', 'ex_curl_up', 'ex_dead_hang', 'ex_dead_bug',
          'ex_ghd_situp', 'ex_half_kneeling_pallof_press', 'ex_hanging_knee_tuck', 'ex_hanging_leg_raise', 'ex_high_plank',
          'ex_l_sit_pull_through', 'ex_landmine_oblique_twist', 'ex_low_to_high_plank', 'ex_mcgill_big_3', 'ex_modified_hands_elevated_plank',
          'ex_modified_knees_down_plank', 'ex_modified_high_plank', 'ex_modified_side_plank', 'ex_modified_side_plank_raise', 'ex_mountain_climber',
          'ex_plank', 'ex_plank_alt_single_leg_hip_abduction', 'ex_rollup', 'ex_russian_twist', 'ex_side_plank',
          'ex_side_plank_raise', 'ex_single_leg_teaser', 'ex_situp', 'ex_slider_knee_tuck', 'ex_slider_mountain_climbers',
          'ex_slider_pike', 'ex_stability_ball_pass_through', 'ex_teaser', 'ex_v_sit_hold',
        ]);
        // One-time addition: these exercises gained 'shoulders' as a secondary muscle
        // when the Shoulders category was expanded. Purely additive.
        const ADD_SHOULDERS_IDS = new Set(['ex_burpee', 'ex_farmers_carry', 'ex_pushup']);
        // One-time addition: these exercises gained 'glutes' and/or 'hamstrings' as a
        // secondary muscle when the Glutes and Hamstrings categories were expanded together.
        // Purely additive.
        const ADD_GLUTES_IDS = new Set([
          'ex_wall_sit', 'ex_sissy_squat', 'ex_tke_split_squat', 'ex_banded_supine_transverse_hip_abduction',
          'ex_glute_bridge_with_abduction', 'ex_glute_bridge_with_adduction', 'ex_box_jump', 'ex_leg_press', 'ex_hack_squat',
        ]);
        const ADD_HAMSTRINGS_IDS = new Set([
          'ex_wall_sit', 'ex_glute_bridge_with_abduction', 'ex_glute_bridge_with_adduction',
          'ex_box_jump', 'ex_leg_press', 'ex_hack_squat',
        ]);
        const backfilled = persisted.exercises.map((ex) => {
          let next = ex;
          const reclass = RECLASSIFIED_PRIMARY_MUSCLE[next.id];
          if (reclass && next.primaryMuscle === reclass.from) {
            next = { ...next, primaryMuscle: reclass.to };
          }
          next = {
            ...next,
            primaryMuscle: renameCoreToAbs(next.primaryMuscle) as Exercise['primaryMuscle'],
            secondaryMuscles: next.secondaryMuscles.map(renameCoreToAbs) as Exercise['secondaryMuscles'],
          };
          if (ADD_CORE_TRUNK_IDS.has(next.id) && !next.secondaryMuscles.includes('core_trunk')) {
            next = { ...next, secondaryMuscles: [...next.secondaryMuscles, 'core_trunk'] };
          }
          if (ADD_SHOULDERS_IDS.has(next.id) && !next.secondaryMuscles.includes('shoulders')) {
            next = { ...next, secondaryMuscles: [...next.secondaryMuscles, 'shoulders'] };
          }
          if (ADD_GLUTES_IDS.has(next.id) && !next.secondaryMuscles.includes('glutes')) {
            next = { ...next, secondaryMuscles: [...next.secondaryMuscles, 'glutes'] };
          }
          if (ADD_HAMSTRINGS_IDS.has(next.id) && !next.secondaryMuscles.includes('hamstrings')) {
            next = { ...next, secondaryMuscles: [...next.secondaryMuscles, 'hamstrings'] };
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
