/**
 * Primary CTA — glow edge + press scale.
 */
import { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
  fullWidth?: boolean;
};

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
  fullWidth = false,
}: PrimaryButtonProps) {
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
      <View
        style={[
          styles.glowWrap,
          {
            shadowColor: colors.primary,
            borderRadius: radius.button,
          },
        ]}>
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
              backgroundColor: colors.primary,
              borderRadius: radius.button,
              minHeight: touchTarget,
              opacity: disabled ? 0.5 : pressed ? 0.92 : 1,
            },
            style,
          ]}>
          <Text style={[typography.button, { color: colors.onPrimary }]}>{title}</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  glowWrap: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 0,
  },
});
