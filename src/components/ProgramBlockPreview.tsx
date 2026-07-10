import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { useExerciseStore } from '@/store/exerciseStore';
import { ProgramBlock, blockExerciseBadge, formatSetGroups } from '@/types';

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
            <Text style={styles.name}>{info.name}</Text>
            <Text style={styles.target}>{formatSetGroups(ex.setGroups)}</Text>
          </View>
        );
      })}
      <View style={styles.restRow}>
        <Ionicons name="watch-outline" size={18} color={colors.textPrimary} />
        <Text style={styles.restText}>Rest: {formatRest(block.restSeconds)}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 3,
    gap: spacing.sm,
    borderRadius: 10,
    paddingBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  badgeColumn: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  badge: {
    minWidth: 24,
    height: 18,
    paddingHorizontal: 6,
    borderRadius: radii.full,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    ...typography.body,
    fontSize: 12,
    color: colors.textInverse,
  },
  connector: {
    flex: 1,
    minHeight: 12,
    width: 1.5,
    backgroundColor: colors.accent,
    marginTop: 2,
    marginBottom: -spacing.sm,
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
    textAlign: 'right',
  },
  restRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  restText: {
    ...typography.caption,
    color: colors.textTertiary,
  },
});
