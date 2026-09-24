/**
 * Skills — clustered categories with accent rhythm (data from skills.ts).
 */
import { Text, View } from 'react-native';
import { FadeIn } from '../components/FadeIn';
import { ScreenContainer } from '../components/ScreenContainer';
import { SiteFooter } from '../components/SiteFooter';
import { SkillCategory } from '../components/SkillCategory';
import { SKILL_CATEGORIES } from '../data/skills';
import { useTheme } from '../theme/ThemeContext';

export function SkillsScreen() {
  const { colors, accents, spacing, typography } = useTheme();

  return (
    <ScreenContainer>
      <FadeIn>
        <Text style={[typography.label, { color: accents.cyan }]}>Capabilities</Text>
        <Text style={[typography.hero, { color: colors.text, marginTop: 6, fontSize: 38 }]}>
          Skills
        </Text>
        <Text
          style={[
            typography.meta,
            { color: colors.textMuted, marginTop: spacing.sm, marginBottom: spacing.xxl },
          ]}>
          Technical skills and soft skills
        </Text>
      </FadeIn>

      {SKILL_CATEGORIES.map((category, index) => (
        <SkillCategory
          key={category.id}
          title={category.title}
          skills={category.skills}
          index={index}
        />
      ))}
      <SiteFooter />
    </ScreenContainer>
  );
}
