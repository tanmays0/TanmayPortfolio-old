/**
 * Small titled header used at the top of section screens.
 */
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
};

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={{ marginBottom: spacing.xl }}>
      <Text style={[typography.sectionTitle, { color: colors.primary, textAlign: 'center' }]}>
        {title}
      </Text>
      {subtitle ? (
        <Text
          style={[
            styles.subtitle,
            typography.meta,
            { color: colors.textMuted, textAlign: 'center' },
          ]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 6,
  },
});
