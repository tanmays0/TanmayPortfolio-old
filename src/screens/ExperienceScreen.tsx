/**
 * Experience — polished visual timeline from EXPERIENCE data.
 */
import { Text, View } from 'react-native';
import { ExperienceItem } from '../components/ExperienceItem';
import { FadeIn } from '../components/FadeIn';
import { ScreenContainer } from '../components/ScreenContainer';
import { SiteFooter } from '../components/SiteFooter';
import { EXPERIENCE } from '../data/experience';
import { useTheme } from '../theme/ThemeContext';

export function ExperienceScreen() {
  const { colors, accents, spacing, typography } = useTheme();

  return (
    <ScreenContainer contentStyle={{ paddingTop: spacing.md }}>
      <FadeIn>
        <Text style={[typography.label, { color: accents.orange }]}>Career</Text>
        <Text style={[typography.hero, { color: colors.text, marginTop: 6, fontSize: 36 }]}>
          Experience
        </Text>
        <Text
          style={[
            typography.meta,
            { color: colors.textMuted, marginTop: spacing.sm, marginBottom: spacing.xxl },
          ]}>
          Roles, responsibilities, and technologies
        </Text>
      </FadeIn>

      <View>
        {EXPERIENCE.map((entry, index) => (
          <ExperienceItem
            key={entry.id}
            role={entry.role}
            organization={entry.organization}
            duration={entry.duration}
            description={entry.description}
            technologies={entry.technologies}
            achievements={entry.achievements}
            index={index}
            isLast={index === EXPERIENCE.length - 1}
          />
        ))}
      </View>
      <SiteFooter />
    </ScreenContainer>
  );
}
