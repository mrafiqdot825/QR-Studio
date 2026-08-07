import { GlassBadge } from "@/components/ui/glass-badge";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Palette } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { withAlpha } from "@/utils/color";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export const HomeProBanner: React.FC = React.memo(() => {
  const router = useRouter();
  const { colors } = useTheme();

  const handlePress = React.useCallback(
    () => router.navigate("/studio"),
    [router]
  );

  return (
    <Animated.View
      entering={FadeInUp.duration(500).delay(200)}
      className="w-full mt-6 mb-4"
    >
      <GlassCard
        style={styles.bannerCardShadow}
        className="p-7 items-center text-center gap-4 overflow-hidden rounded-4xl"
      >
        <LinearGradient
          colors={[
            withAlpha(colors.accent, 0.10),
            "transparent",
          ]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          pointerEvents="none"
        />

        <View
          style={{ backgroundColor: withAlpha(colors.accent, 0.10) }}
          className="w-14 h-14 rounded-3xl items-center justify-center"
        >
          <Ionicons
            name="sparkles"
            size={26}
            color={colors.accent}
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
          onPress={handlePress}
        />
      </GlassCard>
    </Animated.View>
  );
});

HomeProBanner.displayName = "HomeProBanner";

const styles = StyleSheet.create({
  bannerCardShadow: {
    boxShadow: "0px 4px 20px rgba(30, 42, 56, 0.08)",
  },
});
