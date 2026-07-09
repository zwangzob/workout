import { useMemo } from 'react';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { SegmentedControl } from '@/components/SegmentedControl';
import { DaySelector } from '@/components/DaySelector';
import { ProgramBlockPreview } from '@/components/ProgramBlockPreview';
import { colors, spacing, typography } from '@/theme/theme';
import { useProgramStore } from '@/store/programStore';
import { useGymStore } from '@/store/gymStore';
import { useSessionStore } from '@/store/sessionStore';

export default function TodayScreen() {
  const program = useProgramStore((s) => s.getActiveProgram());
  const cursor = useProgramStore((s) => s.cursor);
  const setCursor = useProgramStore((s) => s.setCursor);
  const advanceCursor = useProgramStore((s) => s.advanceCursor);
  const cycleStartedAt = useProgramStore((s) => s.cycleStartedAt);

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
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.programName}>{program.name}</Text>
            <Text style={styles.weekLabel}>Week {week.weekNumber}</Text>
          </View>
          <Ionicons name="settings-outline" size={22} color={colors.textSecondary} onPress={() => router.push('/(tabs)/profile')} />
        </View>

        <SegmentedControl
          segments={profiles.map((p) => ({ key: p.id, label: p.name }))}
          value={activeProfileId}
          onChange={setActiveProfile}
        />

        <DaySelector
          days={week.days}
          currentIndex={cursor.dayIndex}
          completedDayIds={completedDayIds}
          onSelect={(index) => setCursor(cursor.weekIndex, index)}
        />

        <Text style={styles.dayTitle}>{day.label}</Text>

        {day.isRestDay ? (
          <Card style={styles.restCard} elevated>
            <Ionicons name="moon-outline" size={28} color={colors.textTertiary} />
            <Text style={styles.restTitle}>Rest Day</Text>
            <Text style={styles.restBody}>Recovery is part of the program. See you next session.</Text>
            <Button label="Mark Complete & Continue" variant="secondary" onPress={advanceCursor} style={{ marginTop: spacing.md }} />
          </Card>
        ) : (
          <>
            {day.blocks.map((block) => (
              <ProgramBlockPreview key={block.id} block={block} />
            ))}
            <Button
              label={inProgressSession ? 'Resume Workout' : 'Start Workout'}
              onPress={handleStart}
              size="lg"
              style={{ marginTop: spacing.sm }}
              icon={<Ionicons name="arrow-forward" size={18} color={colors.textInverse} />}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  programName: {
    ...typography.title,
    color: colors.textPrimary,
  },
  weekLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  dayTitle: {
    ...typography.headline,
    color: colors.textPrimary,
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
