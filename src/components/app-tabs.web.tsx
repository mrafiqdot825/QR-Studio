import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useMemo } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '@/hooks/use-theme';

interface LiquidGlassTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const BAR_HEIGHT = 64;
const FAB_SIZE = 56;
const NOTCH_RADIUS = 36;
const NOTCH_SPREAD = 54;
const NOTCH_DIP = 30;
const CORNER_RADIUS = 28;

// Primary Royal Purple / Indigo matching user uploaded reference image
const PURPLE_ACCENT = '#635BFF';

/**
 * Builds the curved SVG path featuring smooth organic shoulders and a central scoop notch.
 */
function createCurvedTabBarPath(w: number, h: number): string {
  const cx = w / 2;
  const leftShoulder = cx - NOTCH_SPREAD;
  const rightShoulder = cx + NOTCH_SPREAD;
  const leftDip = cx - NOTCH_RADIUS;
  const rightDip = cx + NOTCH_RADIUS;
  const dip = NOTCH_DIP;
  const topR = CORNER_RADIUS;
  const botR = CORNER_RADIUS;

  return [
    `M 0 ${topR}`,
    `A ${topR} ${topR} 0 0 1 ${topR} 0`,
    `H ${leftShoulder.toFixed(1)}`,
    `C ${(leftShoulder + (NOTCH_SPREAD - NOTCH_RADIUS) * 0.55).toFixed(1)} 0, ${(leftDip - 4).toFixed(1)} ${(dip * 0.18).toFixed(1)}, ${leftDip.toFixed(1)} ${(dip * 0.55).toFixed(1)}`,
    `C ${(leftDip + 8).toFixed(1)} ${(dip * 0.95).toFixed(1)}, ${(cx - NOTCH_RADIUS * 0.45).toFixed(1)} ${dip.toFixed(1)}, ${cx.toFixed(1)} ${dip.toFixed(1)}`,
    `C ${(cx + NOTCH_RADIUS * 0.45).toFixed(1)} ${dip.toFixed(1)}, ${(rightDip - 8).toFixed(1)} ${(dip * 0.95).toFixed(1)}, ${rightDip.toFixed(1)} ${(dip * 0.55).toFixed(1)}`,
    `C ${(rightDip + 4).toFixed(1)} ${(dip * 0.18).toFixed(1)}, ${(rightShoulder - (NOTCH_SPREAD - NOTCH_RADIUS) * 0.55).toFixed(1)} 0, ${rightShoulder.toFixed(1)} 0`,
    `H ${(w - topR).toFixed(1)}`,
    `A ${topR} ${topR} 0 0 1 ${w} ${topR}`,
    `V ${(h - botR).toFixed(1)}`,
    `A ${botR} ${botR} 0 0 1 ${(w - botR).toFixed(1)} ${h}`,
    `H ${botR}`,
    `A ${botR} ${botR} 0 0 1 0 ${(h - botR).toFixed(1)}`,
    `Z`,
  ].join(' ');
}

