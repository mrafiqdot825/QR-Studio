import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { GlassBadge } from "@/components/ui/glass-badge";
import { GlassShimmer } from "@/components/ui/glass-shimmer";
import { LiquidGlassView } from "@/components/ui/liquid-glass-view";
import {
  CinematicPresets,
  Palette,
  PresetId,
  SpringConfigs,
} from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

const { width } = Dimensions.get("window");
const STAGE_SIZE = Math.min(width * 0.85, 340);

interface QRStage3DProps {
  value: string;
  presetId: PresetId;
  qrRef: React.RefObject<unknown>;
  title?: string;
  typeLabel?: string;
  onExport?: () => void;
  fgColor?: string;
}

export function QRStage3D({
  value,
  presetId,
  qrRef,
  title = "QRify Code",
  typeLabel = "URL Link",
  onExport,
  fgColor,
}: QRStage3DProps) {
  const { colors } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useSharedValue(0);

  const currentPreset =
    CinematicPresets.find((p) => p.id === presetId) || CinematicPresets[0];

  const effectiveQrColor = fgColor || currentPreset.qrColor;

  const handleFlip = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    const nextState = !isFlipped;
    setIsFlipped(nextState);
    flipAnim.value = withSpring(nextState ? 1 : 0, SpringConfigs.flip);
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipAnim.value, [0, 1], [0, 180]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: "hidden",
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipAnim.value, [0, 1], [180, 360]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: "hidden",
    };
  });

  const validValue = value.trim() || "https://qrify.me/business-pro";

  return (
    <View className="items-center justify-center my-4 relative">
      {/* Soft Ambient Background Glow */}
      <View
        className="absolute w-80 h-80 rounded-full -z-10 opacity-30 animate-pulse-glow"
        style={{ backgroundColor: currentPreset.accentColor }}
      />

      <View style={{ width: STAGE_SIZE, height: STAGE_SIZE + 90 }}>
        {/* FRONT SIDE */}
        <Animated.View
          pointerEvents={isFlipped ? "none" : "auto"}
          style={[
            frontAnimatedStyle,
            { backgroundColor: colors.glassSurfaceHigh },
          ]}
          className="absolute w-full h-full rounded-5xl overflow-hidden p-6 justify-between relative"
        >
          <LiquidGlassView
            blurLevel="card"
            tintColor={colors.glassSurfaceHigh}
            specular={false}
            style={StyleSheet.absoluteFill}
          />
          <GlassShimmer />

          {/* Top Bar */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Ionicons name="qr-code-outline" size={18} color={Palette.cyan} />
              <Text className="text-on-surface text-base font-bold">
                {title}
              </Text>
            </View>
            <Pressable
              accessibilityLabel="Flip card to view code metadata"
              accessibilityRole="button"
              onPress={handleFlip}
              style={{ backgroundColor: colors.glassSurfaceSubtle }}
              className="flex-row items-center gap-1 px-3 py-1.5 rounded-full overflow-hidden relative active:opacity-70"
            >
              <LiquidGlassView
                blurLevel="subtle"
                tintColor={colors.glassSurfaceSubtle}
                isInteractive
                specular={false}
                style={StyleSheet.absoluteFill}
              />
              <Ionicons
                name="sync-outline"
                size={14}
                color={colors.secondaryText}
              />
            </Pressable>
          </View>

          {/* QR Code Glass Container */}
          <View className="self-center bg-white p-5 rounded-4xl relative">
            <QRCode
              value={validValue}
              size={STAGE_SIZE * 0.55}
              color={effectiveQrColor}
              backgroundColor="transparent"
              getRef={(ref) => {
                if (qrRef) {
                  const targetRef = qrRef as React.MutableRefObject<unknown>;
                  targetRef.current = ref;
                }
              }}
            />
          </View>

          {/* Details & Payload */}
          <View className="items-center gap-1 mb-4">
            <GlassBadge label={typeLabel.toUpperCase()} variant="primary" />
            <Text
              className="text-on-surface-variant text-xs font-medium max-w-[260px]"
              numberOfLines={1}
            >
              {validValue}
            </Text>
          </View>
        </Animated.View>

        {/* BACK SIDE (METADATA) */}
        <Animated.View
          pointerEvents={isFlipped ? "auto" : "none"}
          style={[
            backAnimatedStyle,
            { backgroundColor: colors.glassSurfaceHigh },
          ]}
          className="absolute w-full h-full rounded-5xl overflow-hidden p-6 justify-between relative"
        >
          <LiquidGlassView
            blurLevel="card"
            tintColor={colors.glassSurfaceHigh}
            specular={false}
            style={StyleSheet.absoluteFill}
          />

          <View className="flex-row items-center justify-between">
            <Text className="text-on-surface text-base font-bold">
              Code Intelligence
            </Text>
            <Pressable
              accessibilityLabel="Flip card to view QR code"
              accessibilityRole="button"
              onPress={handleFlip}
              style={{ backgroundColor: colors.glassSurfaceSubtle }}
              className="flex-row items-center gap-1 px-3 py-1.5 rounded-full overflow-hidden relative active:opacity-70"
            >
              <LiquidGlassView
                blurLevel="subtle"
                tintColor={colors.glassSurfaceSubtle}
                isInteractive
                specular={false}
                style={StyleSheet.absoluteFill}
              />
              <Ionicons
                name="sync-outline"
                size={14}
                color={colors.secondaryText}
              />
              <Text className="text-on-surface-variant text-xs font-semibold">
                QR Stage
              </Text>
            </Pressable>
          </View>

          <View className="flex-1 justify-center gap-3 my-2">
            <View className="flex-row justify-between items-center pb-2">
              <Text className="text-on-surface-variant text-xs">
                Active Theme
              </Text>
              <Text
                className="text-xs font-bold"
                style={{ color: currentPreset.accentColor }}
              >
                {currentPreset.name}
              </Text>
            </View>
            <View className="flex-row justify-between items-center pb-2">
              <Text className="text-on-surface-variant text-xs">
                Payload Type
              </Text>
              <Text className="text-on-surface text-xs font-bold">
                {typeLabel}
              </Text>
            </View>
            <View className="flex-row justify-between items-center pb-2">
              <Text className="text-on-surface-variant text-xs">Length</Text>
              <Text className="text-on-surface text-xs font-bold">
                {validValue.length} characters
              </Text>
            </View>

            <View
              style={{ backgroundColor: colors.glassSurfaceSubtle }}
              className="p-3 rounded-2xl mt-1"
            >
              <Text className="text-on-surface-variant text-[10px] font-bold tracking-widest mb-1">
                DATA PAYLOAD
              </Text>
              <Text
                className="text-accent text-xs font-mono"
                numberOfLines={3}
              >
                {validValue}
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
