/**
 * Resume document block — premium hierarchy, preserved PDF actions.
 */
import { StyleSheet, Text, View } from 'react-native';
import { PROFILE } from '../data/profile';
import { useTheme } from '../theme/ThemeContext';
import { openBundledResume, openExternalUrl } from '../utils/openExternalUrl';
import { BrandMark } from './BrandMark';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

type ResumeCardProps = {
  summary: string;
  resumeUrl: string;
};

export function ResumeCard({ summary, resumeUrl }: ResumeCardProps) {
  const { colors, accents, spacing, typography, radius } = useTheme();
  const hasHostedUrl = resumeUrl.trim().length > 0;

  const handleOpenResume = () => {
    if (hasHostedUrl) {
      openExternalUrl(resumeUrl, 'resume');
      return;
    }
    openBundledResume();
  };

  return (
    <View>
      <View
        style={[
          styles.doc,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: radius.card,
            padding: spacing.xl,
          },
        ]}>
        <View style={[styles.accentBar, { backgroundColor: accents.violet }]} />
        <View style={styles.docHead}>
          <BrandMark size={44} />
          <View style={{ marginLeft: spacing.md, flex: 1 }}>
            <Text style={[typography.label, { color: accents.violet }]}>Curriculum vitae</Text>
            <Text style={[typography.sectionTitle, { color: colors.text, marginTop: 4 }]}>
              {PROFILE.name}
            </Text>
          </View>
        </View>

        <View style={[styles.rule, { backgroundColor: colors.border, marginVertical: spacing.lg }]} />

        <Text style={[typography.body, { color: colors.textMuted }]}>{summary}</Text>
        <Text style={[typography.meta, { color: colors.text, marginTop: spacing.lg }]}>
          {PROFILE.education}
        </Text>
      </View>

      <View style={{ marginTop: spacing.xl, gap: spacing.md }}>
        <PrimaryButton title="Open resume PDF" onPress={handleOpenResume} fullWidth />
        <SecondaryButton
          title="Open LinkedIn"
          onPress={() => openExternalUrl(PROFILE.linkedinUrl, 'LinkedIn')}
          fullWidth
        />
        <SecondaryButton
          title="Open GitHub"
          onPress={() => openExternalUrl(PROFILE.githubUrl, 'GitHub')}
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  doc: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  docHead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rule: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
});
