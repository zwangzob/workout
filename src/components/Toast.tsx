import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '@/theme/theme';

type ToastProps = {
  message: string | null;
  onHide: () => void;
  durationMs?: number;
};

export function Toast({ message, onHide, durationMs = 2200 }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onHide, durationMs);
    return () => clearTimeout(timer);
  }, [message, durationMs, onHide]);

  if (!message) return null;

  return (
    <View style={styles.wrapper} pointerEvents="none">
      <Ionicons name="checkmark-circle" size={18} color={colors.textInverse} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.success,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  text: {
    ...typography.bodyStrong,
    color: colors.textInverse,
    flexShrink: 1,
  },
});
