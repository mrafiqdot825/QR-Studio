import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Pressable, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { LiquidGlassView } from '@/components/ui/liquid-glass-view';
import { Palette, SpringConfigs } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

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

export const GlassCard = React.memo(function GlassCard({
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
    { backgroundColor: colors.glassSurface },
    style,
  ], [colors.glassSurface, style]);

  // Only the flex-sizing properties (not borders/shadows/backgrounds, which
  // belong on the rounded Pressable below) need to reach this outer wrapper —
  // it's the element that actually participates in a parent's flex-wrap grid,
  // so a caller's flexBasis/flexGrow must land here to size the item correctly.
  const outerLayoutStyle = React.useMemo((): ViewStyle => {
    const flat = (StyleSheet.flatten(style) ?? {}) as ViewStyle;
    const { flexBasis, flexGrow, flexShrink, width, minWidth, maxWidth } = flat;
    return { flexBasis, flexGrow, flexShrink, width, minWidth, maxWidth };
  }, [style]);

  const resolvedInteractive = isInteractive ?? (interactive || !!onPress);

  if (onPress || interactive) {
    return (
      <Animated.View style={[animatedStyle, outerLayoutStyle]}>
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={containerStyle}
          className={`rounded-4xl overflow-hidden relative ${className}`}
          {...props}>
          <LiquidGlassView
            blurLevel="card"
            glassTint={glassTint}
            tintColor={colors.glassSurface}
            isInteractive={resolvedInteractive}
            specular={false}
            style={StyleSheet.absoluteFill}
          />
          {children}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <View
      style={containerStyle}
      className={`rounded-4xl overflow-hidden relative ${className}`}
      {...props}>
      <LiquidGlassView
        blurLevel="card"
        glassTint={glassTint}
        tintColor={colors.glassSurface}
        specular={false}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
});
