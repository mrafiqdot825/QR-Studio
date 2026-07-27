import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { BlurTokens, Palette, Shadows, SpringConfigs } from '@/constants/theme';

interface GlassChipProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  selected?: boolean;
  onPress?: () => void;
  className?: string;
}

export function GlassChip({
  label,
  icon,
  selected = false,
  onPress,
  className = '',
}: GlassChipProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.94, SpringConfigs.gentle);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, SpringConfigs.gentle);
  };

  const handlePress = () => {
    if (onPress) {
      if (Platform.OS !== 'web') {
        Haptics.selectionAsync().catch(() => {});
      }
      onPress();
    }
  };

  return (
    <Animated.View style={[selected ? Shadows.glowBlue : Shadows.subtle, animatedStyle]}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className={`px-4 py-2.5 rounded-full flex-row items-center gap-2 border overflow-hidden relative ${
          selected
            ? 'bg-primary border-primary'
            : 'bg-white/80 border-white/40'
        } ${className}`}>
        {!selected && (
          <BlurView
            intensity={BlurTokens.subtle}
            tint="light"
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
        )}
        <View style={styles.topSpecular} pointerEvents="none" />

        {icon && (
          <Ionicons
            name={icon}
            size={16}
            color={selected ? '#FFFFFF' : Palette.accentBlue}
          />
        )}

        <Text
          className={`text-xs font-bold ${
            selected ? 'text-white' : 'text-on-surface'
          }`}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  topSpecular: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});
