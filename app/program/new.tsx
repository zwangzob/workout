import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { ChipGroup } from '@/components/ChipGroup';
import { colors, spacing, typography } from '@/theme/theme';
import { useExerciseStore } from '@/store/exerciseStore';
import { useGymStore } from '@/store/gymStore';
import { useProgramStore } from '@/store/programStore';
import { generateProgram } from '@/lib/programGenerator';
import { SPLIT_TYPE_LABELS, SplitType } from '@/types';

const SPLIT_OPTIONS = (Object.keys(SPLIT_TYPE_LABELS) as SplitType[]).map((k) => ({ key: k, label: SPLIT_TYPE_LABELS[k] }));
const DAYS_OPTIONS = [2, 3, 4, 5, 6].map((n) => ({ key: String(n), label: `${n} days/wk` }));
const WEEKS_OPTIONS = [4, 6, 8, 12].map((n) => ({ key: String(n), label: `${n} weeks` }));

export default function NewProgramScreen() {
  const exercises = useExerciseStore((s) => s.exercises);
  const activeProfile = useGymStore((s) => s.getActiveProfile());
  const addProgram = useProgramStore((s) => s.addProgram);
  const setActiveProgram = useProgramStore((s) => s.setActiveProgram);

  const [name, setName] = useState('My Program');
  const [splitType, setSplitType] = useState<SplitType>('push_pull_legs');
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [weekCount, setWeekCount] = useState(6);

  function handleGenerate() {
    if (!activeProfile) return;
    const program = generateProgram({
      name: name.trim() || 'My Program',
      splitType,
      daysPerWeek,
      weekCount,
      library: exercises,
      gymProfile: activeProfile,
    });
    const added = addProgram(program);
    setActiveProgram(added.id);
    router.back();
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>New Program</Text>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.hint}>
          This builds a starting point by pulling exercises from your library that fit "{activeProfile?.name ?? 'your active gym profile'}
          ." Swap any exercise once you're training — the plan you started with should never lock you in.
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Program Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Summer Strength" placeholderTextColor={colors.textTertiary} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Split</Text>
          <ChipGroup options={SPLIT_OPTIONS} selected={[splitType]} onToggle={setSplitType} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Days per Week</Text>
          <ChipGroup options={DAYS_OPTIONS} selected={[String(daysPerWeek)]} onToggle={(k) => setDaysPerWeek(Number(k))} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Program Length</Text>
          <ChipGroup options={WEEKS_OPTIONS} selected={[String(weekCount)]} onToggle={(k) => setWeekCount(Number(k))} />
        </View>

        <Button label="Generate Program" size="lg" onPress={handleGenerate} disabled={!activeProfile} style={{ marginTop: spacing.md }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  hint: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
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
});
