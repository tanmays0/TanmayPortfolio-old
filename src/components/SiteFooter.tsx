/**
 * Site footer — brand + social (content routes unchanged).
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GithubLogo, LinkedinLogo } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PROFILE } from '../data/profile';
import type { RootStackParamList } from '../navigation/types';
import { useTheme } from '../theme/ThemeContext';
import { openExternalUrl } from '../utils/openExternalUrl';
import { BrandMark } from './BrandMark';

export function SiteFooter() {
  const { colors, spacing, typography } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={{ marginTop: spacing.section, alignItems: 'flex-start', width: '100%' }}>
      <View style={[styles.rule, { backgroundColor: colors.border, marginBottom: spacing.xl }]} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg }}>
        <BrandMark size={36} />
        <Text style={[typography.bodyStrong, { color: colors.text, marginLeft: spacing.md }]}>
          Tanmay Shinde
        </Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: spacing.xl }}>
        {(
          [
            ['Home', 'Home'],
            ['About', 'About'],
            ['Projects', 'Projects'],
            ['Skills', 'Skills'],
            ['Contact', 'Contact'],
          ] as const
        ).map(([label, route]) => (
          <Pressable key={route} onPress={() => navigation.navigate(route)}>
            <Text style={[typography.meta, { color: colors.textMuted }]}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={[styles.socialRow, { gap: spacing.md, marginBottom: spacing.xl }]}>
        <Pressable
          accessibilityLabel="GitHub"
          onPress={() => openExternalUrl(PROFILE.githubUrl, 'GitHub')}>
          <GithubLogo size={26} color={colors.text} weight="fill" />
        </Pressable>
        <Pressable
          accessibilityLabel="LinkedIn"
          onPress={() => openExternalUrl(PROFILE.linkedinUrl, 'LinkedIn')}>
          <LinkedinLogo size={26} color={colors.text} weight="fill" />
        </Pressable>
      </View>

      <Text style={[typography.caption, { color: colors.textMuted }]}>
        © {new Date().getFullYear()} Tanmay Shinde
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rule: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
