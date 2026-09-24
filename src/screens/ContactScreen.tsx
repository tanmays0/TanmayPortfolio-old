/**
 * Contact — editorial form layout; TextInput validation + Alert preserved.
 */
import { Pressable, Text, View } from 'react-native';
import { GithubLogo, LinkedinLogo } from 'phosphor-react-native';
import { ContactForm } from '../components/ContactForm';
import { FadeIn } from '../components/FadeIn';
import { ScreenContainer } from '../components/ScreenContainer';
import { SiteFooter } from '../components/SiteFooter';
import { PROFILE } from '../data/profile';
import { useTheme } from '../theme/ThemeContext';
import { openExternalUrl } from '../utils/openExternalUrl';

export function ContactScreen() {
  const { colors, accents, spacing, typography, radius } = useTheme();

  return (
    <ScreenContainer>
      <FadeIn>
        <Text style={[typography.label, { color: accents.green }]}>Contact</Text>
        <Text style={[typography.hero, { color: colors.text, marginTop: 6, fontSize: 40 }]}>
          Let’s{'\n'}
          <Text style={{ color: accents.magenta }}>talk.</Text>
        </Text>
        <Text
          style={[
            typography.body,
            {
              color: colors.textMuted,
              marginTop: spacing.md,
              marginBottom: spacing.xxl,
              lineHeight: 26,
            },
          ]}>
          If you would like to discuss an opportunity or collaboration, please send a message below.
          This academic form validates input on device and does not send email yet.
        </Text>
      </FadeIn>

      <View
        style={{
          borderRadius: radius.card,
          padding: spacing.xl,
          width: '100%',
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
        }}>
        <ContactForm />
      </View>

      <View style={{ marginTop: spacing.xxxl, alignItems: 'flex-start' }}>
        <Text style={[typography.label, { color: colors.textMuted }]}>Elsewhere</Text>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: spacing.md }}>
          <Pressable
            accessibilityLabel="GitHub"
            onPress={() => openExternalUrl(PROFILE.githubUrl, 'GitHub')}
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: accents.blue,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.surfaceElevated,
            }}>
            <GithubLogo size={24} color={accents.blue} weight="fill" />
          </Pressable>
          <Pressable
            accessibilityLabel="LinkedIn"
            onPress={() => openExternalUrl(PROFILE.linkedinUrl, 'LinkedIn')}
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: accents.violet,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.surfaceElevated,
            }}>
            <LinkedinLogo size={24} color={accents.violet} weight="fill" />
          </Pressable>
        </View>
      </View>

      <SiteFooter />
    </ScreenContainer>
  );
}
