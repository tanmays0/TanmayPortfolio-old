/**
 * About — editorial immersive profile (content from PROFILE only).
 */
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FadeIn } from '../components/FadeIn';
import { ProfilePhoto } from '../components/ProfilePhoto';
import { ScreenContainer } from '../components/ScreenContainer';
import { SecondaryButton } from '../components/SecondaryButton';
import { SiteFooter } from '../components/SiteFooter';
import { SkillChip } from '../components/SkillChip';
import { PROFILE } from '../data/profile';
import type { RootStackParamList } from '../navigation/types';
import { useTheme } from '../theme/ThemeContext';

export function AboutScreen() {
  const { colors, spacing, typography, radius } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer contentStyle={{ paddingTop: spacing.md }}>
      <FadeIn>
        <Text style={[typography.label, { color: colors.textMuted }]}>About</Text>
        <Text style={[typography.hero, { color: colors.text, marginTop: spacing.sm, fontSize: 40 }]}>
          Building{'\n'}
          <Text style={{ color: colors.primary }}>with intent.</Text>
        </Text>
      </FadeIn>

      <FadeIn delay={80}>
        <View
          style={[
            styles.heroImage,
            {
              marginTop: spacing.xl,
              borderRadius: radius.card,
              overflow: 'hidden',
            },
          ]}>
          <ProfilePhoto />
          <View style={[styles.imageMeta, { backgroundColor: 'rgba(10,10,12,0.55)' }]}>
            <Text style={[typography.bodyStrong, { color: '#FFFFFF' }]}>{PROFILE.name}</Text>
            <Text style={[typography.meta, { color: 'rgba(255,255,255,0.75)' }]}>
              {PROFILE.title}
            </Text>
          </View>
        </View>
      </FadeIn>

      <FadeIn delay={140}>
        <Text style={[typography.body, { color: colors.text, marginTop: spacing.xxl, fontSize: 18, lineHeight: 30 }]}>
          {PROFILE.bio}
        </Text>
      </FadeIn>

      <FadeIn delay={180}>
        <View style={[styles.rule, { backgroundColor: colors.border, marginVertical: spacing.xxl }]} />
        <Text style={[typography.label, { color: colors.textMuted }]}>Education</Text>
        <Text style={[typography.sectionTitle, { color: colors.text, marginTop: spacing.sm, fontSize: 22 }]}>
          {PROFILE.education}
        </Text>
      </FadeIn>

      <FadeIn delay={220}>
        <View
          style={[
            styles.metaBlock,
            {
              marginTop: spacing.xxl,
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: radius.card,
              padding: spacing.lg,
            },
          ]}>
          <Text style={[typography.label, { color: colors.textMuted }]}>Coordinates</Text>
          <Text style={[typography.bodyStrong, { color: colors.text, marginTop: spacing.md }]}>
            {PROFILE.email}
          </Text>
          <Text style={[typography.meta, { color: colors.textMuted, marginTop: 6 }]}>
            {PROFILE.phone}
          </Text>
          <Text style={[typography.meta, { color: colors.textMuted, marginTop: 4 }]}>
            {PROFILE.location}
          </Text>
        </View>
      </FadeIn>

      <FadeIn delay={260}>
        <Text style={[typography.label, { color: colors.textMuted, marginTop: spacing.xxxl }]}>
          Interests
        </Text>
        <View style={[styles.interestList, { marginTop: spacing.md }]}>
          {PROFILE.interests.map((item, i) => (
            <View key={item} style={styles.interestRow}>
              <Text
                style={[
                  typography.number,
                  { color: colors.border, fontSize: 24, lineHeight: 28 },
                ]}>
                {String(i + 1).padStart(2, '0')}
              </Text>
              <Text
                style={[
                  typography.bodyStrong,
                  { color: colors.text, marginLeft: spacing.md, flex: 1, fontSize: 16 },
                ]}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      </FadeIn>

      <FadeIn delay={300}>
        <Text style={[typography.label, { color: colors.textMuted, marginTop: spacing.xxxl }]}>
          Strengths
        </Text>
        <View style={{ marginTop: spacing.md, flexDirection: 'row', flexWrap: 'wrap' }}>
          {PROFILE.strengths.map(item => (
            <SkillChip key={item} label={item} accent={colors.primary} variant="outline" />
          ))}
        </View>
      </FadeIn>

      <FadeIn delay={340}>
        <View style={{ marginTop: spacing.xxxl }}>
          <Text style={[typography.label, { color: colors.textMuted }]}>Direction</Text>
          <Text
            style={[
              typography.body,
              { color: colors.textMuted, marginTop: spacing.md, fontSize: 17, lineHeight: 28 },
            ]}>
            {PROFILE.careerDirection}
          </Text>
        </View>
      </FadeIn>

      <View style={{ marginTop: spacing.xxl }}>
        <SecondaryButton
          title="View certifications"
          onPress={() => navigation.navigate('Certifications')}
          fullWidth
        />
      </View>

      <SiteFooter />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  imageMeta: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
  },
  rule: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
  metaBlock: {
    borderWidth: 1,
  },
  interestList: {
    gap: 14,
  },
  interestRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
