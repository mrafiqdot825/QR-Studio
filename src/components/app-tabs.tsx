import { Ionicons } from '@expo/vector-icons';
import { GlassContainer } from 'expo-glass-effect';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { LiquidGlassView } from '@/components/ui/liquid-glass-view';
import { Palette, SpringConfigs } from '@/constants/theme';
import { AppScheme } from '@/constants/theme/colors';
import { MidnightShadows } from '@/constants/theme/shadows';
import { useLiquidGlassAvailable } from '@/hooks/use-liquid-glass-available';
import { useTheme } from '@/hooks/use-theme';
import { withAlpha } from '@/utils/color';

interface LiquidGlassTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

function TabItem({
  route,
  isFocused,
  colors,
  shadows,
  onPress,
}: {
  route: any;
  index: number;
  isFocused: boolean;
  options: any;
  navigation: any;
  colors: AppScheme;
  shadows: typeof MidnightShadows;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const isNativeGlassAvailable = useLiquidGlassAvailable();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, SpringConfigs.gentle);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, SpringConfigs.gentle);
  };

  let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
  if (route.name === 'index') {
    iconName = isFocused ? 'home' : 'home-outline';
  } else if (route.name === 'studio') {
    iconName = isFocused ? 'qr-code' : 'qr-code-outline';
  } else if (route.name === 'history') {
    iconName = isFocused ? 'time' : 'time-outline';
  } else if (route.name === 'explore') {
    iconName = isFocused ? 'grid' : 'grid-outline';
  } else if (route.name === 'settings') {
    iconName = isFocused ? 'settings' : 'settings-outline';
  }

  return (
    <Animated.View style={[{ flex: 1, alignItems: 'center' }, animatedStyle]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.tabButton}
        accessibilityRole="button"
        accessibilityLabel={route.name}
        accessibilityState={isFocused ? { selected: true } : {}}>
        {isFocused ? (
          <View style={[styles.activeLiquidPill, shadows.glowBlue, { backgroundColor: colors.surface, borderColor: withAlpha(Palette.cyan, 0.25) }]}>
            {isNativeGlassAvailable && (
              <LiquidGlassView
                blurLevel="dock"
                glassStyle="regular"
                tintColor={withAlpha(Palette.cyan, 0.12)}
                isInteractive
                specular={false}
                style={StyleSheet.absoluteFill}
              />
            )}
            <Ionicons name={iconName} size={22} color={Palette.cyan} />
          </View>
        ) : (
          <View style={styles.inactiveTabContent}>
            <Ionicons name={iconName} size={22} color={colors.secondaryText} />
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

export function LiquidGlassTabBar({ state, descriptors, navigation }: LiquidGlassTabBarProps) {
  const { colors, shadows } = useTheme();
  const isNativeGlassAvailable = useLiquidGlassAvailable();

  const dockStyle = [styles.glassContainerOuter, shadows.dock, { backgroundColor: colors.glassSurfaceHigh, borderColor: colors.border }];

  const dockContent = (
    <>
      <LiquidGlassView blurLevel="dock" tintColor={colors.glassSurfaceHigh} specularInset={20} style={styles.blurViewContainer} />

      <View style={styles.tabItemsRow}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            if (Platform.OS !== 'web') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            }
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabItem
              key={route.key}
              route={route}
              index={index}
              isFocused={isFocused}
              options={options}
              navigation={navigation}
              colors={colors}
              shadows={shadows}
              onPress={onPress}
            />
          );
        })}
      </View>
    </>
  );

  return (
    <View style={styles.tabBarWrapper} pointerEvents="box-none">
      {/* GlassContainer lets the focused tab's own glass pill visually merge with the dock's
          glass material (Apple's tab-bar liquid-merge behavior) — native iOS 26 only. On the
          fallback path this stays a plain View so the pixel-tuned dock/pill layout is untouched. */}
      {isNativeGlassAvailable ? (
        <GlassContainer spacing={20} style={dockStyle}>
          {dockContent}
        </GlassContainer>
      ) : (
        <View style={dockStyle}>{dockContent}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    zIndex: 1000,
  },
  glassContainerOuter: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 1.5,
    position: 'relative',
  },
  blurViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabItemsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  activeLiquidPill: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  inactiveTabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 44,
    borderRadius: 22,
  },
});
