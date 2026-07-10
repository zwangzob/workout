import { ProgramDay } from '@/types';

// Fixed 4th/5th day slots offered by the Configuration sheet's training-frequency
// toggle. IDs are constant (not per-call generated) so re-toggling the frequency
// is idempotent and any logged history against these days stays comparable.
export const CORE_DAY: ProgramDay = {
  id: 'day_extra_core',
  label: 'Core Day',
  blocks: [
    {
      id: 'block_extra_core_1',
      type: 'single',
      restSeconds: 90,
      exercises: [{ id: 'pex_extra_ab_wheel', exerciseId: 'ex_ab_wheel', setGroups: [{ sets: 3, reps: '10' }] }],
    },
    {
      id: 'block_extra_core_2',
      type: 'superset',
      restSeconds: 75,
      exercises: [
        { id: 'pex_extra_hanging_leg_raise', exerciseId: 'ex_hanging_leg_raise', setGroups: [{ sets: 3, reps: '12' }] },
        { id: 'pex_extra_cable_crunch', exerciseId: 'ex_cable_crunch', setGroups: [{ sets: 3, reps: '15' }] },
      ],
    },
    {
      id: 'block_extra_core_3',
      type: 'giant_set',
      restSeconds: 60,
      exercises: [
        { id: 'pex_extra_plank', exerciseId: 'ex_plank', setGroups: [{ sets: 3, reps: '45sec' }] },
        { id: 'pex_extra_russian_twist', exerciseId: 'ex_russian_twist', setGroups: [{ sets: 3, reps: '20' }] },
        { id: 'pex_extra_mountain_climber', exerciseId: 'ex_mountain_climber', setGroups: [{ sets: 3, reps: '30sec' }] },
      ],
    },
    {
      id: 'block_extra_core_4',
      type: 'superset',
      restSeconds: 60,
      exercises: [
        { id: 'pex_extra_pallof', exerciseId: 'ex_half_kneeling_pallof_press', setGroups: [{ sets: 3, reps: '10/side' }] },
        { id: 'pex_extra_ab_walkout', exerciseId: 'ex_ab_walkout', setGroups: [{ sets: 3, reps: '8' }] },
      ],
    },
  ],
};

export const HIP_THRUST_DAY: ProgramDay = {
  id: 'day_extra_hip_thrust',
  label: 'Hip Thrust Day',
  blocks: [
    {
      id: 'block_extra_ht_1',
      type: 'single',
      restSeconds: 150,
      exercises: [{ id: 'pex_extra_hip_thrust', exerciseId: 'ex_hip_thrust', setGroups: [{ sets: 4, reps: '8' }] }],
    },
    {
      id: 'block_extra_ht_2',
      type: 'superset',
      restSeconds: 90,
      exercises: [
        { id: 'pex_extra_rdl', exerciseId: 'ex_romanian_deadlift', setGroups: [{ sets: 3, reps: '10' }] },
        { id: 'pex_extra_pull_through', exerciseId: 'ex_cable_pull_through', setGroups: [{ sets: 3, reps: '12' }] },
      ],
    },
    {
      id: 'block_extra_ht_3',
      type: 'giant_set',
      restSeconds: 60,
      exercises: [
        { id: 'pex_extra_walking_lunge', exerciseId: 'ex_walking_lunge', setGroups: [{ sets: 3, reps: '12/side' }] },
        { id: 'pex_extra_glute_bridge', exerciseId: 'ex_glute_bridge', setGroups: [{ sets: 3, reps: '15' }] },
        { id: 'pex_extra_kb_swing', exerciseId: 'ex_kettlebell_swing', setGroups: [{ sets: 3, reps: '15' }] },
      ],
    },
    {
      id: 'block_extra_ht_4',
      type: 'superset',
      restSeconds: 75,
      exercises: [
        { id: 'pex_extra_bulg_split_squat', exerciseId: 'ex_bulgarian_split_squat', setGroups: [{ sets: 3, reps: '10/side' }] },
        { id: 'pex_extra_ham_curl', exerciseId: 'ex_single_leg_banded_ham_curl', setGroups: [{ sets: 3, reps: '40sec' }] },
      ],
    },
  ],
};
