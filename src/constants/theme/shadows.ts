import { StyleSheet } from 'react-native';

export const AliceBlueShadows = StyleSheet.create({
  subtle: {
    boxShadow: '0px 4px 16px rgba(30, 42, 56, 0.08)',
    elevation: 2,
  },
  dock: {
    boxShadow: '0px 6px 20px rgba(30, 42, 56, 0.10)',
    elevation: 6,
  },
  modal: {
    boxShadow: '0px 10px 28px rgba(30, 42, 56, 0.12)',
    elevation: 12,
  },
  glowBlue: {
    boxShadow: '0px 4px 16px rgba(62, 111, 166, 0.15)',
    elevation: 4,
  },
});

export const MidnightShadows = AliceBlueShadows;
export const Shadows = AliceBlueShadows;

