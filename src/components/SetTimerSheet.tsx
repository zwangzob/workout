import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheet } from '@/components/BottomSheet';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { tap } from '@/lib/haptics';

const MINUTE_OPTIONS = Array.from({ length: 11 }, (_, i) => i);
const SECOND_OPTIONS = [0, 15, 30, 45];

function formatSuggested(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function nearest(value: number, options: number[]): number {
  return options.reduce((best, opt) => (Math.abs(opt - value) < Math.abs(best - value) ? opt : best));
}

export function SetTimerSheet({
  visible,
  onClose,
  suggestedSeconds,
  onStart,
}: {
  visible: boolean;
  onClose: () => void;
  suggestedSeconds: number;
  onStart: (totalSeconds: number) => void;
}) {
  const [minVal, setMinVal] = useState(0);
  const [secVal, setSecVal] = useState(0);

  const secondarySuggestion = suggestedSeconds === 60 ? 120 : 60;
  const suggestions = [suggestedSeconds, secondarySuggestion].sort((a, b) => a - b);

  useEffect(() => {
    if (!visible) return;
    setMinVal(nearest(Math.floor(suggestedSeconds / 60), MINUTE_OPTIONS));
    setSecVal(nearest(suggestedSeconds % 60, SECOND_OPTIONS));
  }, [visible, suggestedSeconds]);

  function startSuggested(seconds: number) {
    tap();
    onStart(seconds);
    onClose();
  }

  function handleStart() {
    const totalSeconds = minVal * 60 + secVal;
    if (totalSeconds <= 0) return;
    tap();
    onStart(totalSeconds);
    onClose();
  }

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Set a timer"
      rightLabel=""
      maxHeightRatio={0.75}
      handleColor={colors.textPrimary}
      handleSpacing={spacing.md * 2}
      titleWeight="500"
    >
      <Text style={styles.suggestedTimesLabel}>Suggested times:</Text>
      <View style={styles.suggestedRow}>
        {suggestions.map((seconds) => (
          <Pressable key={seconds} style={styles.suggestedPill} onPress={() => startSuggested(seconds)}>
            <Text style={styles.suggestedPillText}>{formatSuggested(seconds)}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.sectionLabel}>Suggested rest time: {formatSuggested(suggestedSeconds)}</Text>

      <View style={styles.pickerRow}>
        <Picker selectedValue={minVal} onValueChange={setMinVal} style={styles.picker} itemStyle={styles.pickerItem}>
          {MINUTE_OPTIONS.map((m) => (
            <Picker.Item key={m} label={`${String(m).padStart(2, '0')} min`} value={m} />
          ))}
        </Picker>
        <Picker selectedValue={secVal} onValueChange={setSecVal} style={styles.picker} itemStyle={styles.pickerItem}>
          {SECOND_OPTIONS.map((s) => (
            <Picker.Item key={s} label={`${String(s).padStart(2, '0')} sec`} value={s} />
          ))}
        </Picker>
      </View>

      <View style={styles.actionRow}>
        <Pressable style={styles.cancelButton} onPress={() => { tap(); onClose(); }}>
          <Text style={styles.cancelLabel}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startLabel}>Start</Text>
          <Ionicons name="play" size={16} color={colors.textInverse} />
        </Pressable>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  suggestedTimesLabel: {
    fontSize: typography.bodyStrong.fontSize,
    fontWeight: '500',
    color: colors.textPrimary,
    marginTop: spacing.xl,
  },
  suggestedRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  suggestedPill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.borderLavender,
    backgroundColor: colors.borderCool,
  },
  suggestedPillText: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  sectionLabel: {
    ...typography.body,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  pickerRow: {
    flexDirection: 'row',
    marginTop: spacing.md * 2,
  },
  picker: {
    flex: 1,
  },
  pickerItem: {
    fontSize: typography.headline.fontSize + 1,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  startButton: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radii.full,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.textInverse,
  },
});
