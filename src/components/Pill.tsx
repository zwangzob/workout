import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radii, spacing, typography } from '@/theme/theme';

type PillProps = {
  label: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  tone?: 'neutral' | 'accent' | 'success';
  style?: ViewStyle;
};

export function Pill({ label, icon, onPress, tone = 'neutral', style }: PillProps) {
  const Wrapper = onPress ? Pressable : View;
  return (
    <Wrapper onPress={onPress} style={[styles.base, toneStyles[tone], style]}>
      {icon}
      <Text style={[styles.label, toneLabelStyles[tone], icon ? { marginLeft: spacing.xs } : null]}>{label}</Text>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radii.full,
  },
  label: {
    ...typography.caption,
    fontWeight: '500',
  },
});

const toneStyles = StyleSheet.create({
  neutral: { backgroundColor: colors.surfaceSunken },
  accent: { backgroundColor: colors.accent },
  success: { backgroundColor: colors.success },
});

const toneLabelStyles = StyleSheet.create({
  neutral: { color: colors.textPrimary },
  accent: { color: colors.textInverse },
  success: { color: colors.textInverse },
});
