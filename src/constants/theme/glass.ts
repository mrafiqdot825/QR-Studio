import { StyleSheet } from 'react-native';
import { Palette } from './colors';

export const GlassMaterials = {
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderColor: Palette.glassBorderLight,
    borderWidth: 1,
  },
  cardHigh: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderColor: Palette.glassBorderLight,
    borderWidth: 1,
  },
  pill: {
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    borderColor: Palette.glassHairlineLight,
    borderWidth: 1,
  },
  dock: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderColor: Palette.glassBorderLight,
    borderWidth: 1,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.70)',
    borderColor: Palette.glassBorderLight,
    borderWidth: 1,
  },
  modal: {
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    borderColor: Palette.glassHairlineLight,
    borderWidth: 1,
  },
} as const;

export const GlassStyles = StyleSheet.create({
  specularTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Palette.glassSpecularTop,
  },
  specularTopRounded: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    height: 1,
    backgroundColor: Palette.glassSpecularTop,
  },
  ambientGlowPrimary: {
    shadowColor: Palette.accentBlue,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
  },
});
