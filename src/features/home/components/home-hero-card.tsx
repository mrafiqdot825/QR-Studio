import { GlassBadge } from "@/components/ui/glass-badge";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassChip } from "@/components/ui/glass-chip";
import { GlassShimmer } from "@/components/ui/glass-shimmer";
import { CinematicPresets, Palette, PresetId } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { withAlpha } from "@/utils/color";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import QRCode from "react-native-qrcode-svg";

const { width } = Dimensions.get("window");

const HERO_STATS = [
  { value: "6+", label: "QR Types" },
  { value: "Vector", label: "SVG & HD Export" },
  { value: "100%", label: "Private & Local" },
];

const PRESET_QUICK_CHOICES: PresetId[] = [
  "ocean-blue",
  "aurora",
  "luxury-gold",
  "lavender",
  "sunset",
];

export const HomeHeroCard: React.FC = React.memo(() => {
  const router = useRouter();
  const { colors } = useTheme();
  const [selectedPresetId, setSelectedPresetId] = useState<PresetId>("ocean-blue");

  const activePreset = useMemo(() => {
    return (
      CinematicPresets.find((p) => p.id === selectedPresetId) ??
      CinematicPresets[1]
    );
  }, [selectedPresetId]);

  const glowPulse = useSharedValue(0.6);
  const livePulse = useSharedValue(1);

  useEffect(() => {
    glowPulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2400, easing: Easing.inOut(Easing.sin) }),
        withTiming(0.6, { duration: 2400, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
    livePulse.value = withRepeat(
      withSequence(
        withTiming(0.35, { duration: 900 }),
        withTiming(1, { duration: 900 })
      ),
      -1,
      true
    );

    return () => {
      cancelAnimation(glowPulse);
      cancelAnimation(livePulse);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowPulse.value,
    transform: [{ scale: 0.95 + glowPulse.value * 0.08 }],
  }));

  const liveDotStyle = useAnimatedStyle(() => ({
    opacity: livePulse.value,
  }));

  return (
    <View className="w-full my-2 gap-6">
      {/* Top Headline & Badge Section */}
      <Animated.View
        entering={FadeInDown.duration(500).springify()}
        className="gap-4"
      >
        <GlassBadge
          icon="sparkles-outline"
          label="Next-Gen QR Studio"
          variant="primary"
          className="self-start"
        />

        <Text className="text-on-surface text-[38px] font-extrabold leading-[44px] tracking-tight">
          Scan-Stopping{"\n"}
          <Text className="text-primary">QR Codes</Text> Design.
        </Text>

        <Text className="text-on-surface-variant text-base leading-6 max-w-[440px]">
          Craft high-converting, on-brand QR codes with live interactive preview,
          custom shapes, embedded logos, and instant vector export.
        </Text>

        <View className="flex-row flex-wrap gap-3 mt-1">
          <GlassButton
            title="Create QR Now"
            icon="sparkles"
            iconPosition="right"
            variant="primary"
            onPress={() => router.navigate("/studio")}
          />

          <GlassButton
            title="Explore Gallery"
            icon="grid-outline"
            variant="secondary"
            onPress={() => router.navigate("/explore")}
          />
        </View>

        {/* Stats Strip */}
        <View className="flex-row items-center mt-2 pt-2 border-t border-black/5">
          {HERO_STATS.map((stat, index) => (
            <View key={stat.label} className="flex-row items-center">
              {index > 0 && (
                <View
                  style={{ backgroundColor: colors.border }}
                  className="w-px h-7 mx-3"
                />
              )}
              <View>
                <Text className="text-on-surface text-base font-extrabold">
                  {stat.value}
                </Text>
                <Text className="text-on-surface-variant text-[11px] font-medium">
                  {stat.label}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Floating Interactive Live QR Card */}
      <Animated.View
        entering={FadeInUp.duration(600).delay(150).springify()}
        className="items-center justify-center my-2"
      >
        <View className="items-center justify-center w-full">
          {/* Animated Glow Aura */}
          <Animated.View
            style={[styles.heroGlow, glowStyle]}
            pointerEvents="none"
          >
            <LinearGradient
              colors={[
                withAlpha(activePreset.accentColor, 0.4),
                "transparent",
              ]}
              style={styles.heroGlowFill}
              start={{ x: 0.5, y: 0.5 }}
              end={{ x: 1, y: 1 }}
            />
          </Animated.View>

          <GlassCard
            className="w-full max-w-[380px] p-6 items-center"
            hasGlow
          >
            <GlassShimmer />

            {/* Live Indicator Badge */}
            <View className="absolute top-4 right-4 z-10">
              <View
                style={{
                  backgroundColor: colors.glassSurfaceHigh,
                  borderColor: colors.hairline,
                }}
                className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full border"
              >
                <Animated.View
                  style={[
                    styles.liveDot,
                    { backgroundColor: Palette.success },
                    liveDotStyle,
                  ]}
                />
                <Text className="text-[10px] font-extrabold tracking-wider uppercase text-on-surface-variant">
                  Interactive Live
                </Text>
              </View>
            </View>

            {/* QR Code Container with Active Preset Colors */}
            <View
              style={{ backgroundColor: activePreset.qrBg }}
              className="p-5 rounded-4xl mb-4 border border-black/[0.06] items-center justify-center"
            >
              <QRCode
                value="https://qrify.me/pro-studio"
                size={Math.min(width * 0.48, 190)}
                color={activePreset.qrColor}
                backgroundColor="transparent"
              />
            </View>

            <Text className="text-on-surface text-base font-extrabold text-center">
              {activePreset.name} Style
            </Text>
            <Text className="text-on-surface-variant text-xs mt-0.5 text-center">
              Tap a preset below to change look in real-time
            </Text>

            {/* Interactive Theme Swatch Bar */}
            <View className="flex-row items-center gap-2 mt-4 pt-3 border-t border-black/5 w-full justify-center">
              {PRESET_QUICK_CHOICES.map((id) => {
                const preset = CinematicPresets.find((p) => p.id === id);
                if (!preset) return null;
                const isSelected = selectedPresetId === id;

                return (
                  <Pressable
                    key={id}
                    onPress={() => setSelectedPresetId(id)}
                    accessibilityLabel={`Select ${preset.name} theme`}
                    accessibilityRole="button"
                    className="items-center"
                  >
                    <View
                      style={{
                        backgroundColor: preset.accentColor,
                        borderColor: isSelected
                          ? colors.primaryText
                          : "transparent",
                      }}
                      className={`w-7 h-7 rounded-full border-2 items-center justify-center transition-all ${
                        isSelected ? "scale-110" : "opacity-80"
                      }`}
                    >
                      {isSelected && (
                        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </GlassCard>
        </View>
      </Animated.View>
    </View>
  );
});

HomeHeroCard.displayName = "HomeHeroCard";

const styles = StyleSheet.create({
  heroGlow: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 170,
    zIndex: -1,
  },
  heroGlowFill: {
    width: "100%",
    height: "100%",
    borderRadius: 170,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
