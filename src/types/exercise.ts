export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'core'
  | 'forearms'
  | 'full_body'
  | 'cardio';

export type Equipment =
  | 'barbell'
  | 'ez_bar'
  | 'dumbbell'
  | 'kettlebell'
  | 'cable'
  | 'machine'
  | 'smith_machine'
  | 'bodyweight'
  | 'bench'
  | 'pull_up_bar'
  | 'resistance_band'
  | 'trx'
  | 'bike'
  | 'rower'
  | 'box';

export type ExerciseCategory = 'compound' | 'isolation' | 'cardio' | 'mobility';

/** How an exercise is logged: which fields matter and whether it's tracked per side. */
export type WorkoutSubtype =
  | 'reps'
  | 'reps_side'
  | 'reps_position'
  | 'reps_weight'
  | 'reps_weight_side'
  | 'reps_weight_position'
  | 'time'
  | 'time_side'
  | 'time_weight'
  | 'time_weight_side'
  | 'cluster'
  | 'cluster_weight';

export const DEFAULT_WORKOUT_SUBTYPE: WorkoutSubtype = 'reps_weight';

/** Full row label as shown inside the Workout Subtype sheet. */
export const WORKOUT_SUBTYPE_LABELS: Record<WorkoutSubtype, string> = {
  reps: 'Reps (as prescribed)',
  reps_side: 'Reps/side',
  reps_position: 'Reps/position',
  reps_weight: 'Reps + Weight (as prescribed)',
  reps_weight_side: 'Reps/side + Weight',
  reps_weight_position: 'Reps/position + Weight',
  time: 'Seconds',
  time_side: 'Seconds/side',
  time_weight: 'Seconds + Weight',
  time_weight_side: 'Seconds/side + Weight',
  cluster: 'Cluster',
  cluster_weight: 'Cluster + Weight',
};

/** Short label for the pill on the workout card - no "(as prescribed)" qualifier. */
export const WORKOUT_SUBTYPE_SHORT_LABELS: Record<WorkoutSubtype, string> = {
  reps: 'Reps',
  reps_side: 'Reps/side',
  reps_position: 'Reps/position',
  reps_weight: 'Reps + Weight',
  reps_weight_side: 'Reps/side + Weight',
  reps_weight_position: 'Reps/position + Weight',
  time: 'Seconds',
  time_side: 'Seconds/side',
  time_weight: 'Seconds + Weight',
  time_weight_side: 'Seconds/side + Weight',
  cluster: 'Cluster',
  cluster_weight: 'Cluster + Weight',
};

/** The 6 top-level categories in the Workout Subtype sheet, in display order.
 * Cluster and Cluster + Weight have no selectable options yet. */
export const WORKOUT_SUBTYPE_GROUPS: {
  key: string;
  label: string;
  options: WorkoutSubtype[];
  asPrescribedSuffix?: string;
}[] = [
  { key: 'reps', label: 'Reps Only', options: ['reps', 'reps_side', 'reps_position'], asPrescribedSuffix: 'as prescribed' },
  { key: 'reps_weight', label: 'Reps + Weight', options: ['reps_weight', 'reps_weight_side', 'reps_weight_position'], asPrescribedSuffix: 'as prescribed' },
  { key: 'time', label: 'Time Only', options: ['time', 'time_side'] },
  { key: 'time_weight', label: 'Time + Weight', options: ['time_weight', 'time_weight_side'] },
  { key: 'cluster_weight', label: 'Cluster + Weight', options: [] },
  { key: 'cluster', label: 'Cluster', options: [] },
];

export interface Exercise {
  id: string;
  name: string;
  primaryMuscle: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  equipment: Equipment[];
  category: ExerciseCategory;
  notes?: string;
  isCustom?: boolean;
  workoutSubtype?: WorkoutSubtype;
}

export const MUSCLE_GROUP_LABELS: Record<MuscleGroup, string> = {
  chest: 'Chest',
  back: 'Back',
  shoulders: 'Shoulders',
  biceps: 'Biceps',
  triceps: 'Triceps',
  quads: 'Quads',
  hamstrings: 'Hamstrings',
  glutes: 'Glutes',
  calves: 'Calves',
  core: 'Core',
  forearms: 'Forearms',
  full_body: 'Full Body',
  cardio: 'Cardio',
};

export const EQUIPMENT_LABELS: Record<Equipment, string> = {
  barbell: 'Barbell',
  ez_bar: 'EZ Bar',
  dumbbell: 'DB',
  kettlebell: 'KB',
  cable: 'Cable',
  machine: 'Machine',
  smith_machine: 'Smith Machine',
  bodyweight: 'Bodyweight',
  bench: 'Bench',
  pull_up_bar: 'Pull-up Bar',
  resistance_band: 'Resistance Band',
  trx: 'TRX / Suspension',
  bike: 'Bike',
  rower: 'Rower',
  box: 'Plyo Box',
};
