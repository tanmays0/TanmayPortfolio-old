/**
 * Shared card surface — Figma rellenos #1F1F21.
 */
import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type CardProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function Card({ children, style }: CardProps) {
  const { colors, radius, spacing } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: radius.card,
          padding: spacing.lg,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    marginBottom: 10,
  },
});
