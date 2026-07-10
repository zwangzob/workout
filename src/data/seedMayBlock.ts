import { Program } from '@/types';

// Reconstructed verbatim from the user's actual training log (May 4-18, two weeks).
// Fixed IDs so this can be safely upserted into the program store without
// duplicating on reload. Week 1 Day A's primary OHP block wasn't in the source
// notes; filled in using the matching scheme from Week 2 Day B (same accessory
// pattern), per the user's confirmation.
export const SEED_MAY_BLOCK: Program = {
  id: 'prog_may_block',
  name: 'May Strength Block',
  splitType: 'custom',
  createdAt: '2026-05-04T00:00:00.000Z',
  weeks: [
    {
      id: 'week_may1',
      weekNumber: 1,
      days: [
        {
          id: 'day_may1_ohp',
          label: 'OHP Day',
          blocks: [
            {
              id: 'block_may1_ohp_1',
              type: 'single',
              restSeconds: 180,
              exercises: [
                {
                  id: 'pex_may1_ohp',
                  exerciseId: 'ex_overhead_press',
                  setGroups: [
                    { sets: 2, reps: '8', load: '75%' },
                    { sets: 1, reps: '8+', load: '75%' },
                  ],
                },
              ],
            },
            {
              id: 'block_may1_ohp_2',
              type: 'superset',
              restSeconds: 90,
              exercises: [
                { id: 'pex_may1_deficit_dl', exerciseId: 'ex_deficit_deadlift', setGroups: [{ sets: 3, reps: '4', load: '80%' }] },
                { id: 'pex_may1_face_pull_pause', exerciseId: 'ex_banded_face_pull_pause', setGroups: [{ sets: 3, reps: '15' }] },
              ],
            },
            {
              id: 'block_may1_ohp_3',
              type: 'giant_set',
              restSeconds: 60,
              exercises: [
                { id: 'pex_may1_ham_curl', exerciseId: 'ex_single_leg_banded_ham_curl', setGroups: [{ sets: 2, reps: '40s' }] },
                { id: 'pex_may1_lat_raise', exerciseId: 'ex_lateral_raise', setGroups: [{ sets: 2, reps: '40s' }] },
                { id: 'pex_may1_oh_tricep', exerciseId: 'ex_overhead_tricep_ext', setGroups: [{ sets: 2, reps: 'AMRAP' }] },
              ],
            },
            {
              id: 'block_may1_ohp_4',
              type: 'superset',
              restSeconds: 75,
              exercises: [
                { id: 'pex_may1_ffe_split_squat', exerciseId: 'ex_ffe_split_squat', setGroups: [{ sets: 2, reps: '10/side' }] },
                { id: 'pex_may1_wall_sit', exerciseId: 'ex_wall_sit', setGroups: [{ sets: 1, reps: '30s' }] },
              ],
            },
          ],
        },
        {
          id: 'day_may1_squat',
          label: 'Squat Day',
          blocks: [
            {
              id: 'block_may1_squat_1',
              type: 'single',
              restSeconds: 180,
              exercises: [
                {
                  id: 'pex_may1_squat',
                  exerciseId: 'ex_back_squat',
                  setGroups: [
                    { sets: 3, reps: '4', load: '85%' },
                    { sets: 1, reps: '4+', load: '85%' },
                  ],
                },
              ],
            },
            {
              id: 'block_may1_squat_2',
              type: 'superset',
              restSeconds: 120,
              exercises: [
                {
                  id: 'pex_may1_bench',
                  exerciseId: 'ex_barbell_bench_press',
                  setGroups: [
                    { sets: 2, reps: '6', load: '82.5%' },
                    { sets: 1, reps: '6+', load: '82.5%' },
                  ],
                },
                { id: 'pex_may1_db_row', exerciseId: 'ex_dumbbell_row', setGroups: [{ sets: 3, reps: '10/side' }] },
              ],
            },
            {
              id: 'block_may1_squat_3',
              type: 'superset',
              restSeconds: 75,
              exercises: [
                { id: 'pex_may1_box_stepup', exerciseId: 'ex_db_box_step_up', setGroups: [{ sets: 3, reps: '10/side' }] },
                { id: 'pex_may1_ab_walkout', exerciseId: 'ex_ab_walkout', setGroups: [{ sets: 3, reps: '6' }] },
              ],
            },
            {
              id: 'block_may1_squat_4',
              type: 'giant_set',
              restSeconds: 60,
              exercises: [
                { id: 'pex_may1_hammer_curl', exerciseId: 'ex_hammer_curl', setGroups: [{ sets: 3, reps: '15' }] },
                { id: 'pex_may1_hip_thrust', exerciseId: 'ex_2up1down_hip_thrust', setGroups: [{ sets: 3, reps: '12/side' }] },
                { id: 'pex_may1_pallof', exerciseId: 'ex_half_kneeling_pallof_press', setGroups: [{ sets: 3, reps: '8/side' }] },
              ],
            },
          ],
        },
        {
          id: 'day_may1_deadlift',
          label: 'Deadlift Day',
          blocks: [
            {
              id: 'block_may1_dl_1',
              type: 'superset',
              restSeconds: 90,
              exercises: [
                { id: 'pex_may1_face_pull_extrot', exerciseId: 'ex_banded_face_pull_ext_rot', setGroups: [{ sets: 3, reps: '8' }] },
                { id: 'pex_may1_lat_pulldown', exerciseId: 'ex_supinated_lat_pulldown_band', setGroups: [{ sets: 3, reps: '12' }] },
              ],
            },
            {
              id: 'block_may1_dl_2',
              type: 'single',
              restSeconds: 180,
              exercises: [
                {
                  id: 'pex_may1_deadlift',
                  exerciseId: 'ex_deadlift',
                  setGroups: [
                    { sets: 4, reps: '3', load: '87.5%' },
                    { sets: 1, reps: '3+', load: '87.5%' },
                  ],
                },
              ],
            },
            {
              id: 'block_may1_dl_3',
              type: 'superset',
              restSeconds: 90,
              exercises: [
                { id: 'pex_may1_db_bench', exerciseId: 'ex_dumbbell_bench_press', setGroups: [{ sets: 2, reps: '12' }] },
                { id: 'pex_may1_kb_rdl', exerciseId: 'ex_kb_rdl', setGroups: [{ sets: 2, reps: '14' }] },
              ],
            },
            {
              id: 'block_may1_dl_4',
              type: 'giant_set',
              restSeconds: 60,
              exercises: [
                { id: 'pex_may1_skullcrusher', exerciseId: 'ex_db_skullcrusher_pause', setGroups: [{ sets: 3, reps: '10' }] },
                { id: 'pex_may1_incline_curl', exerciseId: 'ex_seated_incline_db_curl', setGroups: [{ sets: 3, reps: '10/side' }] },
                { id: 'pex_may1_bulg_split_squat', exerciseId: 'ex_bulgarian_split_squat', setGroups: [{ sets: 3, reps: '12/side' }] },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'week_may2',
      weekNumber: 2,
      days: [
        {
          id: 'day_may2_squat',
          label: 'Squat Day',
          blocks: [
            {
              id: 'block_may2_squat_1',
              type: 'single',
              restSeconds: 180,
              exercises: [
                {
                  id: 'pex_may2_squat',
                  exerciseId: 'ex_back_squat',
                  setGroups: [
                    { sets: 2, reps: '5', load: '85%' },
                    { sets: 1, reps: '5+', load: '85%' },
                  ],
                },
              ],
            },
            {
              id: 'block_may2_squat_2',
              type: 'superset',
              restSeconds: 120,
              exercises: [
                {
                  id: 'pex_may2_bench',
                  exerciseId: 'ex_barbell_bench_press',
                  setGroups: [
                    { sets: 2, reps: '4', load: '85%' },
                    { sets: 1, reps: '4+', load: '85%' },
                  ],
                },
                { id: 'pex_may2_db_row', exerciseId: 'ex_dumbbell_row', setGroups: [{ sets: 3, reps: '11/side' }] },
              ],
            },
            {
              id: 'block_may2_squat_3',
              type: 'superset',
              restSeconds: 75,
              exercises: [
                { id: 'pex_may2_box_stepup', exerciseId: 'ex_db_box_step_up', setGroups: [{ sets: 3, reps: '10/side' }] },
                { id: 'pex_may2_tke_split_squat', exerciseId: 'ex_tke_split_squat', setGroups: [{ sets: 3, reps: '12' }] },
              ],
            },
            {
              id: 'block_may2_squat_4',
              type: 'giant_set',
              restSeconds: 60,
              exercises: [
                { id: 'pex_may2_zottman_curl', exerciseId: 'ex_zottman_curl', setGroups: [{ sets: 2, reps: '18' }] },
                { id: 'pex_may2_b_stance_rdl', exerciseId: 'ex_b_stance_db_rdl', setGroups: [{ sets: 2, reps: '14/side' }] },
                { id: 'pex_may2_kb_windmill', exerciseId: 'ex_kb_windmill', setGroups: [{ sets: 2, reps: '10/side' }] },
              ],
            },
          ],
        },
        {
          id: 'day_may2_ohp',
          label: 'OHP Day',
          blocks: [
            {
              id: 'block_may2_ohp_1',
              type: 'single',
              restSeconds: 180,
              exercises: [
                {
                  id: 'pex_may2_ohp',
                  exerciseId: 'ex_overhead_press',
                  setGroups: [
                    { sets: 2, reps: '8', load: '75%' },
                    { sets: 1, reps: '8+', load: '75%' },
                  ],
                },
              ],
            },
            {
              id: 'block_may2_ohp_2',
              type: 'superset',
              restSeconds: 120,
              exercises: [
                { id: 'pex_may2_deadlift_vol', exerciseId: 'ex_deadlift', setGroups: [{ sets: 4, reps: '5', load: '80%' }] },
                { id: 'pex_may2_pull_apart', exerciseId: 'ex_band_pull_apart_pause', setGroups: [{ sets: 4, reps: '12' }] },
              ],
            },
            {
              id: 'block_may2_ohp_3',
              type: 'superset',
              restSeconds: 90,
              exercises: [
                { id: 'pex_may2_good_morning', exerciseId: 'ex_good_morning_pause', setGroups: [{ sets: 3, reps: '9' }] },
                { id: 'pex_may2_hk_lat_pulldown', exerciseId: 'ex_half_kneeling_single_arm_lat_pulldown_band', setGroups: [{ sets: 3, reps: '12/side' }] },
              ],
            },
            {
              id: 'block_may2_ohp_4',
              type: 'superset',
              restSeconds: 60,
              exercises: [
                { id: 'pex_may2_ham_curl', exerciseId: 'ex_single_leg_banded_ham_curl', setGroups: [{ sets: 2, reps: '45s/side' }] },
                { id: 'pex_may2_lat_raise', exerciseId: 'ex_lateral_raise', setGroups: [{ sets: 2, reps: '45s' }] },
              ],
            },
          ],
        },
        {
          id: 'day_may2_deadlift',
          label: 'Deadlift Day',
          blocks: [
            {
              id: 'block_may2_dl_1',
              type: 'superset',
              restSeconds: 90,
              exercises: [
                { id: 'pex_may2_sa_face_pull', exerciseId: 'ex_single_arm_banded_face_pull_ext_rot', setGroups: [{ sets: 3, reps: '8' }] },
                { id: 'pex_may2_sa_seated_row', exerciseId: 'ex_single_arm_seated_banded_row', setGroups: [{ sets: 3, reps: '12/side' }] },
              ],
            },
            {
              id: 'block_may2_dl_2',
              type: 'single',
              restSeconds: 180,
              exercises: [
                {
                  id: 'pex_may2_deadlift',
                  exerciseId: 'ex_deadlift',
                  setGroups: [
                    { sets: 4, reps: '2', load: '90%' },
                    { sets: 1, reps: '2+', load: '90%' },
                  ],
                },
              ],
            },
            {
              id: 'block_may2_dl_3',
              type: 'superset',
              restSeconds: 90,
              exercises: [
                { id: 'pex_may2_incline_bench', exerciseId: 'ex_incline_dumbbell_press', setGroups: [{ sets: 2, reps: '6' }] },
                { id: 'pex_may2_kb_rdl', exerciseId: 'ex_kb_rdl', setGroups: [{ sets: 2, reps: '15' }] },
              ],
            },
            {
              id: 'block_may2_dl_4',
              type: 'giant_set',
              restSeconds: 60,
              exercises: [
                { id: 'pex_may2_oh_tricep', exerciseId: 'ex_overhead_tricep_ext', setGroups: [{ sets: 3, reps: '12' }] },
                { id: 'pex_may2_db_curl', exerciseId: 'ex_dumbbell_curl', setGroups: [{ sets: 3, reps: '10/side' }] },
                { id: 'pex_may2_bulg_split_squat', exerciseId: 'ex_bulgarian_split_squat', setGroups: [{ sets: 3, reps: '14/side' }] },
              ],
            },
          ],
        },
      ],
    },
  ],
};