function NavTabButton({
  isFocused,
  label,
  iconName,
  onPress,
}: {
  isFocused: boolean;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  return (
    <View style={styles.tabButtonWrapper}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={isFocused ? { selected: true } : {}}
        style={styles.tabButtonPressable}>
        <Ionicons
          name={iconName}
          size={24}
          color={isFocused ? '#111827' : '#9CA3AF'}
        />
        <Text
          numberOfLines={1}
          style={[
            styles.tabButtonLabel,
            { color: isFocused ? '#111827' : '#9CA3AF' },
            isFocused && styles.tabButtonLabelFocused,
          ]}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
}

function CenterCreateButton({
  onPress,
  isFocused,
}: {
  onPress: () => void;
  isFocused: boolean;
}) {
  return (
    <View style={styles.centerFabAnchor} pointerEvents="box-none">
      <View style={styles.centerFabWrapper}>
        <Pressable
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel="Create QR in Studio"
          style={[
            styles.centerFab,
            { backgroundColor: PURPLE_ACCENT },
            isFocused && styles.centerFabFocused,
          ]}>
          <Ionicons name="add" size={32} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

export function LiquidGlassTabBar({ state, descriptors: _descriptors, navigation }: LiquidGlassTabBarProps) {
  const { colors } = useTheme();
  const [barWidth, setBarWidth] = React.useState(380);

  const onLayout = React.useCallback((e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    if (width > 0 && Math.abs(width - barWidth) > 1) {
      setBarWidth(width);
    }
  }, [barWidth]);

  const svgPath = useMemo(() => {
    return createCurvedTabBarPath(barWidth, BAR_HEIGHT);
  }, [barWidth]);

  const handleTabPress = (route: any, isFocused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  // Map route names to indices
  const routeMap = useMemo(() => {
    const map: Record<string, { route: any; index: number }> = {};
    state.routes.forEach((route: any, index: number) => {
      map[route.name] = { route, index };
    });
    return map;
  }, [state.routes]);

  const homeRoute = routeMap['index'];
  const exploreRoute = routeMap['explore'];
  const studioRoute = routeMap['studio'];
  const inboxRoute = routeMap['inbox'];
  const settingsRoute = routeMap['settings'];

  return (
    <View style={styles.tabBarContainer} pointerEvents="box-none">
      <View
        onLayout={onLayout}
        style={[styles.tabBarInner, styles.shadowElevation]}
        pointerEvents="box-none">
        {/* Curved Background SVG */}
        <Svg
          width={barWidth}
          height={BAR_HEIGHT}
          style={StyleSheet.absoluteFill}
          pointerEvents="none">
          <Path
            d={svgPath}
            fill={colors.surface || '#FFFFFF'}
            stroke={colors.border || '#E5E7EB'}
            strokeWidth={1}
          />
        </Svg>

        {/* Tab Items Row with 2 items left, center gap for scoop, 2 items right */}
        <View style={styles.tabButtonsRow} pointerEvents="box-none">
          {/* Left Wing: Home */}
          {homeRoute && (
            <NavTabButton
              isFocused={state.index === homeRoute.index}
              label="Home"
              iconName={state.index === homeRoute.index ? 'home' : 'home-outline'}
              onPress={() => handleTabPress(homeRoute.route, state.index === homeRoute.index)}
            />
          )}

          {/* Left Wing: Explore */}
          {exploreRoute && (
            <NavTabButton
              isFocused={state.index === exploreRoute.index}
              label="Explore"
              iconName={state.index === exploreRoute.index ? 'search' : 'search-outline'}
              onPress={() => handleTabPress(exploreRoute.route, state.index === exploreRoute.index)}
            />
          )}

          {/* Center Gap for Cutout Notch */}
          <View style={styles.centerGapSpacer} pointerEvents="none" />

          {/* Right Wing: Inbox */}
          {inboxRoute && (
            <NavTabButton
              isFocused={state.index === inboxRoute.index}
              label="Inbox"
              iconName={state.index === inboxRoute.index ? 'notifications' : 'notifications-outline'}
              onPress={() => handleTabPress(inboxRoute.route, state.index === inboxRoute.index)}
            />
          )}

          {/* Right Wing: Profile (Settings Screen) */}
          {settingsRoute && (
            <NavTabButton
              isFocused={state.index === settingsRoute.index}
              label="Profile"
              iconName={state.index === settingsRoute.index ? 'person-circle' : 'person-circle-outline'}
              onPress={() => handleTabPress(settingsRoute.route, state.index === settingsRoute.index)}
            />
          )}
        </View>

        {/* Center Floating Elevated Plus Button */}
        {studioRoute && (
          <CenterCreateButton
            isFocused={state.index === studioRoute.index}
            onPress={() => handleTabPress(studioRoute.route, state.index === studioRoute.index)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    zIndex: 1000,
  },
  tabBarInner: {
    width: '100%',
    maxWidth: 420,
    height: BAR_HEIGHT,
    position: 'relative',
    alignItems: 'center',
  },
  shadowElevation: {
    boxShadow: '0px 8px 24px rgba(30, 42, 56, 0.12)',
  } as any,
  tabButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: BAR_HEIGHT,
    paddingHorizontal: 8,
  },
  tabButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonPressable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    minWidth: 54,
    cursor: 'pointer',
  } as any,
  tabButtonLabel: {
    fontSize: 11,
    marginTop: 3,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  tabButtonLabelFocused: {
    fontWeight: '700',
  },
  centerGapSpacer: {
    width: NOTCH_SPREAD * 1.5,
    height: BAR_HEIGHT,
  },
  centerFabAnchor: {
    position: 'absolute',
    top: -18,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1001,
  },
  centerFabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerFab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 6px 16px rgba(99, 91, 255, 0.38)',
    cursor: 'pointer',
  } as any,
  centerFabFocused: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
