import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { LiquidGlassColors } from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(0.96, { damping: 15, stiffness: 220 });
    }
  };

  const handlePressOut = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(1, { damping: 15, stiffness: 220 });
    }
  };

  const handlePress = () => {
    if (disabled || loading) return;
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    onPress();
  };

  const sizeClasses = {
    sm: 'px-4 py-2 rounded-xl text-xs gap-1.5',
    md: 'px-6 py-3.5 rounded-2xl text-sm gap-2',
    lg: 'px-8 py-4 rounded-3xl text-base gap-2.5',
  }[size];

  const variantClasses = {
    primary: 'bg-primary text-white shadow-md shadow-primary/20',
    secondary: 'bg-secondary text-white shadow-md shadow-secondary/20',
    glass: 'bg-white/80 border border-black/[0.06] text-on-surface shadow-sm',
    outline: 'bg-transparent border border-black/10 text-on-surface',
    ghost: 'bg-transparent text-primary',
  }[variant];

  const textColor = {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    glass: LiquidGlassColors.primaryText,
    outline: LiquidGlassColors.primaryText,
    ghost: LiquidGlassColors.accentBlue,
  }[variant];

  return (
    <Animated.View style={animatedStyle} className="w-full">
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={styles.btnShadow}
        className={`flex-row items-center justify-center font-bold relative overflow-hidden active:opacity-90 ${sizeClasses} ${variantClasses} ${
          disabled ? 'opacity-50' : ''
        } ${className}`}>
        {variant === 'glass' && (
          <BlurView
            intensity={Platform.OS === 'ios' ? 40 : 80}
            tint="light"
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
        )}

        {loading ? (
          <ActivityIndicator color={textColor} size="small" />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <Ionicons name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} color={textColor} />
            )}
            <Text
              style={{ color: textColor }}
              className={`font-semibold text-center ${
                size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
              }`}>
              {title}
            </Text>
            {icon && iconPosition === 'right' && (
              <Ionicons name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} color={textColor} />
            )}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  btnShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
});
