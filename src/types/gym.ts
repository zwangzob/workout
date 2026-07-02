import { Equipment } from '@/types/exercise';

export interface GymProfile {
  id: string;
  name: string;
  availableEquipment: Equipment[];
  isCustom?: boolean;
}
