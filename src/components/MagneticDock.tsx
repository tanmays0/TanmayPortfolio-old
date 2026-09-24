/**
 * React Native adaptation of Componentry's MagneticDock.
 * Web hover magnetism becomes press-scale springs; glass/solid variants kept.
 */
import { ReactNode, useRef } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';

export type DockItemData = {
  id: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  badge?: number;
};

export type MagneticDockProps = {
  items: DockItemData[];
  iconSize?: number;
  maxScale?: number;
  showLabels?: boolean;
  position?: 'bottom' | 'top';
  variant?: 'glass' | 'solid' | 'transparent';
  className?: never;
  style?: ViewStyle;
};

/** Approximate dock chrome height (excluding safe-area inset). */
export const DOCK_CHROME_HEIGHT = 84;

type DockItemProps = {
  item: DockItemData;
  iconSize: number;
  maxScale: number;
  showLabels: boolean;
  activeTint: string;
  labelColor: string;
  cardBg: string;
  borderColor: string;
};

function DockItemButton({
  item,
  iconSize,
  maxScale,
  showLabels,
  activeTint,
  labelColor,
  cardBg,
  borderColor,
}: DockItemProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      damping: 16,
      stiffness: 260,
      mass: 0.45,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.label}
      accessibilityState={{ selected: !!item.isActive }}
      onPress={item.onClick}
      onPressIn={() => animateTo(maxScale)}
      onPressOut={() => animateTo(1)}
      style={styles.itemPressable}>
      <Animated.View
        style={[
          styles.iconShell,
          {
            width: iconSize,
            height: iconSize,
            backgroundColor: item.isActive ? `${activeTint}22` : cardBg,
            borderColor: item.isActive ? activeTint : borderColor,
            transform: [
              { scale },
              {
                translateY: scale.interpolate({
                  inputRange: [1, maxScale],
                  outputRange: [0, -8],
                }),
              },
            ],
          },
        ]}>
        <View style={styles.iconInner}>{item.icon}</View>
        {item.badge !== undefined && item.badge > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {item.badge > 99 ? '99+' : item.badge}
            </Text>
          </View>
        ) : null}
      </Animated.View>
      {item.isActive ? (
        <View style={[styles.activeDot, { backgroundColor: activeTint }]} />
      ) : (
        <View style={styles.activeDotPlaceholder} />
      )}
      {showLabels ? (
        <Text
          numberOfLines={1}
          style={[
            styles.label,
            { color: item.isActive ? activeTint : labelColor },
          ]}>
          {item.label}
        </Text>
      ) : null}
    </Pressable>
  );
}

export function MagneticDock({
  items,
  iconSize = 48,
  maxScale = 1.18,
  showLabels = true,
  position = 'bottom',
  variant = 'glass',
  style,
}: MagneticDockProps) {
  const { colors, isDark, spacing } = useTheme();
  const insets = useSafeAreaInsets();

  const variantStyle: ViewStyle =
    variant === 'transparent'
      ? { backgroundColor: 'transparent', borderWidth: 0 }
      : variant === 'solid'
        ? {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: StyleSheet.hairlineWidth,
          }
        : {
            backgroundColor: isDark
              ? 'rgba(27, 35, 54, 0.92)'
              : 'rgba(255, 255, 255, 0.92)',
            borderColor: colors.border,
            borderWidth: StyleSheet.hairlineWidth,
          };

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.wrap,
        position === 'top' ? styles.wrapTop : styles.wrapBottom,
        {
          paddingBottom: position === 'bottom' ? Math.max(insets.bottom, spacing.sm) : spacing.sm,
          paddingTop: position === 'top' ? Math.max(insets.top, spacing.sm) : spacing.sm,
        },
      ]}>
      <View
        style={[
          styles.dock,
          variantStyle,
          Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: isDark ? 0.35 : 0.12,
              shadowRadius: 20,
            },
            android: { elevation: 10 },
          }),
          style,
        ]}>
        {items.map(item => (
          <DockItemButton
            key={item.id}
            item={item}
            iconSize={iconSize}
            maxScale={maxScale}
            showLabels={showLabels}
            activeTint={colors.primary}
            labelColor={colors.textMuted}
            cardBg={colors.inputBackground}
            borderColor={colors.border}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 50,
  },
  wrapBottom: {
    bottom: 0,
  },
  wrapTop: {
    top: 0,
  },
  dock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 28,
    maxWidth: '94%',
  },
  itemPressable: {
    alignItems: 'center',
    minWidth: 56,
    paddingHorizontal: 2,
  },
  iconShell: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  iconInner: {
    width: '58%',
    height: '58%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 999,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    marginTop: 4,
  },
  activeDotPlaceholder: {
    width: 5,
    height: 5,
    marginTop: 4,
  },
  label: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: '600',
  },
});
