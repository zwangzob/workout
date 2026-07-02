import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { StatTile } from '@/components/StatTile';
import { ChipGroup } from '@/components/ChipGroup';
import { LineChart } from '@/components/LineChart';
import { colors, spacing, typography } from '@/theme/theme';
import { useSessionStore } from '@/store/sessionStore';
import { useExerciseStore } from '@/store/exerciseStore';

function computeStreak(dates: string[]): number {
  const set = new Set(dates);
  let streak = 0;
  const cursor = new Date();
  if (!set.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (set.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function startOfWeek(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDay();
  const diff = (day + 6) % 7; // days since Monday
  d.setDate(d.getDate() - diff);
  return d.toISOString().slice(0, 10);
}

export default function ProgressScreen() {
  const sessions = useSessionStore((s) => s.sessions);
  const getHistoryForExercise = useSessionStore((s) => s.getHistoryForExercise);
  const exercises = useExerciseStore((s) => s.exercises);

  const completedSessions = useMemo(() => sessions.filter((s) => s.status === 'completed'), [sessions]);

  const trackedExerciseIds = useMemo(() => {
    const ids = new Set<string>();
    completedSessions.forEach((s) => s.blocks.forEach((b) => b.exercises.forEach((e) => ids.add(e.exerciseId))));
    return Array.from(ids);
  }, [completedSessions]);

  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(trackedExerciseIds[0] ?? null);
  const activeExerciseId = selectedExerciseId && trackedExerciseIds.includes(selectedExerciseId) ? selectedExerciseId : trackedExerciseIds[0] ?? null;

  const streak = useMemo(() => computeStreak(completedSessions.map((s) => s.date)), [completedSessions]);

  const thisWeekCount = useMemo(() => {
    const weekStart = startOfWeek(new Date().toISOString().slice(0, 10));
    return completedSessions.filter((s) => s.date >= weekStart).length;
  }, [completedSessions]);

  const weightChartData = useMemo(() => {
    if (!activeExerciseId) return [];
    const history = getHistoryForExercise(activeExerciseId);
    const byDate = new Map<string, number>();
    history.forEach((h) => byDate.set(h.date, Math.max(byDate.get(h.date) ?? 0, h.weight)));
    return Array.from(byDate.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, weight]) => ({ label: date.slice(5), value: weight }));
  }, [activeExerciseId, getHistoryForExercise]);

  const volumeChartData = useMemo(() => {
    const byWeek = new Map<string, number>();
    completedSessions.forEach((session) => {
      const week = startOfWeek(session.date);
      let volume = 0;
      session.blocks.forEach((b) =>
        b.exercises.forEach((e) =>
          e.sets.forEach((set) => {
            if (!set.isWarmup && set.completedAt && set.weight != null && set.reps != null) {
              volume += set.weight * set.reps;
            }
          }),
        ),
      );
      byWeek.set(week, (byWeek.get(week) ?? 0) + volume);
    });
    return Array.from(byWeek.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([week, volume]) => ({ label: week.slice(5), value: Math.round(volume) }));
  }, [completedSessions]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Progress</Text>

        <View style={styles.statRow}>
          <StatTile label="Workouts" value={String(completedSessions.length)} />
          <StatTile label="This Week" value={String(thisWeekCount)} />
          <StatTile label="Streak" value={`${streak}d`} trend={streak > 0 ? 'Keep it going' : undefined} />
        </View>

        <Card elevated style={styles.chartCard}>
          <Text style={styles.chartTitle}>Weekly Volume (lb)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart data={volumeChartData} />
          </ScrollView>
        </Card>

        {trackedExerciseIds.length > 0 ? (
          <Card elevated style={styles.chartCard}>
            <Text style={styles.chartTitle}>Top Weight by Session</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.md }}>
              <ChipGroup
                options={trackedExerciseIds.map((id) => ({ key: id, label: exercises.find((e) => e.id === id)?.name ?? id }))}
                selected={activeExerciseId ? [activeExerciseId] : []}
                onToggle={setSelectedExerciseId}
              />
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <LineChart data={weightChartData} />
            </ScrollView>
          </Card>
        ) : null}

        <Text style={styles.sectionTitle}>History</Text>
        {completedSessions.length === 0 ? (
          <Text style={styles.empty}>Complete a workout to see it here.</Text>
        ) : (
          [...completedSessions]
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((session) => {
              const totalSets = session.blocks.flatMap((b) => b.exercises).flatMap((e) => e.sets);
              const completedSets = totalSets.filter((s) => s.completedAt).length;
              return (
                <Card key={session.id} style={styles.historyRow} elevated>
                  <View>
                    <Text style={styles.historyTitle}>{session.dayLabel}</Text>
                    <Text style={styles.historyMeta}>{session.date}</Text>
                  </View>
                  <View style={styles.historyBadge}>
                    <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                    <Text style={styles.historyBadgeText}>
                      {completedSets}/{totalSets.length} sets
                    </Text>
                  </View>
                </Card>
              );
            })
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
  screenTitle: {
    ...typography.title,
    color: colors.textPrimary,
  },
  statRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  chartCard: {
    gap: spacing.sm,
  },
  chartTitle: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  sectionTitle: {
    ...typography.micro,
    color: colors.textTertiary,
    textTransform: 'uppercase',
    marginTop: spacing.sm,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyTitle: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  historyMeta: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
  },
  historyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  historyBadgeText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  empty: {
    ...typography.body,
    color: colors.textTertiary,
  },
});
