/**
 * Scrollable screen shell with mesh, header, and floating dock.
 */
import { ReactNode } from 'react';
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { FloatingBottomNav } from './FloatingBottomNav';
import { MobileNavHeader } from './MobileNavHeader';
import { ScreenMeshBackground } from './ScreenMeshBackground';

type ScreenContainerProps = {
  children: ReactNode;
  scroll?: boolean;
  showNav?: boolean;
  showDock?: boolean;
  contentStyle?: ViewStyle;
};

export function ScreenContainer({
  children,
  scroll = true,
  showNav = true,
  showDock = true,
  contentStyle,
}: ScreenContainerProps) {
  const { colors, spacing, dockClearance } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const gutter = width >= 400 ? spacing.xl : spacing.lg;

  const content = (
    <View
      style={[
        styles.inner,
        {
          paddingHorizontal: gutter,
          paddingTop: spacing.xl,
          paddingBottom: (showDock ? dockClearance : spacing.xxxl) + insets.bottom,
          maxWidth: 560,
          width: '100%',
          alignSelf: 'center',
        },
        contentStyle,
      ]}>
      {children}
    </View>
  );

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenMeshBackground />
      {showNav ? <MobileNavHeader /> : null}
      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.grow}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
      {showDock ? <FloatingBottomNav /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  grow: {
    flexGrow: 1,
  },
  inner: {
    flexGrow: 1,
  },
});
