/**
 * Linked custom fonts (assets/fonts via react-native.config.js).
 * Android uses the file base name; iOS uses the PostScript / family name.
 */
import { Platform } from 'react-native';

export const fonts = {
  regular: Platform.select({
    ios: 'DMSans-Regular',
    android: 'DMSans-Regular',
    default: 'DMSans-Regular',
  })!,
  medium: Platform.select({
    ios: 'DMSans-Medium',
    android: 'DMSans-Medium',
    default: 'DMSans-Medium',
  })!,
  semiBold: Platform.select({
    ios: 'DMSans-SemiBold',
    android: 'DMSans-SemiBold',
    default: 'DMSans-SemiBold',
  })!,
} as const;
