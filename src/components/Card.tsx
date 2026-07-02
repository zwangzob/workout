import { StyleSheet, View, ViewProps } from 'react-native';
import { colors, radii, shadow, spacing } from '@/theme/theme';

type CardProps = ViewProps & {
  elevated?: boolean;
  padded?: boolean;
};

export function Card({ style, elevated, padded = true, ...rest }: CardProps) {
  return (
    <View
      style={[
        styles.base,
        elevated && styles.elevated,
        padded && styles.padded,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  elevated: {
    ...shadow.card,
    borderColor: colors.borderSubtle,
  },
  padded: {
    padding: spacing.lg,
  },
});
