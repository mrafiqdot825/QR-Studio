import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { LiquidGlassTabBar } from '@/components/app-tabs';
import { GlobalModals } from '@/components/global-modals';
import '@/global.css';
import { AppProvider } from '@/providers/app-provider';
import { DefaultTheme, Tabs, ThemeProvider } from 'expo-router';
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

const customLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FAFAFA',
    card: '#FFFFFF',
    text: '#111827',
    border: 'rgba(0, 0, 0, 0.06)',
    primary: '#2563EB',
  },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <ThemeProvider value={customLightTheme}>
          <AnimatedSplashOverlay />
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
          <GlobalModals />
        </ThemeProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
