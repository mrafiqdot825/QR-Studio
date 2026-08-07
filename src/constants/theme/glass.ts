import { StyleSheet } from 'react-native';
import { AliceBlueScheme, AppScheme, Palette } from './colors';

export interface GlassMaterial {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

function buildMaterials(scheme: AppScheme): Record<'card' | 'cardHigh' | 'pill' | 'dock' | 'input' | 'modal', GlassMaterial> {
  return {
    card: {
      backgroundColor: scheme.glassSurface,
      borderColor: scheme.border,
      borderWidth: 1,
    },
    cardHigh: {
      backgroundColor: scheme.glassSurfaceHigh,
      borderColor: scheme.border,
      borderWidth: 1,
    },
    pill: {
      backgroundColor: scheme.glassSurfaceHigh,
      borderColor: scheme.hairline,
      borderWidth: 1,
    },
    dock: {
      backgroundColor: scheme.glassSurfaceHigh,
      borderColor: scheme.border,
      borderWidth: 1,
    },
    input: {
      backgroundColor: scheme.glassSurfaceSubtle,
      borderColor: scheme.border,
      borderWidth: 1,
    },
    modal: {
      backgroundColor: scheme.glassSurfaceHigh,
      borderColor: scheme.hairline,
      borderWidth: 1,
    },
  };
}

export const GlassMaterials = buildMaterials(AliceBlueScheme);

function buildGlassStyles(scheme: AppScheme) {
  return StyleSheet.create({
    specularTop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1,
      backgroundColor: scheme.specularTop,
    },
    specularTopRounded: {
      position: 'absolute',
      top: 0,
      left: 16,
      right: 16,
      height: 1,
      backgroundColor: scheme.specularTop,
    },
    ambientGlowPrimary: {
      shadowColor: Palette.accent,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.10,
      shadowRadius: 16,
    },
  });
}

export const GlassStyles = buildGlassStyles(AliceBlueScheme);

