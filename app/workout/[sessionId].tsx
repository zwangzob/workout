import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { WorkoutBlockCard } from '@/components/WorkoutBlockCard';
import { RestTimerBar } from '@/components/RestTimerBar';
import { getDayEmoji } from '@/lib/dayEmoji';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { useSessionStore } from '@/store/sessionStore';
import { useProgramStore } from '@/store/programStore';
import { useRestTimerStore } from '@/store/restTimerStore';

export default function WorkoutSessionScreen() {
  const insets = useSafeAreaInsets();
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const session = useSessionStore((s) => s.sessions.find((sess) => sess.id === sessionId));
  const completeSession = useSessionStore((s) => s.completeSession);
  const discardSession = useSessionStore((s) => s.discardSession);
  const program = useProgramStore((s) => s.programs.find((p) => p.id === session?.programId));
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

  let dayNumber: number | undefined;
  for (const week of program?.weeks ?? []) {
    const idx = week.days.findIndex((d) => d.id === session.programDayId);
    if (idx !== -1) {
      dayNumber = idx + 1;
      break;
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={[]}>
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>{getDayEmoji(session.dayLabel)}</Text>

        <View style={[styles.heroTopRow, { paddingTop: insets.top + spacing.sm }]}>
          <Pressable onPress={handleClose} hitSlop={12} style={styles.heroIconButton}>
            <Ionicons name="chevron-down" size={22} color={colors.textPrimary} />
          </Pressable>
          <View style={styles.heroIconButton}>
            <Ionicons name="settings" size={18} color={colors.accent} />
          </View>
        </View>

        <View style={styles.heroBottom}>
          {dayNumber != null ? (
            <View style={styles.dayBadge}>
              <Text style={styles.dayBadgeText}>Day {dayNumber}</Text>
            </View>
          ) : null}
          <Text style={styles.heroTitle}>
            {getDayEmoji(session.dayLabel)} {session.dayLabel}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {session.blocks.map((block, idx) => (
          <WorkoutBlockCard key={block.id} sessionId={session.id} block={block} blockNumber={idx + 1} />
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
  hero: {
    backgroundColor: colors.textPrimary,
    overflow: 'hidden',
    paddingBottom: spacing.lg,
  },
  heroEmoji: {
    position: 'absolute',
    fontSize: 160,
    opacity: 0.15,
    top: -20,
    right: -20,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  heroIconButton: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBottom: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.xs,
  },
  dayBadge: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
  },
  dayBadgeText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textInverse,
  },
  heroTitle: {
    ...typography.display,
    fontSize: 26,
    color: colors.textInverse,
    textAlign: 'center',
  },
  title: {
    ...typography.headline,
    color: colors.textPrimary,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl * 2,
  },
});
