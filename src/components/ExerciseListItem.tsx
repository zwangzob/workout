import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExerciseThumbnail } from '@/components/ExerciseThumbnail';
import { colors, spacing, typography } from '@/theme/theme';
import { EQUIPMENT_LABELS, Exercise, MUSCLE_GROUP_LABELS } from '@/types';

export function ExerciseListItem({ exercise, onPress }: { exercise: Exercise; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <ExerciseThumbnail muscle={exercise.primaryMuscle} size={48} />
      <View style={styles.text}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.meta}>
          {MUSCLE_GROUP_LABELS[exercise.primaryMuscle]} · {exercise.equipment.map((e) => EQUIPMENT_LABELS[e]).join(', ')}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  text: {
    flex: 1,
  },
  name: {
    ...typography.body,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  meta: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
  },
});
