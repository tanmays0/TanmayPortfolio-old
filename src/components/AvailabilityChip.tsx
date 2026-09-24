/**
 * Small status / availability pill for the hero.
 */
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type AvailabilityChipProps = {
  label?: string;
};

export function AvailabilityChip({
  label = 'Open to internships & full-time roles',
}: AvailabilityChipProps) {
  const { colors, typography, spacing } = useTheme();

  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: 'rgba(59, 130, 246, 0.14)',
          borderColor: 'rgba(59, 130, 246, 0.45)',
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
        },
      ]}
      accessibilityRole="text"
      accessibilityLabel={label}>
      <View style={[styles.dot, { backgroundColor: colors.primary }]} />
      <Text style={[typography.caption, { color: colors.primary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 999,
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
});
