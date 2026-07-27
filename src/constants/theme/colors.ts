export const Palette = {
  // Soft Liquid Glass Background Palette
  pearlWhite: '#FAF5FF',
  iceWhite: '#F8FAFC',
  cloudWhite: '#FAFAFA',
  frostGrey: '#F1F5F9',
  skyBlue: '#F0F9FF',
  softLavender: '#F5F3FF',
  mistGreen: '#ECFDF5',

  // Glass Speculars & Borders
  glassSpecularTop: 'rgba(255, 255, 255, 0.95)',
  glassHairlineLight: 'rgba(255, 255, 255, 0.35)',
  glassHairlineSubtle: 'rgba(255, 255, 255, 0.20)',
  glassBorderLight: 'rgba(0, 0, 0, 0.06)',
  glassBorderSubtle: 'rgba(0, 0, 0, 0.04)',

  // Accent Colors
  accentBlue: '#2563EB',
  accentEmerald: '#10B981',
  accentViolet: '#7C3AED',
  accentOrange: '#F59E0B',
  accentRose: '#F43F5E',
  accentSky: '#0284C7',
  accentPurple: '#A855F7',
  premiumGold: '#C9A227',

  // System Text
  primaryText: '#111827',
  secondaryText: '#6B7280',
  tertiaryText: '#9CA3AF',
  onPrimary: '#FFFFFF',
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
} as const;

export const GlassColors = {
  background: Palette.cloudWhite,
  secondaryBackground: Palette.frostGrey,
  surface: '#FFFFFF',
  glassSurface: 'rgba(255, 255, 255, 0.75)',
  glassSurfaceHigh: 'rgba(255, 255, 255, 0.88)',
  glassSurfaceSubtle: 'rgba(255, 255, 255, 0.60)',
  border: Palette.glassBorderLight,
  hairline: Palette.glassHairlineLight,
  primaryText: Palette.primaryText,
  secondaryText: Palette.secondaryText,
  tertiaryText: Palette.tertiaryText,

  // Accents
  accentBlue: Palette.accentBlue,
  accentEmerald: Palette.accentEmerald,
  accentViolet: Palette.accentViolet,
  accentOrange: Palette.accentOrange,
  premiumGold: Palette.premiumGold,
  success: Palette.success,
  error: Palette.error,

  // Glows
  glowPrimary: 'rgba(37, 99, 235, 0.15)',
  glowSecondary: 'rgba(16, 185, 129, 0.15)',
  glowTertiary: 'rgba(124, 58, 237, 0.15)',
} as const;
