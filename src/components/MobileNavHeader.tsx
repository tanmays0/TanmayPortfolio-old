/**
 * Minimal portfolio header — brand mark + theme toggle + overflow menu.
 */
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { List, X } from 'phosphor-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../navigation/types';
import { useTheme } from '../theme/ThemeContext';
import { BrandMark } from './BrandMark';
import { LogoEntrance } from './LogoEntrance';
import { ScreenMeshBackground } from './ScreenMeshBackground';
import { ThemeToggle } from './ThemeToggle';

const BRAND = 'Tanmay Shinde';

const MENU_LINKS: { label: string; route: keyof RootStackParamList }[] = [
  { label: 'Home', route: 'Home' },
  { label: 'About', route: 'About' },
  { label: 'Skills', route: 'Skills' },
  { label: 'Projects', route: 'Projects' },
  { label: 'Contact', route: 'Contact' },
  { label: 'Experience', route: 'Experience' },
  { label: 'Resume', route: 'Resume' },
  { label: 'Certifications', route: 'Certifications' },
];

function MenuLink({
  label,
  active,
  index,
  visible,
  onPress,
  accent,
}: {
  label: string;
  active: boolean;
  index: number;
  visible: boolean;
  onPress: () => void;
  accent: string;
}) {
  const { colors, typography, spacing } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (!visible) {
      opacity.setValue(0);
      translateX.setValue(20);
      return;
    }
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 340,
        delay: 40 + index * 45,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 340,
        delay: 40 + index * 45,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, index, opacity, translateX]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateX }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        style={[
          styles.menuItem,
          {
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md,
            backgroundColor: active ? `${accent}18` : 'transparent',
            borderColor: active ? accent : 'transparent',
          },
        ]}>
        <Text
          style={[
            typography.bodyStrong,
            {
              color: active ? accent : colors.text,
              fontSize: 26,
              lineHeight: 32,
            },
          ]}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

export function MobileNavHeader() {
  const { colors, accents, spacing, typography, touchTarget, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (next: keyof RootStackParamList) => {
    setMenuOpen(false);
    setTimeout(() => navigation.navigate(next), 80);
  };

  return (
    <>
      <View
        style={[
          styles.bar,
          {
            paddingTop: insets.top,
            backgroundColor: colors.headerGlass,
            borderBottomColor: colors.border,
          },
        ]}>
        <View style={[styles.row, { paddingHorizontal: spacing.lg, paddingVertical: 12 }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go to home"
            onPress={() => navigation.navigate('Home')}
            style={styles.brandRow}>
            <LogoEntrance>
              <BrandMark size={32} />
            </LogoEntrance>
            <Text style={[typography.brand, { color: colors.text, marginLeft: 10 }]} numberOfLines={1}>
              {BRAND}
            </Text>
          </Pressable>

          <View style={styles.actions}>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} compact />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open menu"
              onPress={() => setMenuOpen(true)}
              style={[
                styles.menuBtn,
                {
                  minWidth: touchTarget,
                  minHeight: touchTarget,
                  backgroundColor: colors.surfaceElevated,
                  borderColor: colors.border,
                },
              ]}>
              <List size={20} color={accents.blue} weight="bold" />
            </Pressable>
          </View>
        </View>
      </View>

      <Modal
        visible={menuOpen}
        animationType="fade"
        presentationStyle="fullScreen"
        onRequestClose={() => setMenuOpen(false)}>
        <View style={[styles.menu, { backgroundColor: colors.background }]}>
          <ScreenMeshBackground />
          <View style={{ paddingTop: insets.top, zIndex: 1, flex: 1 }}>
            <View
              style={[
                styles.row,
                {
                  paddingHorizontal: spacing.lg,
                  paddingVertical: 12,
                  borderBottomColor: colors.border,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                },
              ]}>
              <View style={styles.brandRow}>
                <BrandMark size={32} />
                <Text style={[typography.brand, { color: colors.text, marginLeft: 10 }]} numberOfLines={1}>
                  {BRAND}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close menu"
                onPress={() => setMenuOpen(false)}
                style={[
                  styles.menuBtn,
                  {
                    minWidth: touchTarget,
                    minHeight: touchTarget,
                    backgroundColor: colors.surfaceElevated,
                    borderColor: colors.border,
                  },
                ]}>
                <X size={20} color={accents.magenta} weight="bold" />
              </Pressable>
            </View>

            <View style={{ paddingTop: spacing.xxl, gap: spacing.xs, paddingHorizontal: spacing.sm }}>
              {MENU_LINKS.map((item, index) => {
                const palette = [
                  accents.blue,
                  accents.violet,
                  accents.cyan,
                  accents.magenta,
                  accents.green,
                  accents.orange,
                  accents.coral,
                  accents.blue,
                ];
                return (
                  <MenuLink
                    key={item.route}
                    label={item.label}
                    active={route.name === item.route}
                    index={index}
                    visible={menuOpen}
                    accent={palette[index % palette.length]}
                    onPress={() => go(item.route)}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    marginRight: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
  },
  menu: {
    flex: 1,
  },
  menuItem: {
    borderRadius: 16,
    borderWidth: 1,
  },
});
