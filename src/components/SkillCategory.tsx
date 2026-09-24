/**
 * Skill category cluster — editorial weight + category accent.
 */
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { accentAt } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { SkillChip } from './SkillChip';

type SkillCategoryProps = {
  title: string;
  skills: string[];
  index?: number;
};

export function SkillCategory({ title, skills, index = 0 }: SkillCategoryProps) {
  const { colors, spacing, typography, radius } = useTheme();
  const accent = accentAt(index);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 420,
        delay: index * 70,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 420,
        delay: index * 70,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translateY]);

  const isSoft = title.toLowerCase().includes('soft');

  return (
    <Animated.View
      style={[
        styles.block,
        {
          opacity,
          transform: [{ translateY }],
          marginBottom: spacing.xl,
          borderColor: colors.border,
          borderLeftColor: accent,
          backgroundColor: isSoft ? colors.card : 'transparent',
          borderRadius: radius.card,
          padding: isSoft ? spacing.lg : spacing.sm,
        },
      ]}>
      <View style={styles.head}>
        <Text style={[typography.label, { color: accent }]}>
          {String(index + 1).padStart(2, '0')}
        </Text>
        <Text style={[typography.bodyStrong, { color: colors.text, fontSize: isSoft ? 22 : 18 }]}>
          {title}
        </Text>
      </View>
      <View style={[styles.wrap, { marginTop: spacing.md }]}>
        {skills.map((skill, i) => (
          <SkillChip
            key={skill}
            label={skill}
            accent={accent}
            variant={i === 0 || isSoft ? 'solid' : 'outline'}
          />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  block: {
    borderLeftWidth: 3,
    borderWidth: StyleSheet.hairlineWidth,
  },
  head: {
    gap: 6,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
