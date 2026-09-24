/**
 * Floating bottom navigation — visual dock over Stack Navigator routes.
 */
import { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Briefcase,
  Code,
  House,
  IdentificationCard,
  PaperPlaneTilt,
  DotsThree,
  Certificate,
  FileText,
  ClockCounterClockwise,
} from 'phosphor-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../navigation/types';
import { useTheme } from '../theme/ThemeContext';

type DockRoute = keyof RootStackParamList;

const PRIMARY: {
  route: DockRoute;
  label: string;
  Icon: typeof House;
}[] = [
  { route: 'Home', label: 'Home', Icon: House },
  { route: 'Projects', label: 'Work', Icon: Briefcase },
  { route: 'Skills', label: 'Skills', Icon: Code },
  { route: 'About', label: 'About', Icon: IdentificationCard },
  { route: 'Contact', label: 'Talk', Icon: PaperPlaneTilt },
];

const MORE: { route: DockRoute; label: string; Icon: typeof FileText }[] = [
  { route: 'Experience', label: 'Experience', Icon: ClockCounterClockwise },
  { route: 'Resume', label: 'Resume', Icon: FileText },
  { route: 'Certifications', label: 'Certifications', Icon: Certificate },
];

export function FloatingBottomNav() {
  const { colors, spacing, typography, dockClearance } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const [moreOpen, setMoreOpen] = useState(false);

  const isMoreActive = MORE.some(item => item.route === route.name);

  const go = (next: DockRoute) => {
    setMoreOpen(false);
    navigation.navigate(next);
  };

  return (
    <>
      <View
        pointerEvents="box-none"
        style={[
          styles.dockWrap,
          {
            paddingBottom: Math.max(insets.bottom, 10),
            height: dockClearance,
          },
        ]}>
        <View
          style={[
            styles.dock,
            {
              backgroundColor: colors.dock,
              borderColor: colors.border,
              shadowColor: '#000',
            },
          ]}>
          {PRIMARY.map(item => {
            const active = route.name === item.route;
            return (
              <Pressable
                key={item.route}
                accessibilityRole="button"
                accessibilityLabel={item.label}
                accessibilityState={{ selected: active }}
                onPress={() => go(item.route)}
                style={styles.item}>
                <View
                  style={[
                    styles.iconWrap,
                    active && {
                      backgroundColor: colors.glow,
                    },
                  ]}>
                  <item.Icon
                    size={22}
                    color={active ? colors.primary : colors.textMuted}
                    weight={active ? 'fill' : 'regular'}
                  />
                </View>
              </Pressable>
            );
          })}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="More"
            onPress={() => setMoreOpen(true)}
            style={styles.item}>
            <View
              style={[
                styles.iconWrap,
                isMoreActive && {
                  backgroundColor: colors.glow,
                },
              ]}>
              <DotsThree
                size={22}
                color={isMoreActive ? colors.primary : colors.textMuted}
                weight="bold"
              />
            </View>
          </Pressable>
        </View>
      </View>

      <Modal
        visible={moreOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMoreOpen(false)}>
        <Pressable style={styles.sheetBackdrop} onPress={() => setMoreOpen(false)}>
          <View
            style={[
              styles.sheet,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                marginBottom: dockClearance + spacing.sm,
              },
            ]}>
            {MORE.map(item => {
              const active = route.name === item.route;
              return (
                <Pressable
                  key={item.route}
                  onPress={() => go(item.route)}
                  style={[
                    styles.sheetRow,
                    {
                      backgroundColor: active ? colors.glow : 'transparent',
                      borderColor: colors.border,
                    },
                  ]}>
                  <item.Icon
                    size={20}
                    color={active ? colors.primary : colors.text}
                    weight={active ? 'fill' : 'regular'}
                  />
                  <Text style={[typography.bodyStrong, { color: colors.text, marginLeft: 12 }]}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  dockWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    zIndex: 40,
  },
  dock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  sheet: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 12,
    gap: 8,
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
