import { Equipment, Exercise, GymProfile } from '@/types';

export interface SubstituteCandidate {
  exercise: Exercise;
  score: number;
  reason: string;
}

function isAvailable(exercise: Exercise, availableEquipment: Equipment[]): boolean {
  return exercise.equipment.every((eq) => availableEquipment.includes(eq));
}

function overlapCount<T>(a: T[], b: T[]): number {
  return a.filter((item) => b.includes(item)).length;
}

/**
 * Finds exercises that can stand in for `exercise` given what equipment is available.
 * Ranked by: same primary muscle beats secondary-only overlap, then by how much
 * secondary-muscle coverage is preserved. This is the seam meant to evolve as the
 * program-generation rules get refined.
 */
export function findSubstitutes(
  exercise: Exercise,
  library: Exercise[],
  gymProfile: GymProfile,
  options: { limit?: number } = {},
): SubstituteCandidate[] {
  const { limit = 8 } = options;
  const candidates: SubstituteCandidate[] = [];

  for (const candidate of library) {
    if (candidate.id === exercise.id) continue;
    if (!isAvailable(candidate, gymProfile.availableEquipment)) continue;

    const samePrimary = candidate.primaryMuscle === exercise.primaryMuscle;
    const secondaryOverlap = overlapCount(candidate.secondaryMuscles, [
      exercise.primaryMuscle,
      ...exercise.secondaryMuscles,
    ]);

    if (!samePrimary && secondaryOverlap === 0) continue;

    let score = 0;
    let reason = '';
    if (samePrimary) {
      score += 100;
      score += secondaryOverlap * 5;
      score += candidate.category === exercise.category ? 10 : 0;
      reason = `Also targets ${candidate.primaryMuscle.replace('_', ' ')}`;
    } else {
      score += secondaryOverlap * 15;
      reason = `Overlaps on ${exercise.primaryMuscle.replace('_', ' ')}`;
    }

    candidates.push({ exercise: candidate, score, reason });
  }

  return candidates.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function isExerciseAvailable(exercise: Exercise, gymProfile: GymProfile): boolean {
  return isAvailable(exercise, gymProfile.availableEquipment);
}
