import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { Pill } from '@/components/Pill';
import { ExerciseThumbnail } from '@/components/ExerciseThumbnail';
import { SubstituteSheet } from '@/components/SubstituteSheet';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { useExerciseStore } from '@/store/exerciseStore';
import { useSessionStore } from '@/store/sessionStore';
import { useRestTimerStore } from '@/store/restTimerStore';
import { BLOCK_TYPE_LABELS, blockExerciseBadge, formatSetGroups } from '@/types';
import type { LoggedSet, SessionBlock } from '@/types';

type WorkoutBlockCardProps = {
  sessionId: string;
  block: SessionBlock;
  blockNumber: number;
};

function formatRest(seconds: number): string {
  const min = seconds / 60;
  if (min < 1) return `${seconds}s`;
  if (Number.isInteger(min)) return `${min} min`;
  return `${min.toFixed(1)} min`;
}

export function WorkoutBlockCard({ sessionId, block, blockNumber }: WorkoutBlockCardProps) {
  const isGroup = block.exercises.length > 1;
  const allComplete = block.exercises.every((ex) => ex.sets.every((s) => s.completedAt));

  return (
    <Card style={styles.blockCard} elevated>
      {isGroup ? (
        <View style={styles.groupHeader}>
          <Text style={styles.groupLabel}>{BLOCK_TYPE_LABELS[block.type].toUpperCase()}</Text>
          {allComplete ? <Pill label="Done" tone="success" icon={<Ionicons name="checkmark" size={13} color={colors.success} />} /> : null}
        </View>
      ) : null}

      {block.exercises.map((ex, idx) => (
        <ExerciseRow
          key={ex.id}
          sessionId={sessionId}
          blockId={block.id}
          exercise={ex}
          badge={blockExerciseBadge(blockNumber, block, idx)}
          showConnector={isGroup && idx < block.exercises.length - 1}
          restSeconds={block.restSeconds}
        />
      ))}

      <View style={styles.restRow}>
        <Ionicons name="watch-outline" size={16} color={colors.textTertiary} />
        <Text style={styles.restText}>Rest: {formatRest(block.restSeconds)}</Text>
      </View>
    </Card>
  );
}

function ExerciseRow({
  sessionId,
  blockId,
  exercise,
  badge,
  showConnector,
  restSeconds,
}: {
  sessionId: string;
  blockId: string;
  exercise: SessionBlock['exercises'][number];
  badge: string;
  showConnector: boolean;
  restSeconds: number;
}) {
  const [substituteOpen, setSubstituteOpen] = useState(false);
  const getExercise = useExerciseStore((s) => s.getExercise);
  const logSet = useSessionStore((s) => s.logSet);
  const rawToggleSetComplete = useSessionStore((s) => s.toggleSetComplete);
  const addSet = useSessionStore((s) => s.addSet);
  const swapExercise = useSessionStore((s) => s.swapExercise);
  const getHistoryForExercise = useSessionStore((s) => s.getHistoryForExercise);
  const startRestTimer = useRestTimerStore((s) => s.start);

  const exerciseInfo = getExercise(exercise.exerciseId);
  if (!exerciseInfo) return null;

  const toggleSetComplete: typeof rawToggleSetComplete = (sId, bId, seId, setId) => {
    const set = exercise.sets.find((s) => s.id === setId);
    const willComplete = set && !set.completedAt;
    rawToggleSetComplete(sId, bId, seId, setId);
    if (willComplete && set && !set.isWarmup) {
      startRestTimer(restSeconds, exerciseInfo.name);
    }
  };

  const history = getHistoryForExercise(exercise.exerciseId);
  const lastEntry = history[history.length - 1];

  const warmupSets = exercise.sets.filter((s) => s.isWarmup);
  const workingSets = exercise.sets.filter((s) => !s.isWarmup);

  return (
    <View style={styles.exerciseRow}>
      <View style={styles.letterColumn}>
        <View style={styles.letterBadge}>
          <Text style={styles.letterBadgeText}>{badge}</Text>
        </View>
        {showConnector ? <View style={styles.connector} /> : null}
      </View>

      <View style={styles.exerciseContent}>
        <View style={styles.exerciseHeader}>
          <ExerciseThumbnail muscle={exerciseInfo.primaryMuscle} size={48} />
          <View style={styles.exerciseTitleBlock}>
            <Text style={styles.exerciseTitle}>{exerciseInfo.name}</Text>
            <Text style={styles.target}>{formatSetGroups(exercise.setGroups)}</Text>
            {lastEntry ? (
              <Text style={styles.lastPerformance}>
                Last: {lastEntry.reps} x {lastEntry.weight} lb
              </Text>
            ) : null}
          </View>
        </View>

        <View style={styles.actionRow}>
          <Pill label="Substitute" icon={<Ionicons name="repeat" size={13} color={colors.textSecondary} />} onPress={() => setSubstituteOpen(true)} />
        </View>

        <View style={styles.columnHeaders}>
          <Text style={[styles.columnHeaderText, styles.setCol]}>Set</Text>
          <Text style={[styles.columnHeaderText, styles.repsCol]}>Reps</Text>
          <Text style={[styles.columnHeaderText, styles.weightCol]}>Lb</Text>
        </View>

        {warmupSets.map((set) => (
          <SetRow key={set.id} sessionId={sessionId} blockId={blockId} sessionExerciseId={exercise.id} set={set} isWarmup logSet={logSet} toggleSetComplete={toggleSetComplete} />
        ))}
        <Pressable onPress={() => addSet(sessionId, blockId, exercise.id, true)} style={styles.addRow}>
          <View style={styles.addCircle}>
            <Ionicons name="add" size={14} color={colors.accent} />
          </View>
          <Text style={styles.addLabel}>Add Warm Up</Text>
        </Pressable>

        {workingSets.map((set, i) => (
          <SetRow key={set.id} sessionId={sessionId} blockId={blockId} sessionExerciseId={exercise.id} set={set} index={i + 1} logSet={logSet} toggleSetComplete={toggleSetComplete} />
        ))}
        <Pressable onPress={() => addSet(sessionId, blockId, exercise.id, false)} style={styles.addRow}>
          <View style={styles.addCircle}>
            <Ionicons name="add" size={14} color={colors.accent} />
          </View>
          <Text style={styles.addLabel}>Add Set</Text>
        </Pressable>
      </View>

      <SubstituteSheet
        visible={substituteOpen}
        onClose={() => setSubstituteOpen(false)}
        currentExerciseId={exercise.exerciseId}
        originalExerciseId={exercise.originalExerciseId}
        onSelect={(newId) => swapExercise(sessionId, blockId, exercise.id, newId)}
      />
    </View>
  );
}

