/**
 * Animated theme control — compact custom pill (preserves toggle callback).
 */
import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { Moon, Sun } from 'phosphor-react-native';
import { useTheme } from '../theme/ThemeContext';

type ThemeToggleProps = {
  isDark: boolean;
  onToggle: () => void;
  compact?: boolean;
};

export function ThemeToggle({ isDark, onToggle, compact = false }: ThemeToggleProps) {
  const { colors, accents, spacing, motion } = useTheme();
  const slide = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: isDark ? 1 : 0,
      duration: motion.normal,
      useNativeDriver: true,
    }).start();
  }, [isDark, motion.normal, slide]);

  const thumbX = slide.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  if (compact) {
    return (
      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: isDark }}
        accessibilityLabel="Toggle dark and light mode"
        onPress={onToggle}
        style={[
          styles.compact,
          {
            backgroundColor: colors.surfaceElevated,
            borderColor: colors.border,
          },
        ]}>
        {isDark ? (
          <Moon size={16} color={accents.cyan} weight="fill" />
        ) : (
          <Sun size={16} color={accents.orange} weight="fill" />
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: isDark }}
      accessibilityLabel="Toggle dark and light mode"
      onPress={onToggle}
      style={[
        styles.track,
        {
          backgroundColor: colors.surfaceElevated,
          borderColor: colors.border,
          marginBottom: spacing.md,
        },
      ]}>
      <View style={styles.icons}>
        <Sun size={14} color={isDark ? colors.textMuted : accents.orange} weight="fill" />
        <Moon size={14} color={isDark ? accents.cyan : colors.textMuted} weight="fill" />
      </View>
      <Animated.View
        style={[
          styles.thumb,
          {
            backgroundColor: isDark ? accents.blue : accents.violet,
            transform: [{ translateX: thumbX }],
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 56,
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  icons: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  compact: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
