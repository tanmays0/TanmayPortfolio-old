/**
 * Opens https / mailto links and the bundled resume PDF.
 * LinkedIn prefers the native app (logged-in session) before falling back to browser.
 */
import { Alert, Linking, NativeModules, Platform } from 'react-native';

type PdfOpenerNative = {
  openAssetPdf: (assetFileName: string) => Promise<boolean>;
};

type ExternalLinkNative = {
  openUrl: (url: string, preferredPackage: string | null) => Promise<string>;
};

const PdfOpener = NativeModules.PdfOpener as PdfOpenerNative | undefined;
const ExternalLink = NativeModules.ExternalLink as ExternalLinkNative | undefined;

const LINKEDIN_PACKAGE = 'com.linkedin.android';

/** Normalize to a clean public profile URL: https://www.linkedin.com/in/{slug}/ */
export function normalizeLinkedInProfileUrl(url: string): string {
  const trimmed = url.trim();
  const match = trimmed.match(/linkedin\.com\/in\/([^/?#]+)/i);
  if (match?.[1]) {
    return `https://www.linkedin.com/in/${decodeURIComponent(match[1])}/`;
  }
  return trimmed;
}

export async function openExternalUrl(url: string, label = 'link') {
  const trimmed = url.trim();
  if (!trimmed) {
    Alert.alert(
      'Link not set',
      `Add a valid URL for ${label} in src/data/profile.ts.`,
    );
    return;
  }

  const isLinkedIn = /linkedin\.com\/in\//i.test(trimmed) || label.toLowerCase() === 'linkedin';
  if (isLinkedIn) {
    await openLinkedInProfile(trimmed);
    return;
  }

  try {
    if (Platform.OS === 'android' && ExternalLink?.openUrl) {
      await ExternalLink.openUrl(trimmed, null);
      return;
    }
    await Linking.openURL(trimmed);
  } catch (error) {
    Alert.alert(
      'Unable to open',
      `Could not open this ${label}.\n\n${trimmed}\n\n${String(error)}`,
    );
  }
}

/**
 * Open a LinkedIn profile:
 * 1) LinkedIn Android app (best — uses your login / shows the profile)
 * 2) linkedin:// deep link
 * 3) https profile URL in the browser
 */
export async function openLinkedInProfile(profileUrl: string) {
  const httpsUrl = normalizeLinkedInProfileUrl(profileUrl);
  const slug = httpsUrl.match(/\/in\/([^/]+)/)?.[1] ?? '';
  const deepLink = slug ? `linkedin://in/${slug}` : '';

  // 1. Prefer LinkedIn app via explicit package (avoids Chrome auth wall when app is installed)
  if (Platform.OS === 'android' && ExternalLink?.openUrl) {
    try {
      const mode = await ExternalLink.openUrl(httpsUrl, LINKEDIN_PACKAGE);
      if (mode === 'app') {
        return;
      }
      // Native module already fell back to browser
      return;
    } catch {
      // Continue to JS fallbacks
    }
  }

  // 2. Try LinkedIn URL scheme
  if (deepLink) {
    try {
      await Linking.openURL(deepLink);
      return;
    } catch {
      // App not installed or scheme unsupported
    }
  }

  // 3. Browser fallback — public profile URL (guest browsers may still show LinkedIn login
  //    if the profile is not set to Public visibility in LinkedIn settings)
  try {
    await Linking.openURL(httpsUrl);
  } catch (error) {
    Alert.alert(
      'Unable to open LinkedIn',
      `Could not open your profile.\n\n${httpsUrl}\n\n${String(error)}`,
    );
  }
}

/** Opens the resume PDF bundled in android/app/src/main/assets. */
export async function openBundledResume() {
  if (Platform.OS === 'android' && PdfOpener?.openAssetPdf) {
    try {
      await PdfOpener.openAssetPdf('Tanmay_Shinde_Resume.pdf');
      return;
    } catch (error) {
      Alert.alert(
        'Unable to open resume',
        `Could not open the PDF viewer.\n\n${String(error)}`,
      );
      return;
    }
  }

  Alert.alert(
    'Resume',
    'Resume PDF opening is set up for Android. Use the Android emulator or device to view it.',
  );
}
