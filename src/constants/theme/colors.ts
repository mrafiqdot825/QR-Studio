// Scheme-independent brand accents — same hue in light and dark, tuned for contrast on both.
export const Palette = {
  accentBlue: '#2563EB',
  accentEmerald: '#10B981',
  accentViolet: '#7C3AED',
  accentOrange: '#F59E0B',
  accentRose: '#F43F5E',
  accentSky: '#0284C7',
  accentPurple: '#A855F7',
  premiumGold: '#C9A227',
  onPrimary: '#FFFFFF',
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
} as const;

export interface AppScheme {
  background: string;
  secondaryBackground: string;
  surface: string;
  glassSurface: string;
  glassSurfaceHigh: string;
  glassSurfaceSubtle: string;
  border: string;
  hairline: string;
  hairlineSubtle: string;
  specularTop: string;
  primaryText: string;
  secondaryText: string;
  tertiaryText: string;
  glowPrimary: string;
  glowSecondary: string;
  glowTertiary: string;
}

export const LightScheme: AppScheme = {
  background: '#FAFAFA',
  secondaryBackground: '#F1F5F9',
  surface: '#FFFFFF',
  glassSurface: 'rgba(255, 255, 255, 0.75)',
  glassSurfaceHigh: 'rgba(255, 255, 255, 0.88)',
  glassSurfaceSubtle: 'rgba(255, 255, 255, 0.60)',
  border: 'rgba(0, 0, 0, 0.06)',
  hairline: 'rgba(255, 255, 255, 0.35)',
  hairlineSubtle: 'rgba(255, 255, 255, 0.20)',
  specularTop: 'rgba(255, 255, 255, 0.95)',
  primaryText: '#111827',
  secondaryText: '#6B7280',
  tertiaryText: '#9CA3AF',
  glowPrimary: 'rgba(37, 99, 235, 0.15)',
  glowSecondary: 'rgba(16, 185, 129, 0.15)',
  glowTertiary: 'rgba(124, 58, 237, 0.15)',
};

// Dark Liquid Glass keeps a thin light rim/specular for edge definition — a pure black
// border would make glass surfaces disappear against a dark background.
export const DarkScheme: AppScheme = {
  background: '#0B0D12',
  secondaryBackground: '#14171D',
  surface: '#1C1F26',
  glassSurface: 'rgba(32, 35, 42, 0.72)',
  glassSurfaceHigh: 'rgba(42, 46, 54, 0.85)',
  glassSurfaceSubtle: 'rgba(24, 26, 32, 0.55)',
  border: 'rgba(255, 255, 255, 0.09)',
  hairline: 'rgba(255, 255, 255, 0.16)',
  hairlineSubtle: 'rgba(255, 255, 255, 0.08)',
  specularTop: 'rgba(255, 255, 255, 0.20)',
  primaryText: '#F3F4F6',
  secondaryText: '#9BA3AF',
  tertiaryText: '#6B7280',
  glowPrimary: 'rgba(59, 130, 246, 0.28)',
  glowSecondary: 'rgba(16, 185, 129, 0.24)',
  glowTertiary: 'rgba(167, 139, 250, 0.26)',
};

export const Schemes = { light: LightScheme, dark: DarkScheme } as const;
export type SchemeName = keyof typeof Schemes;

/**
 * @deprecated Static light-only snapshot kept for the handful of call sites still being
 * migrated. Prefer `useTheme().colors`, which adapts to the active scheme.
 */
export const GlassColors = {
  ...LightScheme,
  accentBlue: Palette.accentBlue,
  accentEmerald: Palette.accentEmerald,
  accentViolet: Palette.accentViolet,
  accentOrange: Palette.accentOrange,
  premiumGold: Palette.premiumGold,
  success: Palette.success,
  error: Palette.error,
} as const;
