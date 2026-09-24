/**
 * Minimal TS lettermark — single color, no orbs or glow.
 */
import { StyleSheet, Text, View } from 'react-native';
import { fonts } from '../theme/fonts';
import { useTheme } from '../theme/ThemeContext';

type BrandMarkProps = {
  size?: number;
  showGlow?: boolean;
};

export function BrandMark({ size = 36 }: BrandMarkProps) {
  const { colors } = useTheme();
  const radius = Math.round(size * 0.22);
  const fontSize = Math.round(size * 0.36);

  return (
    <View
      style={[
        styles.wrap,
        {
          width: size,
          height: size,
          borderRadius: radius,
          borderColor: colors.border,
          backgroundColor: colors.surfaceElevated,
        },
      ]}>
      <Text
        style={{
          color: colors.text,
          fontFamily: fonts.semiBold,
          fontSize,
          letterSpacing: -0.8,
          lineHeight: fontSize + 2,
        }}>
        TS
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
