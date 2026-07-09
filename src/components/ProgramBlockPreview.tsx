import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { useExerciseStore } from '@/store/exerciseStore';
import { BLOCK_TYPE_LABELS, ProgramBlock, blockExerciseBadge } from '@/types';

function formatRest(seconds: number): string {
  const min = seconds / 60;
  if (min < 1) return `${seconds}s`;
  if (Number.isInteger(min)) return `${min} min`;
  return `${min.toFixed(1)} min`;
}

export function ProgramBlockPreview({ block, blockNumber }: { block: ProgramBlock; blockNumber: number }) {
  const getExercise = useExerciseStore((s) => s.getExercise);
  const isGroup = block.exercises.length > 1;

  return (
    <Card style={styles.card} elevated>
      {isGroup ? <Text style={styles.groupLabel}>{BLOCK_TYPE_LABELS[block.type].toUpperCase()}</Text> : null}
      {block.exercises.map((ex, idx) => {
        const info = getExercise(ex.exerciseId);
        if (!info) return null;
        const badge = blockExerciseBadge(blockNumber, block, idx);
        const showConnector = isGroup && idx < block.exercises.length - 1;
        return (
          <View key={ex.id} style={styles.row}>
            <View style={styles.badgeColumn}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
              {showConnector ? <View style={styles.connector} /> : null}
            </View>
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
        <Ionicons name="watch-outline" size={14} color={colors.textTertiary} />
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
  badgeColumn: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  badge: {
    minWidth: 32,
    height: 32,
    paddingHorizontal: spacing.xs,
    borderRadius: radii.full,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textInverse,
  },
  connector: {
    flex: 1,
    width: 2,
    backgroundColor: colors.accentMuted,
    marginTop: 2,
  },
  name: {
    ...typography.body,
    color: colors.textPrimary,
    textDecorationLine: 'underline',
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
