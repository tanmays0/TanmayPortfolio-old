/**
 * Light footer for Home / More — keeps branding consistent.
 */
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export function AppFooter() {
  const { colors, spacing, typography } = useTheme();

  return (
    <View
      style={[
        styles.footer,
        {
          marginTop: spacing.xxl,
          paddingTop: spacing.lg,
          borderTopColor: colors.border,
        },
      ]}>
      <Text style={[typography.meta, { color: colors.textMuted, textAlign: 'center' }]}>
        Tanmay Shinde · Developer Portfolio
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
