import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
  const overlayColor = isTinted ? withAlpha(badgeColor, 0.16) : colors.glassSurfaceSubtle;
  const borderColor = isTinted ? withAlpha(badgeColor, 0.3) : colors.hairline;

  return (
    <View
      style={{ backgroundColor: overlayColor, borderColor }}
      className={`self-start flex-row items-center gap-1.5 px-3 py-1 rounded-full border overflow-hidden relative ${className}`}>
      {icon && <Ionicons name={icon} size={12} color={badgeColor} />}

      <Text className="font-extrabold text-[11px] tracking-wider uppercase" style={{ color: badgeColor }}>
        {label}
      </Text>
    </View>
  );
});
