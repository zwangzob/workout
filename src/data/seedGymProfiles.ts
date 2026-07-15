import { GymProfile } from '@/types';

export const SEED_GYM_PROFILES: GymProfile[] = [
  {
    id: 'gym_commercial',
    name: 'Gym',
    availableEquipment: [
      'barbell',
      'ez_bar',
      'dumbbell',
      'kettlebell',
      'cable',
      'machine',
      'smith_machine',
      'bodyweight',
      'bench',
      'pull_up_bar',
      'bike',
      'rower',
      'box',
      'plate',
    ],
  },
  {
    id: 'gym_home',
    name: 'Home',
    availableEquipment: ['dumbbell', 'kettlebell', 'bodyweight', 'bench', 'pull_up_bar', 'resistance_band'],
  },
  {
    id: 'gym_bodyweight',
    name: 'Bodyweight',
    availableEquipment: ['bodyweight', 'pull_up_bar'],
  },
];
