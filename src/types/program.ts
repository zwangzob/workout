export type SplitType = 'full_body' | 'upper_lower' | 'push_pull_legs' | 'bro_split' | 'custom';

export type BlockType = 'single' | 'superset' | 'giant_set';

/** One rep/load scheme within an exercise, e.g. "3x4 @85%". Most exercises have a
 * single group; percentage-based lifts with an AMRAP backoff set (e.g. "3x4@85%,
 * then 1x4+@85%") use two groups in sequence. */
export interface SetGroup {
  sets: number;
  reps: string; // e.g. "8-10", "5", "4+" (AMRAP), "40s", "AMRAP"
  load?: string; // free text, e.g. "RPE 8", "70%", "85%"
}

export interface ProgramExercise {
  id: string;
  exerciseId: string;
  setGroups: SetGroup[];
}

/** Renders an exercise's set groups as a compact line, e.g. "3x4 @85%, 1x4+ @85%". */
export function formatSetGroups(setGroups: SetGroup[]): string {
  return setGroups.map((g) => `${g.sets}x${g.reps}${g.load ? ` @${g.load}` : ''}`).join(', ');
}

/** Total logged sets an exercise's set groups expand to (sum across all groups). */
export function totalSets(setGroups: SetGroup[]): number {
  return setGroups.reduce((sum, g) => sum + g.sets, 0);
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

/** Badge label for an exercise's row: plain block number for a single ("2"), or the
 * block's number with a letter suffix for grouped blocks ("2A", "2B", "2C", ...).
 * Takes just `{ type }` so it works for both ProgramBlock and SessionBlock. */
export function blockExerciseBadge(blockNumber: number, block: { type: BlockType }, index: number): string {
  if (block.type === 'single') return String(blockNumber);
  return `${blockNumber}${String.fromCharCode('A'.charCodeAt(0) + index)}`;
}
