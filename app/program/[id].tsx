import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ProgramBlockPreview } from '@/components/ProgramBlockPreview';
import { colors, spacing, typography } from '@/theme/theme';
import { useProgramStore } from '@/store/programStore';
import { SPLIT_TYPE_LABELS } from '@/types';

export default function ProgramDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const program = useProgramStore((s) => s.programs.find((p) => p.id === id));
  const activeProgramId = useProgramStore((s) => s.activeProgramId);
  const setActiveProgram = useProgramStore((s) => s.setActiveProgram);
  const removeProgram = useProgramStore((s) => s.removeProgram);

  if (!program) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.title}>Program not found</Text>
      </SafeAreaView>
    );
  }

  const isActive = program.id === activeProgramId;

  function handleDelete() {
    Alert.alert('Delete program?', `"${program!.name}" and its schedule will be removed.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => { removeProgram(program!.id); router.back(); } },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>{program.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card elevated style={styles.summaryCard}>
          <Text style={styles.summaryText}>{SPLIT_TYPE_LABELS[program.splitType]}</Text>
          <Text style={styles.summaryMeta}>
            {program.weeks.length} weeks · {program.weeks[0]?.days.length ?? 0} days/week
          </Text>
        </Card>

        {!isActive ? (
          <Button label="Set as Active Program" onPress={() => setActiveProgram(program.id)} style={{ marginBottom: spacing.lg }} />
        ) : (
          <View style={styles.activeBadge}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text style={styles.activeBadgeText}>Active Program</Text>
          </View>
        )}

        {program.weeks.map((week) => (
          <View key={week.id} style={styles.weekSection}>
            <Text style={styles.weekTitle}>Week {week.weekNumber}</Text>
            {week.days.map((day) => (
              <View key={day.id} style={styles.daySection}>
                <Text style={styles.dayTitle}>{day.label}</Text>
                {day.isRestDay ? (
                  <Text style={styles.restText}>Rest day</Text>
                ) : (
                  day.blocks.map((block, idx) => <ProgramBlockPreview key={block.id} block={block} blockNumber={idx + 1} />)
                )}
              </View>
            ))}
          </View>
        ))}

        <Button label="Delete Program" variant="danger" onPress={handleDelete} style={{ marginTop: spacing.md }} />
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
    ...typography.headline,
    color: colors.textPrimary,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  summaryCard: {
    marginBottom: spacing.md,
  },
  summaryText: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  summaryMeta: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  activeBadgeText: {
    ...typography.caption,
    color: colors.success,
    fontWeight: '600',
  },
  weekSection: {
    marginBottom: spacing.lg,
  },
  weekTitle: {
    ...typography.headline,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  daySection: {
    marginBottom: spacing.md,
  },
  dayTitle: {
    ...typography.bodyStrong,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  restText: {
    ...typography.caption,
    color: colors.textTertiary,
  },
});
