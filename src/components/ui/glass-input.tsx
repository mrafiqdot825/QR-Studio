import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
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

import { BlurTokens, Palette, SpringConfigs } from '@/constants/theme';
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
  const { colors, shadows, isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const focusProgress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: focusProgress.value === 1 ? Palette.accentBlue : colors.border,
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
        style={[shadows.subtle, { backgroundColor: colors.glassSurface }, animatedStyle, style]}
        className="flex-row items-center px-4 py-3 rounded-2xl overflow-hidden relative gap-2.5">
        <BlurView
          intensity={BlurTokens.card}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        <View style={[styles.topSpecular, { backgroundColor: colors.specularTop }]} pointerEvents="none" />

        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={isFocused ? Palette.accentBlue : colors.secondaryText}
          />
        )}

        <TextInput
          className="flex-1 text-on-surface font-medium text-sm p-0 m-0"
          placeholder={placeholder}
          placeholderTextColor={colors.secondaryText}
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

const styles = StyleSheet.create({
  topSpecular: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: 1,
  },
});
