/**
 * Skill / tech label — optional accent tint (not a pill wall by default).
 */
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type SkillChipProps = {
  label: string;
  accent?: string;
  variant?: 'solid' | 'ghost' | 'outline';
};

export function SkillChip({ label, accent, variant = 'outline' }: SkillChipProps) {
  const { colors, radius, spacing, typography } = useTheme();
  const tint = accent ?? colors.primaryAccent;

  const bg =
    variant === 'solid'
      ? `${tint}28`
      : variant === 'ghost'
        ? 'transparent'
        : colors.surfaceElevated;
  const border = variant === 'ghost' ? 'transparent' : `${tint}55`;

  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: bg,
          borderColor: border,
          borderRadius: radius.chip,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
        },
      ]}>
      <Text style={[typography.chip, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
});
