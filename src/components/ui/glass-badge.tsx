import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LiquidGlassView } from '@/components/ui/liquid-glass-view';
import { Palette } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface GlassBadgeProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  className?: string;
}

export function GlassBadge({
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

  const bgStyle = isPrimary
    ? 'bg-primary/10 border-primary/20'
    : isSuccess
    ? 'bg-emerald-500/10 border-emerald-500/20'
    : isWarning
    ? 'bg-amber-500/10 border-amber-500/20'
    : 'border';

  return (
    <View
      style={!isPrimary && !isSuccess && !isWarning ? { backgroundColor: colors.glassSurfaceSubtle, borderColor: colors.border } : undefined}
      className={`flex-row items-center gap-1.5 px-3 py-1 rounded-full border overflow-hidden relative ${bgStyle} ${className}`}>
      <LiquidGlassView blurLevel="subtle" tintColor={colors.glassSurfaceSubtle} specularInset={4} style={StyleSheet.absoluteFill} />

      {icon && <Ionicons name={icon} size={12} color={badgeColor} />}

      <Text className="font-extrabold text-[11px] tracking-wider uppercase" style={{ color: badgeColor }}>
        {label}
      </Text>
    </View>
  );
}
