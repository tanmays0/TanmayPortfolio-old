/**
 * Contact form — useState, validation, Button onPress, Alert (Assignments 5–6).
 */
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { ContactInput } from './ContactInput';

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const { colors, accents, spacing, typography, radius } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!name.trim()) {
      next.name = 'Please enter your name.';
    }
    if (!email.trim()) {
      next.email = 'Please enter your email.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      next.email = 'Enter a valid email address (example@domain.com).';
    }
    if (!message.trim()) {
      next.message = 'Please write a short message.';
    } else if (message.trim().length < 10) {
      next.message = 'Message should be at least 10 characters.';
    }
    return next;
  };

  const handleSubmit = () => {
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
      Alert.alert(
        'Details look valid',
        'This academic build does not send email yet. Your form input was validated successfully on device.',
      );
    }, 400);
  };

  const errorCount = Object.keys(errors).length;

  return (
    <View>
      {errorCount > 0 ? (
        <View
          style={[
            styles.summary,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.destructive,
              borderRadius: radius.input,
              marginBottom: spacing.lg,
            },
          ]}
          accessibilityRole="summary">
          <Text style={[typography.label, { color: colors.destructive }]}>
            There {errorCount === 1 ? 'is' : 'are'} {errorCount} problem
            {errorCount === 1 ? '' : 's'}
          </Text>
          {errors.name ? (
            <Text style={[typography.meta, { color: colors.destructive, marginTop: 4 }]}>
              • {errors.name}
            </Text>
          ) : null}
          {errors.email ? (
            <Text style={[typography.meta, { color: colors.destructive, marginTop: 4 }]}>
              • {errors.email}
            </Text>
          ) : null}
          {errors.message ? (
            <Text style={[typography.meta, { color: colors.destructive, marginTop: 4 }]}>
              • {errors.message}
            </Text>
          ) : null}
        </View>
      ) : null}

      <ContactInput
        label="Your name"
        value={name}
        onChangeText={setName}
        error={errors.name}
        placeholder="Name"
        autoCapitalize="words"
      />
      <ContactInput
        label="Your email"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <ContactInput
        label="Your message"
        value={message}
        onChangeText={setMessage}
        error={errors.message}
        placeholder="How can I help you?"
        multiline
      />

      <View
        style={[
          styles.ctaShell,
          {
            backgroundColor: accents.magenta,
            borderRadius: radius.button,
            overflow: 'hidden',
          },
        ]}>
        {/* React Native Button kept for Assignments 5 & 6 (onPress + core component). */}
        <Button
          title={submitting ? 'Validating…' : 'Send message'}
          onPress={handleSubmit}
          disabled={submitting}
          color={accents.magenta}
          accessibilityLabel="Submit contact form"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    borderWidth: 1,
    padding: 12,
  },
  ctaShell: {
    marginTop: 4,
  },
});
