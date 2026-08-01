import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { LiquidGlassView } from '@/components/ui/liquid-glass-view';
import { Palette } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface GlassHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onOpenScanner?: () => void;
  onOpenSettings?: () => void;
  className?: string;
}

export function GlassHeader({
  title = 'QRify',
  showBack = false,
  onBack,
  onOpenScanner,
  onOpenSettings,
  className = '',
}: GlassHeaderProps) {
  const { colors, shadows } = useTheme();

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  };

  return (
    <View
      style={[shadows.subtle, { backgroundColor: colors.glassSurface, borderColor: colors.border }]}
      className={`w-full z-50 border-b relative overflow-hidden ${className}`}>
      <LiquidGlassView blurLevel="header" tintColor={colors.glassSurface} style={StyleSheet.absoluteFill} />

      <View className="flex-row items-center justify-between px-5 py-3.5 w-full">
        <View className="flex-row items-center gap-3">
          {showBack ? (
            <Pressable
              onPress={() => {
                triggerHaptic();
                if (onBack) onBack();
              }}
              style={{ backgroundColor: colors.glassSurfaceSubtle, borderColor: colors.hairline }}
              className="w-9 h-9 rounded-full items-center justify-center border active:scale-95">
              <Ionicons name="arrow-back" size={20} color={Palette.cyan} />
            </Pressable>
          ) : null}
          <Text className="text-accent text-2xl font-extrabold tracking-tighter">{title}</Text>
        </View>

        <View className="flex-row items-center gap-2.5">
          {onOpenScanner && (
            <Pressable
              onPress={() => {
                triggerHaptic();
                onOpenScanner();
              }}
              className="w-9 h-9 rounded-full items-center justify-center bg-primary/10 border border-primary/20 active:scale-95">
              <Ionicons name="scan-outline" size={18} color={Palette.cyan} />
            </Pressable>
          )}

          {onOpenSettings && (
            <Pressable
              onPress={() => {
                triggerHaptic();
                onOpenSettings();
              }}
              style={{ backgroundColor: colors.glassSurfaceSubtle, borderColor: colors.hairline }}
              className="w-9 h-9 rounded-full items-center justify-center border active:scale-95">
              <Ionicons name="settings-outline" size={18} color={colors.secondaryText} />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
