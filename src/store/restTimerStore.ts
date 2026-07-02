import { create } from 'zustand';

interface RestTimerStore {
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  exerciseLabel: string | null;

  start: (seconds: number, exerciseLabel?: string) => void;
  pause: () => void;
  resume: () => void;
  addSeconds: (delta: number) => void;
  tick: () => void;
  dismiss: () => void;
}

export const useRestTimerStore = create<RestTimerStore>()((set, get) => ({
  totalSeconds: 0,
  remainingSeconds: 0,
  isRunning: false,
  exerciseLabel: null,

  start: (seconds, exerciseLabel) =>
    set({ totalSeconds: seconds, remainingSeconds: seconds, isRunning: true, exerciseLabel: exerciseLabel ?? null }),

  pause: () => set({ isRunning: false }),
  resume: () => set({ isRunning: get().remainingSeconds > 0 }),

  addSeconds: (delta) =>
    set((state) => ({ remainingSeconds: Math.max(0, state.remainingSeconds + delta), totalSeconds: Math.max(state.totalSeconds, state.remainingSeconds + delta) })),

  tick: () =>
    set((state) => {
      if (!state.isRunning) return state;
      const next = state.remainingSeconds - 1;
      if (next <= 0) return { remainingSeconds: 0, isRunning: false };
      return { remainingSeconds: next };
    }),

  dismiss: () => set({ totalSeconds: 0, remainingSeconds: 0, isRunning: false, exerciseLabel: null }),
}));
