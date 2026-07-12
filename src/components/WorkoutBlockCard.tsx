import { Fragment, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { Pill } from '@/components/Pill';
import { SubstituteSheet } from '@/components/SubstituteSheet';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { useExerciseStore } from '@/store/exerciseStore';
import { useSessionStore } from '@/store/sessionStore';
import { useRestTimerStore } from '@/store/restTimerStore';
import { useActiveBlockStore } from '@/store/activeBlockStore';
import { BLOCK_TYPE_LABELS, blockExerciseBadge, formatSetGroups } from '@/types';
import type { LoggedSet, SessionBlock, SetGroup } from '@/types';

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

function hasAmrap(setGroups: SetGroup[]): boolean {
  return setGroups.some((g) => /\+|amrap/i.test(g.reps));
}

/** Expands set groups into one prescribed reps string per working set, e.g.
 * [{sets:4, reps:'3'}, {sets:1, reps:'3+'}] -> ['3','3','3','3','3+']. */
function expandedRepsScheme(setGroups: SetGroup[]): string[] {
  return setGroups.flatMap((g) => Array(g.sets).fill(g.reps));
}

export function WorkoutBlockCard({ sessionId, block, blockNumber }: WorkoutBlockCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const getExercise = useExerciseStore((s) => s.getExercise);
  const toggleSetComplete = useSessionStore((s) => s.toggleSetComplete);
  const setBlockComplete = useSessionStore((s) => s.setBlockComplete);
  const setActiveBlockId = useActiveBlockStore((s) => s.setActiveBlockId);
  const isGroup = block.exercises.length > 1;
  const allComplete = block.exercises.every((ex) => ex.sets.every((s) => s.completedAt));
  const notes = getExercise(block.exercises[0]?.exerciseId)?.notes;

  function toggleExpanded() {
    setExpanded((e) => {
      if (!e) setActiveBlockId(block.id);
      return !e;
    });
  }

  return (
    <Card style={styles.blockCard} elevated>
      <Pressable style={styles.cardBody} onPress={toggleExpanded}>
        <View style={styles.groupHeader}>
          <View style={styles.groupHeaderLeft}>
            <Ionicons name={expanded ? 'caret-up' : 'caret-down'} size={22} color={colors.textPrimary} />
            <Text style={styles.groupLabel}>{BLOCK_TYPE_LABELS[block.type].toUpperCase()}</Text>
          </View>
          <Pressable
            style={[styles.doneWidget, allComplete && styles.doneWidgetSuccess]}
            onPress={() => setBlockComplete(sessionId, block.id, !allComplete)}
          >
            <Text style={[styles.doneLabel, allComplete && styles.doneLabelSuccess]}>Done</Text>
            <View style={styles.doneCircle}>
              <Ionicons name="checkmark" size={11} color={allComplete ? colors.success : colors.surfaceSunken} />
            </View>
          </Pressable>
        </View>

        {notes ? (
          <Pressable onPress={() => setNotesOpen((o) => !o)} hitSlop={8}>
            <View style={styles.readMoreRow}>
              <Text style={styles.readMoreText}>Read more</Text>
              <Ionicons name={notesOpen ? 'chevron-up' : 'chevron-down'} size={14} color={colors.accent} />
            </View>
          </Pressable>
        ) : null}
        {notesOpen && notes ? <Text style={styles.notesText}>{notes}</Text> : null}

        <View style={styles.headerDivider} />

        {block.exercises.map((ex, idx) => {
          const showConnector = isGroup && idx < block.exercises.length - 1;
          return expanded ? (
            <Fragment key={ex.id}>
              <ExerciseRow
                sessionId={sessionId}
                blockId={block.id}
                exercise={ex}
                badge={blockExerciseBadge(blockNumber, block, idx)}
                restSeconds={block.restSeconds}
              />
              {showConnector ? (
                <View style={styles.exerciseDividerRow}>
                  <View style={styles.exerciseDivider} />
                </View>
              ) : null}
            </Fragment>
          ) : (
            <CompactExerciseRow
              key={ex.id}
              sessionId={sessionId}
              blockId={block.id}
              exercise={ex}
              badge={blockExerciseBadge(blockNumber, block, idx)}
              showConnector={showConnector}
              toggleSetComplete={toggleSetComplete}
            />
          );
        })}

        {!expanded ? (
          <View style={styles.restRow}>
            <Ionicons name="timer-outline" size={16} color={colors.textTertiary} />
            <Text style={styles.restText}>Rest: {formatRest(block.restSeconds)}</Text>
          </View>
        ) : null}
      </Pressable>
    </Card>
  );
}

function CompactExerciseRow({
  sessionId,
  blockId,
  exercise,
  badge,
  showConnector,
  toggleSetComplete,
}: {
  sessionId: string;
  blockId: string;
  exercise: SessionBlock['exercises'][number];
  badge: string;
  showConnector: boolean;
  toggleSetComplete: (sessionId: string, blockId: string, sessionExerciseId: string, setId: string) => void;
}) {
  const getExercise = useExerciseStore((s) => s.getExercise);
  const exerciseInfo = getExercise(exercise.exerciseId);
  if (!exerciseInfo) return null;

  return (
    <View style={styles.compactRow}>
      <View style={styles.letterColumn}>
        <View style={[styles.letterBadge, badge.length > 1 && styles.letterBadgeOval]}>
          <Text style={styles.letterBadgeText}>{badge}</Text>
        </View>
        {showConnector ? <View style={styles.connector} /> : null}
      </View>
      <View style={styles.compactContent}>
        <View style={styles.titleRow}>
          <Text style={styles.exerciseTitle}>{exerciseInfo.name}</Text>
          <Text style={styles.target}>{formatSetGroups(exercise.setGroups)}</Text>
        </View>
        <View style={styles.compactCheckRow}>
          {exercise.sets.map((set) => (
            <Pressable key={set.id} onPress={() => toggleSetComplete(sessionId, blockId, exercise.id, set.id)}>
              <View style={[styles.checkCircleSmall, set.completedAt && styles.checkCircleDone]}>
                <Ionicons name="checkmark" size={18} color={colors.textInverse} />
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

function ExerciseRow({
  sessionId,
  blockId,
  exercise,
  badge,
  restSeconds,
}: {
  sessionId: string;
  blockId: string;
  exercise: SessionBlock['exercises'][number];
  badge: string;
  restSeconds: number;
}) {
  const [substituteOpen, setSubstituteOpen] = useState(false);
  const getExercise = useExerciseStore((s) => s.getExercise);
  const logSet = useSessionStore((s) => s.logSet);
  const rawToggleSetComplete = useSessionStore((s) => s.toggleSetComplete);
  const addSet = useSessionStore((s) => s.addSet);
  const removeSet = useSessionStore((s) => s.removeSet);
  const swapExercise = useSessionStore((s) => s.swapExercise);
  const setExerciseComplete = useSessionStore((s) => s.setExerciseComplete);
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
  const lastWarmup = warmupSets[warmupSets.length - 1];
  const lastWorking = workingSets[workingSets.length - 1];
  const allSetsComplete = exercise.sets.length > 0 && exercise.sets.every((s) => s.completedAt);
  const repsScheme = expandedRepsScheme(exercise.setGroups);

  return (
    <View style={styles.exerciseRow}>
      <View style={styles.letterColumn}>
        <View style={[styles.letterBadge, badge.length > 1 && styles.letterBadgeOval]}>
          <Text style={styles.letterBadgeText}>{badge}</Text>
        </View>
      </View>

      <View style={styles.exerciseContent}>
        <View style={styles.titleRow}>
          <View style={styles.titleTextColumn}>
            <Text style={[styles.exerciseTitle, styles.exerciseTitleBold]}>{exerciseInfo.name}</Text>
            {lastEntry ? (
              <Text style={styles.lastPerformance}>
                Last: {lastEntry.reps} x {lastEntry.weight} lb
              </Text>
            ) : null}
            <Text style={styles.restPerformance}>Rest: {formatRest(restSeconds)}</Text>
          </View>
          <Text style={styles.target}>{formatSetGroups(exercise.setGroups)}</Text>
        </View>

        <View style={styles.actionRow}>
          {hasAmrap(exercise.setGroups) ? (
            <Pill
              label="AMRAP"
              icon={
                <View style={styles.amrapIconCircle}>
                  <Text style={styles.amrapIconLetter}>i</Text>
                </View>
              }
            />
          ) : null}
          <Pill label="Substitute" icon={<Ionicons name="repeat" size={13} color={colors.textPrimary} />} onPress={() => setSubstituteOpen(true)} />
          <Pill label="Reps + Weight" icon={<Ionicons name="options-outline" size={13} color={colors.textPrimary} />} />
        </View>

        <View style={styles.columnHeaders}>
          <Text style={[styles.columnHeaderText, styles.setCol, styles.setsHeaderText]}>Sets</Text>
          <Text style={[styles.columnHeaderText, styles.repsCol]}>Reps</Text>
          <Text style={[styles.columnHeaderText, styles.weightCol]}>Lb</Text>
        </View>

        <View style={styles.addRowWithCheck}>
          {/* Fixed to setCol (not part of the centered cluster below) so it stays
              vertically aligned with the Sets header and the set circles beneath it. */}
          <Pressable
            style={styles.setCol}
            onPress={() => setExerciseComplete(sessionId, blockId, exercise.id, !allSetsComplete)}
          >
            <View style={[styles.checkCircle, allSetsComplete && styles.checkCircleDone]}>
              <Ionicons name="checkmark" size={22} color={colors.textInverse} />
            </View>
          </Pressable>
          <View style={styles.addControlsCluster}>
            <Pressable
              disabled={!lastWarmup}
              onPress={() => lastWarmup && removeSet(sessionId, blockId, exercise.id, lastWarmup.id)}
              style={[styles.stepCircle, !lastWarmup && styles.stepCircleDisabled]}
            >
              <Ionicons name="remove" size={14} color={lastWarmup ? colors.textSecondary : colors.textTertiary} />
            </Pressable>
            <Text style={styles.addLabel}>Add Warm Up</Text>
            <Pressable onPress={() => addSet(sessionId, blockId, exercise.id, true)} style={styles.stepCircleAccent}>
              <Ionicons name="add" size={14} color={colors.textPrimary} />
            </Pressable>
          </View>
        </View>
        {warmupSets.map((set) => (
          <SetRow key={set.id} sessionId={sessionId} blockId={blockId} sessionExerciseId={exercise.id} set={set} isWarmup logSet={logSet} toggleSetComplete={toggleSetComplete} />
        ))}

        {workingSets.map((set, i) => (
          <SetRow
            key={set.id}
            sessionId={sessionId}
            blockId={blockId}
            sessionExerciseId={exercise.id}
            set={set}
            index={i + 1}
            placeholderReps={repsScheme[i]}
            logSet={logSet}
            toggleSetComplete={toggleSetComplete}
          />
        ))}
        <View style={styles.addRow}>
          <Pressable
            disabled={!lastWorking}
            onPress={() => lastWorking && removeSet(sessionId, blockId, exercise.id, lastWorking.id)}
            style={[styles.stepCircle, !lastWorking && styles.stepCircleDisabled]}
          >
            <Ionicons name="remove" size={14} color={lastWorking ? colors.textSecondary : colors.textTertiary} />
          </Pressable>
          <Text style={styles.addLabel}>Add Set</Text>
          <Pressable onPress={() => addSet(sessionId, blockId, exercise.id, false)} style={styles.stepCircleAccent}>
            <Ionicons name="add" size={14} color={colors.textPrimary} />
          </Pressable>
        </View>
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
  placeholderReps,
  logSet,
  toggleSetComplete,
}: {
  sessionId: string;
  blockId: string;
  sessionExerciseId: string;
  set: LoggedSet;
  index?: number;
  isWarmup?: boolean;
  placeholderReps?: string;
  logSet: (sessionId: string, blockId: string, sessionExerciseId: string, setId: string, patch: Partial<Pick<LoggedSet, 'weight' | 'reps' | 'rpe'>>) => void;
  toggleSetComplete: (sessionId: string, blockId: string, sessionExerciseId: string, setId: string) => void;
}) {
  const complete = !!set.completedAt;
  return (
    <View style={styles.setRow}>
      <Pressable
        onPress={() => {
          if (complete) {
            logSet(sessionId, blockId, sessionExerciseId, set.id, { reps: null, weight: null });
          }
          toggleSetComplete(sessionId, blockId, sessionExerciseId, set.id);
        }}
        style={[styles.setCol, styles.checkWrap]}
      >
        <View style={[styles.checkCircle, complete && styles.checkCircleDone]}>
          {complete ? <Ionicons name="checkmark" size={22} color={colors.textInverse} /> : isWarmup ? (
            <Ionicons name="flame-outline" size={13} color={colors.textTertiary} />
          ) : (
            <Text style={styles.setIndexText}>{index}</Text>
          )}
        </View>
      </Pressable>
      <TextInput
        style={[styles.input, styles.repsCol]}
        keyboardType="number-pad"
        placeholder={placeholderReps ?? '-'}
        placeholderTextColor={complete ? colors.textPrimary : SET_INPUT_PLACEHOLDER_COLOR}
        value={set.reps == null ? '' : String(set.reps)}
        onChangeText={(text) => {
          const reps = text === '' ? null : Number(text);
          logSet(sessionId, blockId, sessionExerciseId, set.id, { reps });
          if ((reps != null) !== complete) {
            toggleSetComplete(sessionId, blockId, sessionExerciseId, set.id);
          }
        }}
      />
      <TextInput
        style={[styles.input, styles.weightCol]}
        keyboardType="decimal-pad"
        placeholder="-"
        placeholderTextColor={complete ? colors.textPrimary : SET_INPUT_PLACEHOLDER_COLOR}
        value={set.weight == null ? '' : String(set.weight)}
        onChangeText={(text) => logSet(sessionId, blockId, sessionExerciseId, set.id, { weight: text === '' ? null : Number(text) })}
      />
    </View>
  );
}

// Letter/number badge column width; full-bleed rows (pills, set rows) offset by
// this much so they align with the badge instead of sitting under the title.
const LETTER_COLUMN_WIDTH = 30;
const FULL_BLEED_OFFSET = -(LETTER_COLUMN_WIDTH + spacing.sm);
const SET_INPUT_PLACEHOLDER_COLOR = '#B8C0C9';

const styles = StyleSheet.create({
  blockCard: {
    marginBottom: spacing.md * 0.75,
    borderRadius: 6,
  },
  cardBody: {
    gap: spacing.md,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doneWidget: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radii.full,
    backgroundColor: '#EDF1F5',
  },
  doneWidgetSuccess: {
    backgroundColor: colors.success,
  },
  doneLabel: {
    ...typography.caption,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  doneLabelSuccess: {
    color: colors.textInverse,
  },
  doneCircle: {
    width: 18,
    height: 18,
    borderRadius: radii.full,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  readMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  readMoreText: {
    ...typography.caption,
    color: colors.accent,
    fontWeight: '500',
  },
  notesText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  headerDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderStrong,
  },
  groupLabel: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: colors.textPrimary,
  },
  compactRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  compactContent: {
    flex: 1,
    gap: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  compactCheckRow: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  checkCircleSmall: {
    width: 22,
    height: 22,
    borderRadius: radii.full,
    backgroundColor: colors.borderCool,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  letterColumn: {
    width: LETTER_COLUMN_WIDTH,
    alignItems: 'center',
  },
  letterBadge: {
    width: 26,
    height: 26,
    borderRadius: radii.full,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterBadgeOval: {
    width: undefined,
    minWidth: 24,
    height: 18,
    paddingHorizontal: 6,
  },
  letterBadgeText: {
    ...typography.body,
    fontSize: 12,
    color: colors.textInverse,
  },
  connector: {
    flex: 1,
    width: 1.5,
    backgroundColor: colors.accent,
    marginTop: 2,
  },
  exerciseDividerRow: {
    alignItems: 'center',
  },
  exerciseDivider: {
    width: '90%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderStrong,
  },
  exerciseContent: {
    flex: 1,
    gap: spacing.sm,
  },
  titleTextColumn: {
    flex: 1,
  },
  exerciseTitle: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  exerciseTitleBold: {
    fontWeight: '600',
  },
  target: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  lastPerformance: {
    ...typography.caption,
    fontSize: 14,
    color: colors.accent,
  },
  restPerformance: {
    ...typography.caption,
    fontSize: 14,
    color: colors.textPrimary,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginLeft: FULL_BLEED_OFFSET,
  },
  amrapIconCircle: {
    width: 11,
    height: 11,
    borderRadius: radii.full,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amrapIconLetter: {
    fontSize: 10,
    fontFamily: Platform.select({ ios: 'Georgia', default: 'serif' }),
    fontWeight: '800',
    color: colors.textInverse,
  },
  columnHeaders: {
    flexDirection: 'row',
    paddingTop: spacing.xs,
    marginLeft: FULL_BLEED_OFFSET,
  },
  setsHeaderText: {
    paddingLeft: spacing.sm,
  },
  columnHeaderText: {
    ...typography.micro,
    color: colors.textPrimary,
  },
  setCol: { width: 44, alignItems: 'center' },
  repsCol: { flex: 1, textAlign: 'center' },
  weightCol: { flex: 1, textAlign: 'center' },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginLeft: FULL_BLEED_OFFSET,
  },
  checkWrap: {
    alignItems: 'center',
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.borderCool,
    backgroundColor: colors.borderCool,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  setIndexText: {
    ...typography.caption,
    color: colors.textInverse,
  },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: '#EFF2F6',
    borderRadius: radii.sm,
    paddingVertical: spacing.sm,
    textAlign: 'center',
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    marginLeft: FULL_BLEED_OFFSET,
  },
  addRowWithCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    marginLeft: FULL_BLEED_OFFSET,
  },
  addControlsCluster: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.textSecondary,
    backgroundColor: colors.borderCool,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleDisabled: {
    opacity: 0.5,
  },
  stepCircleAccent: {
    width: 28,
    height: 28,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.accent,
    backgroundColor: colors.borderCool,
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
