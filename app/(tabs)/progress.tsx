import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { StatTile } from '@/components/StatTile';
import { AreaChart, AreaChartPoint } from '@/components/AreaChart';
import { MonthCalendar, dateKey } from '@/components/MonthCalendar';
import { JournalIcon } from '@/components/JournalIcon';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { useSessionStore } from '@/store/sessionStore';
import { useExerciseStore } from '@/store/exerciseStore';
import { TRAINING_MAX_LIFTS, TRAINING_MAX_LIFT_EXERCISE_ID, useTrainingMaxStore } from '@/store/trainingMaxStore';
import { tap, tapLight } from '@/lib/haptics';
import type { WorkoutSession } from '@/types';

type StatsMetric = 'training_max' | 'heaviest_lift' | 'tonnage';

const METRIC_LABELS: Record<StatsMetric, string> = {
  training_max: 'Training Max',
  heaviest_lift: 'Heaviest Lift',
  tonnage: 'Tonnage',
};

const METRIC_INFO: Record<StatsMetric, string> = {
  training_max: 'Your training max is a weight you can confidently lift any day — even when you are tired — so you stay consistent and never miss reps. It helps you avoid burnout, reduce injury risk, and build strength steadily over time. To set it, use about 85-90% of your true 1RM.',
  heaviest_lift: 'The most weight you have successfully lifted for a specific exercise, for a single rep. This reflects your current top performance.',
  tonnage: 'The total amount of weight lifted in a workout or exercise, calculated as: sets x reps x weight. It is a way to measure overall training volume and workload.',
};

function heaviestLiftByDate(history: { date: string; weight: number; reps: number }[]): AreaChartPoint[] {
  const byDate = new Map<string, number>();
  history.forEach((h) => byDate.set(h.date, Math.max(byDate.get(h.date) ?? 0, h.weight)));
  return Array.from(byDate.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, value]) => ({ date, value }));
}

function tonnageByDate(history: { date: string; weight: number; reps: number }[]): AreaChartPoint[] {
  const byDate = new Map<string, number>();
  history.forEach((h) => byDate.set(h.date, (byDate.get(h.date) ?? 0) + h.weight * h.reps));
  return Array.from(byDate.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, value]) => ({ date, value: Math.round(value) }));
}

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
            <StatsView getHistoryForExercise={getHistoryForExercise} />
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
              <JournalIcon size={40} color={colors.accent} />
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
  getHistoryForExercise,
}: {
  getHistoryForExercise: ReturnType<typeof useSessionStore.getState>['getHistoryForExercise'];
}) {
  const trainingMaxes = useTrainingMaxStore((s) => s.trainingMaxes);
  const getTrainingMaxHistory = useTrainingMaxStore((s) => s.getTrainingMaxHistory);
  const [metric, setMetric] = useState<StatsMetric>('training_max');
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <View style={styles.filterRow}>
        <View style={styles.allChip}>
          <Text style={styles.allChipText}>All</Text>
          <Ionicons name="chevron-down" size={14} color={colors.textPrimary} />
        </View>
        {(Object.keys(METRIC_LABELS) as StatsMetric[]).map((m) => (
          <Pressable
            key={m}
            style={[styles.metricPill, metric === m && styles.metricPillActive]}
            onPress={() => { tapLight(); setMetric(m); setInfoOpen(false); }}
          >
            <Text style={[styles.metricPillText, metric === m && styles.metricPillTextActive]}>{METRIC_LABELS[m]}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.infoRow} onPress={() => { tapLight(); setInfoOpen((o) => !o); }}>
        <Text style={styles.infoRowText}>What is {METRIC_LABELS[metric]}?</Text>
        <Ionicons name={infoOpen ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textPrimary} />
      </Pressable>
      {infoOpen ? <Text style={styles.infoBody}>{METRIC_INFO[metric]}</Text> : null}

      {TRAINING_MAX_LIFTS.map((lift) => {
        const exerciseId = TRAINING_MAX_LIFT_EXERCISE_ID[lift.key];
        const history = getHistoryForExercise(exerciseId);
        const data: AreaChartPoint[] =
          metric === 'training_max'
            ? getTrainingMaxHistory(lift.key)
            : metric === 'heaviest_lift'
              ? heaviestLiftByDate(history)
              : tonnageByDate(history);
        const latest = data[data.length - 1]?.value;

        return (
          <Card key={lift.key} elevated style={styles.liftCard}>
            <View style={styles.liftCardHeader}>
              <Text style={styles.liftCardTitle}>{lift.label}</Text>
              <Pressable
                style={styles.shareButton}
                onPress={() => {
                  tap();
                  Share.share({ message: `My ${lift.label} ${METRIC_LABELS[metric].toLowerCase()} is ${latest ?? trainingMaxes[lift.key]} lb.` });
                }}
              >
                <Ionicons name="share-outline" size={16} color={colors.textPrimary} />
              </Pressable>
            </View>
            <AreaChart data={data} unit="Lb" />
          </Card>
        );
      })}
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
    fontWeight: '400',
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
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  allChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.borderCool,
    borderRadius: radii.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  allChipText: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  metricPill: {
    backgroundColor: colors.borderCool,
    borderRadius: radii.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  metricPillActive: {
    backgroundColor: colors.accent,
  },
  metricPillText: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  metricPillTextActive: {
    color: colors.textInverse,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundLavender,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  infoRowText: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  infoBody: {
    ...typography.body,
    color: colors.textSecondary,
    paddingHorizontal: spacing.xs,
  },
  liftCard: {
    gap: spacing.md,
  },
  liftCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  liftCardTitle: {
    ...typography.title,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  shareButton: {
    width: 34,
    height: 34,
    borderRadius: radii.full,
    backgroundColor: colors.borderCool,
    alignItems: 'center',
    justifyContent: 'center',
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
