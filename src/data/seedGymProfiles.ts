import { GymProfile } from '@/types';

export const SEED_GYM_PROFILES: GymProfile[] = [
  {
    id: 'gym_commercial',
    name: 'Commercial Gym',
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
    ],
  },
  {
    id: 'gym_home',
    name: 'Home Gym',
    availableEquipment: ['dumbbell', 'kettlebell', 'bodyweight', 'bench', 'pull_up_bar', 'resistance_band'],
  },
  {
    id: 'gym_bodyweight',
    name: 'Bodyweight Only',
    availableEquipment: ['bodyweight', 'pull_up_bar'],
  },
];
