import { BlurTokens, Palette, Shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

interface LiquidGlassTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export function LiquidGlassTabBar({ state, descriptors, navigation }: LiquidGlassTabBarProps) {
  return (
    <View style={styles.tabBarWrapper} pointerEvents="box-none">
      <View style={[styles.glassContainerOuter, Shadows.dock]}>
        <BlurView
          intensity={BlurTokens.dock}
          tint="light"
          style={styles.blurViewContainer}
          pointerEvents="none"
        />
        <View style={styles.topGlassSpecularLine} pointerEvents="none" />

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
                  <View style={[styles.activeLiquidPill, Shadows.glowBlue]}>
                    <Ionicons name={iconName} size={22} color={Palette.accentBlue} />
                  </View>
                ) : (
                  <View style={styles.inactiveTabContent}>
                    <Ionicons name={iconName} size={22} color={Palette.secondaryText} />
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

export default function AppTabs() {
  return (
    <Tabs
      tabBar={(props) => <LiquidGlassTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="studio"
        options={{
          title: 'Studio',
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Tabs>
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
    borderColor: 'rgba(0, 0, 0, 0.08)',
    backgroundColor: 'rgba(241, 245, 249, 0.95)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 16,
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.25)',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  inactiveTabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 44,
    borderRadius: 22,
  },
});
