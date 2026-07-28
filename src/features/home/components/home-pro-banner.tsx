import { GlassBadge } from "@/components/ui/glass-badge";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Palette } from "@/constants/theme";
import { withAlpha } from "@/utils/color";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export const HomeProBanner: React.FC = React.memo(() => {
  const router = useRouter();

  return (
    <Animated.View
      entering={FadeInUp.duration(500).delay(200)}
      className="w-full mt-6 mb-4"
    >
      <GlassCard
        style={styles.bannerCardShadow}
        className="p-7 items-center text-center gap-4 overflow-hidden rounded-3xl"
      >
        <LinearGradient
          colors={[
            withAlpha(Palette.accentBlue, 0.12),
            withAlpha(Palette.accentViolet, 0.08),
            "transparent",
          ]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          pointerEvents="none"
        />

        <View className="w-14 h-14 rounded-3xl bg-primary/10 items-center justify-center">
          <Ionicons
            name="sparkles"
            size={26}
            color={Palette.accentBlue}
          />
        </View>

        <Text className="text-on-surface text-2xl font-extrabold text-center tracking-tight">
          Unlock Unlimited Vector QR Export
        </Text>
        <Text className="text-on-surface-variant text-sm text-center leading-5 max-w-md">
          Export ultra high-definition SVGs, custom eye shapes, center brand badges,
          and print-ready PDF formats.
        </Text>

        <GlassBadge
          icon="shield-checkmark-outline"
          label="100% Free & Unlimited local creation"
          variant="success"
        />

        <GlassButton
          title="Open Customizer Studio"
          icon="arrow-forward"
          iconPosition="right"
          variant="primary"
          onPress={() => router.navigate("/studio")}
        />
      </GlassCard>
    </Animated.View>
  );
});

HomeProBanner.displayName = "HomeProBanner";

const styles = StyleSheet.create({
  bannerCardShadow: {
    boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.08)",
  },
});
