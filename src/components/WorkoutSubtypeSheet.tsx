import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheet } from '@/components/BottomSheet';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { WORKOUT_SUBTYPE_GROUPS, WORKOUT_SUBTYPE_LABELS } from '@/types';
import type { WorkoutSubtype } from '@/types';
import { tap, tapLight } from '@/lib/haptics';

type WorkoutSubtypeSheetProps = {
  visible: boolean;
  onClose: () => void;
  value: WorkoutSubtype;
  onSelect: (value: WorkoutSubtype) => void;
};

function groupForValue(value: WorkoutSubtype): string {
  return WORKOUT_SUBTYPE_GROUPS.find((g) => g.options.includes(value))?.key ?? WORKOUT_SUBTYPE_GROUPS[0].key;
}

export function WorkoutSubtypeSheet({ visible, onClose, value, onSelect }: WorkoutSubtypeSheetProps) {
  const [selected, setSelected] = useState(value);
  const [expandedGroup, setExpandedGroup] = useState(groupForValue(value));

  useEffect(() => {
    if (!visible) return;
    setSelected(value);
    setExpandedGroup(groupForValue(value));
  }, [visible, value]);

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Workout Subtype"
      titleWeight="500"
      onRightPress={() => {
        tap();
        onSelect(selected);
        onClose();
      }}
    >
      {WORKOUT_SUBTYPE_GROUPS.map((group) => {
        const expanded = group.key === expandedGroup;
        const showAsPrescribed = expanded && group.asPrescribedSuffix && selected === group.options[0];

        return (
          <View key={group.key} style={styles.group}>
            <Pressable
              style={styles.groupHeader}
              onPress={() => {
                tapLight();
                setExpandedGroup(group.key);
              }}
            >
              <Text style={styles.groupLabel}>
                {group.label.toUpperCase()}
                {showAsPrescribed ? <Text style={styles.groupLabelSuffix}> ({group.asPrescribedSuffix})</Text> : null}
              </Text>
              <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textPrimary} />
            </Pressable>

            {expanded
              ? group.options.map((option) => {
                  const active = option === selected;
                  return (
                    <Pressable
                      key={option}
                      style={styles.option}
                      onPress={() => {
                        tapLight();
                        setSelected(option);
                      }}
                    >
                      <Text style={styles.optionLabel}>{WORKOUT_SUBTYPE_LABELS[option]}</Text>
                      {active ? (
                        <View style={styles.checkCircle}>
                          <Ionicons name="checkmark" size={14} color={colors.textInverse} />
                        </View>
                      ) : null}
                    </Pressable>
                  );
                })
              : null}
          </View>
        );
      })}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  group: {
    borderWidth: 1.5,
    borderColor: colors.textPrimary,
    borderRadius: radii.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  groupLabel: {
    ...typography.body,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  groupLabelSuffix: {
    textTransform: 'none',
    fontWeight: '300',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundLavender,
    borderWidth: 1,
    borderColor: colors.borderLavender,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  optionLabel: {
    ...typography.body,
    fontWeight: '300',
    color: colors.textPrimary,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: radii.full,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
