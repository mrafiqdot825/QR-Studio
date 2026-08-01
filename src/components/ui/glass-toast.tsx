import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { LiquidGlassView } from '@/components/ui/liquid-glass-view';
import { Palette, SpringConfigs } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface GlassToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'info' | 'warning';
  onHide?: () => void;
}

export function GlassToast({ visible, message, type = 'success', onHide }: GlassToastProps) {
  const { colors, shadows } = useTheme();
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withSpring(1, SpringConfigs.gentle);
      translateY.value = withSpring(0, SpringConfigs.bouncy);

      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      }

      const timer = setTimeout(() => {
        opacity.value = withSpring(0, SpringConfigs.gentle);
        translateY.value = withSpring(-100, SpringConfigs.gentle);
        if (onHide) onHide();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [visible, opacity, translateY, onHide]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  const iconName = type === 'success' ? 'checkmark-circle' : type === 'warning' ? 'warning' : 'information-circle';
  const iconColor = type === 'success' ? Palette.emerald : type === 'warning' ? Palette.amber : Palette.cyan;

  return (
    <Animated.View
      style={[shadows.dock, animatedStyle, styles.toastPosition]}
      className="z-50 self-center max-w-[90%]">
      <View
        style={{ backgroundColor: colors.glassSurfaceHigh, borderColor: colors.hairline }}
        className="flex-row items-center gap-2.5 px-5 py-3 rounded-full border overflow-hidden relative">
        <LiquidGlassView blurLevel="card" tintColor={colors.glassSurfaceHigh} specularInset={10} style={StyleSheet.absoluteFill} />

        <Ionicons name={iconName} size={18} color={iconColor} />
        <Text className="text-on-surface text-xs font-bold">{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastPosition: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    alignSelf: 'center',
  },
});
