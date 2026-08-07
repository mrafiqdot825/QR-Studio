import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { LiquidGlassView } from '@/components/ui/liquid-glass-view';
import { Palette, SpringConfigs } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface GlassInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onClear?: () => void;
  className?: string;
  style?: any;
}

export function GlassInput({
  label,
  icon,
  onClear,
  value,
  onChangeText,
  placeholder,
  className = '',
  style,
  ...props
}: GlassInputProps) {
  const { colors, shadows } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const focusProgress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: focusProgress.value === 1 ? colors.accent : colors.border,
      borderWidth: focusProgress.value === 1 ? 1.5 : 1,
    };
  });

  const handleFocus = () => {
    setIsFocused(true);
    focusProgress.value = withSpring(1, SpringConfigs.gentle);
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync().catch(() => {});
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusProgress.value = withSpring(0, SpringConfigs.gentle);
  };

  return (
    <View className={`w-full gap-1.5 ${className}`}>
      {label ? (
        <Text className="text-on-surface-variant text-xs font-semibold px-1 tracking-wider uppercase">
          {label}
        </Text>
      ) : null}

      <Animated.View
        style={[shadows.subtle, { backgroundColor: colors.surface }, animatedStyle, style]}
        className="flex-row items-center px-4 py-3 rounded-2xl overflow-hidden relative gap-2.5">
        <LiquidGlassView blurLevel="card" tintColor={colors.surface} specular={false} style={StyleSheet.absoluteFill} />

        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={isFocused ? colors.accent : colors.secondaryText}
          />
        )}

        <TextInput
          className="flex-1 text-on-surface font-medium text-sm p-0 m-0"
          placeholder={placeholder}
          placeholderTextColor={colors.secondaryText}
          selectionColor={colors.accent}
          cursorColor={colors.accent}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {value && value.length > 0 && onClear && (
          <Pressable
            onPress={() => {
              if (Platform.OS !== 'web') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              }
              onClear();
            }}
            className="p-1 rounded-full active:bg-black/5">
            <Ionicons name="close-circle" size={18} color={colors.secondaryText} />
          </Pressable>
        )}
      </Animated.View>
    </View>
  );
}
