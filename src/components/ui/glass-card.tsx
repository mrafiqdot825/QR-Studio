import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Pressable, StyleSheet, View, ViewProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { BlurTokens, Palette, Shadows, SpringConfigs } from '@/constants/theme';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  interactive?: boolean;
  blurIntensity?: number;
  glassTint?: 'light' | 'default' | 'extraLight';
  hasGlow?: boolean;
  glowColor?: string;
}

export function GlassCard({
  children,
  className = '',
  onPress,
  interactive = false,
  blurIntensity = BlurTokens.card,
  glassTint = 'light',
  hasGlow = false,
  glowColor = Palette.accentBlue,
  style,
  ...props
}: GlassCardProps) {
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

  const containerStyle = [
    Shadows.card,
    hasGlow && {
      shadowColor: glowColor,
      shadowOpacity: 0.18,
      shadowRadius: 24,
    },
    style,
  ];

  if (onPress || interactive) {
    return (
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={containerStyle}
          className={`rounded-4xl bg-white/75 border border-white/40 overflow-hidden relative ${className}`}
          {...props}>
          <BlurView
            intensity={blurIntensity}
            tint={glassTint}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          <View style={styles.specularTop} pointerEvents="none" />
          <View style={styles.hairlineBorder} pointerEvents="none" />
          {children}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={containerStyle}
      className={`rounded-4xl bg-white/75 border border-white/40 overflow-hidden relative ${className}`}
      {...props}>
      <BlurView
        intensity={blurIntensity}
        tint={glassTint}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.specularTop} pointerEvents="none" />
      <View style={styles.hairlineBorder} pointerEvents="none" />
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  specularTop: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: 1,
    backgroundColor: Palette.glassSpecularTop,
    zIndex: 1,
  },
  hairlineBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: Palette.glassHairlineLight,
    pointerEvents: 'none',
  },
});
