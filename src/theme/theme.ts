export const colors = {
  background: '#F6F5F2',
  backgroundLavender: '#F3F1F9',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceSunken: '#EDECE7',
  border: '#E4E2DB',
  borderSubtle: '#ECEAE4',
  borderStrong: '#A8A395',
  borderCool: '#DCE1E8',
  borderLavender: '#C9C3DE',

  textPrimary: '#1C1B1F',
  textSecondary: '#6F6E76',
  textTertiary: '#9C9AA3',
  textInverse: '#FFFFFF',

  accent: '#5B57E8',
  accentMuted: 'rgba(91, 87, 232, 0.12)',
  accentDim: '#8683EF',

  success: '#2FB871',
  successMuted: 'rgba(47, 184, 113, 0.14)',
  warning: '#E29A2E',
  warningMuted: 'rgba(226, 154, 46, 0.14)',
  danger: '#E4544F',
  dangerMuted: 'rgba(228, 84, 79, 0.12)',

  overlay: 'rgba(20, 18, 30, 0.45)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 26,
  full: 999,
} as const;

export const typography = {
  display: { fontSize: 32, fontWeight: '700' as const, letterSpacing: 0 },
  title: { fontSize: 22, fontWeight: '400' as const, letterSpacing: 0 },
  headline: { fontSize: 18, fontWeight: '600' as const, letterSpacing: 0 },
  body: { fontSize: 15, fontWeight: '400' as const },
  bodyStrong: { fontSize: 15, fontWeight: '600' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
  micro: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 0.4 },
  statValue: { fontSize: 26, fontWeight: '700' as const, letterSpacing: 0 },
} as const;

export const shadow = {
  card: {
    shadowColor: '#1C1B1F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

export const theme = { colors, spacing, radii, typography, shadow };

export type Theme = typeof theme;
