import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '@/theme/theme';

type Segment = { key: string; label: string };

type SegmentedControlProps = {
  segments: Segment[];
  value: string;
  onChange: (key: string) => void;
};

export function SegmentedControl({ segments, value, onChange }: SegmentedControlProps) {
  return (
    <View style={styles.container}>
      {segments.map((segment) => {
        const active = segment.key === value;
        return (
          <Pressable
            key={segment.key}
            onPress={() => onChange(segment.key)}
            style={[styles.segment, active && styles.segmentActive]}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{segment.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.full,
    padding: 4,
  },
  segment: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  segmentActive: {
    borderColor: colors.accent,
  },
  label: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  labelActive: {
    color: colors.accent,
    fontWeight: '700',
  },
});
