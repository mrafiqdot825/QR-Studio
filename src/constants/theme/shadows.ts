import { StyleSheet } from 'react-native';

// Uses `boxShadow` (New Architecture) instead of the legacy `shadow*` props —
// `shadow*` logs a deprecation warning on every style flattening pass, and under
// this app's animation-heavy re-render volume that warning volume was enough to
// exhaust the Hermes JS heap via the console/inspector's JSON serialization path.
export const MidnightShadows = StyleSheet.create({
  subtle: {
    boxShadow: '0px 8px 18px rgba(0, 0, 0, 0.18)',
    elevation: 2,
  },
  dock: {
    boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.22)',
    elevation: 10,
  },
  modal: {
    boxShadow: '0px 20px 45px rgba(0, 0, 0, 0.30)',
    elevation: 16,
  },
  glowBlue: {
    boxShadow: '0px 8px 18px rgba(85, 214, 255, 0.35)',
    elevation: 8,
  },
});

export const Shadows = MidnightShadows;
