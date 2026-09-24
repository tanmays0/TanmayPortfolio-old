/**
 * Experience timeline item — expandable rhythm + accent node.
 */
import { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { accentAt } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { SkillChip } from './SkillChip';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type ExperienceItemProps = {
  role: string;
  organization: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
  index?: number;
  isLast?: boolean;
};

export function ExperienceItem({
  role,
  organization,
  duration,
  description,
  technologies,
  achievements,
  index = 0,
  isLast = false,
}: ExperienceItemProps) {
  const { colors, spacing, typography, radius } = useTheme();
  const [open, setOpen] = useState(index === 0);
  const accent = accentAt(index + 1);

  return (
    <View style={styles.row}>
      <View style={styles.railCol}>
        <View style={[styles.node, { backgroundColor: accent, shadowColor: accent }]} />
        {!isLast ? <View style={[styles.line, { backgroundColor: colors.border }]} /> : null}
      </View>

      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setOpen(prev => !prev);
        }}
        style={[
          styles.card,
          {
            backgroundColor: open ? colors.card : colors.surfaceElevated,
            borderColor: open ? `${accent}66` : colors.border,
            borderRadius: radius.card,
            padding: spacing.lg,
            marginBottom: spacing.lg,
          },
        ]}>
        <Text style={[typography.caption, { color: accent, letterSpacing: 1.2 }]}>
          {duration.toUpperCase()}
        </Text>
        <Text style={[typography.sectionTitle, { color: colors.text, marginTop: 6, fontSize: 22 }]}>
          {role}
        </Text>
        <Text style={[typography.meta, { color: colors.textMuted, marginTop: 4 }]}>
          {organization}
        </Text>

        {open ? (
          <>
            <Text style={[typography.body, { color: colors.textMuted, marginTop: spacing.md }]}>
              {description}
            </Text>
            <View style={[styles.wrap, { marginTop: spacing.md }]}>
              {technologies.map(tech => (
                <SkillChip key={tech} label={tech} accent={accent} variant="solid" />
              ))}
            </View>
            <View style={{ marginTop: spacing.md }}>
              {achievements.map(item => (
                <Text
                  key={item}
                  style={[typography.meta, { color: colors.textMuted, marginBottom: 6 }]}>
                  — {item}
                </Text>
              ))}
            </View>
          </>
        ) : (
          <Text style={[typography.caption, { color: colors.textMuted, marginTop: spacing.sm }]}>
            Tap to expand
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  railCol: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  node: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 8,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 3,
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: 6,
    marginBottom: 4,
  },
  card: {
    flex: 1,
    minWidth: 0,
    borderWidth: 1,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
