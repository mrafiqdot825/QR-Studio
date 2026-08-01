import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { LiquidGlassTabBar } from '@/components/app-tabs';
import { GlobalModals } from '@/components/global-modals';
import '@/global.css';
import { useTheme } from '@/hooks/use-theme';
import { AppProvider } from '@/providers/app-provider';
import { DefaultTheme, Tabs, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

// Configure Reanimated Logger per official documentation to disable strict mode reading/writing value warnings
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

SplashScreen.preventAutoHideAsync();

function AppNavigation() {
  const { colors } = useTheme();

  const navTheme = React.useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: colors.background,
        card: colors.surface,
        text: colors.primaryText,
        border: colors.border,
        primary: '#062045',
      },
    }),
    [colors.background, colors.surface, colors.primaryText, colors.border]
  );

  const renderTabBar = React.useCallback(
    (props: any) => <LiquidGlassTabBar {...props} />,
    []
  );

  return (
    <ThemeProvider value={navTheme}>
      <StatusBar style="light" />
      <AnimatedSplashOverlay />
      <Tabs
        tabBar={renderTabBar}
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
      <GlobalModals />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <AppNavigation />
      </AppProvider>
    </GestureHandlerRootView>
  );
}
