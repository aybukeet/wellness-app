export const COLORS = {
  // Primary palette - soft pastel purple
  primary: '#9B7EC8',
  primaryLight: '#C4A8E0',
  primaryLighter: '#EDE0F7',
  primaryDark: '#7A5FAA',

  // Accent pastels
  accentPink: '#F2A7C3',
  accentPinkLight: '#FCE4EE',
  accentMint: '#A8D8C8',
  accentMintLight: '#D6F0E8',
  accentPeach: '#F5C4A0',
  accentPeachLight: '#FDE8D4',
  accentBlue: '#A8C4E0',
  accentBlueLight: '#D4E8F7',
  accentYellow: '#F5E0A0',
  accentYellowLight: '#FDF3D4',

  // Neutrals
  white: '#FFFFFF',
  background: '#FAF6FF',
  surface: '#FFFFFF',
  surfaceSecondary: '#F4EEF9',
  border: '#EAE0F5',

  // Text
  textPrimary: '#3D2B5E',
  textSecondary: '#7A6B95',
  textMuted: '#B0A0C8',
  textLight: '#D4C8E8',

  // Status
  success: '#7DC8A0',
  successLight: '#D4F0E4',
  warning: '#F5C84A',
  warningLight: '#FEF4C0',
  error: '#E87878',
  errorLight: '#FCE0E0',

  // Tabs / UI
  tabActive: '#9B7EC8',
  tabInactive: '#B0A0C8',
  shadow: 'rgba(155, 126, 200, 0.15)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const SHADOW = {
  small: {
    boxShadow: '0px 2px 6px rgba(155, 126, 200, 0.12)',
    elevation: 3,
  },
  medium: {
    boxShadow: '0px 4px 12px rgba(155, 126, 200, 0.18)',
    elevation: 5,
  },
} as const;

export const FONT = {
  regular: { fontWeight: '400' as const },
  medium: { fontWeight: '500' as const },
  semibold: { fontWeight: '600' as const },
  bold: { fontWeight: '700' as const },
};
