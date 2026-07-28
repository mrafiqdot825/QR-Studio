import { GlassBadge } from "@/components/ui/glass-badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Palette } from "@/constants/theme";
import { useHistoryState } from "@/contexts/history-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

export const RecentQRsStrip: React.FC = React.memo(() => {
  const router = useRouter();
  const { history } = useHistoryState();

  const recentItems = history.slice(0, 5);

  return (
    <View className="w-full my-4">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <Text className="text-on-surface text-xl font-extrabold tracking-tight">
            Recent Activity
          </Text>
          {recentItems.length > 0 && (
            <GlassBadge
              label={`${history.length}`}
              variant="primary"
              className="py-0.5 px-2"
            />
          )}
        </View>

        <Pressable
          onPress={() => router.navigate("/history")}
          accessibilityLabel="View history"
          accessibilityRole="button"
          className="flex-row items-center gap-1"
        >
          <Text className="text-primary text-xs font-bold">View All</Text>
          <Ionicons name="chevron-forward" size={14} color={Palette.accentBlue} />
        </Pressable>
      </View>

      {recentItems.length === 0 ? (
        <GlassCard className="p-5 items-center gap-2">
          <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mb-1">
            <Ionicons
              name="time-outline"
              size={20}
              color={Palette.accentBlue}
            />
          </View>
          <Text className="text-on-surface font-extrabold text-sm text-center">
            No Recent QR Codes
          </Text>
          <Text className="text-on-surface-variant text-xs text-center leading-4 max-w-xs">
            Generated codes and scanned items will appear here for instant re-export.
          </Text>
        </GlassCard>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingVertical: 4 }}
        >
          {recentItems.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInRight.duration(400).delay(index * 60)}
            >
              <GlassCard
                onPress={() =>
                  router.navigate({
                    pathname: "/studio",
                    params: { initialType: item.type },
                  })
                }
                interactive
                hasGlow
                className="w-48 p-4 rounded-3xl"
                style={styles.recentCard}
              >
                <View className="flex-row items-center justify-between mb-2">
                  <GlassBadge
                    label={item.type.toUpperCase()}
                    variant="secondary"
                    className="py-0.5 px-2 text-[9px]"
                  />
                  {item.isPinned && (
                    <Ionicons
                      name="pin"
                      size={12}
                      color={Palette.accentOrange}
                    />
                  )}
                </View>

                <Text
                  className="text-on-surface font-extrabold text-sm mt-1"
                  numberOfLines={1}
                >
                  {item.title || "Untitled QR"}
                </Text>

                <Text
                  className="text-on-surface-variant text-[11px] mt-0.5"
                  numberOfLines={1}
                >
                  {item.value}
                </Text>

                <View className="flex-row items-center justify-between mt-3 pt-2 border-t border-black/5 dark:border-white/5">
                  <Text className="text-on-surface-variant text-[10px] font-medium">
                    {item.date}
                  </Text>
                  <Ionicons
                    name="arrow-forward"
                    size={12}
                    color={Palette.accentBlue}
                  />
                </View>
              </GlassCard>
            </Animated.View>
          ))}
        </ScrollView>
      )}
    </View>
  );
});

RecentQRsStrip.displayName = "RecentQRsStrip";

const styles = StyleSheet.create({
  recentCard: {
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.04)",
  },
});
