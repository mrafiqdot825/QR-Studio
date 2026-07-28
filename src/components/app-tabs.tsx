import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { BlurTokens, SpringConfigs } from '@/constants/theme';
import { AppScheme } from '@/constants/theme/colors';
import { ShadowSets } from '@/constants/theme/shadows';
import { useTheme } from '@/hooks/use-theme';

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
  shadows: (typeof ShadowSets)['light'];
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

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
          <View style={[styles.activeLiquidPill, shadows.glowBlue, { backgroundColor: colors.surface, borderColor: 'rgba(37, 99, 235, 0.25)' }]}>
            <Ionicons name={iconName} size={22} color="#2563EB" />
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
  const { colors, shadows, isDark } = useTheme();

  return (
    <View style={styles.tabBarWrapper} pointerEvents="box-none">
      <View style={[styles.glassContainerOuter, shadows.dock, { backgroundColor: colors.glassSurfaceHigh, borderColor: colors.border }]}>
        <BlurView
          intensity={BlurTokens.dock}
          tint={isDark ? 'dark' : 'light'}
          style={styles.blurViewContainer}
          pointerEvents="none"
        />
        <View style={[styles.topGlassSpecularLine, { backgroundColor: colors.specularTop }]} pointerEvents="none" />

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
      </View>
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
  topGlassSpecularLine: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    height: 1.5,
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
  },
  inactiveTabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 44,
    borderRadius: 22,
  },
});
