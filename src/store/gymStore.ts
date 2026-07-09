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
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<GymStore>;
        if (!persisted.profiles) return { ...currentState, ...persisted } as GymStore;
        // One-time rename migration: only touch profiles that still have their old
        // default label, so a user's own rename is never overwritten.
        const OLD_NAMES: Record<string, string> = {
          gym_commercial: 'Commercial Gym',
          gym_home: 'Home Gym',
          gym_bodyweight: 'Bodyweight Only',
        };
        const seedById = new Map(SEED_GYM_PROFILES.map((p) => [p.id, p]));
        const profiles = persisted.profiles.map((p) => {
          const seed = seedById.get(p.id);
          if (seed && p.name === OLD_NAMES[p.id]) {
            return { ...p, name: seed.name };
          }
          return p;
        });
        return { ...currentState, ...persisted, profiles } as GymStore;
      },
    },
  ),
);
