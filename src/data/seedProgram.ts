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
                { id: 'pex_seed_ohp', exerciseId: 'ex_overhead_press', setGroups: [{ sets: 4, reps: '7', load: '75%' }] },
              ],
            },
            {
              id: 'block_seed_ohp_2',
              type: 'superset',
              restSeconds: 90,
              exercises: [
                { id: 'pex_seed_deficit_dl', exerciseId: 'ex_deficit_deadlift', setGroups: [{ sets: 3, reps: '5', load: '80%' }] },
                { id: 'pex_seed_face_pull_pause', exerciseId: 'ex_banded_face_pull_pause', setGroups: [{ sets: 3, reps: '15' }] },
              ],
            },
            {
              id: 'block_seed_ohp_3',
              type: 'giant_set',
              restSeconds: 60,
              exercises: [
                { id: 'pex_seed_ham_curl', exerciseId: 'ex_single_leg_banded_ham_curl', setGroups: [{ sets: 2, reps: '40sec' }] },
                { id: 'pex_seed_lat_raise', exerciseId: 'ex_lateral_raise', setGroups: [{ sets: 2, reps: '40sec' }] },
                { id: 'pex_seed_oh_tricep', exerciseId: 'ex_overhead_tricep_ext', setGroups: [{ sets: 2, reps: 'AMRAP' }] },
              ],
            },
            {
              id: 'block_seed_ohp_4',
              type: 'superset',
              restSeconds: 60,
              exercises: [
                { id: 'pex_seed_ffe_split_squat', exerciseId: 'ex_ffe_split_squat', setGroups: [{ sets: 2, reps: '10/side' }] },
                { id: 'pex_seed_wall_sit', exerciseId: 'ex_wall_sit', setGroups: [{ sets: 2, reps: '10sec' }] },
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
                { id: 'pex_seed_squat', exerciseId: 'ex_back_squat', setGroups: [{ sets: 4, reps: '4', load: '85%' }] },
              ],
            },
            {
              id: 'block_seed_squat_2',
              type: 'superset',
              restSeconds: 120,
              exercises: [
                { id: 'pex_seed_bench', exerciseId: 'ex_barbell_bench_press', setGroups: [{ sets: 3, reps: '6', load: '82.5%' }] },
                { id: 'pex_seed_db_row', exerciseId: 'ex_dumbbell_row', setGroups: [{ sets: 3, reps: '10/side' }] },
              ],
            },
            {
              id: 'block_seed_squat_3',
              type: 'superset',
              restSeconds: 75,
              exercises: [
                { id: 'pex_seed_box_stepup', exerciseId: 'ex_db_box_step_up', setGroups: [{ sets: 3, reps: '10/side' }] },
                { id: 'pex_seed_ab_walkout', exerciseId: 'ex_ab_walkout', setGroups: [{ sets: 3, reps: '6' }] },
              ],
            },
            {
              id: 'block_seed_squat_4',
              type: 'giant_set',
              restSeconds: 60,
              exercises: [
                { id: 'pex_seed_hammer_curl', exerciseId: 'ex_hammer_curl', setGroups: [{ sets: 3, reps: '15' }] },
                { id: 'pex_seed_hip_thrust', exerciseId: 'ex_2up1down_hip_thrust', setGroups: [{ sets: 3, reps: '12/side' }] },
                { id: 'pex_seed_pallof', exerciseId: 'ex_half_kneeling_pallof_press', setGroups: [{ sets: 3, reps: '8/side' }] },
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
                { id: 'pex_seed_face_pull_extrot', exerciseId: 'ex_banded_face_pull_ext_rot', setGroups: [{ sets: 3, reps: '8' }] },
                { id: 'pex_seed_lat_pulldown', exerciseId: 'ex_supinated_lat_pulldown_band', setGroups: [{ sets: 3, reps: '12' }] },
              ],
            },
            {
              id: 'block_seed_dl_2',
              type: 'single',
              restSeconds: 180,
              exercises: [
                { id: 'pex_seed_deadlift', exerciseId: 'ex_deadlift', setGroups: [{ sets: 5, reps: '3', load: '87.5%' }] },
              ],
            },
            {
              id: 'block_seed_dl_3',
              type: 'superset',
              restSeconds: 90,
              exercises: [
                { id: 'pex_seed_db_bench', exerciseId: 'ex_dumbbell_bench_press', setGroups: [{ sets: 2, reps: '12' }] },
                { id: 'pex_seed_kb_rdl', exerciseId: 'ex_kb_rdl', setGroups: [{ sets: 2, reps: '14' }] },
              ],
            },
            {
              id: 'block_seed_dl_4',
              type: 'giant_set',
              restSeconds: 60,
              exercises: [
                { id: 'pex_seed_skullcrusher', exerciseId: 'ex_db_skullcrusher_pause', setGroups: [{ sets: 3, reps: '10' }] },
                { id: 'pex_seed_incline_curl', exerciseId: 'ex_seated_incline_db_curl', setGroups: [{ sets: 3, reps: '10/side' }] },
                { id: 'pex_seed_bulg_split_squat', exerciseId: 'ex_bulgarian_split_squat', setGroups: [{ sets: 3, reps: '12/side' }] },
              ],
            },
          ],
        },
      ],
    },
  ],
};
