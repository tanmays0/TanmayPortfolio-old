/**
 * Soft aurora wash behind hero content.
 */
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type HeroAtmosphereProps = {
  style?: ViewStyle;
};

export function HeroAtmosphere({ style }: HeroAtmosphereProps) {
  const { isDark } = useTheme();
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 4200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 4200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const scale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });
  const opacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 0.9],
  });

  return (
    <View pointerEvents="none" style={[styles.root, style]}>
      <Animated.View
        style={[
          styles.blob,
          styles.center,
          {
            backgroundColor: isDark ? 'rgba(59, 130, 246, 0.45)' : 'rgba(37, 99, 235, 0.22)',
            opacity,
            transform: [{ scale }],
          },
        ]}
      />
      <View
        style={[
          styles.blob,
          styles.left,
          { backgroundColor: isDark ? 'rgba(34, 211, 238, 0.28)' : 'rgba(8, 145, 178, 0.18)' },
        ]}
      />
      <View
        style={[
          styles.blob,
          styles.right,
          { backgroundColor: isDark ? 'rgba(129, 140, 248, 0.22)' : 'rgba(99, 102, 241, 0.14)' },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
  },
  center: {
    width: 280,
    height: 280,
    top: -40,
    alignSelf: 'center',
    left: '50%',
    marginLeft: -140,
  },
  left: {
    width: 180,
    height: 180,
    top: 100,
    left: -60,
  },
  right: {
    width: 200,
    height: 200,
    top: 40,
    right: -70,
  },
});
