import { Exercise } from '@/types';

// Core starter library. Users can add their own exercises from the Library tab;
// these just seed the app so program building has something to work with immediately.
//
// workoutSubtype was assigned by matching each exercise against how it's actually
// logged in the seed program/history data (e.g. "/side" or "Ns" reps strings, and
// whether a weight was ever logged alongside it) rather than guessing from the name
// alone - a few (marked below) had no usage data to check against and are a best
// guess worth revisiting.
export const SEED_EXERCISES: Exercise[] = [
  // Chest
  { id: 'ex_barbell_bench_press', name: 'Bench Press', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['barbell', 'bench'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_dumbbell_bench_press', name: 'DB Bench Press', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['dumbbell', 'bench'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_incline_barbell_press', name: 'Incline Barbell Press', primaryMuscle: 'chest', secondaryMuscles: ['shoulders', 'triceps'], equipment: ['barbell', 'bench'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_incline_dumbbell_press', name: 'Incline DB Press', primaryMuscle: 'chest', secondaryMuscles: ['shoulders', 'triceps'], equipment: ['dumbbell', 'bench'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_pushup', name: 'Push-Up', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'abs', 'shoulders'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_cable_fly', name: 'Cable Fly', primaryMuscle: 'chest', secondaryMuscles: [], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_dumbbell_fly', name: 'DB Fly', primaryMuscle: 'chest', secondaryMuscles: [], equipment: ['dumbbell', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_chest_press_machine', name: 'Chest Press Machine', primaryMuscle: 'chest', secondaryMuscles: ['triceps'], equipment: ['machine'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_dips', name: 'Dips', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' }, // best guess - no usage data

  // Back
  { id: 'ex_deadlift', name: 'Deadlift', primaryMuscle: 'back', secondaryMuscles: ['hamstrings', 'glutes', 'forearms'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_pullup', name: 'Pull-Up', primaryMuscle: 'back', secondaryMuscles: ['biceps', 'forearms'], equipment: ['pull_up_bar'], category: 'compound', workoutSubtype: 'reps' }, // best guess - no usage data
  { id: 'ex_lat_pulldown', name: 'Lat Pulldown', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['cable'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_barbell_row', name: 'Barbell Row', primaryMuscle: 'back', secondaryMuscles: ['biceps', 'shoulders'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_dumbbell_row', name: 'Single-Arm DB Row', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['dumbbell', 'bench'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_seated_cable_row', name: 'Seated Cable Row', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['cable'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_tbar_row', name: 'T-Bar Row', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_inverted_row', name: 'Inverted Row', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' }, // best guess - no usage data
  { id: 'ex_face_pull', name: 'Face Pull', primaryMuscle: 'back', secondaryMuscles: ['shoulders'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },

  // Shoulders
  { id: 'ex_overhead_press', name: 'OHP', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_dumbbell_shoulder_press', name: 'DB Shoulder Press', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_lateral_raise', name: 'DB Lateral Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'time_weight' },
  { id: 'ex_cable_lateral_raise', name: 'Cable Lateral Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_rear_delt_fly', name: 'Rear Delt Fly', primaryMuscle: 'shoulders', secondaryMuscles: ['back'], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_arnold_press', name: 'Arnold Press', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight' },

  // Biceps
  { id: 'ex_barbell_curl', name: 'Barbell Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'], equipment: ['barbell'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_dumbbell_curl', name: 'DB Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_hammer_curl', name: 'Hammer Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_cable_curl', name: 'Cable Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_preacher_curl', name: 'EZ-Bar Preacher Curl', primaryMuscle: 'biceps', secondaryMuscles: [], equipment: ['ez_bar', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },

  // Triceps
  { id: 'ex_tricep_pushdown', name: 'Tricep Pushdown', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_skullcrusher', name: 'EZ-Bar Skullcrusher', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['ez_bar', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_overhead_tricep_ext', name: 'Overhead DB Tricep Extension', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_close_grip_bench', name: 'Close-Grip Bench Press', primaryMuscle: 'triceps', secondaryMuscles: ['chest'], equipment: ['barbell', 'bench'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_bench_dip', name: 'Bench Dip', primaryMuscle: 'triceps', secondaryMuscles: ['chest'], equipment: ['bodyweight', 'bench'], category: 'isolation', workoutSubtype: 'reps' }, // best guess - no usage data

  // Quads
  { id: 'ex_back_squat', name: 'Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_front_squat', name: 'Barbell Front Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'abs'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_goblet_squat', name: 'Goblet Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['kettlebell', 'dumbbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_leg_press', name: 'Leg Press', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['machine'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_leg_extension', name: 'Leg Extension', primaryMuscle: 'quads', secondaryMuscles: [], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_bulgarian_split_squat', name: 'Bulgarian Split Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['dumbbell', 'bench'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_walking_lunge', name: 'Walking Lunge', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_bodyweight_squat', name: 'Bodyweight Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' },

  // Hamstrings / Glutes
  { id: 'ex_romanian_deadlift', name: 'Romanian Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_dumbbell_rdl', name: 'DB Romanian Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_leg_curl', name: 'Lying Leg Curl', primaryMuscle: 'hamstrings', secondaryMuscles: [], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_hip_thrust', name: 'Barbell Hip Thrust', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['barbell', 'bench'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_glute_bridge', name: 'Glute Bridge', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' }, // best guess - no usage data
  { id: 'ex_kettlebell_swing', name: 'KB Swing', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings', 'abs'], equipment: ['kettlebell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_cable_pull_through', name: 'Cable Pull-Through', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },

  // Calves
  { id: 'ex_standing_calf_raise', name: 'Standing Calf Raise', primaryMuscle: 'calves', secondaryMuscles: [], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_dumbbell_calf_raise', name: 'DB Calf Raise', primaryMuscle: 'calves', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_bodyweight_calf_raise', name: 'Bodyweight Calf Raise', primaryMuscle: 'calves', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' }, // best guess - no usage data

  // Abs
  { id: 'ex_plank', name: 'Plank', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_hanging_leg_raise', name: 'Hanging Leg Raise', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'forearms'], equipment: ['pull_up_bar'], category: 'isolation', workoutSubtype: 'reps' }, // best guess - no usage data
  { id: 'ex_cable_crunch', name: 'Cable Crunch', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_ab_wheel', name: 'Ab Wheel Rollout', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' }, // best guess - no usage data
  { id: 'ex_russian_twist', name: 'Russian Twist', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' }, // best guess - no usage data
  { id: 'ex_mountain_climber', name: 'Mountain Climber', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'cardio'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },

  // Full body / conditioning
  { id: 'ex_burpee', name: 'Burpee', primaryMuscle: 'full_body', secondaryMuscles: ['cardio', 'shoulders'], equipment: ['bodyweight'], category: 'cardio', workoutSubtype: 'reps' }, // best guess - no usage data
  { id: 'ex_kb_clean_and_press', name: 'KB Clean & Press', primaryMuscle: 'full_body', secondaryMuscles: ['shoulders'], equipment: ['kettlebell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_thruster', name: 'Barbell Thruster', primaryMuscle: 'full_body', secondaryMuscles: ['shoulders', 'quads'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },

  // Cardio
  { id: 'ex_stationary_bike', name: 'Stationary Bike', primaryMuscle: 'cardio', secondaryMuscles: [], equipment: ['bike'], category: 'cardio', workoutSubtype: 'time' }, // best guess - no usage data
  { id: 'ex_rowing_machine', name: 'Rowing Machine', primaryMuscle: 'cardio', secondaryMuscles: ['back'], equipment: ['rower'], category: 'cardio', workoutSubtype: 'time' }, // best guess - no usage data
  { id: 'ex_jump_rope', name: 'Jump Rope', primaryMuscle: 'cardio', secondaryMuscles: ['calves'], equipment: ['bodyweight'], category: 'cardio', workoutSubtype: 'time' }, // best guess - no usage data
  { id: 'ex_box_jump', name: 'Box Jump', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'cardio'], equipment: ['box'], category: 'cardio', workoutSubtype: 'reps' }, // best guess - no usage data

  // Pulled in from the user's actual training history
  { id: 'ex_deficit_deadlift', name: 'Deficit Deadlift', primaryMuscle: 'back', secondaryMuscles: ['hamstrings', 'glutes', 'forearms'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_banded_face_pull_pause', name: 'Banded Face Pull (1s Pause)', primaryMuscle: 'back', secondaryMuscles: ['shoulders'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_banded_face_pull_ext_rot', name: 'Banded Face Pull w/ Ext Rotation', primaryMuscle: 'back', secondaryMuscles: ['shoulders'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_single_leg_banded_ham_curl', name: 'Standing Single-Leg Banded Hamstring Curl', primaryMuscle: 'hamstrings', secondaryMuscles: [], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'time_side' },
  { id: 'ex_ffe_split_squat', name: 'Front Foot Elevated Split Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['dumbbell', 'box'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_wall_sit', name: 'Wall Sit', primaryMuscle: 'quads', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_db_box_step_up', name: 'DB Box Step Up', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['dumbbell', 'box'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_ab_walkout', name: 'Ab Walkout', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' }, // best guess - no usage data
  { id: 'ex_2up1down_hip_thrust', name: '2-Up, 1-Down Hip Thrust', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['bodyweight', 'bench'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_half_kneeling_pallof_press', name: 'Half-Kneeling Pallof Press', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_supinated_lat_pulldown_band', name: 'Supinated Grip Lat Pulldown (Band)', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['resistance_band'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_kb_rdl', name: 'KB Romanian Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['kettlebell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_db_skullcrusher_pause', name: 'DB Skullcrusher (1s Pause)', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['dumbbell', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_seated_incline_db_curl', name: 'Seated Incline DB Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'], equipment: ['dumbbell', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight_side' },

  // Pulled in from the user's May 2026 training block
  { id: 'ex_tke_split_squat', name: 'Terminal Knee Extension Split Squat', primaryMuscle: 'quads', secondaryMuscles: [], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_zottman_curl', name: 'Zottman Curl (2s Negative)', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_b_stance_db_rdl', name: 'B-Stance DB Romanian Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_kb_windmill', name: 'KB Windmill', primaryMuscle: 'abs', secondaryMuscles: ['shoulders'], equipment: ['kettlebell'], category: 'mobility', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_band_pull_apart_pause', name: 'Band Pull-Apart (1s Pause)', primaryMuscle: 'shoulders', secondaryMuscles: ['back'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_good_morning_pause', name: 'Good Morning (1s Pause)', primaryMuscle: 'hamstrings', secondaryMuscles: ['back', 'glutes'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_half_kneeling_single_arm_lat_pulldown_band', name: 'Half-Kneeling Single-Arm Banded Lat Pulldown', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['resistance_band'], category: 'compound', workoutSubtype: 'reps_side' },
  { id: 'ex_single_arm_banded_face_pull_ext_rot', name: 'Single-Arm Banded Face Pull w/ Ext Rotation', primaryMuscle: 'back', secondaryMuscles: ['shoulders'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_single_arm_seated_banded_row', name: 'Single-Arm Seated Banded Row', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['resistance_band'], category: 'compound', workoutSubtype: 'reps_side' },

  // Forearms (previously had zero dedicated exercises)
  { id: 'ex_wrist_curl', name: 'Wrist Curl', primaryMuscle: 'forearms', secondaryMuscles: [], equipment: ['dumbbell', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_reverse_wrist_curl', name: 'Reverse Wrist Curl', primaryMuscle: 'forearms', secondaryMuscles: [], equipment: ['dumbbell', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_farmers_carry', name: "Farmer's Carry", primaryMuscle: 'forearms', secondaryMuscles: ['abs', 'full_body', 'shoulders'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'time_weight' },
  { id: 'ex_dead_hang', name: 'Dead Hang', primaryMuscle: 'forearms', secondaryMuscles: ['core_trunk', 'back'], equipment: ['pull_up_bar'], category: 'isolation', workoutSubtype: 'time' },

  // Glutes
  { id: 'ex_cable_kickback', name: 'Cable Glute Kickback', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_banded_glute_bridge', name: 'Banded Glute Bridge', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['resistance_band', 'bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_single_leg_glute_bridge', name: 'Single-Leg Glute Bridge', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_hip_abduction_machine', name: 'Hip Abduction Machine', primaryMuscle: 'abductor', secondaryMuscles: ['glutes'], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps_weight' },

  // Calves
  { id: 'ex_seated_calf_raise', name: 'Seated Calf Raise', primaryMuscle: 'calves', secondaryMuscles: [], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_donkey_calf_raise', name: 'Donkey Calf Raise', primaryMuscle: 'calves', secondaryMuscles: [], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_calf_raise', name: 'Calf Raise', primaryMuscle: 'calves', secondaryMuscles: [], equipment: ['barbell'], category: 'isolation', workoutSubtype: 'reps_weight' },

  // Cardio
  { id: 'ex_assault_bike', name: 'Assault Bike', primaryMuscle: 'cardio', secondaryMuscles: ['full_body'], equipment: ['bike'], category: 'cardio', workoutSubtype: 'time' },
  { id: 'ex_stair_climber', name: 'Stair Climber', primaryMuscle: 'cardio', secondaryMuscles: ['quads', 'glutes'], equipment: ['machine'], category: 'cardio', workoutSubtype: 'time' },
  { id: 'ex_treadmill_run', name: 'Treadmill Run', primaryMuscle: 'cardio', secondaryMuscles: [], equipment: ['machine'], category: 'cardio', workoutSubtype: 'time' },

  // Full body
  { id: 'ex_sled_push', name: 'Sled Push', primaryMuscle: 'full_body', secondaryMuscles: ['quads', 'glutes'], equipment: ['machine'], category: 'compound', workoutSubtype: 'time_weight' },
  { id: 'ex_turkish_getup', name: 'Turkish Get-Up', primaryMuscle: 'full_body', secondaryMuscles: ['shoulders', 'abs'], equipment: ['kettlebell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_dumbbell_thruster', name: 'DB Thruster', primaryMuscle: 'full_body', secondaryMuscles: ['shoulders', 'quads'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight' },

  // Chest
  { id: 'ex_decline_bench_press', name: 'Decline Bench Press', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['barbell', 'bench'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_cable_crossover', name: 'Cable Crossover', primaryMuscle: 'chest', secondaryMuscles: [], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },

  // Shoulders
  { id: 'ex_upright_row', name: 'Upright Row', primaryMuscle: 'shoulders', secondaryMuscles: ['biceps'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_reverse_pec_deck', name: 'Reverse Pec Deck', primaryMuscle: 'shoulders', secondaryMuscles: ['back'], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps_weight' },

  // Back
  { id: 'ex_chest_supported_row', name: 'Chest-Supported Row', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['dumbbell', 'bench'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_straight_arm_pulldown', name: 'Straight-Arm Pulldown', primaryMuscle: 'back', secondaryMuscles: ['triceps'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },

  // Biceps
  { id: 'ex_concentration_curl', name: 'Concentration Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_rope_hammer_curl', name: 'Cable Rope Hammer Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },

  // Triceps
  { id: 'ex_diamond_pushup', name: 'Diamond Push-Up', primaryMuscle: 'triceps', secondaryMuscles: ['chest'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_tricep_kickback', name: 'Tricep Kickback', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'reps_weight_side' },

  // Hamstrings
  { id: 'ex_seated_leg_curl', name: 'Seated Leg Curl', primaryMuscle: 'hamstrings', secondaryMuscles: [], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_nordic_curl', name: 'Nordic Curl', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' },

  // Quads
  { id: 'ex_hack_squat', name: 'Hack Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['machine'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_sissy_squat', name: 'Sissy Squat', primaryMuscle: 'quads', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },

  // Abs
  { id: 'ex_side_plank', name: 'Side Plank', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time_side' },
  { id: 'ex_dead_bug', name: 'Dead Bug', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_cable_woodchopper', name: 'Cable Woodchopper', primaryMuscle: 'abs', secondaryMuscles: ['shoulders'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_side' },

  // Abductor
  { id: 'ex_band_abducted_goblet_squat', name: 'Band Abducted Goblet Squat', primaryMuscle: 'abductor', secondaryMuscles: ['quads', 'glutes'], equipment: ['resistance_band', 'dumbbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_band_abducted_squat', name: 'Band Abducted Squat', primaryMuscle: 'abductor', secondaryMuscles: ['quads', 'glutes'], equipment: ['resistance_band', 'bodyweight'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_band_abducted_glute_bridge', name: 'Band Abducted Glute Bridge', primaryMuscle: 'abductor', secondaryMuscles: ['glutes'], equipment: ['resistance_band', 'bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_banded_lateral_walk', name: 'Banded Lateral Walk', primaryMuscle: 'abductor', secondaryMuscles: ['glutes'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_banded_shuffle', name: 'Banded Shuffle (Band on Toes)', primaryMuscle: 'abductor', secondaryMuscles: ['glutes'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_banded_supine_transverse_hip_abduction', name: 'Banded Supine Transverse Hip Abduction', primaryMuscle: 'abductor', secondaryMuscles: [], equipment: ['resistance_band', 'bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_frog_pump', name: 'Frog Pump', primaryMuscle: 'abductor', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_glute_bridge_with_abduction', name: 'Glute Bridge with Abduction', primaryMuscle: 'abductor', secondaryMuscles: ['glutes'], equipment: ['resistance_band', 'bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_plank_alt_single_leg_hip_abduction', name: 'Plank with Alt. Single Leg Hip Abduction', primaryMuscle: 'abductor', secondaryMuscles: ['core_trunk', 'abs'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_seated_banded_abduction', name: 'Seated Banded Abduction', primaryMuscle: 'abductor', secondaryMuscles: [], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_side_lying_abduction', name: 'Side Lying Abduction', primaryMuscle: 'abductor', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_standing_abductor_machine', name: 'Standing Abductor Machine', primaryMuscle: 'abductor', secondaryMuscles: [], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps_weight' },

  // Abs (Ab Walkout, Cable Crunch, Mountain Climber, Plank, Russian Twist, and Side Plank
  // already exist above; "Ab Rollouts" maps to the existing Ab Wheel Rollout and
  // "Hanging Keg Raise" looks like a typo for the existing Hanging Leg Raise, so neither
  // got a new entry)
  { id: 'ex_ab_fallout', name: 'Ab Fallout', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_alternating_vups', name: 'Alternating V-Ups', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_barbell_rollouts', name: 'Barbell Rollouts', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['barbell'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_captains_chair_knee_tuck', name: "Captain's Chair Knee Tuck", primaryMuscle: 'abs', secondaryMuscles: ['core_trunk'], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_curl_up', name: 'Curl Up', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_ghd_situp', name: 'GHD Sit Ups', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'hamstrings'], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_hanging_knee_tuck', name: 'Hanging Knee Tuck', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'forearms'], equipment: ['pull_up_bar'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_high_plank', name: 'High Plank', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_l_sit_pull_through', name: 'L Sit Pull Through', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_landmine_oblique_twist', name: 'Landmine Oblique Twist', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['barbell'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_low_to_high_plank', name: 'Low to High Plank', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_mcgill_big_3', name: 'McGill Big 3', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'glutes'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_modified_hands_elevated_plank', name: 'Modified (Hands Elevated) Plank', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_modified_knees_down_plank', name: 'Modified (Knees Down) Plank', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_modified_high_plank', name: 'Modified High Plank', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_modified_side_plank', name: 'Modified Side Plank', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time_side' },
  { id: 'ex_modified_side_plank_raise', name: 'Modified Side Plank Raise', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders', 'glutes'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_rollup', name: 'Rollup', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_side_plank_raise', name: 'Side Plank Raise', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders', 'glutes'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_single_leg_teaser', name: 'Single Leg Teaser', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_situp', name: 'Sit Up', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_slider_knee_tuck', name: 'Slider Knee Tuck', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_slider_mountain_climbers', name: 'Slider Mountain Climbers', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_slider_pike', name: 'Slider Pike', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_stability_ball_pass_through', name: 'Stability Ball Pass Through', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_teaser', name: 'Teaser', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_teaser_with_support', name: 'Teaser with Support', primaryMuscle: 'abs', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_v_sit_hold', name: 'V Sit Hold', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_v_sit_hold_modified', name: 'V Sit Hold Modified', primaryMuscle: 'abs', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_v_sit_in_and_out', name: 'V Sit In-and-Out', primaryMuscle: 'abs', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },

  // Adductor
  { id: 'ex_copenhagen_plank', name: 'Copenhagen Plank', primaryMuscle: 'adductor', secondaryMuscles: ['abs', 'shoulders'], equipment: ['bench'], category: 'isolation', workoutSubtype: 'time_side' },
  { id: 'ex_copenhagen_plank_raise', name: 'Copenhagen Plank Raise', primaryMuscle: 'adductor', secondaryMuscles: ['abs', 'shoulders'], equipment: ['bench'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_glute_bridge_with_adduction', name: 'Glute Bridge with Adduction', primaryMuscle: 'adductor', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_goblet_squat_with_adduction', name: 'Goblet Squat with Adduction', primaryMuscle: 'adductor', secondaryMuscles: ['quads', 'glutes'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_hip_adduction_machine', name: 'Hip Adduction Machine', primaryMuscle: 'adductor', secondaryMuscles: [], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_side_lying_adduction', name: 'Side Lying Adduction', primaryMuscle: 'adductor', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_squat_with_adduction', name: 'Squat with Adduction', primaryMuscle: 'adductor', secondaryMuscles: ['quads', 'glutes'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' },

  // Core/Trunk (many list items already existed under Abs etc. and got 'core_trunk'
  // added as a secondary muscle above instead of a duplicate entry; "half kneeling
  // paloff press" maps to the existing "Half-Kneeling Pallof Press" typo-for-typo)
  { id: 'ex_arch_body_rock', name: 'Arch Body Rock', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_around_the_world', name: 'Around the World', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_back_extension_lower_back', name: 'Back Extension (Lower Back Focus)', primaryMuscle: 'core_trunk', secondaryMuscles: ['back'], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_banded_bird_dog', name: 'Banded Bird Dog', primaryMuscle: 'core_trunk', secondaryMuscles: ['glutes', 'shoulders'], equipment: ['resistance_band', 'bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_banded_deadbugs', name: 'Banded Deadbugs', primaryMuscle: 'core_trunk', secondaryMuscles: [], equipment: ['resistance_band', 'bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_bear_crawl', name: 'Bear Crawl', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders', 'quads'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'time' },
  { id: 'ex_bird_dog', name: 'Bird Dog', primaryMuscle: 'core_trunk', secondaryMuscles: ['glutes', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_bodysaw', name: 'Bodysaw', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_cable_bird_dog_row', name: 'Cable Bird Dog Row', primaryMuscle: 'core_trunk', secondaryMuscles: ['back', 'glutes'], equipment: ['cable'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_db_bird_dog_row', name: 'DB Bird Dog Row', primaryMuscle: 'core_trunk', secondaryMuscles: ['back', 'glutes'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_db_z_press', name: 'DB Z Press', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_fire_hydrant', name: 'Fire Hydrant', primaryMuscle: 'core_trunk', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_half_kneeling_cable_low_to_high_woodchop', name: 'Half Kneeling Cable Low-to-High Wood Chop', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_half_kneeling_cable_high_to_low_woodchop', name: 'Half Kneeling Cable High-to-Low Wood Chop', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_half_kneeling_windmill', name: 'Half Kneeling Windmill', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['kettlebell'], category: 'isolation', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_half_turkish_getup', name: 'Half Turkish Get-Up', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['kettlebell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_high_to_low_banded_woodchop', name: 'High-to-Low Banded Wood Chop', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_high_to_low_cable_woodchop', name: 'High-to-Low Cable Wood Chop', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_hollow_body_hold', name: 'Hollow Body Hold', primaryMuscle: 'core_trunk', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_hollow_body_rock', name: 'Hollow Body Rock', primaryMuscle: 'core_trunk', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_inchworms', name: 'Inchworms', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders', 'hamstrings'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_lateral_walking_plank', name: 'Lateral Walking Plank', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_low_to_high_cable_woodchop', name: 'Low-to-High Cable Wood Chop', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_modified_intermediate_hollow_body_hold', name: 'Modified (Intermediate) Hollow Body Hold', primaryMuscle: 'core_trunk', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_modified_novice_hollow_body_hold', name: 'Modified (Novice) Hollow Body Hold', primaryMuscle: 'core_trunk', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_modified_hollow_body_rock', name: 'Modified Hollow Body Rock', primaryMuscle: 'core_trunk', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_modified_plank_shoulder_taps', name: 'Modified Plank Shoulder Taps', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_one_arm_plank_to_side_plank', name: 'One Arm Plank to Side Plank', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_plank_pull_across', name: 'Plank Pull Across', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_plank_shoulder_taps', name: 'Plank Shoulder Taps', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_plank_alt_single_leg_hip_extension', name: 'Plank with Alt. Single Leg Hip Extension', primaryMuscle: 'core_trunk', secondaryMuscles: ['glutes', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_quadruped_shoulder_taps', name: 'Quadruped Shoulder Taps', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_seated_l_sit_walk', name: 'Seated L-Sit Walk', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_single_arm_plank', name: 'Single Arm Plank', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time_side' },
  { id: 'ex_standing_banded_pallof_press', name: 'Standing Banded Pallof Press', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_standing_pallof_cable_press', name: 'Standing Pallof Cable Press', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_stir_the_pot', name: 'Stir-the-Pot', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_suitcase_deadlift', name: 'Suitcase Deadlift', primaryMuscle: 'core_trunk', secondaryMuscles: ['back', 'glutes', 'forearms'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_suitcase_walk', name: 'Suitcase Walk', primaryMuscle: 'core_trunk', secondaryMuscles: ['forearms'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'time_weight_side' },

  // Shoulders (Arch Body Rock, Around the World, Band Pull-Aparts, Banded Face Pull,
  // Banded Face Pull w/ Ext Rotation, Barbell Thruster, Cable Lateral Raise, DB Lateral
  // Raise, DB Thruster, DB Z-Press, Incline Bench Press -> Incline Barbell Press, Overhead
  // Press, Rear Delt Flyes, and Seated DB Overhead Press -> DB Shoulder Press already exist
  // above and already carry 'shoulders'; Burpee, Farmer's Carry, and Push-Up gained
  // 'shoulders' as a new secondary muscle in place above instead of a duplicate entry here.
  // Meadows Row and Face Pull (Rotator Cuff Focus) are classed under Back to match their
  // existing row/face-pull siblings, and Low-to-High Banded Wood Chop under Core/Trunk to
  // match its five wood-chop siblings, each with 'shoulders' as a secondary muscle.)
  { id: 'ex_banded_front_raise', name: 'Banded Front Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_banded_lateral_raise', name: 'Banded Lateral Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_banded_overhead_press', name: 'Banded Overhead Press', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'], equipment: ['resistance_band'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_banded_upright_row', name: 'Banded Upright Row', primaryMuscle: 'shoulders', secondaryMuscles: ['biceps'], equipment: ['resistance_band'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_cable_front_raise', name: 'Cable Front Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_db_front_raise', name: 'DB Front Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_db_iso_hold_lateral_raise', name: 'DB Iso-Hold Lateral Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'time_weight' },
  { id: 'ex_db_iso_lateral_raise', name: 'DB Iso Lateral Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'time_weight' },
  { id: 'ex_db_lateral_to_front_raise', name: 'DB Lateral-to-Front Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_db_upright_row', name: 'DB Upright Row', primaryMuscle: 'shoulders', secondaryMuscles: ['biceps'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_devils_press', name: "Devil's Press", primaryMuscle: 'full_body', secondaryMuscles: ['shoulders', 'triceps'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_elevated_pike_handstand_pushup', name: 'Elevated Pike Hand Stand Push-Up', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'], equipment: ['bodyweight', 'box'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_face_pull_rotator_cuff', name: 'Face Pull (Rotator Cuff Focus)', primaryMuscle: 'back', secondaryMuscles: ['shoulders'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_front_plate_raise', name: 'Front Plate Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['plate'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_front_plate_raise_hold', name: 'Front Plate Raise Hold', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['plate'], category: 'isolation', workoutSubtype: 'time_weight' },
  { id: 'ex_half_kneeling_landmine_press', name: 'Half-Kneeling Landmine Press', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_high_incline_cable_overhead_press', name: 'High Incline Cable Overhead Press', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'], equipment: ['cable', 'bench'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_low_to_high_banded_woodchop', name: 'Low-to-High Banded Wood Chop', primaryMuscle: 'core_trunk', secondaryMuscles: ['shoulders'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_meadows_row', name: 'Meadows Row', primaryMuscle: 'back', secondaryMuscles: ['biceps', 'shoulders'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_modified_hands_elevated_pushup', name: 'Modified (Hands Elevated) Push-Up', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['bodyweight', 'bench'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_modified_knees_down_pushup', name: 'Modified (Knees Down) Push-Up', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_modified_clapping_pushup', name: 'Modified Clapping Push-Up', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_modified_handstand_pushup', name: 'Modified Hand Stand Push-Up', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_modified_plyo_pushup', name: 'Modified Plyo Push-Up', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_plyo_pushup', name: 'Plyo Push-Up', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_prone_ityw', name: 'Prone I-T-Y-W', primaryMuscle: 'shoulders', secondaryMuscles: ['back'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_prone_incline_db_lateral_raise', name: 'Prone Incline DB Lateral Raise', primaryMuscle: 'shoulders', secondaryMuscles: ['back'], equipment: ['dumbbell', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_prone_incline_ityw', name: 'Prone Incline I-T-Y-W', primaryMuscle: 'shoulders', secondaryMuscles: ['back'], equipment: ['dumbbell', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_prone_incline_rear_delt_flyes', name: 'Prone Incline Rear Delt Flyes', primaryMuscle: 'shoulders', secondaryMuscles: ['back'], equipment: ['dumbbell', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_prone_incline_y_raises', name: 'Prone Incline Y-Raises', primaryMuscle: 'shoulders', secondaryMuscles: ['back'], equipment: ['dumbbell', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_pushup_mechanical_dropset', name: 'Push-Up Mechanical Dropset', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_pushup_single_arm_deficit', name: 'Push-Up with Single Arm Deficit', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['bodyweight', 'box'], category: 'compound', workoutSubtype: 'reps_side' },
  { id: 'ex_quadruped_banded_shoulder_abduction', name: 'Quadruped Banded Shoulder Abduction', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['resistance_band', 'bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_seated_barbell_overhead_press', name: 'Seated Barbell Overhead Press', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'], equipment: ['barbell', 'bench'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_seated_cable_front_raise', name: 'Seated Cable Front Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['cable', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_seated_cable_overhead_press', name: 'Seated Cable Overhead Press', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'], equipment: ['cable', 'bench'], category: 'compound', workoutSubtype: 'reps_weight' },
];