function SetRow({
  sessionId,
  blockId,
  sessionExerciseId,
  set,
  index,
  isWarmup,
  logSet,
  toggleSetComplete,
}: {
  sessionId: string;
  blockId: string;
  sessionExerciseId: string;
  set: LoggedSet;
  index?: number;
  isWarmup?: boolean;
  logSet: (sessionId: string, blockId: string, sessionExerciseId: string, setId: string, patch: Partial<Pick<LoggedSet, 'weight' | 'reps' | 'rpe'>>) => void;
  toggleSetComplete: (sessionId: string, blockId: string, sessionExerciseId: string, setId: string) => void;
}) {
  const complete = !!set.completedAt;
  return (
    <View style={styles.setRow}>
      <Pressable
        onPress={() => toggleSetComplete(sessionId, blockId, sessionExerciseId, set.id)}
        style={[styles.setCol, styles.checkWrap]}
      >
        <View style={[styles.checkCircle, complete && styles.checkCircleDone]}>
          {complete ? <Ionicons name="checkmark" size={14} color={colors.textInverse} /> : isWarmup ? (
            <Ionicons name="flame-outline" size={13} color={colors.textTertiary} />
          ) : (
            <Text style={styles.setIndexText}>{index}</Text>
          )}
        </View>
      </Pressable>
      <TextInput
        style={[styles.input, styles.repsCol]}
        keyboardType="number-pad"
        placeholder="-"
        placeholderTextColor={colors.textTertiary}
        value={set.reps == null ? '' : String(set.reps)}
        onChangeText={(text) => logSet(sessionId, blockId, sessionExerciseId, set.id, { reps: text === '' ? null : Number(text) })}
      />
      <TextInput
        style={[styles.input, styles.weightCol]}
        keyboardType="decimal-pad"
        placeholder="-"
        placeholderTextColor={colors.textTertiary}
        value={set.weight == null ? '' : String(set.weight)}
        onChangeText={(text) => logSet(sessionId, blockId, sessionExerciseId, set.id, { weight: text === '' ? null : Number(text) })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  blockCard: {
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  groupLabel: {
    ...typography.micro,
    color: colors.textPrimary,
  },
  exerciseRow: {
    flexDirection: 'row',
  },
  letterColumn: {
    width: 30,
    alignItems: 'center',
  },
  letterBadge: {
    minWidth: 34,
    height: 25,
    paddingHorizontal: 8,
    borderRadius: radii.full,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterBadgeText: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textInverse,
  },
  connector: {
    flex: 1,
    width: 1.5,
    backgroundColor: colors.accent,
    marginTop: 2,
  },
  exerciseContent: {
    flex: 1,
    gap: spacing.sm,
  },
  exerciseHeader: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  exerciseTitleBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  exerciseTitle: {
    ...typography.body,
    color: colors.textPrimary,
    textDecorationLine: 'underline',
  },
  target: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  lastPerformance: {
    ...typography.caption,
    color: colors.accent,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  columnHeaders: {
    flexDirection: 'row',
    paddingTop: spacing.xs,
  },
  columnHeaderText: {
    ...typography.micro,
    color: colors.textTertiary,
  },
  setCol: { width: 44, alignItems: 'center' },
  repsCol: { flex: 1, textAlign: 'center' },
  weightCol: { flex: 1, textAlign: 'center' },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkWrap: {
    alignItems: 'center',
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  setIndexText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: colors.surfaceSunken,
    borderRadius: radii.sm,
    paddingVertical: spacing.sm,
    textAlign: 'center',
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  addCircle: {
    width: 22,
    height: 22,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  restRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderSubtle,
    paddingTop: spacing.sm,
  },
  restText: {
    ...typography.caption,
    color: colors.textTertiary,
  },
});
