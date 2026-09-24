/**
 * Profile summary with optional Image — used on Home and About.
 */
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Card } from './Card';

type ProfileCardProps = {
  name: string;
  title: string;
  bio?: string;
  imageSource?: ImageSourcePropType;
};

export function ProfileCard({ name, title, bio, imageSource }: ProfileCardProps) {
  const { colors, spacing, typography } = useTheme();

  return (
    <Card>
      <View style={styles.row}>
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.avatar}
            accessibilityLabel={`Profile photo of ${name}`}
          />
        ) : (
          <View
            style={[
              styles.avatarFallback,
              { backgroundColor: colors.primary },
            ]}
            accessibilityLabel={`Initials for ${name}`}>
            <Text style={[typography.bodyStrong, { color: colors.onPrimary }]}>
              {name
                .split(' ')
                .map(part => part[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </Text>
          </View>
        )}
        <View style={[styles.textCol, { marginLeft: spacing.md }]}>
          <Text style={[typography.display, { color: colors.text, fontSize: 22 }]}>
            {name}
          </Text>
          <Text style={[typography.meta, { color: colors.primary, marginTop: 4 }]}>
            {title}
          </Text>
        </View>
      </View>
      {bio ? (
        <Text
          style={[
            typography.body,
            { color: colors.textMuted, marginTop: spacing.md },
          ]}>
          {bio}
        </Text>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCol: {
    flex: 1,
    minWidth: 0,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  avatarFallback: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
