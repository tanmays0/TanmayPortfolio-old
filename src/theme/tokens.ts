/**
 * Spacing, radius, elevation, motion tokens.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  section: 56,
} as const;

export const radius = {
  card: 14,
  input: 12,
  button: 12,
  chip: 8,
  pill: 999,
  dock: 20,
} as const;

export const elevation = {
  cardLight: 2,
  cardDark: 0,
} as const;

export const touchTarget = 48;

/** Bottom floating dock clearance for scroll content. */
export const dockClearance = 108;

export const motion = {
  fast: 180,
  normal: 320,
  slow: 520,
  entrance: 640,
} as const;
