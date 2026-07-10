import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { SegmentedControl } from '@/components/SegmentedControl';
import { DaySelector } from '@/components/DaySelector';
import { ProgramBlockPreview } from '@/components/ProgramBlockPreview';
import { ConfigurationSheet } from '@/components/ConfigurationSheet';
import { OptionalSessionToggle } from '@/components/OptionalSessionToggle';
import { Toast } from '@/components/Toast';
import { getDayEmoji } from '@/lib/dayEmoji';
import { formatWeekRange } from '@/lib/dateRange';
import { colors, radii, shadow, spacing, typography } from '@/theme/theme';
import { useProgramStore } from '@/store/programStore';
import { useGymStore } from '@/store/gymStore';
import { useSessionStore } from '@/store/sessionStore';

export default function TodayScreen() {
  const insets = useSafeAreaInsets();
  const program = useProgramStore((s) => s.getActiveProgram());
  const cursor = useProgramStore((s) => s.cursor);
  const setCursor = useProgramStore((s) => s.setCursor);
  const advanceCursor = useProgramStore((s) => s.advanceCursor);
  const cycleStartedAt = useProgramStore((s) => s.cycleStartedAt);
  const setDaysPerWeek = useProgramStore((s) => s.setDaysPerWeek);

  const [configOpen, setConfigOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [warmupEnabled, setWarmupEnabled] = useState(false);
  const [conditioningEnabled, setConditioningEnabled] = useState(false);

  const profiles = useGymStore((s) => s.profiles);
  const activeProfileId = useGymStore((s) => s.activeProfileId);
  const setActiveProfile = useGymStore((s) => s.setActiveProfile);

  const sessions = useSessionStore((s) => s.sessions);
  const startSession = useSessionStore((s) => s.startSession);

  const week = program?.weeks[cursor.weekIndex];
  const day = week?.days[cursor.dayIndex];

  const completedDayIds = useMemo(() => {
    const ids = new Set<string>();
    sessions.forEach((s) => {
      if (s.status !== 'completed') return;
      if (cycleStartedAt && s.completedAt && s.completedAt < cycleStartedAt) return;
      ids.add(s.programDayId);
    });
    return ids;
  }, [sessions, cycleStartedAt]);

  const inProgressSession = useMemo(
    () => sessions.find((s) => s.programDayId === day?.id && s.status === 'in_progress'),
    [sessions, day],
  );

  if (!program || !day || !week) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.emptyState}>
          <Ionicons name="barbell-outline" size={40} color={colors.textTertiary} />
          <Text style={styles.emptyTitle}>No active program</Text>
          <Text style={styles.emptyBody}>Build a program from your exercise library to see today's workout here.</Text>
          <Button label="Create a Program" onPress={() => router.push('/program/new')} style={{ marginTop: spacing.lg }} />
        </View>
      </SafeAreaView>
    );
  }

  function handleStart() {
    if (!program || !day) return;
    const session = inProgressSession ?? startSession(program, day);
    router.push(`/workout/${session.id}`);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View pointerEvents="box-none" style={[styles.toastSlot, { top: insets.top + spacing.sm }]}>
        <Toast message={toastMessage} onHide={() => setToastMessage(null)} />
      </View>

      <View style={styles.weekBar}>
        <Text style={styles.weekRange}>{formatWeekRange()}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topSection}>
          <View style={styles.header}>
            <Text style={styles.programName}>Week {week.weekNumber}</Text>
            <Pressable onPress={() => setConfigOpen(true)} hitSlop={8}>
              <View style={styles.calendarIcon}>
                <Ionicons name="calendar-outline" size={20} color={colors.textPrimary} />
                <View style={styles.calendarIconBadge}>
                  <Ionicons name="settings" size={11} color={colors.textInverse} />
                </View>
              </View>
            </Pressable>
          </View>

          <DaySelector
            days={week.days}
            currentIndex={cursor.dayIndex}
            completedDayIds={completedDayIds}
            onSelect={(index) => setCursor(cursor.weekIndex, index)}
          />
        </View>

        <View style={styles.sectionDivider} />

        <View style={styles.bottomSection}>
          <SegmentedControl
            segments={profiles.map((p) => ({ key: p.id, label: p.name }))}
            value={activeProfileId}
            onChange={setActiveProfile}
          />

          <Text style={styles.dayTitle}>
            {getDayEmoji(day.label)} {day.label} {getDayEmoji(day.label)}
          </Text>

          {day.isRestDay ? (
            <Card style={styles.restCard} elevated>
              <Ionicons name="moon-outline" size={28} color={colors.textTertiary} />
              <Text style={styles.restTitle}>Rest Day</Text>
              <Text style={styles.restBody}>Recovery is part of the program. See you next session.</Text>
              <Button label="Mark Complete & Continue" variant="secondary" onPress={advanceCursor} style={{ marginTop: spacing.md }} />
            </Card>
          ) : (
            <>
              <View style={styles.divider} />
              <OptionalSessionToggle
                label="Warm Up"
                description="5-8 min dynamic stretches + light cardio to raise heart rate before working sets."
                value={warmupEnabled}
                onChange={setWarmupEnabled}
              />
              <View style={styles.divider} />
              <Text style={styles.workoutSectionLabel}>Workout</Text>
              {day.blocks.map((block, idx) => (
                <ProgramBlockPreview key={block.id} block={block} blockNumber={idx + 1} />
              ))}
              <View style={styles.divider} />
              <OptionalSessionToggle
                label="Conditioning"
                description="10 min finisher circuit after your last working set."
                value={conditioningEnabled}
                onChange={setConditioningEnabled}
              />
            </>
          )}
        </View>
      </ScrollView>

      {!day.isRestDay ? (
        <View style={[styles.stickyFooter, { paddingBottom: insets.bottom > 0 ? insets.bottom : spacing.md }]}>
          <Pressable
            onPress={handleStart}
            style={({ pressed }) => [styles.startPill, pressed && styles.startPillPressed]}
          >
            <Text style={styles.startPillLabel}>{inProgressSession ? 'Resume Workout' : 'Start Workout'}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textInverse} />
          </Pressable>
        </View>
      ) : null}

      <ConfigurationSheet
        visible={configOpen}
        onClose={() => setConfigOpen(false)}
        currentDays={week.days.length}
        onSave={(days) => {
          setDaysPerWeek(program.id, days);
          setToastMessage('Training frequency updated!');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topSection: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  sectionDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderStrong,
  },
  bottomSection: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl * 2,
    gap: spacing.lg,
  },
  stickyFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  startPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    borderRadius: radii.full,
    paddingVertical: spacing.md + 2,
    ...shadow.card,
  },
  startPillPressed: {
    opacity: 0.85,
  },
  startPillLabel: {
    ...typography.bodyStrong,
    color: colors.textInverse,
  },
  weekBar: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weekRange: {
    ...typography.headline,
    color: colors.textPrimary,
  },
  programName: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  calendarIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarIconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: radii.full,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  toastSlot: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 10,
  },
  dayTitle: {
    ...typography.headline,
    color: colors.textPrimary,
  },
  workoutSectionLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderStrong,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  emptyTitle: {
    ...typography.headline,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  emptyBody: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  restCard: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xl,
  },
  restTitle: {
    ...typography.headline,
    color: colors.textPrimary,
  },
  restBody: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
