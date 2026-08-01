import React, { createContext, useContext } from 'react';

import { AppScheme, MidnightScheme } from '@/constants/theme/colors';
import { GlassMaterial, GlassMaterials } from '@/constants/theme/glass';
import { MidnightShadows } from '@/constants/theme/shadows';

interface ThemeContextValue {
  colors: AppScheme;
  glass: Record<'card' | 'cardHigh' | 'pill' | 'dock' | 'input' | 'modal', GlassMaterial>;
  shadows: typeof MidnightShadows;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const themeValue: ThemeContextValue = {
  colors: MidnightScheme,
  glass: GlassMaterials,
  shadows: MidnightShadows,
};

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return ctx;
}
