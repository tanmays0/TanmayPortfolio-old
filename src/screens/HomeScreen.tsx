/**
 * Home — clean editorial layout (no decorative blobs).
 */
import type { ImageSourcePropType } from 'react-native';
import { useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowRight, DownloadSimple } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BrandMark } from '../components/BrandMark';
import { FadeIn } from '../components/FadeIn';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProfilePhoto } from '../components/ProfilePhoto';
import { ScreenContainer } from '../components/ScreenContainer';
import { SecondaryButton } from '../components/SecondaryButton';
import { SiteFooter } from '../components/SiteFooter';
import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projectCatalog';
import type { RootStackParamList } from '../navigation/types';
import { useTheme } from '../theme/ThemeContext';
import { openBundledResume, openExternalUrl } from '../utils/openExternalUrl';

function WorkPreview({
  title,
  coverImage,
  accent,
  onPress,
  large,
}: {
  title: string;
  coverImage?: ImageSourcePropType;
  accent?: string;
  onPress: () => void;
  large?: boolean;
}) {
  const { colors, typography, radius } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View style={{ transform: [{ scale }], flex: large ? 1.35 : 1 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Open projects — ${title}`}
        onPress={onPress}
        onPressIn={() =>
          Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, friction: 7 }).start()
        }
        onPressOut={() =>
          Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 7 }).start()
        }
        style={[
          styles.preview,
          {
            height: large ? 200 : 140,
            backgroundColor: accent ?? colors.primary,
            borderRadius: radius.card,
            borderColor: colors.border,
          },
        ]}>
        {coverImage ? (
          <Image source={coverImage} style={styles.previewImage} resizeMode="cover" />
        ) : null}
        <View style={styles.previewOverlay}>
          <Text style={[typography.bodyStrong, { color: '#FFFFFF' }]}>{title}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export function HomeScreen() {
  const { colors, spacing, typography, radius } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const projects = PROJECTS ?? [];
  const featured = projects[0];
  const secondary = projects.slice(1, 3);

  return (
    <ScreenContainer contentStyle={{ overflow: 'visible' }}>
      <FadeIn delay={20}>
        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <BrandMark size={40} />
            <Text style={[typography.label, { color: colors.textMuted, marginLeft: spacing.md }]}>
              Portfolio · 2026
            </Text>
          </View>

          <Text style={[typography.hero, { color: colors.text, marginTop: spacing.xl }]}>
            {PROFILE.name}
          </Text>

          <Text
            style={[
              typography.bodyStrong,
              { color: colors.primary, marginTop: spacing.md, fontSize: 17 },
            ]}>
            {PROFILE.title}
          </Text>
          <Text style={[typography.body, { color: colors.textMuted, marginTop: spacing.sm }]}>
            {PROFILE.tagline}
          </Text>

          <View style={[styles.ctaRow, { marginTop: spacing.xl, gap: spacing.sm }]}>
            <View style={{ flex: 1 }}>
              <PrimaryButton
                title="View work"
                onPress={() => navigation.navigate('Projects')}
                fullWidth
              />
            </View>
            <View style={{ flex: 1 }}>
              <SecondaryButton
                title="Resume"
                onPress={() => {
                  if (PROFILE.resumeUrl.trim()) {
                    openExternalUrl(PROFILE.resumeUrl, 'resume');
                  } else {
                    openBundledResume();
                  }
                }}
                icon={<DownloadSimple size={18} color={colors.text} weight="bold" />}
                fullWidth
              />
            </View>
          </View>
        </View>
      </FadeIn>

      <FadeIn delay={90}>
        <Pressable
          onPress={() => navigation.navigate('About')}
          style={[
            styles.profileBlock,
            {
              marginTop: spacing.xxl,
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: radius.card,
            },
          ]}>
          <ProfilePhoto />
          <View style={{ padding: spacing.lg }}>
            <Text style={[typography.label, { color: colors.textMuted }]}>Profile</Text>
            <Text style={[typography.bodyStrong, { color: colors.text, marginTop: 6, fontSize: 20 }]}>
              About me
            </Text>
            <Text style={[typography.meta, { color: colors.textMuted, marginTop: 8 }]}>
              {PROFILE.focus}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: spacing.md,
                gap: 6,
              }}>
              <Text style={[typography.caption, { color: colors.primary }]}>Explore</Text>
              <ArrowRight size={14} color={colors.primary} weight="bold" />
            </View>
          </View>
        </Pressable>

        <View style={[styles.navGrid, { marginTop: spacing.md }]}>
          {(
            [
              { label: 'Skills', route: 'Skills' as const },
              { label: 'Experience', route: 'Experience' as const },
              { label: 'Contact', route: 'Contact' as const },
              { label: 'Certs', route: 'Certifications' as const },
            ] as const
          ).map(item => (
            <Pressable
              key={item.route}
              onPress={() => navigation.navigate(item.route)}
              style={[
                styles.navTile,
                {
                  backgroundColor: colors.surfaceElevated,
                  borderColor: colors.border,
                  borderRadius: radius.card,
                },
              ]}>
              <Text style={[typography.bodyStrong, { color: colors.text }]}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </FadeIn>

      <FadeIn delay={160}>
        <View style={{ marginTop: spacing.xxxl }}>
          <Text style={[typography.label, { color: colors.textMuted }]}>Selected work</Text>
          <Text style={[typography.sectionTitle, { color: colors.text, marginTop: 6 }]}>
            Recent projects
          </Text>

          {featured ? (
            <View style={{ marginTop: spacing.lg }}>
              <WorkPreview
                title={featured.title}
                coverImage={featured.coverImage}
                accent={featured.accent}
                onPress={() => navigation.navigate('Projects')}
                large
              />
            </View>
          ) : null}

          {secondary.length > 0 ? (
            <View style={[styles.previewRow, { marginTop: spacing.md, gap: spacing.md }]}>
              {secondary.map(project => (
                <WorkPreview
                  key={project.id}
                  title={project.title}
                  coverImage={project.coverImage}
                  accent={project.accent}
                  onPress={() => navigation.navigate('Projects')}
                />
              ))}
            </View>
          ) : null}

          <View style={{ marginTop: spacing.lg }}>
            <SecondaryButton
              title="View all projects"
              onPress={() => navigation.navigate('Projects')}
              fullWidth
            />
          </View>
        </View>
      </FadeIn>

      <SiteFooter />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: 8,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaRow: {
    flexDirection: 'row',
    width: '100%',
  },
  profileBlock: {
    borderWidth: 1,
    overflow: 'hidden',
    width: '100%',
  },
  navGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  navTile: {
    width: '48%',
    flexGrow: 1,
    minWidth: '45%',
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 14,
  },
  preview: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  previewImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  previewOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10,10,12,0.42)',
    justifyContent: 'flex-end',
    padding: 14,
  },
  previewRow: {
    flexDirection: 'row',
  },
});
