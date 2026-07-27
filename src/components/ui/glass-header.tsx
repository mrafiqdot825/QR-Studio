import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { BlurTokens, Palette, Shadows } from '@/constants/theme';

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
  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  };

  return (
    <View style={Shadows.subtle} className={`w-full z-50 bg-white/75 border-b border-black/[0.06] relative overflow-hidden ${className}`}>
      <BlurView
        intensity={BlurTokens.header}
        tint="light"
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.topSpecular} pointerEvents="none" />

      <View className="flex-row items-center justify-between px-5 py-3.5 w-full">
        <View className="flex-row items-center gap-3">
          {showBack ? (
            <Pressable
              onPress={() => {
                triggerHaptic();
                if (onBack) onBack();
              }}
              className="w-9 h-9 rounded-full items-center justify-center bg-black/5 border border-white/40 active:scale-95">
              <Ionicons name="arrow-back" size={20} color={Palette.accentBlue} />
            </Pressable>
          ) : null}
          <Text className="text-primary text-2xl font-extrabold tracking-tighter">{title}</Text>
        </View>

        <View className="flex-row items-center gap-2.5">
          {onOpenScanner && (
            <Pressable
              onPress={() => {
                triggerHaptic();
                onOpenScanner();
              }}
              className="w-9 h-9 rounded-full items-center justify-center bg-primary/10 border border-primary/20 active:scale-95">
              <Ionicons name="scan-outline" size={18} color={Palette.accentBlue} />
            </Pressable>
          )}

          {onOpenSettings && (
            <Pressable
              onPress={() => {
                triggerHaptic();
                onOpenSettings();
              }}
              className="w-9 h-9 rounded-full items-center justify-center bg-black/5 border border-white/40 active:scale-95">
              <Ionicons name="settings-outline" size={18} color={Palette.secondaryText} />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topSpecular: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Palette.glassSpecularTop,
  },
});
