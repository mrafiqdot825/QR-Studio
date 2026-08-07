import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { GlassBadge } from '@/components/ui/glass-badge';
import { LiquidGlassView } from '@/components/ui/liquid-glass-view';
import { Palette, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface ScannerModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ScannerModal({ visible, onClose }: ScannerModalProps) {
  const { colors, shadows } = useTheme();
  const [torch, setTorch] = useState(false);
  const scanLineY = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scanLineY.value = withRepeat(
        withSequence(
          withTiming(200, { duration: 2000 }),
          withTiming(0, { duration: 2000 })
        ),
        -1,
        true
      );
    } else {
      cancelAnimation(scanLineY);
    }
    return () => cancelAnimation(scanLineY);
  }, [visible, scanLineY]);

  const animatedScanLine = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLineY.value }],
  }));

  const handleSimulateScan = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
    const scannedCode = 'https://qrstudio.me/demo-scanned-access';

    Alert.alert(
      'QR Code Scanned!',
      `Payload: ${scannedCode}`,
      [{ text: 'Done', onPress: onClose }]
    );
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View className="flex-1 bg-black justify-between p-6 relative">
        {/* TOP FLOATING GLASS CONTROL BAR */}
        <View className="flex-row items-center justify-between pt-12 z-50">
          <Pressable
            accessibilityLabel="Close scanner"
            accessibilityRole="button"
            onPress={() => {
              if (Platform.OS !== 'web') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              }
              onClose();
            }}
            className="w-11 h-11 rounded-full items-center justify-center bg-white/20 border border-white/30 active:scale-95">
            <Ionicons name="close" size={22} color="#FFFFFF" />
          </Pressable>

          <GlassBadge label="CAMERA SCANNER ACTIVE" variant="primary" />

          <Pressable
            accessibilityLabel={torch ? 'Turn off torch' : 'Turn on torch'}
            accessibilityRole="button"
            onPress={() => {
              setTorch(!torch);
              if (Platform.OS !== 'web') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
              }
            }}
            className={`w-11 h-11 rounded-full items-center justify-center border ${
              torch ? 'bg-amber-400 border-amber-300' : 'bg-white/20 border-white/30'
            }`}>
            <Ionicons name={torch ? 'flash' : 'flash-outline'} size={20} color={torch ? '#000000' : '#FFFFFF'} />
          </Pressable>
        </View>

        {/* SCANNING TARGET FRAME WITH GLASS SCAN LINE */}
        <View className="self-center items-center justify-center relative">
          <View className="w-64 h-64 rounded-4xl border-2 border-white/40 overflow-hidden relative justify-center items-center bg-white/5">
            <LiquidGlassView blurLevel="subtle" colorScheme="dark" specular={false} style={StyleSheet.absoluteFill} />

            {/* CORNER BRACKETS */}
            <View style={{ borderColor: colors.accent }} className="absolute top-3 left-3 w-6 h-6 border-t-4 border-l-4 rounded-tl-xl" />
            <View style={{ borderColor: colors.accent }} className="absolute top-3 right-3 w-6 h-6 border-t-4 border-r-4 rounded-tr-xl" />
            <View style={{ borderColor: colors.accent }} className="absolute bottom-3 left-3 w-6 h-6 border-b-4 border-l-4 rounded-bl-xl" />
            <View style={{ borderColor: colors.accent }} className="absolute bottom-3 right-3 w-6 h-6 border-b-4 border-r-4 rounded-br-xl" />

            {/* ANIMATED GLASS SCAN LINE */}
            <Animated.View
              style={[
                shadows.glowBlue,
                animatedScanLine,
                { position: 'absolute', top: 20, left: 10, right: 10, height: 3, backgroundColor: colors.accent, borderRadius: 2 },
              ]}
            />
          </View>

          <Text className="text-white/80 font-medium text-xs text-center mt-6 tracking-wide">
            Position QR code inside the frame to scan automatically
          </Text>
        </View>

        {/* BOTTOM ACTION BAR */}
        <View className="pb-8 items-center gap-3">
          <Pressable
            accessibilityLabel="Test scan payload"
            accessibilityRole="button"
            onPress={handleSimulateScan}
            style={[styles.scanButtonShadow, { backgroundColor: colors.accent }]}
            className="flex-row items-center gap-2 px-8 py-4 rounded-full active:scale-95">
            <Ionicons name="scan" size={20} color="#FFFFFF" />
            <Text className="text-white font-extrabold text-sm tracking-wider">TEST SCAN PAYLOAD</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scanButtonShadow: {
    boxShadow: '0px 6px 20px rgba(62, 111, 166, 0.3)',
  },
});
