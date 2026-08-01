import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LiquidGlassView } from '@/components/ui/liquid-glass-view';
import { Palette } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { withAlpha } from '@/utils/color';

interface GlassBadgeProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  className?: string;
}

export const GlassBadge = React.memo(function GlassBadge({
  label,
  icon,
  variant = 'primary',
  className = '',
}: GlassBadgeProps) {
  const { colors } = useTheme();
  const isPrimary = variant === 'primary';
  const isSuccess = variant === 'success';
  const isWarning = variant === 'warning';

  const badgeColor = isPrimary
    ? Palette.cyan
    : isSuccess
    ? Palette.emerald
    : isWarning
    ? Palette.amber
    : colors.secondaryText;

  const isTinted = isPrimary || isSuccess || isWarning;
  const glassTintColor = isTinted ? badgeColor : colors.glassSurfaceSubtle;
  const overlayColor = isTinted ? withAlpha(badgeColor, 0.18) : colors.glassSurfaceSubtle;

  return (
    <View className={`self-start flex-row items-center gap-1.5 px-3 py-1 rounded-full overflow-hidden relative ${className}`}>
      <LiquidGlassView blurLevel="subtle" tintColor={glassTintColor} specular={false} style={StyleSheet.absoluteFill} />
      {/* Tint sits above the blur, not beneath it, so the accent color reads through instead of being masked by the glass material. */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor }]} pointerEvents="none" />

      {icon && <Ionicons name={icon} size={12} color={badgeColor} />}

      <Text className="font-extrabold text-[11px] tracking-wider uppercase" style={{ color: badgeColor }}>
        {label}
      </Text>
    </View>
  );
});
