import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { BottomSheet } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import { ChipGroup } from '@/components/ChipGroup';
import { colors, spacing, typography } from '@/theme/theme';
import { EQUIPMENT_LABELS, Equipment, GymProfile } from '@/types';

const EQUIPMENT_OPTIONS = (Object.keys(EQUIPMENT_LABELS) as Equipment[]).map((k) => ({ key: k, label: EQUIPMENT_LABELS[k] }));

type GymProfileSheetProps = {
  visible: boolean;
  onClose: () => void;
  profile?: GymProfile;
  onSave: (values: { name: string; availableEquipment: Equipment[] }) => void;
  onDelete?: () => void;
};

export function GymProfileSheet({ visible, onClose, profile, onSave, onDelete }: GymProfileSheetProps) {
  const [name, setName] = useState(profile?.name ?? '');
  const [equipment, setEquipment] = useState<Equipment[]>(profile?.availableEquipment ?? []);

  useEffect(() => {
    if (visible) {
      setName(profile?.name ?? '');
      setEquipment(profile?.availableEquipment ?? []);
    }
  }, [visible, profile]);

  function toggleEquipment(eq: Equipment) {
    setEquipment((prev) => (prev.includes(eq) ? prev.filter((e) => e !== eq) : [...prev, eq]));
  }

  return (
    <BottomSheet visible={visible} onClose={onClose} title={profile ? 'Edit Gym Profile' : 'New Gym Profile'}>
      <View style={styles.field}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Garage Gym"
          placeholderTextColor={colors.textTertiary}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Available Equipment</Text>
        <ChipGroup options={EQUIPMENT_OPTIONS} selected={equipment} onToggle={toggleEquipment} />
      </View>
      <Button
        label="Save"
        disabled={name.trim().length === 0}
        onPress={() => {
          onSave({ name: name.trim(), availableEquipment: equipment });
          onClose();
        }}
        style={{ marginTop: spacing.md }}
      />
      {onDelete ? (
        <Button
          label="Delete Profile"
          variant="danger"
          onPress={() => {
            onDelete();
            onClose();
          }}
          style={{ marginTop: spacing.sm }}
        />
      ) : null}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: colors.surfaceSunken,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
});
