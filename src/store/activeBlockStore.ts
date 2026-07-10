import { create } from 'zustand';

interface ActiveBlockStore {
  activeBlockId: string | null;
  setActiveBlockId: (id: string) => void;
}

export const useActiveBlockStore = create<ActiveBlockStore>((set) => ({
  activeBlockId: null,
  setActiveBlockId: (id) => set({ activeBlockId: id }),
}));
