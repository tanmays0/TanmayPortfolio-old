/**
 * Reusable section title + optional supporting line.
 */
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={[typography.bodyStrong, { color: colors.text }]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, typography.meta, { color: colors.textMuted }]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 4,
  },
});
