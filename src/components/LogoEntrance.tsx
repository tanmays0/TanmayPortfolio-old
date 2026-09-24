/**
 * Logo entrance — subtle scale/fade for splash / brand moments.
 */
import { ReactNode, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, ViewStyle } from 'react-native';

type LogoEntranceProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function LogoEntrance({ children, style }: LogoEntranceProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.86)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale]);

  return (
    <View style={[styles.center, style]}>
      <Animated.View style={{ opacity, transform: [{ scale }] }}>{children}</Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
