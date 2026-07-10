import { LoggedSet, WorkoutSession } from '@/types';

let setCounter = 0;
let currentSessionDate = '2026-05-08';
function set(reps: number | null, weight: number | null, opts: { warmup?: boolean; done?: boolean } = {}): LoggedSet {
  setCounter += 1;
  const done = opts.done ?? true;
  return {
    id: `set_seed_${setCounter}`,
    setIndex: setCounter,
    isWarmup: opts.warmup ?? false,
    reps,
    weight,
    completedAt: done ? `${currentSessionDate}T12:00:00.000Z` : null,
  };
}

// Blank set for targets we didn't have a legible screenshot of (kept in the array
// so set counts match the program, just left unlogged rather than fabricated).
function blank(): LoggedSet {
  return set(null, null, { done: false });
}

function buildDay1(): WorkoutSession {
  currentSessionDate = '2026-05-08';
  return {
    id: 'sess_seed_day1',
    programId: 'prog_seed_3day',
    programDayId: 'day_seed_ohp',
    dayLabel: 'OHP Day',
    date: '2026-05-08',
    status: 'completed',
    startedAt: '2026-05-08T12:00:00.000Z',
    completedAt: '2026-05-08T13:15:00.000Z',
    blocks: [
      {
        id: 'sblock_seed_ohp_1',
        type: 'single',
        restSeconds: 180,
        exercises: [
          { id: 'sex_seed_ohp', exerciseId: 'ex_overhead_press', setGroups: [{ sets: 4, reps: '7', load: '75%' }], sets: [set(7, 45), blank(), blank(), blank()] },
        ],
      },
      {
        id: 'sblock_seed_ohp_2',
        type: 'superset',
        restSeconds: 90,
        exercises: [
          {
            id: 'sex_seed_deficit_dl',
            exerciseId: 'ex_deficit_deadlift',
            setGroups: [{ sets: 3, reps: '5', load: '80%' }],
            sets: [set(5, 85, { warmup: true }), set(5, 115), set(5, 115), set(5, 115)],
          },
          { id: 'sex_seed_face_pull_pause', exerciseId: 'ex_banded_face_pull_pause', setGroups: [{ sets: 3, reps: '15' }], sets: [set(15, null), set(15, null), set(15, null)] },
        ],
      },
      {
        id: 'sblock_seed_ohp_3',
        type: 'giant_set',
        restSeconds: 60,
        exercises: [
          { id: 'sex_seed_ham_curl', exerciseId: 'ex_single_leg_banded_ham_curl', setGroups: [{ sets: 2, reps: '40sec' }], sets: [set(null, null), set(null, null)] },
          { id: 'sex_seed_lat_raise', exerciseId: 'ex_lateral_raise', setGroups: [{ sets: 2, reps: '40sec' }], sets: [set(null, 10), set(null, 10)] },
          { id: 'sex_seed_oh_tricep', exerciseId: 'ex_overhead_tricep_ext', setGroups: [{ sets: 2, reps: 'AMRAP' }], sets: [set(20, null), set(20, null)] },
        ],
      },
      {
        id: 'sblock_seed_ohp_4',
        type: 'superset',
        restSeconds: 60,
        exercises: [
          { id: 'sex_seed_ffe_split_squat', exerciseId: 'ex_ffe_split_squat', setGroups: [{ sets: 2, reps: '10/side' }], sets: [set(10, 30), set(10, 30)] },
          { id: 'sex_seed_wall_sit', exerciseId: 'ex_wall_sit', setGroups: [{ sets: 2, reps: '10sec' }], sets: [set(null, null), blank()] },
        ],
      },
    ],
  };
}

