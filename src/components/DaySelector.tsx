import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { ProgramDay } from '@/types';

type DaySelectorProps = {
  days: ProgramDay[];
  currentIndex: number;
  completedDayIds: Set<string>;
  onSelect: (index: number) => void;
};

export function DaySelector({ days, currentIndex, completedDayIds, onSelect }: DaySelectorProps) {
  return (
    <View style={styles.row}>
      {days.map((day, index) => {
        const active = index === currentIndex;
        const completed = completedDayIds.has(day.id);
        return (
          <Pressable key={day.id} onPress={() => onSelect(index)} style={[styles.tile, active && styles.tileActive]}>
            <View style={[styles.check, completed ? styles.checkDone : styles.checkPending]}>
              <Ionicons name="checkmark" size={12} color={colors.textInverse} />
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>Day {index + 1}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  tile: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
  },
  tileActive: {
    borderColor: colors.accent,
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: {
    backgroundColor: colors.success,
  },
  checkPending: {
    backgroundColor: colors.border,
  },
  label: {
    ...typography.caption,
    fontWeight: '500',
    color: colors.textTertiary,
  },
  labelActive: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
});
