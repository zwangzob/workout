import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '@/theme/theme';
import { MuscleGroup } from '@/types';

const MUSCLE_ICON: Record<MuscleGroup, keyof typeof Ionicons.glyphMap> = {
  chest: 'body',
  back: 'body',
  shoulders: 'body',
  biceps: 'body',
  triceps: 'body',
  quads: 'walk',
  hamstrings: 'walk',
  glutes: 'walk',
  calves: 'walk',
  abs: 'ellipse',
  forearms: 'hand-left',
  full_body: 'fitness',
  cardio: 'heart',
  abductor: 'walk',
  adductor: 'walk',
};

type ExerciseThumbnailProps = {
  muscle: MuscleGroup;
  size?: number;
};

export function ExerciseThumbnail({ muscle, size = 56 }: ExerciseThumbnailProps) {
  return (
    <View style={[styles.base, { width: size, height: size, borderRadius: radii.md }]}>
      <Ionicons name={MUSCLE_ICON[muscle] ?? 'fitness'} size={size * 0.45} color={colors.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
