import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheet } from '@/components/BottomSheet';
import { Card } from '@/components/Card';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { tap, tapLight } from '@/lib/haptics';

const FREQUENCY_OPTIONS = [3, 4, 5];

type ConfigurationSheetProps = {
  visible: boolean;
  onClose: () => void;
  currentDays: number;
  onSave: (days: number) => void;
};

export function ConfigurationSheet({ visible, onClose, currentDays, onSave }: ConfigurationSheetProps) {
  const [selected, setSelected] = useState(currentDays);

  useEffect(() => {
    if (visible) setSelected(currentDays);
  }, [visible, currentDays]);

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Configuration"
      rightLabel="Save"
      rightIcon={<Ionicons name="save-outline" size={16} color={colors.accent} />}
      onRightPress={() => {
        tap();
        onSave(selected);
        onClose();
      }}
    >
      <Card style={{ gap: spacing.md }} elevated>
        <Text style={styles.sectionLabel}>Select Training Frequency</Text>
        {FREQUENCY_OPTIONS.map((n) => {
          const active = n === selected;
          return (
            <Pressable key={n} onPress={() => { tapLight(); setSelected(n); }} style={[styles.row, active && styles.rowActive]}>
              <Text style={styles.rowLabel}>{n} Days</Text>
              {active ? (
                <View style={styles.check}>
                  <Ionicons name="checkmark" size={14} color={colors.textInverse} />
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </Card>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    ...typography.micro,
    color: colors.textTertiary,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  rowActive: {
    borderColor: colors.accent,
  },
  rowLabel: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: radii.full,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
