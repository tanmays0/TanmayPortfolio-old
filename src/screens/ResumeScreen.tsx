/**
 * Resume screen — visual redesign; PDF behavior unchanged.
 */
import { Text } from 'react-native';
import { FadeIn } from '../components/FadeIn';
import { ResumeCard } from '../components/ResumeCard';
import { ScreenContainer } from '../components/ScreenContainer';
import { SiteFooter } from '../components/SiteFooter';
import { PROFILE } from '../data/profile';
import { useTheme } from '../theme/ThemeContext';

export function ResumeScreen() {
  const { colors, accents, spacing, typography } = useTheme();

  return (
    <ScreenContainer>
      <FadeIn>
        <Text style={[typography.label, { color: accents.violet }]}>Document</Text>
        <Text style={[typography.hero, { color: colors.text, marginTop: 6, fontSize: 36 }]}>
          Resume
        </Text>
        <Text
          style={[
            typography.meta,
            { color: colors.textMuted, marginTop: spacing.sm, marginBottom: spacing.xl },
          ]}>
          Education, experience, and skills at a glance
        </Text>
      </FadeIn>
      <ResumeCard summary={PROFILE.resumeSummary} resumeUrl={PROFILE.resumeUrl} />
      <SiteFooter />
    </ScreenContainer>
  );
}
