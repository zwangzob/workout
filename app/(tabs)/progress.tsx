import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { StatTile } from '@/components/StatTile';
import { ChipGroup } from '@/components/ChipGroup';
import { LineChart } from '@/components/LineChart';
import { MonthCalendar, dateKey } from '@/components/MonthCalendar';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { useSessionStore } from '@/store/sessionStore';
import { useExerciseStore } from '@/store/exerciseStore';
import { tapLight } from '@/lib/haptics';
import type { WorkoutSession } from '@/types';

type JournalTab = 'journal' | 'stats' | 'achievements';

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

function ordinal(n: number): string {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
}

function formatJournalDate(key: string): string {
  const [y, m, d] = key.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  return `${month} ${ordinal(d)}, ${y}`;
}

export default function ProgressScreen() {
  const [activeTab, setActiveTab] = useState<JournalTab>('journal');
  const sessions = useSessionStore((s) => s.sessions);
  const getHistoryForExercise = useSessionStore((s) => s.getHistoryForExercise);
  const exercises = useExerciseStore((s) => s.exercises);

  const completedSessions = useMemo(() => sessions.filter((s) => s.status === 'completed'), [sessions]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.tabBar}>
        {(['journal', 'stats', 'achievements'] as JournalTab[]).map((tab) => (
          <Pressable key={tab} style={styles.tabButton} onPress={() => { tapLight(); setActiveTab(tab); }}>
            <Text style={[styles.tabLabel, activeTab === tab && styles.tabLabelActive]}>
              {tab === 'journal' ? 'Journal' : tab === 'stats' ? 'Stats' : 'Achievements'}
            </Text>
            {activeTab === tab ? <View style={styles.tabUnderline} /> : null}
          </Pressable>
        ))}
      </View>

      {activeTab === 'journal' ? (
        <JournalView completedSessions={completedSessions} />
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {activeTab === 'stats' ? (
            <StatsView completedSessions={completedSessions} exercises={exercises} getHistoryForExercise={getHistoryForExercise} />
          ) : (
            <AchievementsView completedSessions={completedSessions} />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function JournalView({ completedSessions }: { completedSessions: WorkoutSession[] }) {
  const exercises = useExerciseStore((s) => s.exercises);
  const today = useMemo(() => new Date(), []);
  const [viewedMonth, setViewedMonth] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedDate, setSelectedDate] = useState(() => dateKey(today));

  const loggedDates = useMemo(() => new Set(completedSessions.map((s) => s.date)), [completedSessions]);
  const sessionsForDay = useMemo(() => completedSessions.filter((s) => s.date === selectedDate), [completedSessions, selectedDate]);

  function changeMonth(delta: -1 | 1) {
    setViewedMonth(({ year, month }) => {
      const next = new Date(year, month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  return (
    <>
      <MonthCalendar
        year={viewedMonth.year}
        month={viewedMonth.month}
        selectedDate={selectedDate}
        loggedDates={loggedDates}
        onSelectDate={setSelectedDate}
        onChangeMonth={changeMonth}
      />
      <ScrollView contentContainerStyle={styles.journalContent} showsVerticalScrollIndicator={false}>
        {sessionsForDay.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="book-outline" size={40} color={colors.accent} />
            </View>
            <Text style={styles.emptyTitle}>No logs for {formatJournalDate(selectedDate)}</Text>
            <Text style={styles.emptyBody}>Complete a workout to log your sets here, or browse another day on the calendar.</Text>
          </View>
        ) : (
          sessionsForDay.map((session) => {
            const allSets = session.blocks.flatMap((b) => b.exercises).flatMap((e) => e.sets);
            const completedCount = allSets.filter((s) => s.completedAt).length;
            return (
              <Card key={session.id} elevated style={styles.dayCard}>
                <View style={styles.dayCardHeader}>
                  <Text style={styles.dayCardTitle}>{session.dayLabel}</Text>
                  <View style={styles.historyBadge}>
                    <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                    <Text style={styles.historyBadgeText}>{completedCount}/{allSets.length} sets</Text>
                  </View>
                </View>
                {session.blocks.flatMap((b) => b.exercises).map((ex) => {
                  const completedSets = ex.sets.filter((s) => s.completedAt);
                  if (completedSets.length === 0) return null;
                  const info = exercises.find((e) => e.id === ex.exerciseId);
                  return (
                    <View key={ex.id} style={styles.exerciseGroup}>
                      <Text style={styles.exerciseName}>{info?.name ?? 'Exercise'}</Text>
                      {completedSets.map((set, i) => (
                        <Text key={set.id} style={styles.setLine}>
                          Set {i + 1}: {set.reps ?? '-'}{set.weight != null ? ` x ${set.weight} lb` : ''}
                        </Text>
                      ))}
                    </View>
                  );
                })}
              </Card>
            );
          })
        )}
      </ScrollView>
    </>
  );
}

function StatsView({
  completedSessions,
  exercises,
  getHistoryForExercise,
}: {
  completedSessions: WorkoutSession[];
  exercises: ReturnType<typeof useExerciseStore.getState>['exercises'];
  getHistoryForExercise: ReturnType<typeof useSessionStore.getState>['getHistoryForExercise'];
}) {
  const trackedExerciseIds = useMemo(() => {
    const ids = new Set<string>();
    completedSessions.forEach((s) => s.blocks.forEach((b) => b.exercises.forEach((e) => ids.add(e.exerciseId))));
    return Array.from(ids);
  }, [completedSessions]);

  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(trackedExerciseIds[0] ?? null);
  const activeExerciseId = selectedExerciseId && trackedExerciseIds.includes(selectedExerciseId) ? selectedExerciseId : trackedExerciseIds[0] ?? null;

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
    <>
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
    </>
  );
}

function AchievementsView({ completedSessions }: { completedSessions: WorkoutSession[] }) {
  const streak = useMemo(() => computeStreak(completedSessions.map((s) => s.date)), [completedSessions]);

  const thisWeekCount = useMemo(() => {
    const weekStart = startOfWeek(new Date().toISOString().slice(0, 10));
    return completedSessions.filter((s) => s.date >= weekStart).length;
  }, [completedSessions]);

  return (
    <View style={styles.statRow}>
      <StatTile label="Workouts" value={String(completedSessions.length)} />
      <StatTile label="This Week" value={String(thisWeekCount)} />
      <StatTile label="Streak" value={`${streak}d`} trend={streak > 0 ? 'Keep it going' : undefined} />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabBar: {
    flexDirection: 'row',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    backgroundColor: colors.surface,
  },
  tabButton: {
    paddingBottom: spacing.sm,
  },
  tabLabel: {
    ...typography.headline,
    color: colors.textTertiary,
  },
  tabLabelActive: {
    color: colors.accent,
  },
  tabUnderline: {
    marginTop: spacing.xs,
    height: 2,
    borderRadius: radii.full,
    backgroundColor: colors.accent,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  journalContent: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
    gap: spacing.md,
    flexGrow: 1,
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
  historyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  historyBadgeText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  emptyIconCircle: {
    width: 96,
    height: 96,
    borderRadius: radii.full,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    ...typography.headline,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  emptyBody: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  dayCard: {
    gap: spacing.md,
  },
  dayCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayCardTitle: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  exerciseGroup: {
    gap: 2,
  },
  exerciseName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  setLine: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
