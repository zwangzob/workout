import * as Haptics from 'expo-haptics';

/** A firm tactile tap for button presses. Swallows errors since haptics
 * aren't available on web/simulator. */
export function tap() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
}

/** A lighter tap for smaller/secondary controls (steppers, checkmarks). */
export function tapLight() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}
