import { Exercise } from '@/types';

// Core starter library. Users can add their own exercises from the Library tab;
// these just seed the app so program building has something to work with immediately.
export const SEED_EXERCISES: Exercise[] = [
  // Chest
  { id: 'ex_barbell_bench_press', name: 'Bench Press', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['barbell', 'bench'], category: 'compound' },
  { id: 'ex_dumbbell_bench_press', name: 'DB Bench Press', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['dumbbell', 'bench'], category: 'compound' },
  { id: 'ex_incline_barbell_press', name: 'Incline Barbell Press', primaryMuscle: 'chest', secondaryMuscles: ['shoulders', 'triceps'], equipment: ['barbell', 'bench'], category: 'compound' },
  { id: 'ex_incline_dumbbell_press', name: 'Incline DB Press', primaryMuscle: 'chest', secondaryMuscles: ['shoulders', 'triceps'], equipment: ['dumbbell', 'bench'], category: 'compound' },
  { id: 'ex_pushup', name: 'Push-Up', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'core'], equipment: ['bodyweight'], category: 'compound' },
  { id: 'ex_cable_fly', name: 'Cable Fly', primaryMuscle: 'chest', secondaryMuscles: [], equipment: ['cable'], category: 'isolation' },
  { id: 'ex_dumbbell_fly', name: 'DB Fly', primaryMuscle: 'chest', secondaryMuscles: [], equipment: ['dumbbell', 'bench'], category: 'isolation' },
  { id: 'ex_chest_press_machine', name: 'Chest Press Machine', primaryMuscle: 'chest', secondaryMuscles: ['triceps'], equipment: ['machine'], category: 'compound' },
  { id: 'ex_dips', name: 'Dips', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'], equipment: ['bodyweight'], category: 'compound' },

  // Back
  { id: 'ex_deadlift', name: 'Deadlift', primaryMuscle: 'back', secondaryMuscles: ['hamstrings', 'glutes', 'forearms'], equipment: ['barbell'], category: 'compound' },
  { id: 'ex_pullup', name: 'Pull-Up', primaryMuscle: 'back', secondaryMuscles: ['biceps', 'forearms'], equipment: ['pull_up_bar'], category: 'compound' },
  { id: 'ex_lat_pulldown', name: 'Lat Pulldown', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['cable'], category: 'compound' },
  { id: 'ex_barbell_row', name: 'Barbell Row', primaryMuscle: 'back', secondaryMuscles: ['biceps', 'shoulders'], equipment: ['barbell'], category: 'compound' },
  { id: 'ex_dumbbell_row', name: 'Single-Arm DB Row', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['dumbbell', 'bench'], category: 'compound' },
  { id: 'ex_seated_cable_row', name: 'Seated Cable Row', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['cable'], category: 'compound' },
  { id: 'ex_tbar_row', name: 'T-Bar Row', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['barbell'], category: 'compound' },
  { id: 'ex_inverted_row', name: 'Inverted Row', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['bodyweight'], category: 'compound' },
  { id: 'ex_face_pull', name: 'Face Pull', primaryMuscle: 'back', secondaryMuscles: ['shoulders'], equipment: ['cable'], category: 'isolation' },

  // Shoulders
  { id: 'ex_overhead_press', name: 'OHP', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'], equipment: ['barbell'], category: 'compound' },
  { id: 'ex_dumbbell_shoulder_press', name: 'DB Shoulder Press', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'], equipment: ['dumbbell'], category: 'compound' },
  { id: 'ex_lateral_raise', name: 'DB Lateral Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation' },
  { id: 'ex_cable_lateral_raise', name: 'Cable Lateral Raise', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['cable'], category: 'isolation' },
  { id: 'ex_rear_delt_fly', name: 'Rear Delt Fly', primaryMuscle: 'shoulders', secondaryMuscles: ['back'], equipment: ['dumbbell'], category: 'isolation' },
  { id: 'ex_arnold_press', name: 'Arnold Press', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'], equipment: ['dumbbell'], category: 'compound' },

  // Biceps
  { id: 'ex_barbell_curl', name: 'Barbell Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'], equipment: ['barbell'], category: 'isolation' },
  { id: 'ex_dumbbell_curl', name: 'DB Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'], equipment: ['dumbbell'], category: 'isolation' },
  { id: 'ex_hammer_curl', name: 'Hammer Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'], equipment: ['dumbbell'], category: 'isolation' },
  { id: 'ex_cable_curl', name: 'Cable Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'], equipment: ['cable'], category: 'isolation' },
  { id: 'ex_preacher_curl', name: 'EZ-Bar Preacher Curl', primaryMuscle: 'biceps', secondaryMuscles: [], equipment: ['ez_bar', 'bench'], category: 'isolation' },

  // Triceps
  { id: 'ex_tricep_pushdown', name: 'Tricep Pushdown', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['cable'], category: 'isolation' },
  { id: 'ex_skullcrusher', name: 'EZ-Bar Skullcrusher', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['ez_bar', 'bench'], category: 'isolation' },
  { id: 'ex_overhead_tricep_ext', name: 'Overhead DB Tricep Extension', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation' },
  { id: 'ex_close_grip_bench', name: 'Close-Grip Bench Press', primaryMuscle: 'triceps', secondaryMuscles: ['chest'], equipment: ['barbell', 'bench'], category: 'compound' },
  { id: 'ex_bench_dip', name: 'Bench Dip', primaryMuscle: 'triceps', secondaryMuscles: ['chest'], equipment: ['bodyweight', 'bench'], category: 'isolation' },

  // Quads
  { id: 'ex_back_squat', name: 'Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['barbell'], category: 'compound' },
  { id: 'ex_front_squat', name: 'Barbell Front Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'core'], equipment: ['barbell'], category: 'compound' },
  { id: 'ex_goblet_squat', name: 'Goblet Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['kettlebell', 'dumbbell'], category: 'compound' },
  { id: 'ex_leg_press', name: 'Leg Press', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['machine'], category: 'compound' },
  { id: 'ex_leg_extension', name: 'Leg Extension', primaryMuscle: 'quads', secondaryMuscles: [], equipment: ['machine'], category: 'isolation' },
  { id: 'ex_bulgarian_split_squat', name: 'Bulgarian Split Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['dumbbell', 'bench'], category: 'compound' },
  { id: 'ex_walking_lunge', name: 'Walking Lunge', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['dumbbell'], category: 'compound' },
  { id: 'ex_bodyweight_squat', name: 'Bodyweight Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['bodyweight'], category: 'compound' },

  // Hamstrings / Glutes
  { id: 'ex_romanian_deadlift', name: 'Romanian Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['barbell'], category: 'compound' },
  { id: 'ex_dumbbell_rdl', name: 'DB Romanian Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes'], equipment: ['dumbbell'], category: 'compound' },
  { id: 'ex_leg_curl', name: 'Lying Leg Curl', primaryMuscle: 'hamstrings', secondaryMuscles: [], equipment: ['machine'], category: 'isolation' },
  { id: 'ex_hip_thrust', name: 'Barbell Hip Thrust', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['barbell', 'bench'], category: 'compound' },
  { id: 'ex_glute_bridge', name: 'Glute Bridge', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['bodyweight'], category: 'isolation' },
  { id: 'ex_kettlebell_swing', name: 'KB Swing', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings', 'core'], equipment: ['kettlebell'], category: 'compound' },
  { id: 'ex_cable_pull_through', name: 'Cable Pull-Through', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['cable'], category: 'isolation' },

  // Calves
  { id: 'ex_standing_calf_raise', name: 'Standing Calf Raise', primaryMuscle: 'calves', secondaryMuscles: [], equipment: ['machine'], category: 'isolation' },
  { id: 'ex_dumbbell_calf_raise', name: 'DB Calf Raise', primaryMuscle: 'calves', secondaryMuscles: [], equipment: ['dumbbell'], category: 'isolation' },
  { id: 'ex_bodyweight_calf_raise', name: 'Bodyweight Calf Raise', primaryMuscle: 'calves', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation' },

  // Core
  { id: 'ex_plank', name: 'Plank', primaryMuscle: 'core', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation' },
  { id: 'ex_hanging_leg_raise', name: 'Hanging Leg Raise', primaryMuscle: 'core', secondaryMuscles: ['forearms'], equipment: ['pull_up_bar'], category: 'isolation' },
  { id: 'ex_cable_crunch', name: 'Cable Crunch', primaryMuscle: 'core', secondaryMuscles: [], equipment: ['cable'], category: 'isolation' },
  { id: 'ex_ab_wheel', name: 'Ab Wheel Rollout', primaryMuscle: 'core', secondaryMuscles: ['shoulders'], equipment: ['bodyweight'], category: 'isolation' },
  { id: 'ex_russian_twist', name: 'Russian Twist', primaryMuscle: 'core', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation' },
  { id: 'ex_mountain_climber', name: 'Mountain Climber', primaryMuscle: 'core', secondaryMuscles: ['cardio'], equipment: ['bodyweight'], category: 'isolation' },

  // Full body / conditioning
  { id: 'ex_burpee', name: 'Burpee', primaryMuscle: 'full_body', secondaryMuscles: ['cardio'], equipment: ['bodyweight'], category: 'cardio' },
  { id: 'ex_kb_clean_and_press', name: 'KB Clean & Press', primaryMuscle: 'full_body', secondaryMuscles: ['shoulders'], equipment: ['kettlebell'], category: 'compound' },
  { id: 'ex_thruster', name: 'Barbell Thruster', primaryMuscle: 'full_body', secondaryMuscles: ['shoulders', 'quads'], equipment: ['barbell'], category: 'compound' },

  // Cardio
  { id: 'ex_stationary_bike', name: 'Stationary Bike', primaryMuscle: 'cardio', secondaryMuscles: [], equipment: ['bike'], category: 'cardio' },
  { id: 'ex_rowing_machine', name: 'Rowing Machine', primaryMuscle: 'cardio', secondaryMuscles: ['back'], equipment: ['rower'], category: 'cardio' },
  { id: 'ex_jump_rope', name: 'Jump Rope', primaryMuscle: 'cardio', secondaryMuscles: ['calves'], equipment: ['bodyweight'], category: 'cardio' },
  { id: 'ex_box_jump', name: 'Box Jump', primaryMuscle: 'quads', secondaryMuscles: ['glutes', 'cardio'], equipment: ['box'], category: 'cardio' },

  // Pulled in from the user's actual training history
  { id: 'ex_deficit_deadlift', name: 'Deficit Deadlift', primaryMuscle: 'back', secondaryMuscles: ['hamstrings', 'glutes', 'forearms'], equipment: ['barbell'], category: 'compound' },
  { id: 'ex_banded_face_pull_pause', name: 'Banded Face Pull (1s Pause)', primaryMuscle: 'back', secondaryMuscles: ['shoulders'], equipment: ['resistance_band'], category: 'isolation' },
  { id: 'ex_banded_face_pull_ext_rot', name: 'Banded Face Pull w/ Ext Rotation', primaryMuscle: 'back', secondaryMuscles: ['shoulders'], equipment: ['resistance_band'], category: 'isolation' },
  { id: 'ex_single_leg_banded_ham_curl', name: 'Standing Single-Leg Banded Hamstring Curl', primaryMuscle: 'hamstrings', secondaryMuscles: [], equipment: ['resistance_band'], category: 'isolation' },
  { id: 'ex_ffe_split_squat', name: 'Front Foot Elevated Split Squat', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['dumbbell', 'box'], category: 'compound' },
  { id: 'ex_wall_sit', name: 'Wall Sit', primaryMuscle: 'quads', secondaryMuscles: [], equipment: ['bodyweight'], category: 'isolation' },
  { id: 'ex_db_box_step_up', name: 'DB Box Step Up', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['dumbbell', 'box'], category: 'compound' },
  { id: 'ex_ab_walkout', name: 'Ab Walkout', primaryMuscle: 'core', secondaryMuscles: ['shoulders'], equipment: ['bodyweight'], category: 'isolation' },
  { id: 'ex_2up1down_hip_thrust', name: '2-Up, 1-Down Hip Thrust', primaryMuscle: 'glutes', secondaryMuscles: ['hamstrings'], equipment: ['bodyweight', 'bench'], category: 'isolation' },
  { id: 'ex_half_kneeling_pallof_press', name: 'Half-Kneeling Pallof Press', primaryMuscle: 'core', secondaryMuscles: ['shoulders'], equipment: ['resistance_band'], category: 'isolation' },
  { id: 'ex_supinated_lat_pulldown_band', name: 'Supinated Grip Lat Pulldown (Band)', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['resistance_band'], category: 'compound' },
  { id: 'ex_kb_rdl', name: 'KB Romanian Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes', 'back'], equipment: ['kettlebell'], category: 'compound' },
  { id: 'ex_db_skullcrusher_pause', name: 'DB Skullcrusher (1s Pause)', primaryMuscle: 'triceps', secondaryMuscles: [], equipment: ['dumbbell', 'bench'], category: 'isolation' },
  { id: 'ex_seated_incline_db_curl', name: 'Seated Incline DB Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'], equipment: ['dumbbell', 'bench'], category: 'isolation' },

  // Pulled in from the user's May 2026 training block
  { id: 'ex_tke_split_squat', name: 'Terminal Knee Extension Split Squat', primaryMuscle: 'quads', secondaryMuscles: [], equipment: ['resistance_band'], category: 'isolation' },
  { id: 'ex_zottman_curl', name: 'Zottman Curl (2s Negative)', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'], equipment: ['dumbbell'], category: 'isolation' },
  { id: 'ex_b_stance_db_rdl', name: 'B-Stance DB Romanian Deadlift', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes'], equipment: ['dumbbell'], category: 'compound' },
  { id: 'ex_kb_windmill', name: 'KB Windmill', primaryMuscle: 'core', secondaryMuscles: ['shoulders'], equipment: ['kettlebell'], category: 'mobility' },
  { id: 'ex_band_pull_apart_pause', name: 'Band Pull-Apart (1s Pause)', primaryMuscle: 'shoulders', secondaryMuscles: ['back'], equipment: ['resistance_band'], category: 'isolation' },
  { id: 'ex_good_morning_pause', name: 'Good Morning (1s Pause)', primaryMuscle: 'hamstrings', secondaryMuscles: ['back', 'glutes'], equipment: ['barbell'], category: 'compound' },
  { id: 'ex_half_kneeling_single_arm_lat_pulldown_band', name: 'Half-Kneeling Single-Arm Banded Lat Pulldown', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['resistance_band'], category: 'compound' },
  { id: 'ex_single_arm_banded_face_pull_ext_rot', name: 'Single-Arm Banded Face Pull w/ Ext Rotation', primaryMuscle: 'back', secondaryMuscles: ['shoulders'], equipment: ['resistance_band'], category: 'isolation' },
  { id: 'ex_single_arm_seated_banded_row', name: 'Single-Arm Seated Banded Row', primaryMuscle: 'back', secondaryMuscles: ['biceps'], equipment: ['resistance_band'], category: 'compound' },
];
