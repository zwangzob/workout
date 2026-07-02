import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '@/components/Button';
import { ChipGroup } from '@/components/ChipGroup';
import { colors, spacing, typography } from '@/theme/theme';
import {
  EQUIPMENT_LABELS,
  Equipment,
  Exercise,
  ExerciseCategory,
  MUSCLE_GROUP_LABELS,
  MuscleGroup,
} from '@/types';

const MUSCLE_OPTIONS = (Object.keys(MUSCLE_GROUP_LABELS) as MuscleGroup[]).map((k) => ({ key: k, label: MUSCLE_GROUP_LABELS[k] }));
const EQUIPMENT_OPTIONS = (Object.keys(EQUIPMENT_LABELS) as Equipment[]).map((k) => ({ key: k, label: EQUIPMENT_LABELS[k] }));
const CATEGORY_OPTIONS: { key: ExerciseCategory; label: string }[] = [
  { key: 'compound', label: 'Compound' },
  { key: 'isolation', label: 'Isolation' },
  { key: 'cardio', label: 'Cardio' },
  { key: 'mobility', label: 'Mobility' },
];

export type ExerciseFormValues = Omit<Exercise, 'id' | 'isCustom'>;

type ExerciseFormProps = {
  initial?: Partial<ExerciseFormValues>;
  onSubmit: (values: ExerciseFormValues) => void;
  onDelete?: () => void;
  submitLabel: string;
};

export function ExerciseForm({ initial, onSubmit, onDelete, submitLabel }: ExerciseFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [primaryMuscle, setPrimaryMuscle] = useState<MuscleGroup>(initial?.primaryMuscle ?? 'chest');
  const [secondaryMuscles, setSecondaryMuscles] = useState<MuscleGroup[]>(initial?.secondaryMuscles ?? []);
  const [equipment, setEquipment] = useState<Equipment[]>(initial?.equipment ?? []);
  const [category, setCategory] = useState<ExerciseCategory>(initial?.category ?? 'compound');
  const [notes, setNotes] = useState(initial?.notes ?? '');

  const canSubmit = name.trim().length > 0 && equipment.length > 0;

  function toggleSecondary(muscle: MuscleGroup) {
    setSecondaryMuscles((prev) => (prev.includes(muscle) ? prev.filter((m) => m !== muscle) : [...prev, muscle]));
  }

  function toggleEquipment(eq: Equipment) {
    setEquipment((prev) => (prev.includes(eq) ? prev.filter((e) => e !== eq) : [...prev, eq]));
  }

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.field}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Incline Dumbbell Press"
          placeholderTextColor={colors.textTertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Primary Muscle</Text>
        <ChipGroup options={MUSCLE_OPTIONS} selected={[primaryMuscle]} onToggle={(m) => setPrimaryMuscle(m)} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Secondary Muscles</Text>
        <ChipGroup options={MUSCLE_OPTIONS.filter((m) => m.key !== primaryMuscle)} selected={secondaryMuscles} onToggle={toggleSecondary} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Equipment Needed</Text>
        <ChipGroup options={EQUIPMENT_OPTIONS} selected={equipment} onToggle={toggleEquipment} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Category</Text>
        <ChipGroup options={CATEGORY_OPTIONS} selected={[category]} onToggle={(c) => setCategory(c)} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Form cues, setup notes..."
          placeholderTextColor={colors.textTertiary}
          multiline
        />
      </View>

      <Button
        label={submitLabel}
        disabled={!canSubmit}
        onPress={() => onSubmit({ name: name.trim(), primaryMuscle, secondaryMuscles, equipment, category, notes: notes.trim() || undefined })}
        size="lg"
      />
      {onDelete ? <Button label="Delete Exercise" variant="danger" onPress={onDelete} style={{ marginTop: spacing.sm }} /> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
});
