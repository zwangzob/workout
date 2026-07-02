export type SplitType = 'full_body' | 'upper_lower' | 'push_pull_legs' | 'bro_split' | 'custom';

export type BlockType = 'single' | 'superset' | 'giant_set';

export interface ProgramExercise {
  id: string;
  exerciseId: string;
  targetSets: number;
  targetReps: string; // e.g. "8-10" or "5"
  targetLoad?: string; // free text, e.g. "RPE 8" or "70% 1RM"
}

/** A block is one lettered group on the day screen: a single lift, or a superset/giant set of 2+ lifts sharing one rest window. */
export interface ProgramBlock {
  id: string;
  type: BlockType;
  restSeconds: number;
  exercises: ProgramExercise[];
}

export interface ProgramDay {
  id: string;
  label: string; // e.g. "Push", "Pull", "Legs", "Rest"
  isRestDay?: boolean;
  blocks: ProgramBlock[];
}

export interface ProgramWeek {
  id: string;
  weekNumber: number;
  days: ProgramDay[];
}

export interface Program {
  id: string;
  name: string;
  splitType: SplitType;
  weeks: ProgramWeek[];
  createdAt: string;
}

export const SPLIT_TYPE_LABELS: Record<SplitType, string> = {
  full_body: 'Full Body',
  upper_lower: 'Upper / Lower',
  push_pull_legs: 'Push / Pull / Legs',
  bro_split: 'Body Part Split',
  custom: 'Custom',
};

export const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  single: 'Exercise',
  superset: 'Superset',
  giant_set: 'Giant Set',
};

/** Returns the letter for an exercise's position within a block (A, B, C, ...). Blocks of type 'single' have no letter. */
export function blockExerciseLetter(block: ProgramBlock, index: number): string | null {
  if (block.type === 'single') return null;
  return String.fromCharCode('A'.charCodeAt(0) + index);
}
