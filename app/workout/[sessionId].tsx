import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { WorkoutBlockCard } from '@/components/WorkoutBlockCard';
import { RestTimerBar } from '@/components/RestTimerBar';
import { getDayEmoji } from '@/lib/dayEmoji';
import { colors, spacing, typography } from '@/theme/theme';
import { useSessionStore } from '@/store/sessionStore';
import { useProgramStore } from '@/store/programStore';
import { useRestTimerStore } from '@/store/restTimerStore';

export default function WorkoutSessionScreen() {
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const session = useSessionStore((s) => s.sessions.find((sess) => sess.id === sessionId));
  const completeSession = useSessionStore((s) => s.completeSession);
  const discardSession = useSessionStore((s) => s.discardSession);
  const advanceCursor = useProgramStore((s) => s.advanceCursor);
  const dismissTimer = useRestTimerStore((s) => s.dismiss);

  if (!session) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.title}>Workout not found</Text>
        <Button label="Go back" onPress={() => router.back()} style={{ marginTop: spacing.md }} />
      </SafeAreaView>
    );
  }

  function handleClose() {
    Alert.alert('Leave workout?', 'Your logged sets are saved. You can resume this workout later from Today.', [
      { text: 'Keep Logging', style: 'cancel' },
      { text: 'Leave', style: 'destructive', onPress: () => router.back() },
    ]);
  }

  function handleComplete() {
    completeSession(session!.id);
    advanceCursor();
    dismissTimer();
    router.back();
  }

  const totalSets = session.blocks.flatMap((b) => b.exercises).flatMap((e) => e.sets);
  const completedSets = totalSets.filter((s) => s.completedAt).length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={handleClose} hitSlop={12}>
          <Ionicons name="chevron-down" size={26} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>
            {getDayEmoji(session.dayLabel)} {session.dayLabel} {getDayEmoji(session.dayLabel)}
          </Text>
          <Text style={styles.subtitle}>
            {completedSets}/{totalSets.length} sets logged
          </Text>
        </View>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {session.blocks.map((block) => (
          <WorkoutBlockCard key={block.id} sessionId={session.id} block={block} />
        ))}
        <Button label="Complete Workout" size="lg" onPress={handleComplete} icon={<Ionicons name="checkmark" size={18} color={colors.textInverse} />} />
      </ScrollView>

      <RestTimerBar />
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
    paddingVertical: spacing.md,
  },
  headerCenter: {
    alignItems: 'center',
  },
  title: {
    ...typography.headline,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl * 2,
  },
});
