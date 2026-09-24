/**
 * Brief logo splash overlay on cold start.
 */
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { BrandMark } from './BrandMark';
import { LogoEntrance } from './LogoEntrance';
import { useTheme } from '../theme/ThemeContext';

type SplashOverlayProps = {
  onDone?: () => void;
};

export function SplashOverlay({ onDone }: SplashOverlayProps) {
  const { colors, typography } = useTheme();
  const [visible, setVisible] = useState(true);
  const fade = useState(() => new Animated.Value(1))[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fade, {
        toValue: 0,
        duration: 380,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setVisible(false);
          onDone?.();
        }
      });
    }, 900);
    return () => clearTimeout(timer);
  }, [fade, onDone]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.root, { backgroundColor: colors.background, opacity: fade }]}>
      <LogoEntrance>
        <BrandMark size={72} />
      </LogoEntrance>
      <Text style={[typography.label, { color: colors.textMuted, marginTop: 20 }]}>
        Tanmay Shinde
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
