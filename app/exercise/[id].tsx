import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ExerciseForm } from '@/components/ExerciseForm';
import { colors, spacing, typography } from '@/theme/theme';
import { useExerciseStore } from '@/store/exerciseStore';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const exercise = useExerciseStore((s) => s.exercises.find((e) => e.id === id));
  const updateExercise = useExerciseStore((s) => s.updateExercise);
  const removeExercise = useExerciseStore((s) => s.removeExercise);

  if (!exercise) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.title}>Exercise not found</Text>
      </SafeAreaView>
    );
  }

  function handleDelete() {
    Alert.alert('Delete exercise?', `"${exercise!.name}" will be removed from your library.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          removeExercise(exercise!.id);
          router.back();
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Exercise</Text>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </Pressable>
      </View>
      <ExerciseForm
        initial={exercise}
        submitLabel="Save Changes"
        onSubmit={(values) => {
          updateExercise(exercise.id, values);
          router.back();
        }}
        onDelete={handleDelete}
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
