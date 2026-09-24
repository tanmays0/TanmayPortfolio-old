/**
 * Project presentation — featured vs secondary visual weight.
 */
import { useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { openExternalUrl } from '../utils/openExternalUrl';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { SkillChip } from './SkillChip';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type ProjectCardProps = {
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  coverImage?: ImageSourcePropType;
  accent?: string;
  index?: number;
  featured?: boolean;
};

export function ProjectCard({
  title,
  description,
  techStack,
  features,
  githubUrl,
  demoUrl,
  coverImage,
  accent,
  index = 0,
  featured = false,
}: ProjectCardProps) {
  const { colors, spacing, typography, radius } = useTheme();
  const [expanded, setExpanded] = useState(featured);
  const coverBg = accent ?? colors.primaryAccent;
  const scale = useRef(new Animated.Value(1)).current;
  const number = String(index + 1).padStart(2, '0');

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      friction: 7,
      tension: 160,
    }).start();
  };

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => !prev);
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        marginBottom: featured ? spacing.xl : spacing.md,
      }}>
      <Pressable
        onPressIn={() => animateTo(0.985)}
        onPressOut={() => animateTo(1)}
        accessible={false}>
        <View
          style={[
            styles.shell,
            {
              backgroundColor: featured ? colors.card : 'transparent',
              borderColor: featured ? `${coverBg}55` : colors.border,
              borderRadius: radius.card,
              padding: featured ? spacing.md : 0,
              borderWidth: featured ? 1 : 0,
            },
          ]}>
          <View
            style={[
              styles.thumb,
              {
                height: featured ? 220 : 148,
                backgroundColor: coverBg,
                borderColor: colors.border,
                borderRadius: radius.card,
                marginLeft: featured ? 0 : index % 2 === 1 ? spacing.xl : 0,
                marginRight: featured ? 0 : index % 2 === 0 ? spacing.lg : 0,
              },
            ]}
            accessibilityLabel={`${title} project cover`}>
            {coverImage ? (
              <Image source={coverImage} style={styles.thumbImage} resizeMode="cover" />
            ) : (
              <View style={styles.thumbFallback}>
                <Text style={[typography.bodyStrong, { color: '#FFFFFF' }]}>{title}</Text>
              </View>
            )}
            <View style={[styles.gradientScrim, { backgroundColor: 'rgba(7,7,10,0.35)' }]} />
            <Text style={[typography.number, styles.num, { color: 'rgba(255,255,255,0.22)' }]}>
              {number}
            </Text>
            {featured ? (
              <View style={[styles.badge, { backgroundColor: coverBg }]}>
                <Text style={[typography.caption, { color: '#FFFFFF', letterSpacing: 1 }]}>
                  FEATURED
                </Text>
              </View>
            ) : null}
          </View>

          <View style={{ paddingHorizontal: featured ? spacing.sm : spacing.xs, marginTop: spacing.md }}>
            <Text style={[typography.label, { color: coverBg }]}>Case study</Text>
            <Text
              style={[
                featured ? typography.sectionTitle : typography.bodyStrong,
                { color: colors.text, marginTop: 4 },
              ]}>
              {title}
            </Text>
            <Text
              style={[typography.body, { color: colors.textMuted, marginTop: spacing.sm }]}
              numberOfLines={expanded ? undefined : featured ? 4 : 2}>
              {description}
            </Text>

            <View style={[styles.wrap, { marginTop: spacing.md }]}>
              {techStack.slice(0, expanded ? techStack.length : 4).map(tech => (
                <SkillChip key={tech} label={tech} accent={coverBg} variant="solid" />
              ))}
            </View>

            {expanded ? (
              <View style={{ marginTop: spacing.md }}>
                <Text style={[typography.label, { color: colors.textMuted, marginBottom: spacing.sm }]}>
                  Highlights
                </Text>
                {features.map(feature => (
                  <View key={feature} style={styles.featureRow}>
                    <View style={[styles.dot, { backgroundColor: coverBg }]} />
                    <Text style={[typography.meta, { color: colors.textMuted, flex: 1 }]}>
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}

            <View style={[styles.actions, { marginTop: spacing.lg }]}>
              <View style={styles.actionItem}>
                <SecondaryButton
                  title={expanded ? 'Show less' : 'Details'}
                  onPress={toggle}
                  fullWidth
                />
              </View>
              {githubUrl ? (
                <View style={styles.actionItem}>
                  <PrimaryButton
                    title="GitHub"
                    onPress={() => openExternalUrl(githubUrl, 'GitHub')}
                    fullWidth
                  />
                </View>
              ) : null}
              {demoUrl ? (
                <View style={styles.actionItem}>
                  <SecondaryButton
                    title="Demo"
                    onPress={() => openExternalUrl(demoUrl, 'demo')}
                    fullWidth
                  />
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  shell: {
    overflow: 'hidden',
  },
  thumb: {
    width: '100%',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  thumbFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientScrim: {
    ...StyleSheet.absoluteFill,
  },
  num: {
    position: 'absolute',
    right: 8,
    bottom: -6,
  },
  badge: {
    position: 'absolute',
    top: 14,
    left: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionItem: {
    flexGrow: 1,
    flexBasis: '46%',
    minWidth: 140,
  },
});
