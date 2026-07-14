import { generateId } from '@/lib/id';
import { isExerciseAvailable } from '@/lib/substitutions';
import { Exercise, GymProfile, MuscleGroup, Program, ProgramBlock, ProgramDay, ProgramWeek, SplitType } from '@/types';

const DAY_ARCHETYPES: Record<string, MuscleGroup[]> = {
  Push: ['chest', 'shoulders', 'triceps'],
  Pull: ['back', 'biceps'],
  Legs: ['quads', 'hamstrings', 'glutes', 'calves'],
  Upper: ['chest', 'back', 'shoulders', 'biceps', 'triceps'],
  Lower: ['quads', 'hamstrings', 'glutes', 'calves'],
  'Full Body': ['quads', 'chest', 'back', 'shoulders', 'abs'],
  Chest: ['chest', 'triceps'],
  Back: ['back', 'biceps'],
  Shoulders: ['shoulders'],
  Arms: ['biceps', 'triceps'],
};

const SPLIT_ROTATIONS: Record<SplitType, string[]> = {
  push_pull_legs: ['Push', 'Pull', 'Legs'],
  upper_lower: ['Upper', 'Lower'],
  full_body: ['Full Body'],
  bro_split: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'],
  custom: ['Full Body'],
};

/** This heuristic bootstraps a day's exercise picks so there's something to train immediately.
 * It's intentionally simple — the user plans to iterate on how workouts get generated. */
export function generateProgramDay(
  dayLabel: string,
  library: Exercise[],
  gymProfile: GymProfile,
): ProgramDay {
  const targetMuscles = DAY_ARCHETYPES[dayLabel] ?? ['full_body'];
  const blocks: ProgramBlock[] = [];
  const usedExerciseIds = new Set<string>();

  targetMuscles.forEach((muscle, muscleIndex) => {
    const candidates = library
      .filter((ex) => ex.primaryMuscle === muscle)
      .filter((ex) => isExerciseAvailable(ex, gymProfile))
      .filter((ex) => !usedExerciseIds.has(ex.id))
      .sort((a, b) => (a.category === 'compound' ? -1 : 1) - (b.category === 'compound' ? -1 : 1));

    const picksForMuscle = muscleIndex < 2 ? 2 : 1; // emphasize the first couple of muscle targets
    const picks = candidates.slice(0, picksForMuscle);

    for (const exercise of picks) {
      usedExerciseIds.add(exercise.id);
      const isCompound = exercise.category === 'compound';
      blocks.push({
        id: generateId('block'),
        type: 'single',
        restSeconds: isCompound ? 120 : 75,
        exercises: [
          {
            id: generateId('pex'),
            exerciseId: exercise.id,
            setGroups: [{ sets: isCompound ? 4 : 3, reps: isCompound ? '6-8' : '10-12' }],
          },
        ],
      });
    }
  });

  return {
    id: generateId('day'),
    label: dayLabel,
    blocks,
  };
}

export function generateProgram(options: {
  name: string;
  splitType: SplitType;
  daysPerWeek: number;
  weekCount: number;
  library: Exercise[];
  gymProfile: GymProfile;
}): Program {
  const { name, splitType, daysPerWeek, weekCount, library, gymProfile } = options;
  const rotation = SPLIT_ROTATIONS[splitType];

  const weeks: ProgramWeek[] = Array.from({ length: weekCount }, (_, weekIdx) => {
    const days: ProgramDay[] = Array.from({ length: daysPerWeek }, (_, dayIdx) => {
      const label = rotation[dayIdx % rotation.length];
      return generateProgramDay(label, library, gymProfile);
    });
    return { id: generateId('week'), weekNumber: weekIdx + 1, days };
  });

  return {
    id: generateId('prog'),
    name,
    splitType,
    weeks,
    createdAt: new Date().toISOString(),
  };
}
