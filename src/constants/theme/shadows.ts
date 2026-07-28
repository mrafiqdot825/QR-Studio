import { StyleSheet } from 'react-native';

// Uses `boxShadow` (New Architecture) instead of the legacy `shadow*` props —
// `shadow*` logs a deprecation warning on every style flattening pass, and under
// this app's animation-heavy re-render volume that warning volume was enough to
// exhaust the Hermes JS heap via the console/inspector's JSON serialization path.
export const LightShadows = StyleSheet.create({
  subtle: {
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.03)',
    elevation: 2,
  },
  card: {
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.05)',
    elevation: 5,
  },
  dock: {
    boxShadow: '0px 16px 28px rgba(0, 0, 0, 0.08)',
    elevation: 10,
  },
  modal: {
    boxShadow: '0px 20px 36px rgba(0, 0, 0, 0.12)',
    elevation: 16,
  },
  heroStage: {
    boxShadow: '0px 18px 32px rgba(0, 0, 0, 0.07)',
    elevation: 12,
  },
  glowBlue: {
    boxShadow: '0px 8px 18px rgba(37, 99, 235, 0.25)',
    elevation: 8,
  },
});

// Black drop-shadows read as almost invisible on a dark background, so dark elevation
// leans on `elevation` (Android) plus each glass surface's own light hairline/specular
// rim for depth instead of a stronger shadow.
export const DarkShadows = StyleSheet.create({
  subtle: {
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    elevation: 2,
  },
  card: {
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.35)',
    elevation: 5,
  },
  dock: {
    boxShadow: '0px 16px 28px rgba(0, 0, 0, 0.45)',
    elevation: 10,
  },
  modal: {
    boxShadow: '0px 20px 36px rgba(0, 0, 0, 0.55)',
    elevation: 16,
  },
  heroStage: {
    boxShadow: '0px 18px 32px rgba(0, 0, 0, 0.4)',
    elevation: 12,
  },
  glowBlue: {
    boxShadow: '0px 8px 18px rgba(59, 130, 246, 0.35)',
    elevation: 8,
  },
});

export const ShadowSets = { light: LightShadows, dark: DarkShadows } as const;

/** @deprecated Light-only snapshot — prefer `useTheme().shadows`. */
export const Shadows = LightShadows;
