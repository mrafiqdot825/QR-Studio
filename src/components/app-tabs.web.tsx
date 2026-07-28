import { BlurTokens } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, View } from 'react-native';

interface LiquidGlassTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
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
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
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
              <Pressable
                key={route.key}
                onPress={onPress}
                style={styles.tabButton}
                accessibilityRole="button"
                accessibilityLabel={label as string}
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
    bottom: 24,
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
    flex: 1,
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
