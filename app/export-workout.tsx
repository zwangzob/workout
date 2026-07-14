import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { BottomSheet } from '@/components/BottomSheet';
import { MonthCalendar, dateKey } from '@/components/MonthCalendar';
import { colors, spacing, typography } from '@/theme/theme';
import { useSessionStore } from '@/store/sessionStore';
import { useExerciseStore } from '@/store/exerciseStore';
import { tap, tapLight } from '@/lib/haptics';

function formatDisplayDate(key: string): string {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function csvField(value: string | number): string {
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export default function ExportWorkoutScreen() {
  const sessions = useSessionStore((s) => s.sessions);
  const exercises = useExerciseStore((s) => s.exercises);

  const completedSessions = useMemo(() => sessions.filter((s) => s.status === 'completed'), [sessions]);
  const loggedDates = useMemo(() => new Set(completedSessions.map((s) => s.date)), [completedSessions]);

  const earliestDate = useMemo(() => {
    if (completedSessions.length === 0) return dateKey(new Date());
    return completedSessions.reduce((min, s) => (s.date < min ? s.date : min), completedSessions[0].date);
  }, [completedSessions]);

  const [fromDate, setFromDate] = useState(earliestDate);
  const [toDate, setToDate] = useState(() => dateKey(new Date()));
  const [pickerOpen, setPickerOpen] = useState<'from' | 'to' | null>(null);
  const [pickerMonth, setPickerMonth] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const sessionsInRange = useMemo(
    () => completedSessions.filter((s) => s.date >= fromDate && s.date <= toDate),
    [completedSessions, fromDate, toDate],
  );

  function openPicker(which: 'from' | 'to') {
    tapLight();
    const base = new Date(which === 'from' ? fromDate : toDate);
    setPickerMonth({ year: base.getFullYear(), month: base.getMonth() });
    setPickerOpen(which);
  }

  function handleSelectDate(key: string) {
    if (pickerOpen === 'from') {
      setFromDate(key > toDate ? toDate : key);
    } else if (pickerOpen === 'to') {
      setToDate(key < fromDate ? fromDate : key);
    }
    setPickerOpen(null);
  }

  async function handleExport() {
    tap();
    const header = ['Date', 'Day', 'Exercise', 'Set Type', 'Set #', 'Reps', 'Weight (lb)'];
    const rows: (string | number)[][] = [header];

    [...sessionsInRange]
      .sort((a, b) => a.date.localeCompare(b.date))
      .forEach((session) => {
        session.blocks.forEach((block) => {
          block.exercises.forEach((ex) => {
            const info = exercises.find((e) => e.id === ex.exerciseId);
            const workingSets = ex.sets.filter((s) => !s.isWarmup);
            ex.sets.forEach((set) => {
              if (!set.completedAt) return;
              const setNumber = set.isWarmup ? 'Warmup' : String(workingSets.findIndex((s) => s.id === set.id) + 1);
              rows.push([
                session.date,
                session.dayLabel,
                info?.name ?? ex.exerciseId,
                set.isWarmup ? 'Warmup' : 'Working',
                setNumber,
                set.reps ?? '',
                set.weight ?? '',
              ]);
            });
          });
        });
      });

    const csv = rows.map((row) => row.map(csvField).join(',')).join('\n');

    const file = new File(Paths.cache, `forge-export-${fromDate}_to_${toDate}.csv`);
    if (file.exists) file.delete();
    file.create();
    file.write(csv);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(file.uri, { UTI: 'public.comma-separated-values-text', mimeType: 'text/csv', dialogTitle: 'Export Workouts' });
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => { tap(); router.back(); }} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>Export Workout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card elevated style={styles.card}>
          <Text style={styles.sectionLabel}>Date Range</Text>
          <Pressable style={styles.dateRow} onPress={() => openPicker('from')}>
            <Text style={styles.dateRowLabel}>From</Text>
            <View style={styles.dateRowValue}>
              <Text style={styles.dateRowValueText}>{formatDisplayDate(fromDate)}</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
            </View>
          </Pressable>
          <Pressable style={styles.dateRow} onPress={() => openPicker('to')}>
            <Text style={styles.dateRowLabel}>To</Text>
            <View style={styles.dateRowValue}>
              <Text style={styles.dateRowValueText}>{formatDisplayDate(toDate)}</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
            </View>
          </Pressable>
        </Card>

        <Text style={styles.summary}>
          {sessionsInRange.length} workout{sessionsInRange.length === 1 ? '' : 's'} in range
        </Text>

        <Button
          label="Export as CSV"
          onPress={handleExport}
          disabled={sessionsInRange.length === 0}
          style={styles.exportButton}
        />
      </ScrollView>

      <BottomSheet
        visible={pickerOpen !== null}
        onClose={() => setPickerOpen(null)}
        title={pickerOpen === 'from' ? 'From Date' : 'To Date'}
      >
        <MonthCalendar
          year={pickerMonth.year}
          month={pickerMonth.month}
          selectedDate={pickerOpen === 'from' ? fromDate : toDate}
          loggedDates={loggedDates}
          onSelectDate={handleSelectDate}
          onChangeMonth={(delta) =>
            setPickerMonth(({ year, month }) => {
              const next = new Date(year, month + delta, 1);
              return { year: next.getFullYear(), month: next.getMonth() };
            })
          }
        />
      </BottomSheet>
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
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  card: {
    gap: spacing.sm,
  },
  sectionLabel: {
    ...typography.micro,
    color: colors.textTertiary,
    textTransform: 'uppercase',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  dateRowLabel: {
    ...typography.body,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  dateRowValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dateRowValueText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  summary: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  exportButton: {
    marginTop: spacing.md,
  },
});
