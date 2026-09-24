/**
 * Compact hero stats row — one purpose, not a dashboard.
 */
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type StatItem = {
  value: string;
  label: string;
};

type StatStripProps = {
  items: StatItem[];
};

export function StatStrip({ items }: StatStripProps) {
  const { colors, typography, spacing } = useTheme();

  return (
    <View
      style={[
        styles.row,
        {
          borderColor: colors.border,
          backgroundColor: colors.card,
          marginTop: spacing.xl,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.sm,
        },
      ]}>
      {items.map((item, index) => (
        <View key={item.label} style={styles.item}>
          {index > 0 ? (
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          ) : null}
          <View style={styles.copy}>
            <Text style={[typography.bodyStrong, { color: colors.text, fontSize: 16 }]}>
              {item.value}
            </Text>
            <Text style={[typography.caption, { color: colors.textMuted, marginTop: 2 }]}>
              {item.label}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    width: '100%',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    marginVertical: 4,
  },
  copy: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
});
