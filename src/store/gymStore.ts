import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GymProfile } from '@/types';
import { SEED_GYM_PROFILES } from '@/data/seedGymProfiles';
import { generateId } from '@/lib/id';

interface GymStore {
  profiles: GymProfile[];
  activeProfileId: string;
  addProfile: (profile: Omit<GymProfile, 'id' | 'isCustom'>) => GymProfile;
  updateProfile: (id: string, patch: Partial<Omit<GymProfile, 'id'>>) => void;
  removeProfile: (id: string) => void;
  setActiveProfile: (id: string) => void;
  getActiveProfile: () => GymProfile | undefined;
}

export const useGymStore = create<GymStore>()(
  persist(
    (set, get) => ({
      profiles: SEED_GYM_PROFILES,
      activeProfileId: SEED_GYM_PROFILES[0].id,

      addProfile: (profile) => {
        const newProfile: GymProfile = { ...profile, id: generateId('gym'), isCustom: true };
        set((state) => ({ profiles: [...state.profiles, newProfile] }));
        return newProfile;
      },

      updateProfile: (id, patch) => {
        set((state) => ({
          profiles: state.profiles.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        }));
      },

      removeProfile: (id) => {
        set((state) => {
          const profiles = state.profiles.filter((p) => p.id !== id);
          const activeProfileId =
            state.activeProfileId === id ? (profiles[0]?.id ?? '') : state.activeProfileId;
          return { profiles, activeProfileId };
        });
      },

      setActiveProfile: (id) => set({ activeProfileId: id }),

      getActiveProfile: () => get().profiles.find((p) => p.id === get().activeProfileId),
    }),
    {
      name: 'forge/gym-profiles',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
