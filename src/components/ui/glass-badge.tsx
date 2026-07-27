import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BlurTokens, Palette } from '@/constants/theme';

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
  const isPrimary = variant === 'primary';
  const isSuccess = variant === 'success';
  const isWarning = variant === 'warning';

  const badgeColor = isPrimary
    ? Palette.accentBlue
    : isSuccess
    ? Palette.accentEmerald
    : isWarning
    ? Palette.accentOrange
    : Palette.secondaryText;

  const bgStyle = isPrimary
    ? 'bg-primary/10 border-primary/20'
    : isSuccess
    ? 'bg-emerald-500/10 border-emerald-500/20'
    : isWarning
    ? 'bg-amber-500/10 border-amber-500/20'
    : 'bg-black/5 border-black/10';

  return (
    <View
      className={`flex-row items-center gap-1.5 px-3 py-1 rounded-full border overflow-hidden relative ${bgStyle} ${className}`}>
      <BlurView
        intensity={BlurTokens.subtle}
        tint="light"
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.topSpecular} pointerEvents="none" />

      {icon && <Ionicons name={icon} size={12} color={badgeColor} />}

      <Text className="font-extrabold text-[11px] tracking-wider uppercase" style={{ color: badgeColor }}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topSpecular: {
    position: 'absolute',
    top: 0,
    left: 4,
    right: 4,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});
