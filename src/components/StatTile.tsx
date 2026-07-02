import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/Card';
import { colors, spacing, typography } from '@/theme/theme';

type StatTileProps = {
  label: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
};

export function StatTile({ label, value, trend, trendPositive = true }: StatTileProps) {
  return (
    <Card style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {trend ? (
        <Text style={[styles.trend, { color: trendPositive ? colors.success : colors.danger }]}>
          {trend}
        </Text>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    gap: spacing.xs,
  },
  label: {
    ...typography.micro,
    color: colors.textTertiary,
    textTransform: 'uppercase',
  },
  value: {
    ...typography.statValue,
    color: colors.textPrimary,
  },
  trend: {
    ...typography.caption,
  },
});
