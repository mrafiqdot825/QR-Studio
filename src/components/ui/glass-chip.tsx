import { LiquidGlassView } from "@/components/ui/liquid-glass-view";
import { Palette, SpringConfigs } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface GlassChipProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  selected?: boolean;
  onPress?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export const GlassChip = React.memo(function GlassChip({
  label,
  icon,
  selected = false,
  onPress,
  className = "",
  style,
}: GlassChipProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.94, SpringConfigs.gentle);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, SpringConfigs.gentle);
  };

  const handlePress = () => {
    if (onPress) {
      if (Platform.OS !== "web") {
        Haptics.selectionAsync().catch(() => {});
      }
      onPress();
    }
  };

  return (
    <Animated.View className="rounded-full" style={[animatedStyle, style]}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={
          !selected ? { backgroundColor: colors.glassSurfaceHigh } : undefined
        }
        className={`px-4 py-2.5 rounded-full flex-row items-center justify-center gap-2 overflow-hidden relative ${
          selected ? "bg-primary" : ""
        } ${className}`}
      >
        {!selected && (
          <LiquidGlassView
            blurLevel="subtle"
            tintColor={colors.glassSurfaceHigh}
            isInteractive
            specular={false}
            style={StyleSheet.absoluteFill}
          />
        )}

        {icon && (
          <Ionicons
            name={icon}
            size={16}
            color={selected ? "#FFFFFF" : Palette.cyan}
          />
        )}

        <Text
          className={`text-xs font-bold ${
            selected ? "text-white" : "text-on-surface"
          }`}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
});
