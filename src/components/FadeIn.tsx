/**
 * Mount animation — fade + upward slide (motion-driven portfolio).
 */
import { ReactNode, useEffect, useRef } from 'react';
import { Animated, Easing, ViewStyle } from 'react-native';

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  style?: ViewStyle;
};

export function FadeIn({ children, delay = 0, duration = 640, style }: FadeInProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(22)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [delay, duration, opacity, translateY]);

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}
