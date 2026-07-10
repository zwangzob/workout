import { Modal, Pressable, ScrollView, StyleSheet, Text, TextStyle, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii, spacing, typography } from '@/theme/theme';

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxHeightRatio?: number;
  rightLabel?: string;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
  handleColor?: string;
  handleSpacing?: number;
  titleColor?: string;
  titleWeight?: TextStyle['fontWeight'];
};

export function BottomSheet({
  visible,
  onClose,
  title,
  children,
  maxHeightRatio = 0.8,
  rightLabel = 'Done',
  rightIcon,
  onRightPress,
  handleColor,
  handleSpacing,
  titleColor,
  titleWeight,
}: BottomSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={[styles.sheet, { maxHeight: `${maxHeightRatio * 100}%`, paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={[styles.handle, handleColor ? { backgroundColor: handleColor } : null, handleSpacing != null ? { marginBottom: handleSpacing } : null]} />
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              !rightLabel && styles.titleCentered,
              titleColor ? { color: titleColor } : null,
              titleWeight ? { fontWeight: titleWeight } : null,
            ]}
          >
            {title}
          </Text>
          {rightLabel ? (
            <Pressable onPress={onRightPress ?? onClose} hitSlop={12} style={styles.rightAction}>
              {rightIcon}
              <Text style={styles.done}>{rightLabel}</Text>
            </Pressable>
          ) : null}
        </View>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    paddingTop: spacing.sm,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: radii.full,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.headline,
    color: colors.textPrimary,
  },
  titleCentered: {
    flex: 1,
    textAlign: 'center',
  },
  rightAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  done: {
    ...typography.bodyStrong,
    color: colors.accent,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});
