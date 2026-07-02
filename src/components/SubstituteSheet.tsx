import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheet } from '@/components/BottomSheet';
import { ExerciseThumbnail } from '@/components/ExerciseThumbnail';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { useExerciseStore } from '@/store/exerciseStore';
import { useGymStore } from '@/store/gymStore';
import { findSubstitutes } from '@/lib/substitutions';

type SubstituteSheetProps = {
  visible: boolean;
  onClose: () => void;
  currentExerciseId: string;
  originalExerciseId?: string;
  onSelect: (exerciseId: string) => void;
};

export function SubstituteSheet({
  visible,
  onClose,
  currentExerciseId,
  originalExerciseId,
  onSelect,
}: SubstituteSheetProps) {
  const exercises = useExerciseStore((s) => s.exercises);
  const activeProfile = useGymStore((s) => s.getActiveProfile());
  const baseExerciseId = originalExerciseId ?? currentExerciseId;
  const baseExercise = exercises.find((e) => e.id === baseExerciseId);

  if (!baseExercise || !activeProfile) {
    return (
      <BottomSheet visible={visible} onClose={onClose} title="Substitute Exercise">
        <Text style={styles.empty}>No exercise selected.</Text>
      </BottomSheet>
    );
  }

  const substitutes = findSubstitutes(baseExercise, exercises, activeProfile, { limit: 12 });

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Substitute Exercise">
      <Row
        exercise={baseExercise}
        selected={currentExerciseId === baseExercise.id}
        caption="Original Exercise"
        onPress={() => {
          onSelect(baseExercise.id);
          onClose();
        }}
      />
      {substitutes.map((candidate) => (
        <Row
          key={candidate.exercise.id}
          exercise={candidate.exercise}
          selected={currentExerciseId === candidate.exercise.id}
          caption={candidate.reason}
          onPress={() => {
            onSelect(candidate.exercise.id);
            onClose();
          }}
        />
      ))}
      {substitutes.length === 0 ? (
        <Text style={styles.empty}>
          No substitutes found for {activeProfile.name}. Try adding more exercises to your library.
        </Text>
      ) : null}
    </BottomSheet>
  );
}

function Row({
  exercise,
  selected,
  caption,
  onPress,
}: {
  exercise: { id: string; name: string; primaryMuscle: any };
  selected: boolean;
  caption: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.row, selected && styles.rowSelected]}>
      <ExerciseThumbnail muscle={exercise.primaryMuscle} size={52} />
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{exercise.name}</Text>
        <Text style={[styles.rowCaption, selected && { color: colors.accent }]}>{caption}</Text>
      </View>
      {selected ? (
        <View style={styles.check}>
          <Ionicons name="checkmark" size={16} color={colors.textInverse} />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  rowSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentMuted,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  rowCaption: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: radii.full,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    ...typography.body,
    color: colors.textTertiary,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
});
