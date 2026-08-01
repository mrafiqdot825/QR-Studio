import { BlurView, type BlurTint } from 'expo-blur';
import { GlassView, type GlassColorScheme, type GlassStyle } from 'expo-glass-effect';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { BlurTokens } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useLiquidGlassAvailable } from '@/hooks/use-liquid-glass-available';

type BlurLevel = keyof typeof BlurTokens;

// Apple's HIG intent: `clear` for thin chrome sitting directly over content (nav bars,
// chips, badges, toasts), `regular` for surfaces that need the adaptive-legibility material
// because they float over arbitrary content (cards, inputs, docks, modals).
const GLASS_STYLE_BY_BLUR_LEVEL: Record<BlurLevel, GlassStyle> = {
  subtle: 'clear',
  header: 'clear',
  card: 'regular',
  dock: 'regular',
  modal: 'regular',
};

export interface LiquidGlassViewProps extends ViewProps {
  /** Drives BlurView intensity on the fallback path and the glassEffectStyle bucket natively. */
  blurLevel?: BlurLevel;
  /** Explicit native glass style override; otherwise derived from `blurLevel`. */
  glassStyle?: GlassStyle;
  /** BlurView `tint` override for the fallback path. Defaults to the active theme scheme. */
  glassTint?: BlurTint;
  /** Tint color forwarded to the native GlassView. Ignored on the fallback path. */
  tintColor?: string;
  /** Forwarded to the native GlassView so it syncs with the app's own theme toggle instead of the system appearance. */
  colorScheme?: GlassColorScheme;
  /** Makes the glass visually react to touch. No-op on the fallback path (Pressables there already animate). */
  isInteractive?: boolean;
  /** Whether to draw the manual specular highlight strip on the fallback path. Native glass has its own. */
  specular?: boolean;
  /** Left/right inset for the fallback specular strip. */
  specularInset?: number;
}

export function LiquidGlassView({
  blurLevel = 'card',
  glassStyle,
  glassTint,
  tintColor,
  colorScheme,
  isInteractive = false,
  specular = true,
  specularInset = 0,
  style,
  ...props
}: LiquidGlassViewProps) {
  const { colors } = useTheme();
  const isNativeGlassAvailable = useLiquidGlassAvailable();
  // Decorative (non-interactive) usage must let touches pass through to sibling/parent
  // Pressables; interactive glass needs to receive touches itself to react.
  const passthroughPointerEvents = isInteractive ? undefined : 'none';

  if (isNativeGlassAvailable) {
    return (
      <GlassView
        glassEffectStyle={glassStyle ?? GLASS_STYLE_BY_BLUR_LEVEL[blurLevel]}
        tintColor={tintColor}
        colorScheme={colorScheme ?? 'dark'}
        isInteractive={isInteractive}
        style={style}
        pointerEvents={passthroughPointerEvents}
        {...props}
      />
    );
  }

  return (
    <View style={style} pointerEvents={passthroughPointerEvents} {...props}>
      <BlurView
        intensity={BlurTokens[blurLevel]}
        tint={glassTint ?? 'dark'}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {specular && (
        <View
          style={[
            styles.specularTop,
            { left: specularInset, right: specularInset, backgroundColor: colors.specularTop },
          ]}
          pointerEvents="none"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  specularTop: {
    position: 'absolute',
    top: 0,
    height: 1,
  },
});
