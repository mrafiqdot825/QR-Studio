import React from 'react';
import { View, ViewProps } from 'react-native';

import { BlurTokens } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type BlurLevel = keyof typeof BlurTokens;

export interface LiquidGlassViewProps extends ViewProps {
  /** Drives surface intensity token. */
  blurLevel?: BlurLevel;
  /** Explicit glass style override (kept for API compatibility). */
  glassStyle?: string;
  /** Glass tint override (kept for API compatibility). */
  glassTint?: string;
  /** Tint color override. */
  tintColor?: string;
  /** Color scheme override (kept for API compatibility). */
  colorScheme?: string;
  /** Interactive state (kept for API compatibility). */
  isInteractive?: boolean;
  /** Specular highlight strip flag (kept for API compatibility). */
  specular?: boolean;
  /** Left/right inset for specular strip (kept for API compatibility). */
  specularInset?: number;
}

/**
 * Lightweight, solid surface replacement for the previous liquid-glass effects.
 * Eliminates blur layers, specular glare lines, and native glass overhead.
 */
export function LiquidGlassView({
  tintColor,
  isInteractive = false,
  style,
  ...props
}: LiquidGlassViewProps) {
  const { colors } = useTheme();
  const passthroughPointerEvents = isInteractive ? undefined : 'none';

  return (
    <View
      style={[
        { backgroundColor: tintColor ?? colors.surface },
        style,
      ]}
      pointerEvents={passthroughPointerEvents}
      {...props}
    />
  );
}
