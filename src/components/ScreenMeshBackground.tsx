/**
 * Flat screen background — no decorative blobs.
 */
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export function ScreenMeshBackground() {
  const { colors } = useTheme();

  return (
    <View
      pointerEvents="none"
      style={[styles.root, { backgroundColor: colors.background }]}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
  },
});
