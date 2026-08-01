import { GlassBadge } from "@/components/ui/glass-badge";
import { GlassCard } from "@/components/ui/glass-card";
import { LiquidGlassView } from "@/components/ui/liquid-glass-view";
import { Palette } from "@/constants/theme";
import { TEMPLATES_LIST } from "@/features/templates/constants/templates";
import { withAlpha } from "@/utils/color";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

export const FeaturedTemplatesStrip: React.FC = React.memo(() => {
  const router = useRouter();
  const featuredTemplates = TEMPLATES_LIST.slice(0, 5);

  return (
    <View className="w-full my-4">
      <View className="flex-row items-center justify-between mb-3">
        <View>
          <Text className="text-on-surface text-xl font-extrabold tracking-tight">
            Curated Templates
          </Text>
          <Text className="text-on-surface-variant text-xs mt-0.5">
            Designed for business, hospitality & events
          </Text>
        </View>

        <Pressable
          onPress={() => router.navigate("/explore")}
          accessibilityLabel="View all templates"
          accessibilityRole="button"
          className="flex-row items-center gap-1"
        >
          <Text className="text-accent text-xs font-bold">Gallery</Text>
          <Ionicons name="chevron-forward" size={14} color={Palette.cyan} />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 14, paddingVertical: 4 }}
      >
        {featuredTemplates.map((template, index) => (
          <Animated.View
            key={template.id}
            entering={FadeInRight.duration(450).delay(index * 75)}
          >
            <GlassCard
              onPress={() =>
                router.navigate({
                  pathname: "/studio",
                  params: { initialType: template.type },
                })
              }
              interactive
              hasGlow
              className="w-60 p-4 rounded-3xl"
              style={styles.templateCard}
            >
              <View className="flex-row items-center justify-between mb-3">
                <View
                  style={{ backgroundColor: `${template.color}15` }}
                  className="w-10 h-10 rounded-2xl items-center justify-center"
                >
                  <Ionicons
                    name={template.icon as keyof typeof Ionicons.glyphMap}
                    size={20}
                    color={template.color}
                  />
                </View>

                <GlassBadge
                  label={template.category}
                  variant="secondary"
                  className="py-0.5 px-2 text-[9px]"
                />
              </View>

              <Text className="text-on-surface font-extrabold text-base">
                {template.title}
              </Text>
              <Text
                className="text-on-surface-variant text-xs mt-1 leading-4"
                numberOfLines={2}
              >
                {template.desc}
              </Text>

              <View
                style={{
                  backgroundColor: withAlpha(template.color, 0.14),
                  borderColor: withAlpha(template.color, 0.3),
                }}
                className="flex-row items-center justify-center gap-1.5 mt-4 py-2.5 rounded-full border overflow-hidden relative"
              >
                <LiquidGlassView
                  blurLevel="subtle"
                  tintColor={withAlpha(template.color, 0.14)}
                  specular={false}
                  style={StyleSheet.absoluteFill}
                />
                <Text
                  style={{ color: template.color }}
                  className="text-xs font-extrabold"
                >
                  Use Template
                </Text>
                <Ionicons
                  name="arrow-forward-circle"
                  size={16}
                  color={template.color}
                />
              </View>
            </GlassCard>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
});

FeaturedTemplatesStrip.displayName = "FeaturedTemplatesStrip";

const styles = StyleSheet.create({
  templateCard: {
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.05)",
  },
});
