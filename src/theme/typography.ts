/**
 * Editorial type scale — DM Sans (already linked).
 */
import { TextStyle } from 'react-native';
import { fonts } from './fonts';

export const typography = {
  hero: {
    fontFamily: fonts.semiBold,
    fontSize: 42,
    letterSpacing: -1.2,
    lineHeight: 46,
  } satisfies TextStyle,
  display: {
    fontFamily: fonts.semiBold,
    fontSize: 34,
    letterSpacing: -0.6,
    lineHeight: 40,
  } satisfies TextStyle,
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 28,
    letterSpacing: -0.4,
    lineHeight: 34,
  } satisfies TextStyle,
  body: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 0.15,
  } satisfies TextStyle,
  bodyStrong: {
    fontFamily: fonts.medium,
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0.1,
  } satisfies TextStyle,
  meta: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.2,
  } satisfies TextStyle,
  label: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  } satisfies TextStyle,
  chip: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
  } satisfies TextStyle,
  button: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 20,
  } satisfies TextStyle,
  brand: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
  } satisfies TextStyle,
  caption: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.3,
  } satisfies TextStyle,
  number: {
    fontFamily: fonts.semiBold,
    fontSize: 48,
    letterSpacing: -1.5,
    lineHeight: 52,
  } satisfies TextStyle,
} as const;
