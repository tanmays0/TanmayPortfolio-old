/**
 * Theme context — colors, spacing, motion tokens.
 */
import React, { createContext, useContext, useMemo } from 'react';
import type { ThemeColors } from '../types';
import { accents, darkColors, lightColors } from './colors';
import { dockClearance, elevation, motion, radius, spacing, touchTarget } from './tokens';
import { typography } from './typography';

type ThemeContextValue = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
  accents: typeof accents;
  spacing: typeof spacing;
  radius: typeof radius;
  elevation: typeof elevation;
  touchTarget: typeof touchTarget;
  dockClearance: typeof dockClearance;
  motion: typeof motion;
  typography: typeof typography;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = {
  isDark: boolean;
  toggleTheme: () => void;
  children: React.ReactNode;
};

export function ThemeProvider({ isDark, toggleTheme, children }: ThemeProviderProps) {
  const value = useMemo<ThemeContextValue>(
    () => ({
      isDark,
      toggleTheme,
      colors: isDark ? darkColors : lightColors,
      accents,
      spacing,
      radius,
      elevation,
      touchTarget,
      dockClearance,
      motion,
      typography,
    }),
    [isDark, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
