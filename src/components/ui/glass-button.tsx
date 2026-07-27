import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View, ViewProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { BlurTokens, Palette, Shadows, SpringConfigs } from '@/constants/theme';

interface GlassButtonProps extends ViewProps {
  children?: React.ReactNode;
  title?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  onPress?: () => void;
  className?: string;
  disabled?: boolean;
}

export function GlassButton({
  children,
  title,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  onPress,
  className = '',
  disabled = false,
  style,
  ...props
}: GlassButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: disabled ? 0.5 : 1,
    };
  });

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.95, SpringConfigs.gentle);
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      scale.value = withSpring(1, SpringConfigs.gentle);
    }
  };

  const handlePress = () => {
    if (onPress && !disabled) {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      }
      onPress();
    }
  };

  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';
  const isGlass = variant === 'glass';

  const iconColor = isPrimary ? '#FFFFFF' : Palette.accentBlue;

  return (
    <Animated.View style={[animatedStyle, isPrimary ? Shadows.glowBlue : Shadows.subtle, style]}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        className={`px-6 py-3.5 rounded-full flex-row items-center justify-center gap-2 relative overflow-hidden ${
          isPrimary
            ? 'bg-primary'
            : isSecondary
            ? 'bg-white/80 border border-black/[0.06]'
            : isGlass
            ? 'bg-white/60 border border-white/40'
            : 'bg-transparent'
        } ${className}`}
        {...props}>
        {(isSecondary || isGlass) && (
          <BlurView
            intensity={BlurTokens.subtle}
            tint="light"
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
        )}
        <View style={styles.topHighlight} pointerEvents="none" />

        {icon && iconPosition === 'left' && (
          <Ionicons name={icon} size={18} color={iconColor} />
        )}

        {title ? (
          <Text
            className={`font-bold text-sm tracking-wide ${
              isPrimary ? 'text-white' : 'text-on-surface'
            }`}>
            {title}
          </Text>
        ) : (
          children
        )}

        {icon && iconPosition === 'right' && (
          <Ionicons name={icon} size={18} color={iconColor} />
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});
