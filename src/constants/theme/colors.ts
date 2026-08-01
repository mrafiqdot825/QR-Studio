// Midnight Blue accents — see AGENTS.md for the full design system spec.
export const Palette = {
  primary900: '#04172F',
  primary800: '#062045', // primary brand — CTAs, brand marks
  primary700: '#083060', // hover
  primary600: '#0A417B',
  primary500: '#145CA8',
  cyan: '#55D6FF', // selected state, active icons, focus rings, scanner
  softBlue: '#73B8FF', // secondary buttons, links, info
  iceBlue: '#CFEAFF', // small highlights, glass reflections
  emerald: '#39D98A', // success
  amber: '#F6C453', // warnings, premium
  coral: '#FF7A7A', // delete, errors
  onPrimary: '#FFFFFF',
  success: '#39D98A',
  error: '#FF7A7A',
  warning: '#F6C453',
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

export const MidnightScheme: AppScheme = {
  background: '#031528',
  secondaryBackground: '#062045',
  surface: 'rgba(255, 255, 255, 0.05)',
  glassSurface: 'rgba(255, 255, 255, 0.08)',
  glassSurfaceHigh: 'rgba(255, 255, 255, 0.12)',
  glassSurfaceSubtle: 'rgba(255, 255, 255, 0.05)',
  border: 'rgba(255, 255, 255, 0.14)',
  hairline: 'rgba(255, 255, 255, 0.10)',
  hairlineSubtle: 'rgba(255, 255, 255, 0.06)',
  specularTop: 'rgba(255, 255, 255, 0.18)',
  primaryText: '#FFFFFF',
  secondaryText: '#D4E3F5',
  tertiaryText: '#9CB2C9',
  glowPrimary: 'rgba(85, 214, 255, 0.18)',
  glowSecondary: 'rgba(57, 217, 138, 0.15)',
  glowTertiary: 'rgba(115, 184, 255, 0.15)',
};

/**
 * @deprecated Static snapshot kept for the handful of call sites still being migrated.
 * Prefer `useTheme().colors`, which resolves to the active scheme.
 */
export const GlassColors = {
  ...MidnightScheme,
  accentBlue: Palette.cyan,
  accentEmerald: Palette.emerald,
  accentOrange: Palette.amber,
  success: Palette.success,
  error: Palette.error,
} as const;
