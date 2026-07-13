import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { tap, tapLight } from '@/lib/haptics';

const WEEKDAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

type CalendarCell = { date: Date; inMonth: boolean };

function getCalendarCells(year: number, month: number): CalendarCell[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: CalendarCell[] = [];
  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month, -i), inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), inMonth: false });
  }
  return cells;
}

type MonthCalendarProps = {
  year: number;
  month: number; // 0-11
  selectedDate: string;
  loggedDates: Set<string>;
  onSelectDate: (date: string) => void;
  onChangeMonth: (delta: -1 | 1) => void;
};

export function MonthCalendar({ year, month, selectedDate, loggedDates, onSelectDate, onChangeMonth }: MonthCalendarProps) {
  const cells = getCalendarCells(year, month);
  const monthLabel = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const weeks: CalendarCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Pressable onPress={() => { tapLight(); onChangeMonth(-1); }} hitSlop={12}>
          <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.monthLabelRow}>
          <Text style={styles.monthLabel}>{monthLabel}</Text>
          <Ionicons name="chevron-down" size={16} color={colors.textPrimary} />
        </View>
        <Pressable onPress={() => { tapLight(); onChangeMonth(1); }} hitSlop={12}>
          <Ionicons name="chevron-forward" size={20} color={colors.textPrimary} />
        </Pressable>
      </View>

      <View style={styles.weekdayRow}>
        {WEEKDAY_LABELS.map((label) => (
          <Text key={label} style={styles.weekdayLabel}>{label}</Text>
        ))}
      </View>

      <View style={styles.weeksContainer}>
        {weeks.map((week, i) => (
          <View key={i} style={styles.weekRow}>
            {week.map((cell) => {
              const key = dateKey(cell.date);
              const selected = key === selectedDate;
              const logged = loggedDates.has(key);
              return (
                <Pressable
                  key={key}
                  style={styles.dayCell}
                  onPress={() => { tap(); onSelectDate(key); }}
                >
                  <View style={[styles.dayCircle, selected && styles.dayCircleSelected]}>
                    <Text style={[styles.dayText, !cell.inMonth && styles.dayTextMuted, selected && styles.dayTextSelected]}>
                      {cell.date.getDate()}
                    </Text>
                  </View>
                  <View style={[styles.dot, logged && styles.dotVisible]} />
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: radii.lg,
    borderBottomRightRadius: radii.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  monthLabel: {
    ...typography.headline,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  weekdayRow: {
    flexDirection: 'row',
  },
  weekdayLabel: {
    flex: 1,
    textAlign: 'center',
    ...typography.micro,
    fontSize: 12,
    fontWeight: '500',
    color: '#B8B6BE',
  },
  weeksContainer: {
    gap: spacing.md * 0.75,
  },
  weekRow: {
    flexDirection: 'row',
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleSelected: {
    backgroundColor: colors.accent,
  },
  dayText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  dayTextMuted: {
    color: colors.textTertiary,
  },
  dayTextSelected: {
    color: colors.textInverse,
    fontWeight: '700',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: radii.full,
    backgroundColor: 'transparent',
  },
  dotVisible: {
    backgroundColor: colors.textPrimary,
  },
});
