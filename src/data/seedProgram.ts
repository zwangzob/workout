import { Program } from '@/types';

// Reconstructed from the user's actual training log (May 8-10). Fixed IDs so this
// can be safely upserted into the program store without duplicating on reload.
export const SEED_PROGRAM: Program = {
  id: 'prog_seed_3day',
  name: 'My 3-Day Program',
  splitType: 'custom',
  createdAt: '2026-05-08T00:00:00.000Z',
  weeks: [
    {
      id: 'week_seed_1',
      weekNumber: 1,
      days: [
        {
          id: 'day_seed_ohp',
          label: 'OHP Day',
          blocks: [
            {
              id: 'block_seed_ohp_1',
              type: 'single',
              restSeconds: 180,
              exercises: [
                { id: 'pex_seed_ohp', exerciseId: 'ex_overhead_press', targetSets: 4, targetReps: '7', targetLoad: '75%' },
              ],
            },
            {
              id: 'block_seed_ohp_2',
              type: 'superset',
              restSeconds: 90,
              exercises: [
                { id: 'pex_seed_deficit_dl', exerciseId: 'ex_deficit_deadlift', targetSets: 3, targetReps: '5', targetLoad: '80%' },
                { id: 'pex_seed_face_pull_pause', exerciseId: 'ex_banded_face_pull_pause', targetSets: 3, targetReps: '15' },
              ],
            },
            {
              id: 'block_seed_ohp_3',
              type: 'giant_set',
              restSeconds: 60,
              exercises: [
                { id: 'pex_seed_ham_curl', exerciseId: 'ex_single_leg_banded_ham_curl', targetSets: 2, targetReps: '40sec' },
                { id: 'pex_seed_lat_raise', exerciseId: 'ex_lateral_raise', targetSets: 2, targetReps: '40sec' },
                { id: 'pex_seed_oh_tricep', exerciseId: 'ex_overhead_tricep_ext', targetSets: 2, targetReps: 'AMRAP' },
              ],
            },
            {
              id: 'block_seed_ohp_4',
              type: 'superset',
              restSeconds: 60,
              exercises: [
                { id: 'pex_seed_ffe_split_squat', exerciseId: 'ex_ffe_split_squat', targetSets: 2, targetReps: '10/side' },
                { id: 'pex_seed_wall_sit', exerciseId: 'ex_wall_sit', targetSets: 2, targetReps: '10sec' },
              ],
            },
          ],
        },
        {
          id: 'day_seed_squat',
          label: 'Squat Day',
          blocks: [
            {
              id: 'block_seed_squat_1',
              type: 'single',
              restSeconds: 180,
              exercises: [
                { id: 'pex_seed_squat', exerciseId: 'ex_back_squat', targetSets: 4, targetReps: '4', targetLoad: '85%' },
              ],
            },
            {
              id: 'block_seed_squat_2',
              type: 'superset',
              restSeconds: 120,
              exercises: [
                { id: 'pex_seed_bench', exerciseId: 'ex_barbell_bench_press', targetSets: 3, targetReps: '6', targetLoad: '82.5%' },
                { id: 'pex_seed_db_row', exerciseId: 'ex_dumbbell_row', targetSets: 3, targetReps: '10/side' },
              ],
            },
            {
              id: 'block_seed_squat_3',
              type: 'superset',
              restSeconds: 75,
              exercises: [
                { id: 'pex_seed_box_stepup', exerciseId: 'ex_db_box_step_up', targetSets: 3, targetReps: '10/side' },
                { id: 'pex_seed_ab_walkout', exerciseId: 'ex_ab_walkout', targetSets: 3, targetReps: '6' },
              ],
            },
            {
              id: 'block_seed_squat_4',
              type: 'giant_set',
              restSeconds: 60,
              exercises: [
                { id: 'pex_seed_hammer_curl', exerciseId: 'ex_hammer_curl', targetSets: 3, targetReps: '15' },
                { id: 'pex_seed_hip_thrust', exerciseId: 'ex_2up1down_hip_thrust', targetSets: 3, targetReps: '12/side' },
                { id: 'pex_seed_pallof', exerciseId: 'ex_half_kneeling_pallof_press', targetSets: 3, targetReps: '8/side' },
              ],
            },
          ],
        },
        {
          id: 'day_seed_deadlift',
          label: 'Deadlift Day',
          blocks: [
            {
              id: 'block_seed_dl_1',
              type: 'superset',
              restSeconds: 60,
              exercises: [
                { id: 'pex_seed_face_pull_extrot', exerciseId: 'ex_banded_face_pull_ext_rot', targetSets: 3, targetReps: '8' },
                { id: 'pex_seed_lat_pulldown', exerciseId: 'ex_supinated_lat_pulldown_band', targetSets: 3, targetReps: '12' },
              ],
            },
            {
              id: 'block_seed_dl_2',
              type: 'single',
              restSeconds: 180,
              exercises: [
                { id: 'pex_seed_deadlift', exerciseId: 'ex_deadlift', targetSets: 5, targetReps: '3', targetLoad: '87.5%' },
              ],
            },
            {
              id: 'block_seed_dl_3',
              type: 'superset',
              restSeconds: 90,
              exercises: [
                { id: 'pex_seed_db_bench', exerciseId: 'ex_dumbbell_bench_press', targetSets: 2, targetReps: '12' },
                { id: 'pex_seed_kb_rdl', exerciseId: 'ex_kb_rdl', targetSets: 2, targetReps: '14' },
              ],
            },
            {
              id: 'block_seed_dl_4',
              type: 'giant_set',
              restSeconds: 60,
              exercises: [
                { id: 'pex_seed_skullcrusher', exerciseId: 'ex_db_skullcrusher_pause', targetSets: 3, targetReps: '10' },
                { id: 'pex_seed_incline_curl', exerciseId: 'ex_seated_incline_db_curl', targetSets: 3, targetReps: '10/side' },
                { id: 'pex_seed_bulg_split_squat', exerciseId: 'ex_bulgarian_split_squat', targetSets: 3, targetReps: '12/side' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
