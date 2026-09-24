/**
 * Social / profile button with Phosphor icon + label.
 */
import type { Icon } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { openExternalUrl } from '../utils/openExternalUrl';

type SocialButtonProps = {
  label: string;
  url: string;
  IconComponent: Icon;
};

export function SocialButton({ label, url, IconComponent }: SocialButtonProps) {
  const { colors, radius, spacing, touchTarget, typography } = useTheme();

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`Open ${label}`}
      onPress={() => openExternalUrl(url, label)}
      android_ripple={{ color: colors.ripple }}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        {
          borderColor: colors.border,
          backgroundColor: colors.card,
          borderRadius: radius.button,
          minHeight: touchTarget,
          opacity: pressed ? 0.85 : 1,
          paddingHorizontal: spacing.lg,
        },
      ]}>
      <IconComponent size={20} color={colors.icon} weight="regular" />
      <Text style={[typography.button, styles.label, { color: colors.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 8,
  },
  label: {
    marginLeft: 10,
  },
});
