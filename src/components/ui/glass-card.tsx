import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Pressable, StyleSheet, View, ViewProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { LiquidGlassView } from '@/components/ui/liquid-glass-view';
import { Palette, SpringConfigs } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { withAlpha } from '@/utils/color';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  interactive?: boolean;
  glassTint?: 'dark' | 'light' | 'default' | 'extraLight';
  hasGlow?: boolean;
  glowColor?: string;
  isInteractive?: boolean;
}

export function GlassCard({
  children,
  className = '',
  onPress,
  interactive = false,
  glassTint = 'dark',
  hasGlow = false,
  glowColor = Palette.cyan,
  isInteractive,
  style,
  ...props
}: GlassCardProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (interactive || onPress) {
      scale.value = withSpring(0.97, SpringConfigs.gentle);
    }
  };

  const handlePressOut = () => {
    if (interactive || onPress) {
      scale.value = withSpring(1, SpringConfigs.gentle);
    }
  };

  const handlePress = () => {
    if (onPress) {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      }
      onPress();
    }
  };

  const containerStyle = React.useMemo(() => [
    { backgroundColor: colors.glassSurface, borderColor: colors.border },
    hasGlow && {
      borderColor: withAlpha(glowColor, 0.4),
      borderWidth: 1.5,
    },
    style,
  ], [colors.glassSurface, colors.border, hasGlow, glowColor, style]);

  const hairlineStyle = React.useMemo(() => ({ borderColor: colors.hairline }), [colors.hairline]);
  const resolvedInteractive = isInteractive ?? (interactive || !!onPress);

  if (onPress || interactive) {
    return (
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={containerStyle}
          className={`rounded-4xl border overflow-hidden relative ${className}`}
          {...props}>
          <LiquidGlassView
            blurLevel="card"
            glassTint={glassTint}
            tintColor={colors.glassSurface}
            isInteractive={resolvedInteractive}
            specularInset={12}
            style={StyleSheet.absoluteFill}
          />
          <View style={[styles.hairlineBorder, hairlineStyle]} pointerEvents="none" />
          {children}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <View
      style={containerStyle}
      className={`rounded-4xl border overflow-hidden relative ${className}`}
      {...props}>
      <LiquidGlassView
        blurLevel="card"
        glassTint={glassTint}
        tintColor={colors.glassSurface}
        specularInset={12}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.hairlineBorder, hairlineStyle]} pointerEvents="none" />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  hairlineBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 32,
    borderWidth: 1,
    pointerEvents: 'none',
  },
});
