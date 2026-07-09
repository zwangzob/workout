const KEYWORD_EMOJI: [RegExp, string][] = [
  [/squat|leg/i, '🦵'],
  [/deadlift/i, '🏋️'],
  [/bench|chest|push/i, '💪'],
  [/pull|back|row/i, '🤙'],
  [/shoulder|ohp|press/i, '🙌'],
  [/arm|bicep|tricep/i, '💪'],
  [/full body/i, '🔥'],
  [/upper/i, '💪'],
  [/lower/i, '🦵'],
];

export function getDayEmoji(label: string): string {
  for (const [pattern, emoji] of KEYWORD_EMOJI) {
    if (pattern.test(label)) return emoji;
  }
  return '💪';
}
