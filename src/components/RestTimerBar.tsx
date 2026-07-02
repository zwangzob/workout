import { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as Notifications from 'expo-notifications';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { colors, radii, shadow, spacing, typography } from '@/theme/theme';
import { useRestTimerStore } from '@/store/restTimerStore';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

async function scheduleCompletionNotification(seconds: number) {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const request = await Notifications.requestPermissionsAsync();
      if (request.status !== 'granted') return null;
    }
    return await Notifications.scheduleNotificationAsync({
      content: { title: 'Rest complete', body: 'Time for your next set.' },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds, repeats: false },
    });
  } catch {
    return null;
  }
}

export function RestTimerBar() {
  const { totalSeconds, remainingSeconds, isRunning, exerciseLabel } = useRestTimerStore();
  const { tick, pause, resume, addSeconds, dismiss } = useRestTimerStore();
  const notificationId = useRef<string | null>(null);
  const hasFiredHaptic = useRef(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  useEffect(() => {
    if (totalSeconds > 0) {
      activateKeepAwakeAsync('rest-timer');
    } else {
      deactivateKeepAwake('rest-timer');
    }
    return () => {
      deactivateKeepAwake('rest-timer');
    };
  }, [totalSeconds > 0]);

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      scheduleCompletionNotification(remainingSeconds).then((id) => {
        notificationId.current = id;
      });
      hasFiredHaptic.current = false;
    } else if (notificationId.current) {
      Notifications.cancelScheduledNotificationAsync(notificationId.current).catch(() => {});
      notificationId.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  useEffect(() => {
    if (remainingSeconds === 0 && totalSeconds > 0 && !hasFiredHaptic.current) {
      hasFiredHaptic.current = true;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
  }, [remainingSeconds, totalSeconds]);

  if (totalSeconds === 0) return null;

  const progress = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;
  const done = remainingSeconds === 0;

  return (
    <View style={styles.wrapper}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>{done ? 'Rest complete' : `Resting${exerciseLabel ? ` • ${exerciseLabel}` : ''}`}</Text>
          <Text style={styles.time}>{formatTime(remainingSeconds)}</Text>
        </View>
        <View style={styles.controls}>
          {!done ? (
            <>
              <Pressable style={styles.iconButton} onPress={() => addSeconds(15)}>
                <Text style={styles.iconButtonText}>+15s</Text>
              </Pressable>
              <Pressable style={styles.iconButton} onPress={() => (isRunning ? pause() : resume())}>
                <Ionicons name={isRunning ? 'pause' : 'play'} size={18} color={colors.textPrimary} />
              </Pressable>
            </>
          ) : null}
          <Pressable style={styles.iconButton} onPress={dismiss}>
            <Ionicons name="close" size={18} color={colors.textPrimary} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    overflow: 'hidden',
    ...shadow.card,
  },
  progressTrack: {
    height: 3,
    backgroundColor: colors.borderSubtle,
  },
  progressFill: {
    height: 3,
    backgroundColor: colors.accent,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  time: {
    ...typography.title,
    color: colors.textPrimary,
  },
  controls: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
