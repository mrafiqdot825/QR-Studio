import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';

import { LiquidGlassColors } from '@/constants/theme';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
  intensity?: number;
  borderRadius?: number;
  glowColor?: string;
  gradientColors?: readonly [string, string, ...string[]];
  showGlow?: boolean;
}

export function LiquidGlassCard({
  children,
  style,
  className = '',
  intensity = 30,
  borderRadius = 32,
  glowColor = LiquidGlassColors.glowPrimary,
  gradientColors = ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.02)', 'rgba(0, 0, 0, 0.25)'],
  showGlow = false,
}: LiquidGlassCardProps) {
  return (
    <View className={`relative overflow-visible ${className}`} style={[{ borderRadius }, style]}>
      {showGlow ? (
        <View
          className="absolute inset-1 shadow-2xl elevation-10"
          style={{
            borderRadius,
            shadowColor: glowColor,
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.5,
            shadowRadius: 24,
          }}
        />
      ) : null}

      <View
        className="relative overflow-hidden bg-surface-low border border-white/10"
        style={[{ borderRadius }]}>
        <BlurView
          intensity={Platform.OS === 'ios' ? intensity : 80}
          tint="dark"
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />

        <LinearGradient
          colors={gradientColors as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />

        <View className="absolute top-0 left-0 right-0 h-px bg-white/20" pointerEvents="none" />

        <View className="relative z-10">{children}</View>
      </View>
    </View>
  );
}
