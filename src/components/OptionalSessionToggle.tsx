import { StyleSheet, Switch, Text, View } from 'react-native';
import { Card } from '@/components/Card';
import { colors, spacing, typography } from '@/theme/theme';

export function OptionalSessionToggle({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.switchGroup}>
          <Text style={styles.switchLabel}>Add to workout</Text>
          <Switch
            value={value}
            onValueChange={onChange}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.surface}
            ios_backgroundColor={colors.border}
          />
        </View>
      </View>
      {value ? (
        <Card style={styles.card} elevated>
          <Text style={styles.description}>{description}</Text>
        </Card>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    ...typography.body,
    color: colors.textPrimary,
  },
  switchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  switchLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  card: {
    marginTop: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
