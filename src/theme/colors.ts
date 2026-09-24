/**
 * Design tokens — restrained accents, high-contrast neutrals.
 */
import type { ThemeColors } from '../types';

/** Accents kept for projects/skills — use sparingly in chrome. */
export const accents = {
  blue: '#5B8CFF',
  violet: '#7C6CFF',
  magenta: '#E056A0',
  coral: '#E87B6A',
  orange: '#E89A4A',
  cyan: '#3DB8C5',
  green: '#3DAB8A',
} as const;

export type AccentKey = keyof typeof accents;

export const lightColors: ThemeColors = {
  background: '#F7F7F8',
  card: '#FFFFFF',
  surfaceElevated: '#EEEEF0',
  text: '#111114',
  textMuted: '#6E6E78',
  border: '#E2E2E6',
  primary: '#3D63E8',
  onPrimary: '#FFFFFF',
  accent: '#3D63E8',
  primaryAccent: '#3D63E8',
  secondaryAccent: '#5B5B66',
  interactive: '#3D63E8',
  highlight: accents.orange,
  glow: 'rgba(61, 99, 232, 0.12)',
  headerGlass: 'rgba(247, 247, 248, 0.94)',
  dock: 'rgba(255, 255, 255, 0.96)',
  inputBackground: '#FFFFFF',
  destructive: '#D64545',
  success: accents.green,
  ripple: 'rgba(61, 99, 232, 0.12)',
  icon: '#111114',
  timeline: '#3D63E8',
};

export const darkColors: ThemeColors = {
  background: '#0A0A0C',
  card: '#141416',
  surfaceElevated: '#1A1A1E',
  text: '#F2F2F4',
  textMuted: '#8E8E98',
  border: '#2A2A30',
  primary: '#5B8CFF',
  onPrimary: '#0A0A0C',
  accent: '#5B8CFF',
  primaryAccent: '#5B8CFF',
  secondaryAccent: '#A0A0AA',
  interactive: '#5B8CFF',
  highlight: accents.orange,
  glow: 'rgba(91, 140, 255, 0.18)',
  headerGlass: 'rgba(10, 10, 12, 0.92)',
  dock: 'rgba(20, 20, 22, 0.96)',
  inputBackground: '#121214',
  destructive: '#E25555',
  success: accents.green,
  ripple: 'rgba(91, 140, 255, 0.16)',
  icon: '#F2F2F4',
  timeline: '#5B8CFF',
};

/** Stable accent assignment for projects / categories by index or id hash. */
export function accentAt(index: number): string {
  const keys = Object.keys(accents) as AccentKey[];
  return accents[keys[index % keys.length]];
}

export function accentForId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash + id.charCodeAt(i) * (i + 1)) % 997;
  }
  return accentAt(hash);
}
