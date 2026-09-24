/**
 * Certifications — editorial numbered list (CERTIFICATIONS data).
 */
import { Text, View } from 'react-native';
import { CertificationCard } from '../components/CertificationCard';
import { FadeIn } from '../components/FadeIn';
import { ScreenContainer } from '../components/ScreenContainer';
import { SiteFooter } from '../components/SiteFooter';
import { CERTIFICATIONS } from '../data/certifications';
import { useTheme } from '../theme/ThemeContext';

export function CertificationsScreen() {
  const { colors, accents, spacing, typography } = useTheme();

  return (
    <ScreenContainer>
      <FadeIn>
        <Text style={[typography.label, { color: accents.coral }]}>Credentials</Text>
        <Text style={[typography.hero, { color: colors.text, marginTop: 6, fontSize: 34 }]}>
          Certifications
        </Text>
        <Text
          style={[
            typography.meta,
            { color: colors.textMuted, marginTop: spacing.sm, marginBottom: spacing.xl },
          ]}>
          13+ credentials across backend, AI, cloud, and more
        </Text>
      </FadeIn>

      <View>
        {CERTIFICATIONS.map((cert, index) => (
          <CertificationCard
            key={cert.id}
            name={cert.name}
            issuer={cert.issuer}
            date={cert.date}
            credentialId={cert.credentialId}
            verifyUrl={cert.verifyUrl}
            index={index}
          />
        ))}
      </View>
      <SiteFooter />
    </ScreenContainer>
  );
}
