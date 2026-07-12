import { useEffect, useState } from 'react';
import { LayoutAnimation, Platform, Pressable, StyleSheet, Text, UIManager, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SetTimerSheet } from '@/components/SetTimerSheet';
import { colors, radii, shadow, spacing, typography } from '@/theme/theme';
import { useRestTimerStore } from '@/store/restTimerStore';
import { useActiveBlockStore } from '@/store/activeBlockStore';
import { tap } from '@/lib/haptics';
import type { SessionBlock } from '@/types';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BOUNCE_ANIMATION = {
  duration: 5000,
  create: { type: LayoutAnimation.Types.spring, property: LayoutAnimation.Properties.scaleXY, springDamping: 0.55 },
  update: { type: LayoutAnimation.Types.spring, springDamping: 0.55 },
  delete: { type: LayoutAnimation.Types.spring, property: LayoutAnimation.Properties.scaleXY, springDamping: 0.55 },
};

function formatClock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

type TailMode = 'icons' | 'stopwatch' | 'precountdown' | 'countdown';

export function WorkoutFloatingToolbar({ blocks }: { blocks: SessionBlock[] }) {
  const restTimerActive = useRestTimerStore((s) => s.totalSeconds > 0);
  const activeBlockId = useActiveBlockStore((s) => s.activeBlockId);

  const [tailMode, setTailMode] = useState<TailMode>('icons');
  const [timerSheetOpen, setTimerSheetOpen] = useState(false);

  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  const [precountdown, setPrecountdown] = useState(3);
  const [countdownTotal, setCountdownTotal] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const activeBlock = blocks.find((b) => b.id === activeBlockId) ?? blocks[0];
  const suggestedSeconds = activeBlock?.restSeconds ?? 90;

  useEffect(() => {
    if (tailMode !== 'stopwatch' || !running) return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [tailMode, running]);

  useEffect(() => {
    if (tailMode !== 'precountdown') return;
    if (precountdown <= 1) {
      const timeout = setTimeout(() => {
        LayoutAnimation.configureNext(BOUNCE_ANIMATION);
        setTailMode('countdown');
        setRemaining(countdownTotal);
      }, 1000);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setPrecountdown((p) => p - 1), 1000);
    return () => clearTimeout(timeout);
  }, [tailMode, precountdown, countdownTotal]);

  useEffect(() => {
    if (tailMode !== 'countdown') return;
    if (remaining <= 0) return;
    const interval = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(interval);
  }, [tailMode, remaining]);

  function openStopwatch() {
    LayoutAnimation.configureNext(BOUNCE_ANIMATION);
    setTailMode('stopwatch');
    setElapsed(0);
    setRunning(false);
  }

  function beginCountdown(totalSeconds: number) {
    LayoutAnimation.configureNext(BOUNCE_ANIMATION);
    setCountdownTotal(totalSeconds);
    setPrecountdown(3);
    setTailMode('precountdown');
  }

  function resetTail() {
    LayoutAnimation.configureNext(BOUNCE_ANIMATION);
    setTailMode('icons');
    setRunning(false);
    setElapsed(0);
    setRemaining(0);
  }

  return (
    <View style={[styles.wrapper, restTimerActive && styles.wrapperLifted]} pointerEvents="box-none">
      <View style={styles.bar}>
        <Pressable style={styles.button} onPress={tap}>
          <Ionicons name="book-outline" size={18} color={colors.accent} />
        </Pressable>
        <Pressable style={styles.button} onPress={tap}>
          <Ionicons name="pencil-outline" size={18} color={colors.accent} />
        </Pressable>

        {tailMode === 'icons' ? (
          <>
            <Pressable style={styles.button} onPress={() => { tap(); setTimerSheetOpen(true); }}>
              <Ionicons name="time-outline" size={18} color={colors.accent} />
            </Pressable>
            <Pressable style={styles.button} onPress={() => { tap(); openStopwatch(); }}>
              <Ionicons name="timer-outline" size={18} color={colors.accent} />
            </Pressable>
          </>
        ) : null}

        {tailMode === 'stopwatch' ? (
          <View style={[styles.stopwatchPill, running && styles.pillRunning]}>
            <Pressable style={styles.stopwatchButton} onPress={() => { tap(); setRunning((r) => !r); }}>
              <Ionicons name={running ? 'pause' : 'play'} size={16} color={colors.textPrimary} />
            </Pressable>
            <Text style={styles.pillTime}>{formatClock(elapsed)}</Text>
            <Pressable style={styles.stopwatchButton} onPress={() => { tap(); resetTail(); }}>
              <Ionicons name="close" size={16} color={colors.textPrimary} />
            </Pressable>
          </View>
        ) : null}

        {tailMode === 'precountdown' ? (
          <View style={styles.stopwatchPill}>
            <Pressable style={styles.stopwatchButton} onPress={() => { tap(); resetTail(); }}>
              <Ionicons name="stop" size={16} color={colors.textPrimary} />
            </Pressable>
            <Text style={styles.pillTime}>{precountdown}</Text>
            <Ionicons name="chevron-up" size={16} color={colors.textPrimary} />
          </View>
        ) : null}

        {tailMode === 'countdown' ? (
          <View style={[styles.stopwatchPill, styles.pillRunning]}>
            <Pressable style={styles.stopwatchButton} onPress={() => { tap(); resetTail(); }}>
              <Ionicons name="stop" size={16} color={colors.textPrimary} />
            </Pressable>
            <Text style={styles.pillTime}>{formatClock(remaining)}</Text>
            <Ionicons name="chevron-up" size={16} color={colors.textPrimary} />
          </View>
        ) : null}
      </View>

      <SetTimerSheet
        visible={timerSheetOpen}
        onClose={() => setTimerSheetOpen(false)}
        suggestedSeconds={suggestedSeconds}
        onStart={beginCountdown}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: spacing.lg,
    alignItems: 'center',
  },
  wrapperLifted: {
    bottom: 96,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.borderCool,
    borderRadius: radii.full,
    borderWidth: 2,
    borderColor: colors.accent,
    padding: spacing.xs,
    ...shadow.card,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopwatchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(228, 84, 79, 0.3)',
    borderRadius: radii.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  pillRunning: {
    backgroundColor: colors.danger,
  },
  stopwatchButton: {
    width: 34,
    height: 34,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillTime: {
    ...typography.headline,
    color: colors.textPrimary,
  },
});
