/**
 * Editorial certification row — numbered list, light elevation.
 */
import { StyleSheet, Text, View } from 'react-native';
import { accentAt } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { openExternalUrl } from '../utils/openExternalUrl';
import { SecondaryButton } from './SecondaryButton';

type CertificationCardProps = {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  index?: number;
};

export function CertificationCard({
  name,
  issuer,
  date,
  credentialId,
  verifyUrl,
  index = 0,
}: CertificationCardProps) {
  const { colors, spacing, typography } = useTheme();
  const accent = accentAt(index);
  const elevated = index % 3 === 0;

  return (
    <View
      style={[
        styles.row,
        {
          borderBottomColor: colors.border,
          backgroundColor: elevated ? colors.card : 'transparent',
          paddingHorizontal: elevated ? spacing.md : 0,
          borderRadius: elevated ? 16 : 0,
          marginBottom: elevated ? spacing.sm : 0,
        },
      ]}>
      <Text style={[typography.number, { color: `${accent}55`, fontSize: 28, lineHeight: 32 }]}>
        {String(index + 1).padStart(2, '0')}
      </Text>
      <View style={[styles.textCol, { marginLeft: spacing.md }]}>
        <Text style={[typography.bodyStrong, { color: colors.text, fontSize: 17 }]}>{name}</Text>
        <Text style={[typography.meta, { color: colors.textMuted, marginTop: 4 }]}>
          {issuer}
        </Text>
        <Text style={[typography.caption, { color: accent, marginTop: 4 }]}>{date}</Text>
        {credentialId ? (
          <Text style={[typography.caption, { color: colors.textMuted, marginTop: 4 }]}>
            {credentialId}
          </Text>
        ) : null}
        {verifyUrl ? (
          <View style={{ marginTop: spacing.md, alignSelf: 'flex-start' }}>
            <SecondaryButton
              title="Verify"
              onPress={() => openExternalUrl(verifyUrl, 'verification')}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textCol: {
    flex: 1,
    minWidth: 0,
  },
});
