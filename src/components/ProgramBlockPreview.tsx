import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { ExerciseThumbnail } from '@/components/ExerciseThumbnail';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { useExerciseStore } from '@/store/exerciseStore';
import { BLOCK_TYPE_LABELS, ProgramBlock, blockExerciseLetter } from '@/types';

function formatRest(seconds: number): string {
  const min = seconds / 60;
  if (min < 1) return `${seconds}s`;
  if (Number.isInteger(min)) return `${min} min`;
  return `${min.toFixed(1)} min`;
}

export function ProgramBlockPreview({ block }: { block: ProgramBlock }) {
  const getExercise = useExerciseStore((s) => s.getExercise);
  const isGroup = block.exercises.length > 1;

  return (
    <Card style={styles.card} elevated>
      {isGroup ? <Text style={styles.groupLabel}>{BLOCK_TYPE_LABELS[block.type].toUpperCase()}</Text> : null}
      {block.exercises.map((ex, idx) => {
        const info = getExercise(ex.exerciseId);
        if (!info) return null;
        const letter = blockExerciseLetter(block, idx);
        return (
          <View key={ex.id} style={styles.row}>
            {letter ? (
              <View style={styles.letterBadge}>
                <Text style={styles.letterBadgeText}>{letter}</Text>
              </View>
            ) : (
              <ExerciseThumbnail muscle={info.primaryMuscle} size={36} />
            )}
            <Text style={styles.name} numberOfLines={1}>
              {info.name}
            </Text>
            <Text style={styles.target}>
              {ex.targetSets}x{ex.targetReps}
            </Text>
          </View>
        );
      })}
      <View style={styles.restRow}>
        <Ionicons name="time-outline" size={14} color={colors.textTertiary} />
        <Text style={styles.restText}>Rest: {formatRest(block.restSeconds)}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  groupLabel: {
    ...typography.micro,
    color: colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  letterBadge: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterBadgeText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textInverse,
  },
  name: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  target: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  restRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderSubtle,
    paddingTop: spacing.xs,
  },
  restText: {
    ...typography.caption,
    color: colors.textTertiary,
  },
});
