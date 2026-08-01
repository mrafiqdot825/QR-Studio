import { QRTypeSelector } from "@/components/qr-type-selector";
import { GlassChip } from "@/components/ui/glass-chip";
import { GlassContainer } from "@/components/ui/glass-container";
import { Palette } from "@/constants/theme";
import { FeaturedTemplatesStrip } from "@/features/home/components/featured-templates-strip";
import { HomeHeroCard } from "@/features/home/components/home-hero-card";
import { HomeProBanner } from "@/features/home/components/home-pro-banner";
import { QuickActionsBar } from "@/features/home/components/quick-actions-bar";
import { QRType } from "@/types/qr";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const FEATURE_HIGHLIGHTS: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}[] = [
  { icon: "color-palette-outline", label: "Custom Colors" },
  { icon: "shapes-outline", label: "Eye Shapes" },
  { icon: "image-outline", label: "Center Logo" },
  { icon: "cloud-download-outline", label: "HD Export" },
  { icon: "flash-outline", label: "Instant Scan" },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleSelectType = useCallback(
    (type: QRType) => {
      router.navigate({
        pathname: "/studio",
        params: { initialType: type },
      });
    },
    [router],
  );

  return (
    <GlassContainer>
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full max-w-[640px]">
            {/* HERO LANDING SECTION */}
            <HomeHeroCard />
            {/* FEATURE HIGHLIGHTS CHIP STRIP */}
            <Animated.View
              entering={FadeInUp.duration(500).delay(250)}
              className="my-2"
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                {FEATURE_HIGHLIGHTS.map((feature) => (
                  <GlassChip
                    key={feature.label}
                    label={feature.label}
                    icon={feature.icon}
                  />
                ))}
              </ScrollView>
            </Animated.View>
            {/* QUICK LAUNCH HUB */}
            <QuickActionsBar />
            {/* CURATED TEMPLATES SHOWCASE */}
            <FeaturedTemplatesStrip />
            {/* QR CATEGORIES GRID SECTION */}
            <View className="w-full mt-6 mb-2">
              <View className="flex-row items-end justify-between mb-2">
                <View>
                  <Text className="text-on-surface text-xl font-extrabold tracking-tight">
                    Select Data Category
                  </Text>
                  <Text className="text-on-surface-variant text-xs mt-0.5">
                    Choose a format to begin customizing in Studio.
                  </Text>
                </View>
                <Pressable
                  accessibilityLabel="Open studio"
                  accessibilityRole="button"
                  onPress={() => router.navigate("/studio")}
                  className="flex-row items-center gap-1"
                >
                  <Text className="text-accent text-xs font-bold">Studio</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={14}
                    color={Palette.cyan}
                  />
                </Pressable>
              </View>
              <QRTypeSelector
                selectedType="url"
                onSelectType={handleSelectType}
                variant="carousel"
              />
            </View>
            {/* PRO BANNER SECTION */}
            <HomeProBanner />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GlassContainer>
  );
}
