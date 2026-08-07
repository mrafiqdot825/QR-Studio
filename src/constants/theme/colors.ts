// Alice Blue Design System palette — see AGENTS.md and user specification.
export const Palette = {
  background: '#F0F8FF',       // Alice Blue Background
  cardBackground: '#FFFFFF',   // Pure White Cards & Containers
  border: '#D6E4F0',           // Subtle Light Border
  primaryText: '#1E2A38',      // Deep Navy Slate Primary Text (never pure black)
  secondaryText: '#5C6B7A',    // Muted Slate Secondary Text
  accent: '#3E6FA6',           // Calm Blue Accent
  accentHover: '#345D8C',      // Hover state
  accentPressed: '#2E537E',    // Pressed state
  disabledBg: '#D6E4F0',       // Disabled background
  disabledText: '#5C6B7A',     // Disabled text
  cyan: '#3E6FA6',             // Legacy alias mapping to Accent
  softBlue: '#5C6B7A',         // Legacy alias
  iceBlue: '#D6E4F0',          // Legacy alias
  emerald: '#2E7D32',          // Success green
  amber: '#ED6C02',            // Warning amber
  coral: '#D32F2F',            // Error red
  onPrimary: '#FFFFFF',
  success: '#2E7D32',
  error: '#D32F2F',
  warning: '#ED6C02',
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
  accent: string;
  disabledBg: string;
  disabledText: string;
  glowPrimary: string;
  glowSecondary: string;
  glowTertiary: string;
}

export const AliceBlueScheme: AppScheme = {
  background: '#F0F8FF',
  secondaryBackground: '#E6F0FA',
  surface: '#FFFFFF',
  glassSurface: 'rgba(255, 255, 255, 0.90)',
  glassSurfaceHigh: 'rgba(255, 255, 255, 0.96)',
  glassSurfaceSubtle: 'rgba(255, 255, 255, 0.70)',
  border: '#D6E4F0',
  hairline: '#E2ECF5',
  hairlineSubtle: '#EDF4FA',
  specularTop: 'rgba(255, 255, 255, 0.80)',
  primaryText: '#1E2A38',
  secondaryText: '#5C6B7A',
  tertiaryText: '#8A99AD',
  accent: '#3E6FA6',
  disabledBg: '#D6E4F0',
  disabledText: '#5C6B7A',
  glowPrimary: 'rgba(62, 111, 166, 0.10)',
  glowSecondary: 'rgba(62, 111, 166, 0.06)',
  glowTertiary: 'rgba(62, 111, 166, 0.04)',
};

/** Alias for backward compatibility */
export const MidnightScheme = AliceBlueScheme;

/**
 * @deprecated Static snapshot kept for legacy call sites.
 * Prefer `useTheme().colors`, which resolves to the active scheme.
 */
export const GlassColors = {
  ...AliceBlueScheme,
  accentBlue: Palette.accent,
  accentEmerald: Palette.emerald,
  accentOrange: Palette.amber,
  success: Palette.success,
  error: Palette.error,
} as const;