function buildDay2(): WorkoutSession {
  currentSessionDate = '2026-05-09';
  return {
    id: 'sess_seed_day2',
    programId: 'prog_seed_3day',
    programDayId: 'day_seed_squat',
    dayLabel: 'Squat Day',
    date: '2026-05-09',
    status: 'completed',
    startedAt: '2026-05-09T12:00:00.000Z',
    completedAt: '2026-05-09T13:20:00.000Z',
    blocks: [
      {
        id: 'sblock_seed_squat_1',
        type: 'single',
        restSeconds: 180,
        exercises: [
          {
            id: 'sex_seed_squat',
            exerciseId: 'ex_back_squat',
            setGroups: [{ sets: 4, reps: '4', load: '85%' }],
            sets: [set(5, 45, { warmup: true }), set(4, 95), set(4, 105), set(4, 105), set(4, 105)],
          },
        ],
      },
      {
        id: 'sblock_seed_squat_2',
        type: 'superset',
        restSeconds: 120,
        exercises: [
          { id: 'sex_seed_bench', exerciseId: 'ex_barbell_bench_press', setGroups: [{ sets: 3, reps: '6', load: '82.5%' }], sets: [set(6, 65), set(6, 65), set(6, 65)] },
          { id: 'sex_seed_db_row', exerciseId: 'ex_dumbbell_row', setGroups: [{ sets: 3, reps: '10/side' }], sets: [set(10, 15), set(10, 15), set(10, 15)] },
        ],
      },
      {
        id: 'sblock_seed_squat_3',
        type: 'superset',
        restSeconds: 75,
        exercises: [
          { id: 'sex_seed_box_stepup', exerciseId: 'ex_db_box_step_up', setGroups: [{ sets: 3, reps: '10/side' }], sets: [set(5, 50), set(8, 50), set(8, 50)] },
          { id: 'sex_seed_ab_walkout', exerciseId: 'ex_ab_walkout', setGroups: [{ sets: 3, reps: '6' }], sets: [set(6, null), set(6, null), set(6, null)] },
        ],
      },
      {
        id: 'sblock_seed_squat_4',
        type: 'giant_set',
        restSeconds: 60,
        exercises: [
          { id: 'sex_seed_hammer_curl', exerciseId: 'ex_hammer_curl', setGroups: [{ sets: 3, reps: '15' }], sets: [set(15, 30), set(15, 30), set(15, 30)] },
          { id: 'sex_seed_hip_thrust', exerciseId: 'ex_2up1down_hip_thrust', setGroups: [{ sets: 3, reps: '12/side' }], sets: [set(12, null), set(10, null), set(10, null)] },
          { id: 'sex_seed_pallof', exerciseId: 'ex_half_kneeling_pallof_press', setGroups: [{ sets: 3, reps: '8/side' }], sets: [set(8, null), set(8, null), set(8, null)] },
        ],
      },
    ],
  };
}

function buildDay3(): WorkoutSession {
  currentSessionDate = '2026-05-10';
  return {
    id: 'sess_seed_day3',
    programId: 'prog_seed_3day',
    programDayId: 'day_seed_deadlift',
    dayLabel: 'Deadlift Day',
    date: '2026-05-10',
    status: 'completed',
    startedAt: '2026-05-10T12:00:00.000Z',
    completedAt: '2026-05-10T13:25:00.000Z',
    blocks: [
      {
        id: 'sblock_seed_dl_1',
        type: 'superset',
        restSeconds: 60,
        exercises: [
          { id: 'sex_seed_face_pull_extrot', exerciseId: 'ex_banded_face_pull_ext_rot', setGroups: [{ sets: 3, reps: '8' }], sets: [set(8, null), blank(), blank()] },
          { id: 'sex_seed_lat_pulldown', exerciseId: 'ex_supinated_lat_pulldown_band', setGroups: [{ sets: 3, reps: '12' }], sets: [set(12, null), set(12, null), set(12, null)] },
        ],
      },
      {
        id: 'sblock_seed_dl_2',
        type: 'single',
        restSeconds: 180,
        exercises: [
          {
            id: 'sex_seed_deadlift',
            exerciseId: 'ex_deadlift',
            setGroups: [{ sets: 5, reps: '3', load: '87.5%' }],
            sets: [
              set(5, 85, { warmup: true }),
              set(5, 105, { warmup: true }),
              set(3, 125),
              set(3, 125),
              set(3, 125),
              set(3, 125),
              set(3, 125),
            ],
          },
        ],
      },
      {
        id: 'sblock_seed_dl_3',
        type: 'superset',
        restSeconds: 90,
        exercises: [
          { id: 'sex_seed_db_bench', exerciseId: 'ex_dumbbell_bench_press', setGroups: [{ sets: 2, reps: '12' }], sets: [set(12, 30), set(12, 30)] },
          { id: 'sex_seed_kb_rdl', exerciseId: 'ex_kb_rdl', setGroups: [{ sets: 2, reps: '14' }], sets: [set(14, 35), set(14, 35)] },
        ],
      },
      {
        id: 'sblock_seed_dl_4',
        type: 'giant_set',
        restSeconds: 60,
        exercises: [
          { id: 'sex_seed_skullcrusher', exerciseId: 'ex_db_skullcrusher_pause', setGroups: [{ sets: 3, reps: '10' }], sets: [set(10, 10), set(10, 10), set(10, 10)] },
          { id: 'sex_seed_incline_curl', exerciseId: 'ex_seated_incline_db_curl', setGroups: [{ sets: 3, reps: '10/side' }], sets: [set(8, 30), blank(), blank()] },
          { id: 'sex_seed_bulg_split_squat', exerciseId: 'ex_bulgarian_split_squat', setGroups: [{ sets: 3, reps: '12/side' }], sets: [set(12, 30), set(12, 30), set(12, 30)] },
        ],
      },
    ],
  };
}

export const SEED_SESSIONS: WorkoutSession[] = [buildDay1(), buildDay2(), buildDay3()];
