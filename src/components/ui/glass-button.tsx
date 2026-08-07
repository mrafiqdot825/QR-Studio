import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View, ViewProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { Palette, SpringConfigs } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

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

export const GlassButton = React.memo(function GlassButton({
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
  const { colors } = useTheme();
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

  const iconColor = isPrimary ? '#FFFFFF' : colors.accent;

  const surfaceStyle = isPrimary
    ? { backgroundColor: disabled ? colors.disabledBg : colors.accent }
    : isSecondary
    ? { backgroundColor: colors.surface, borderColor: colors.border }
    : isGlass
    ? { backgroundColor: colors.glassSurfaceSubtle, borderColor: colors.border }
    : undefined;

  return (
    <Animated.View className="rounded-2xl" style={[animatedStyle, style]}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={surfaceStyle}
        className={`px-6 py-3.5 rounded-2xl flex-row items-center justify-center gap-2 relative overflow-hidden ${
          isPrimary
            ? ''
            : isSecondary || isGlass
            ? 'border'
            : 'bg-transparent'
        } ${className}`}
        {...props}>

        {icon && iconPosition === 'left' && (
          <Ionicons name={icon} size={18} color={iconColor} />
        )}

        {title ? (
          <Text
            className={`font-bold text-sm tracking-wide ${
              isPrimary ? 'text-white' : 'text-on-surface'
            }`}
            style={disabled ? { color: colors.disabledText } : undefined}>
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
});
