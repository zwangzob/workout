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
        // One-time rename: "Kettlebell" spelled out in these names was normalized to "KB"
        // to match the abbreviation used everywhere else in the library. Only apply if the
        // persisted name still matches the old default, so a user's own rename is never
        // overwritten.
        const RENAMED_EXERCISE: Record<string, { from: string; to: string }> = {
          ex_deficit_kb_stiff_leg_deadlift: { from: 'Deficit Kettlebell Stiff Leg Deadlift', to: 'Deficit KB Stiff Leg Deadlift' },
          ex_kettlebell_stiff_leg_deadlift: { from: 'Kettlebell Stiff Leg Deadlift', to: 'KB Stiff Leg Deadlift' },
          ex_kettlebell_stiff_leg_sumo_deadlift: { from: 'Kettlebell Stiff Leg Sumo Deadlift', to: 'KB Stiff Leg Sumo Deadlift' },
          ex_toes_elevated_kb_rdl: { from: 'Toes-Elevated Kettlebell Romanian Deadlift', to: 'Toes-Elevated KB Romanian Deadlift' },
        };
        // One-time removal: "DB Iso Lateral Raise" was a duplicate of "DB Iso-Hold Lateral
        // Raise" (same equipment/technique, just phrased differently). Drop any persisted
        // copy so it doesn't linger as an orphaned entry no longer in SEED_EXERCISES.
        const REMOVED_DUPLICATE_IDS = new Set(['ex_db_iso_lateral_raise']);
        // One-time correction: these exercises use a loaded implement (machine/dumbbell/
        // kettlebell) but were seeded without a weight box, unlike their sibling exercises
        // in the same family. Only apply if the persisted value still matches the old
        // (buggy) default, so a user's own choice of workoutSubtype is never overwritten.
        const CORRECTED_WORKOUT_SUBTYPE: Record<string, { from: string; to: Exercise['workoutSubtype'] }> = {
          ex_2down_1up_hamstring_curl: { from: 'reps_side', to: 'reps_weight_side' },
          ex_hamstring_curl_21s: { from: 'reps', to: 'reps_weight' },
          ex_renegade_row: { from: 'reps_side', to: 'reps_weight_side' },
          ex_2up_1down_leg_extension: { from: 'reps_side', to: 'reps_weight_side' },
          ex_leg_extension_21s: { from: 'reps', to: 'reps_weight' },
          ex_heavy_carry: { from: 'time', to: 'time_weight' },
          ex_turkish_getup_position_repeats: { from: 'reps_side', to: 'reps_weight_side' },
          ex_3pos_curl: { from: 'reps', to: 'reps_weight' },
          ex_bicep_curl_21s: { from: 'reps', to: 'reps_weight' },
          ex_isometric_curl: { from: 'time', to: 'time_weight' },
          ex_iso_hold_curl: { from: 'time', to: 'time_weight' },
          ex_ez_bar_curl_21s: { from: 'reps', to: 'reps_weight' },
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
        // One-time addition: these exercises gained 'traps' as a secondary muscle when
        // the Traps category was introduced. Purely additive.
        const ADD_TRAPS_IDS = new Set(['ex_cable_front_raise', 'ex_db_upright_row', 'ex_front_plate_raise']);
        // One-time addition: L Sit Pull Through gained 'triceps' as a secondary muscle
        // when the Triceps category was expanded. Purely additive.
        const ADD_TRICEPS_IDS = new Set(['ex_l_sit_pull_through']);
        // One-time addition: Dead Hang gained 'biceps' as a secondary muscle when the
        // Biceps category was expanded. Purely additive.
        const ADD_BICEPS_IDS = new Set(['ex_dead_hang']);
        // One-time addition: these exercises gained 'chest' as a secondary muscle when
        // the Chest category was expanded. Purely additive.
        const ADD_CHEST_IDS = new Set([
          'ex_around_the_world', 'ex_elevated_pike_handstand_pushup', 'ex_modified_handstand_pushup', 'ex_renegade_row',
          'ex_high_incline_cable_overhead_press',
        ]);
        // One-time addition: these exercises gained 'quads' as a secondary muscle when
        // the Quads category was expanded. Purely additive.
        const ADD_QUADS_IDS = new Set(['ex_banded_deadlift', 'ex_banded_stiff_leg_sumo_deadlift']);
        // One-time addition: these exercises gained 'back' as a secondary muscle when
        // the Back category was expanded. Purely additive.
        const ADD_BACK_IDS = new Set([
          'ex_arch_body_rock', 'ex_bird_dog', 'ex_cable_pull_through', 'ex_seated_db_shrug', 'ex_seated_ez_bar_shrug',
        ]);
        // One-time addition: these exercises gained 'full_body' as a secondary muscle
        // when the Full Body category was expanded. Purely additive.
        const ADD_FULL_BODY_IDS = new Set([
          'ex_bear_crawl', 'ex_bodysaw', 'ex_clean_pull', 'ex_snatch_pull', 'ex_stability_ball_pass_through',
          'ex_stationary_bike', 'ex_jump_rope', 'ex_treadmill_run', 'ex_stair_climber',
        ]);
        const backfilled = persisted.exercises
          .filter((ex) => !REMOVED_DUPLICATE_IDS.has(ex.id))
          .map((ex) => {
            let next = ex;
            const reclass = RECLASSIFIED_PRIMARY_MUSCLE[next.id];
            if (reclass && next.primaryMuscle === reclass.from) {
              next = { ...next, primaryMuscle: reclass.to };
            }
            const renamed = RENAMED_EXERCISE[next.id];
            if (renamed && next.name === renamed.from) {
              next = { ...next, name: renamed.to };
            }
            const corrected = CORRECTED_WORKOUT_SUBTYPE[next.id];
            if (corrected && next.workoutSubtype === corrected.from) {
              next = { ...next, workoutSubtype: corrected.to };
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
            if (ADD_TRAPS_IDS.has(next.id) && !next.secondaryMuscles.includes('traps')) {
              next = { ...next, secondaryMuscles: [...next.secondaryMuscles, 'traps'] };
            }
            if (ADD_TRICEPS_IDS.has(next.id) && !next.secondaryMuscles.includes('triceps')) {
              next = { ...next, secondaryMuscles: [...next.secondaryMuscles, 'triceps'] };
            }
            if (ADD_BICEPS_IDS.has(next.id) && !next.secondaryMuscles.includes('biceps')) {
              next = { ...next, secondaryMuscles: [...next.secondaryMuscles, 'biceps'] };
            }
            if (ADD_CHEST_IDS.has(next.id) && !next.secondaryMuscles.includes('chest')) {
              next = { ...next, secondaryMuscles: [...next.secondaryMuscles, 'chest'] };
            }
            if (ADD_QUADS_IDS.has(next.id) && !next.secondaryMuscles.includes('quads')) {
              next = { ...next, secondaryMuscles: [...next.secondaryMuscles, 'quads'] };
            }
            if (ADD_BACK_IDS.has(next.id) && !next.secondaryMuscles.includes('back')) {
              next = { ...next, secondaryMuscles: [...next.secondaryMuscles, 'back'] };
            }
            if (ADD_FULL_BODY_IDS.has(next.id) && !next.secondaryMuscles.includes('full_body')) {
              next = { ...next, secondaryMuscles: [...next.secondaryMuscles, 'full_body'] };
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
