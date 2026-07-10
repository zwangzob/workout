import { BlockType, SetGroup } from '@/types/program';

export interface LoggedSet {
  id: string;
  setIndex: number;
  isWarmup: boolean;
  weight: number | null;
  reps: number | null;
  rpe?: number | null;
  completedAt: string | null;
}

export interface SessionExercise {
  id: string;
  exerciseId: string;
  originalExerciseId?: string; // set when swapped from the program's default exercise
  setGroups: SetGroup[];
  sets: LoggedSet[];
}

export interface SessionBlock {
  id: string;
  type: BlockType;
  restSeconds: number;
  exercises: SessionExercise[];
}

export type SessionStatus = 'not_started' | 'in_progress' | 'completed';

export interface WorkoutSession {
  id: string;
  programId: string;
  programDayId: string;
  dayLabel: string;
  date: string; // ISO date string the session was performed/scheduled for
  status: SessionStatus;
  blocks: SessionBlock[];
  startedAt?: string;
  completedAt?: string;
}
