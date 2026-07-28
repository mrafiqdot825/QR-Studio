import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { APP_CONFIG } from '@/config/app.config';
import { AppScheme, Schemes, SchemeName } from '@/constants/theme/colors';
import { GlassMaterial, getGlassMaterials } from '@/constants/theme/glass';
import { ShadowSets } from '@/constants/theme/shadows';
import { Logger } from '@/services/logger/logger.service';

export type AppearancePreference = 'system' | 'light' | 'dark';

interface ThemeContextValue {
  scheme: SchemeName;
  isDark: boolean;
  colors: AppScheme;
  glass: Record<'card' | 'cardHigh' | 'pill' | 'dock' | 'input' | 'modal', GlassMaterial>;
  shadows: (typeof ShadowSets)['light'];
  preference: AppearancePreference;
  setPreference: (preference: AppearancePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  // Driving the scheme through nativewind's own colorScheme controller (rather than
  // React Native's `useColorScheme` directly) keeps `dark:` classNames and JS-side
  // tokens (below) in sync from one source of truth — see tailwind.config.js's
  // `darkMode: 'class'` + src/global.css's `.dark` variable block.
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();
  const [preference, setPreferenceState] = useState<AppearancePreference>('system');

  useEffect(() => {
    AsyncStorage.getItem(APP_CONFIG.storageKeys.appearance)
      .then((stored) => {
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          setPreferenceState(stored);
          setColorScheme(stored);
        }
      })
      .catch((error) => Logger.error('Failed to load appearance preference:', error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPreference = useCallback(
    (next: AppearancePreference) => {
      setPreferenceState(next);
      setColorScheme(next);
      AsyncStorage.setItem(APP_CONFIG.storageKeys.appearance, next).catch((error) =>
        Logger.error('Failed to persist appearance preference:', error)
      );
    },
    [setColorScheme]
  );

  const scheme: SchemeName = colorScheme === 'dark' ? 'dark' : 'light';

  const value = useMemo<ThemeContextValue>(
    () => ({
      scheme,
      isDark: scheme === 'dark',
      colors: Schemes[scheme],
      glass: getGlassMaterials(scheme),
      shadows: ShadowSets[scheme],
      preference,
      setPreference,
    }),
    [scheme, preference, setPreference]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return ctx;
}
