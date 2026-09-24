/**
 * Outlined secondary CTA — press scale + white border.
 */
import { ReactNode, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type SecondaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
  fullWidth?: boolean;
  icon?: ReactNode;
};

export function SecondaryButton({
  title,
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
  fullWidth = false,
  icon,
}: SecondaryButtonProps) {
  const { colors, radius, touchTarget, typography } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      friction: 6,
      tension: 180,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        alignSelf: fullWidth ? 'stretch' : 'center',
        width: fullWidth ? '100%' : undefined,
      }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? title}
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => animateTo(0.97)}
        onPressOut={() => animateTo(1)}
        android_ripple={{ color: colors.ripple }}
        style={({ pressed }) => [
          styles.button,
          {
            borderColor: colors.border,
            borderRadius: radius.button,
            minHeight: touchTarget,
            opacity: disabled ? 0.5 : pressed ? 0.88 : 1,
            backgroundColor: colors.surfaceElevated,
          },
          style,
        ]}>
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <Text style={[typography.button, { color: colors.text }]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    gap: 8,
  },
  icon: {
    marginRight: 2,
  },
});
