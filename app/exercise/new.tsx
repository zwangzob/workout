import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { ExerciseForm } from '@/components/ExerciseForm';
import { colors, spacing, typography } from '@/theme/theme';
import { useExerciseStore } from '@/store/exerciseStore';

export default function NewExerciseScreen() {
  const addExercise = useExerciseStore((s) => s.addExercise);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>New Exercise</Text>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </Pressable>
      </View>
      <ExerciseForm
        submitLabel="Add to Library"
        onSubmit={(values) => {
          addExercise(values);
          router.back();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
});
