/**
 * Custom TextInput — focused accent border, polished validation states.
 */
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type ContactInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words';
};

export function ContactInput({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  multiline = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}: ContactInputProps) {
  const { colors, accents, radius, spacing, typography } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.destructive
    : focused
      ? accents.magenta
      : colors.border;

  return (
    <View style={{ marginBottom: spacing.xl }}>
      <Text
        style={[
          typography.label,
          { color: focused ? accents.magenta : colors.textMuted, marginBottom: spacing.sm },
        ]}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        accessibilityLabel={label}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          typography.body,
          {
            color: colors.text,
            backgroundColor: colors.inputBackground,
            borderColor,
            borderRadius: radius.input,
            minHeight: multiline ? 148 : 56,
            textAlignVertical: multiline ? 'top' : 'center',
            paddingHorizontal: 18,
            paddingVertical: 16,
            shadowColor: focused ? accents.magenta : 'transparent',
            shadowOpacity: focused ? 0.25 : 0,
            shadowRadius: 12,
            elevation: focused ? 2 : 0,
          },
        ]}
      />
      {error ? (
        <Text style={[typography.meta, { color: colors.destructive, marginTop: 6 }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
  },
});
