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
  { id: 'ex_leg_press', name: 'Leg Press', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['machine'], category: 'compound', workoutSubtype: 'reps_weight' },
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
  { id: 'ex_box_jump', name: 'Box Jump', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'cardio', 'hamstrings'], equipment: ['box'], category: 'cardio', workoutSubtype: 'reps' }, // best guess - no usage data

  // Pulled in from the user's actual training history
  { id: 'ex_deficit_deadlift', name: 'Deficit Deadlift', primaryMuscle: 'back', secondaryMuscles: ['hamstrings', 'glutes', 'forearms'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_banded_face_pull_pause', name: 'Banded Face Pull (1s Pause)', primaryMuscle: 'back', secondaryMuscles: ['shoulders'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_banded_face_pull_ext_rot', name: 'Banded Face Pull w/ Ext Rotation', primaryMuscle: 'back', secondaryMuscles: ['shoulders'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_single_leg_banded_ham_curl', name: 'Standing Single-Leg Banded Hamstring Curl', primaryMuscle: 'hamstrings', secondaryMuscles: [], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'time_side' },
  { id: 'ex_ffe_split_squat', name: 'Front Foot Elevated Split Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['dumbbell', 'box'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_wall_sit', name: 'Wall Sit', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'time' },
  { id: 'ex_db_box_step_up', name: 'DB Box Step Up', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['dumbbell', 'box'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_ab_walkout', name: 'Ab Walkout', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' }, // best guess - no usage data
  { id: 'ex_2up1down_hip_thrust', name: '2-Up, 1-Down Hip Thrust', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['bodyweight', 'bench'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_half_kneeling_pallof_press', name: 'Half-Kneeling Pallof Press', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_supinated_lat_pulldown_band', name: 'Supinated Grip Lat Pulldown (Band)', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['resistance_band'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_kb_rdl', name: 'KB Romanian Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['kettlebell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_db_skullcrusher_pause', name: 'DB Skullcrusher (1s Pause)', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['dumbbell', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_seated_incline_db_curl', name: 'Seated Incline DB Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'], equipment: ['dumbbell', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight_side' },

  // Pulled in from the user's May 2026 training block
  { id: 'ex_tke_split_squat', name: 'Terminal Knee Extension Split Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps' },
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
  { id: 'ex_hack_squat', name: 'Hack Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['machine'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_sissy_squat', name: 'Sissy Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },

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
  { id: 'ex_banded_supine_transverse_hip_abduction', name: 'Banded Supine Transverse Hip Abduction', primaryMuscle: 'abductor', secondaryMuscles: ['glutes'], equipment: ['resistance_band', 'bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_frog_pump', name: 'Frog Pump', primaryMuscle: 'abductor', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_glute_bridge_with_abduction', name: 'Glute Bridge with Abduction', primaryMuscle: 'abductor', secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['resistance_band', 'bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
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
  { id: 'ex_l_sit_pull_through', name: 'L Sit Pull Through', primaryMuscle: 'abs', secondaryMuscles: ['core_trunk', 'shoulders', 'triceps'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
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
  { id: 'ex_glute_bridge_with_adduction', name: 'Glute Bridge with Adduction', primaryMuscle: 'adductor', secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
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
  { id: 'ex_cable_front_raise', name: 'Cable Front Raise', primaryMuscle: 'shoulders', secondaryMuscles: ['traps'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_db_front_raise', name: 'DB Front Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_db_iso_hold_lateral_raise', name: 'DB Iso-Hold Lateral Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'time_weight' },
  { id: 'ex_db_iso_lateral_raise', name: 'DB Iso Lateral Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'time_weight' },
  { id: 'ex_db_lateral_to_front_raise', name: 'DB Lateral-to-Front Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_db_upright_row', name: 'DB Upright Row', primaryMuscle: 'shoulders', secondaryMuscles: ['biceps', 'traps'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_devils_press', name: "Devil's Press", primaryMuscle: 'full_body', secondaryMuscles: ['shoulders', 'triceps'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_elevated_pike_handstand_pushup', name: 'Elevated Pike Hand Stand Push-Up', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'], equipment: ['bodyweight', 'box'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_face_pull_rotator_cuff', name: 'Face Pull (Rotator Cuff Focus)', primaryMuscle: 'back', secondaryMuscles: ['shoulders'], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_front_plate_raise', name: 'Front Plate Raise', primaryMuscle: 'shoulders', secondaryMuscles: ['traps'], equipment: ['plate'], category: 'isolation', workoutSubtype: 'reps_weight' },
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

  // Glutes + Hamstrings (processed together since the two lists overlapped heavily -
  // nearly every deadlift/RDL/squat variant appeared on both. 2-Up 1-Down Hip Thrust,
  // Air Squat -> Bodyweight Squat, B-Stance DB Romanian Deadlift, Band Abducted Goblet
  // Squat/Squat, Banded Lateral Walk, Banded Shuffle, Banded Supine Transverse Hip
  // Abduction, Bulgarian Split Squat, Cable Pull-Through, Deadlift, Deficit Deadlift,
  // DB Romanian Deadlift, Fire Hydrant, Front Foot Elevated Split Squat, Barbell Front
  // Squat, Glute Bridge (+ Banded/with Abduction/with Adduction), Cable Glute Kickback,
  // Goblet Squat (+ with Adduction), Good Morning, Barbell Hip Thrust, KB Romanian
  // Deadlift, KB Swing, Leg Curl variants (Lying/Seated/Standing Single-Leg Banded),
  // Nordic Curl, Plank w/ Alt Single Leg Hip Extension, Romanian Deadlift, Single-Leg
  // Glute Bridge, Squat, Squat with Adduction, Terminal Knee Extension Split Squat,
  // Walking Lunge, and Wall Sit already exist above; each got 'glutes' and/or
  // 'hamstrings' added as a secondary muscle in place where it was missing instead of a
  // duplicate entry here. "Hack Squat Good Morning" reads like two list items run
  // together with no such combo exercise existing, so it's mapped to the existing Hack
  // Squat. "Glute Bridge Against Band" and "Banded Abduction in Glute Bridge" both map to
  // existing banded/abduction glute bridge entries rather than new ones.)

  { id: 'ex_back_extension_glute_focus', name: 'Back Extension (Glute Focus)', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_alt_lunges', name: 'Alternating Lunges', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_alternating_jump_lunges', name: 'Alternating Jump Lunges', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'cardio'], equipment: ['bodyweight'], category: 'cardio', workoutSubtype: 'reps' },
  { id: 'ex_b_stance_banded_rdl', name: 'B-Stance Banded Romanian Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes'], equipment: ['resistance_band'], category: 'compound', workoutSubtype: 'reps_side' },
  { id: 'ex_b_stance_glute_bridge', name: 'B-Stance Glute Bridge', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_b_stance_hip_thrust', name: 'B-Stance Hip Thrust', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['barbell', 'bench'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_b_stance_squat', name: 'B-Stance Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_banded_deadlift', name: 'Banded Deadlift', primaryMuscle: 'back', secondaryMuscles: ['hamstrings', 'glutes'], equipment: ['resistance_band'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_banded_glute_kickback', name: 'Banded Glute Kickback', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_banded_good_morning', name: 'Banded Good Morning', primaryMuscle: 'hamstrings', secondaryMuscles: ['back', 'glutes'], equipment: ['resistance_band'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_banded_pull_through', name: 'Banded Pull-Through', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_banded_stiff_leg_sumo_deadlift', name: 'Banded Stiff Leg Sumo Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['resistance_band'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_banded_sumo_good_morning', name: 'Banded Sumo Good Morning', primaryMuscle: 'hamstrings', secondaryMuscles: ['back', 'glutes'], equipment: ['resistance_band'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_barbell_reverse_lunge', name: 'Barbell Reverse Lunge', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_barbell_split_squat', name: 'Barbell Split Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_barbell_stiff_leg_sumo_deadlift', name: 'Barbell Stiff Leg Sumo Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_battle_rope_jumping_lunge_slam', name: 'Battle Rope Jumping Lunge Slam', primaryMuscle: 'full_body', secondaryMuscles: ['glutes', 'quads'], equipment: ['bodyweight'], category: 'cardio', workoutSubtype: 'reps' },
  { id: 'ex_belt_squat', name: 'Belt Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['machine'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_bodyweight_glute_kickback', name: 'Bodyweight Glute Kickback', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_bodyweight_reverse_hyper', name: 'Bodyweight Reverse Hyper', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings', 'back'], equipment: ['bodyweight', 'bench'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_broad_jump', name: 'Broad Jump', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'cardio', 'hamstrings'], equipment: ['bodyweight'], category: 'cardio', workoutSubtype: 'reps' },
  { id: 'ex_clamshell', name: 'Clamshell', primaryMuscle: 'abductor', secondaryMuscles: ['glutes'], equipment: ['resistance_band', 'bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_clamshell_hip_extension', name: 'Clamshell with Hip Extension', primaryMuscle: 'abductor', secondaryMuscles: ['glutes'], equipment: ['resistance_band', 'bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_cossack_squat', name: 'Cossack Squat', primaryMuscle: 'adductor', secondaryMuscles: ['quads', 'glutes'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_curtsy_lunge', name: 'Curtsy Lunge', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'adductor'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps_side' },
  { id: 'ex_db_stiff_leg_deadlift', name: 'DB Stiff Leg Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_db_stiff_leg_sumo_deadlift', name: 'DB Stiff Leg Sumo Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_deadlift_from_blocks', name: 'Deadlift from Blocks', primaryMuscle: 'back', secondaryMuscles: ['hamstrings', 'glutes', 'forearms'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_deficit_kb_stiff_leg_deadlift', name: 'Deficit Kettlebell Stiff Leg Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['kettlebell', 'box'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_deficit_reverse_lunge', name: 'Deficit Reverse Lunge', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['dumbbell', 'box'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_eccentric_step_down', name: 'Eccentric Step Down', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['box', 'bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_elevated_single_leg_glute_bridge', name: 'Elevated Single-Leg Glute Bridge', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['bodyweight', 'bench'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_forward_to_backward_lunge', name: 'Forward-to-Backward Lunge', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps_side' },
  { id: 'ex_glute_ham_raise', name: 'Glute Ham Raise', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes'], equipment: ['machine'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_heel_elevated_goblet_squat', name: 'Heel Elevated Goblet Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['dumbbell', 'kettlebell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_high_bar_squat', name: 'High-Bar Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_kang_squat', name: 'Kang Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_kettlebell_stiff_leg_deadlift', name: 'Kettlebell Stiff Leg Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['kettlebell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_kettlebell_stiff_leg_sumo_deadlift', name: 'Kettlebell Stiff Leg Sumo Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['kettlebell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_kneel_to_squat', name: 'Kneel-to-Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'mobility', workoutSubtype: 'reps' },
  { id: 'ex_landmine_curtsy_lunge', name: 'Landmine Curtsy Lunge', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'adductor'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_landmine_goblet_squat', name: 'Landmine Goblet Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_landmine_romanian_deadlift', name: 'Landmine Romanian Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_landmine_split_squat', name: 'Landmine Split Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_lateral_box_step_up', name: 'Lateral Box Step-Up', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['dumbbell', 'box'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_low_ceiling_lunge', name: 'Low Ceiling Lunge', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps_side' },
  { id: 'ex_low_ceiling_pulse_lunge', name: 'Low Ceiling Pulse Lunge', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps_side' },
  { id: 'ex_overhead_walking_lunge', name: 'Overhead Walking Lunge', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'shoulders'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_reverse_hack_squat', name: 'Reverse Hack Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['machine'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_reverse_hyperextension', name: 'Reverse Hyperextension', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings', 'back'], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_reverse_lunge', name: 'Reverse Lunge', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps_side' },
  { id: 'ex_runners_lunge', name: "Runner's Lunge", primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'mobility', workoutSubtype: 'time_side' },
  { id: 'ex_side_lunge', name: 'Side Lunge', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'adductor'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps_side' },
  { id: 'ex_single_leg_deadlift', name: 'Single-Leg Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps_side' },
  { id: 'ex_single_leg_leg_press', name: 'Single-Leg Leg Press', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['machine'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_spanish_squat', name: 'Spanish Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['resistance_band', 'bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_split_squat', name: 'Split Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_split_stance_rdl', name: 'Split Stance Romanian Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_squat_jump', name: 'Squat Jump', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'cardio'], equipment: ['bodyweight'], category: 'cardio', workoutSubtype: 'reps' },
  { id: 'ex_safety_bar_squat', name: 'Safety Bar Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_stiff_leg_deadlift', name: 'Stiff Leg Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_straight_leg_bridge', name: 'Straight Leg Bridge', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_sumo_deadlift', name: 'Sumo Deadlift', primaryMuscle: 'back', secondaryMuscles: ['hamstrings', 'glutes', 'forearms'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_toes_elevated_db_rdl', name: 'Toes-Elevated DB Romanian Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_toes_elevated_kb_rdl', name: 'Toes-Elevated Kettlebell Romanian Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['kettlebell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_trap_bar_deadlift', name: 'Trap Bar Deadlift', primaryMuscle: 'back', secondaryMuscles: ['hamstrings', 'glutes', 'forearms'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_weighted_back_extension_glute_focus', name: 'Weighted Back Extension (Glute Focus)', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['machine', 'plate'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_zercher_squat', name: 'Zercher Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'back'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_2down_1up_hamstring_curl', name: '2-Down, 1-Up Hamstring Curl', primaryMuscle: 'hamstrings', secondaryMuscles: [], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_cable_stiff_leg_deadlift', name: 'Cable Stiff-Leg Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['cable'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_hamstring_curl_21s', name: "Hamstring Curl 21's", primaryMuscle: 'hamstrings', secondaryMuscles: [], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_jefferson_curl', name: 'Jefferson Curl', primaryMuscle: 'hamstrings', secondaryMuscles: ['back'], equipment: ['barbell'], category: 'mobility', workoutSubtype: 'reps_weight' },
  { id: 'ex_modified_slider_hamstring_curl', name: 'Modified Slider Hamstring Curl', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_prone_banded_hamstring_curl', name: 'Prone Banded Hamstring Curl', primaryMuscle: 'hamstrings', secondaryMuscles: [], equipment: ['resistance_band', 'bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_prone_single_leg_banded_hamstring_curl', name: 'Prone Single-Leg Banded Hamstring Curl', primaryMuscle: 'hamstrings', secondaryMuscles: [], equipment: ['resistance_band', 'bodyweight'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_seated_banded_single_leg_hamstring_curl', name: 'Seated Banded Single-Leg Hamstring Curl', primaryMuscle: 'hamstrings', secondaryMuscles: [], equipment: ['resistance_band', 'bench'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_slider_hamstring_curl', name: 'Slider Hamstring Curl', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_swiss_ball_hamstring_curl', name: 'Swiss Ball Hamstring Curl', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },

  // Traps (Cable Front Raise, DB Upright Row, and Front Plate Raise already exist above
  // and gained 'traps' as a secondary muscle in place instead of a duplicate entry here)
  { id: 'ex_clean_pull', name: 'Clean Pull', primaryMuscle: 'traps', secondaryMuscles: ['back', 'hamstrings'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_seated_db_shrug', name: 'Seated DB Shrug', primaryMuscle: 'traps', secondaryMuscles: [], equipment: ['dumbbell', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_seated_ez_bar_shrug', name: 'Seated EZ Bar Shrug', primaryMuscle: 'traps', secondaryMuscles: [], equipment: ['ez_bar', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_snatch_pull', name: 'Snatch Pull', primaryMuscle: 'traps', secondaryMuscles: ['back', 'hamstrings'], equipment: ['barbell'], category: 'compound', workoutSubtype: 'reps_weight' },

  // Triceps (Bench Dip, Bench Press, Chest Dips -> Dips, Close-Grip Bench Press, Diamond
  // Push-Up, DB OH Tricep Extensions -> Overhead DB Tricep Extension, EZ Bar Skullcrushers,
  // Tricep Kickback, and Tricep Pushdowns already exist above and already carry 'triceps';
  // L Sit Pull Through gained 'triceps' as a new secondary muscle in place above instead of
  // a duplicate entry here. Board Press, Chest Dips (Weighted), Feet Elevated/Hand Release
  // Push-Up, Feet Up Spoto Press, and Assisted Dips are classed under Chest to match their
  // wide-grip bench/dip/push-up siblings, each with 'triceps' as a secondary muscle; Feet
  // Up Close Grip Bench Press and Close Grip Push-Up instead match their close-grip/diamond
  // siblings and stay triceps-primary. Renegade Row is classed under Core/Trunk to match
  // the app's other plank-plus-row entries.)

  { id: 'ex_3pos_banded_tricep_burnout', name: '3-Position Banded Tricep Burnout', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_3pos_bodyweight_tricep_burnout', name: '3-Position Bodyweight Tricep Burnout', primaryMuscle: 'triceps', secondaryMuscles: ['chest'], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_3pos_tricep_burnout', name: '3-Position Tricep Burnout', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_assisted_dips', name: 'Assisted Dips', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['machine'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_banded_oh_tricep_extension', name: 'Banded OH Tricep Extension', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_banded_tricep_kickback', name: 'Banded Tricep Kickback', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_banded_tricep_pushdown', name: 'Banded Tricep Pushdown', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_bench_dip_mechanical_dropset', name: 'Bench Dip Mechanical Dropset', primaryMuscle: 'triceps', secondaryMuscles: ['chest'], equipment: ['bodyweight', 'bench'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_board_press', name: 'Board Press', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['barbell', 'bench'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_bodyweight_tricep_extension', name: 'Bodyweight Tricep Extension', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation', workoutSubtype: 'reps' },
  { id: 'ex_cable_oh_tricep_extension', name: 'Cable OH Tricep Extension', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_cable_single_arm_oh_tricep_extension', name: 'Cable Single Arm OH Tricep Extension', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_chest_dips_weighted', name: 'Chest Dips (Weighted)', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['bodyweight', 'plate'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_close_grip_pushup', name: 'Close Grip Push-Up', primaryMuscle: 'triceps', secondaryMuscles: ['chest'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_cross_body_cable_tricep_extension', name: 'Cross Body Cable Tricep Extension', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_cross_body_single_arm_cable_tricep_extension', name: 'Cross Body Single Arm Cable Tricep Extension', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_db_single_arm_oh_tricep_extension', name: 'DB Single Arm OH Tricep Extension', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation', workoutSubtype: 'reps_weight_side' },
  { id: 'ex_db_skullcrusher', name: 'DB Skullcrusher', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['dumbbell', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_feet_elevated_pushup', name: 'Feet Elevated Push-Up', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['bodyweight', 'box'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_feet_up_close_grip_bench_press', name: 'Feet Up Close Grip Bench Press', primaryMuscle: 'triceps', secondaryMuscles: ['chest'], equipment: ['barbell', 'bench'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_feet_up_spoto_press', name: 'Feet Up Spoto Press', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['barbell', 'bench'], category: 'compound', workoutSubtype: 'reps_weight' },
  { id: 'ex_hand_release_pushup', name: 'Hand Release Push-Up', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['bodyweight'], category: 'compound', workoutSubtype: 'reps' },
  { id: 'ex_incline_skullcrusher', name: 'Incline Skullcrusher', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['ez_bar', 'bench'], category: 'isolation', workoutSubtype: 'reps_weight' },
  { id: 'ex_renegade_row', name: 'Renegade Row', primaryMuscle: 'core_trunk', secondaryMuscles: ['back', 'biceps', 'triceps'], equipment: ['dumbbell'], category: 'compound', workoutSubtype: 'reps_side' },
  { id: 'ex_single_arm_banded_oh_tricep_extension', name: 'Single Arm Banded OH Tricep Extension', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['resistance_band'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_single_arm_reverse_tricep_pushdown', name: 'Single Arm Reverse Tricep Pushdown', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_single_arm_tricep_pushdown', name: 'Single Arm Tricep Pushdown', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['cable'], category: 'isolation', workoutSubtype: 'reps_side' },
  { id: 'ex_tricep_extension_machine', name: 'Tricep Extension Machine', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['machine'], category: 'isolation', workoutSubtype: 'reps_weight' },
];
