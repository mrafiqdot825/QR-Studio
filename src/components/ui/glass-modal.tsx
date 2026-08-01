import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { LiquidGlassView } from '@/components/ui/liquid-glass-view';
import { SpringConfigs } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface GlassModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  variant?: 'modal' | 'sheet';
}

export function GlassModal({
  visible,
  onClose,
  title,
  children,
  variant = 'modal',
}: GlassModalProps) {
  const { colors, shadows } = useTheme();
  const translateY = useSharedValue(300);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withSpring(1, SpringConfigs.gentle);
      translateY.value = withSpring(0, SpringConfigs.modal);
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      }
    } else {
      opacity.value = withSpring(0, SpringConfigs.gentle);
      translateY.value = withSpring(300, SpringConfigs.gentle);
    }
  }, [visible, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  if (!visible) return null;

  const isSheet = variant === 'sheet';

  return (
    <Modal transparent visible={visible} onRequestClose={onClose} animationType="fade">
      <View className="flex-1 justify-end items-center relative">
        {/* Backdrop Blur — the bg-black/30 layer sits behind the glass on every path,
            giving the backdrop its dimming even where BlurView/GlassView are purely translucent. */}
        <Pressable
          accessibilityLabel="Close modal overlay"
          accessibilityRole="button"
          onPress={onClose}
          className="absolute inset-0 bg-black/30">
          <LiquidGlassView
            blurLevel="modal"
            glassTint="dark"
            colorScheme="dark"
            specular={false}
            style={StyleSheet.absoluteFill}
          />
        </Pressable>

        {/* Floating Glass Container */}
        <Animated.View
          style={[
            shadows.modal,
            { backgroundColor: colors.glassSurfaceHigh },
            animatedStyle,
            isSheet ? styles.sheetRadius : styles.modalRadius,
          ]}
          className="w-full max-w-[540px] overflow-hidden mb-0 sm:mb-6 relative max-h-[85%]">
          <LiquidGlassView
            blurLevel="card"
            tintColor={colors.glassSurfaceHigh}
            specular={false}
            style={StyleSheet.absoluteFill}
          />

          {/* Sheet Handle */}
          {isSheet && <View style={{ backgroundColor: colors.border }} className="w-12 h-1.5 rounded-full self-center mt-3 mb-1" />}

          {/* Header */}
          <View style={{ borderColor: colors.border }} className="flex-row items-center justify-between px-6 pt-4 pb-3 border-b">
            {title ? (
              <Text className="text-on-surface text-xl font-extrabold tracking-tight">{title}</Text>
            ) : (
              <View />
            )}
            <Pressable
              accessibilityLabel="Close button"
              accessibilityRole="button"
              onPress={() => {
                if (Platform.OS !== 'web') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                }
                onClose();
              }}
              style={{ backgroundColor: colors.glassSurfaceSubtle }}
              className="w-8 h-8 rounded-full items-center justify-center active:opacity-70">
              <Ionicons name="close" size={18} color={colors.secondaryText} />
            </Pressable>
          </View>

          {/* Content */}
          <ScrollView
            className="flex-shrink"
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            bounces={false}>
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheetRadius: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderBottomLeftRadius: Platform.OS === 'web' ? 36 : 0,
    borderBottomRightRadius: Platform.OS === 'web' ? 36 : 0,
  },
  modalRadius: {
    borderRadius: 36,
  },
  contentContainer: {
    padding: 24,
  },
});
