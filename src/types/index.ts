/**
 * Shared TypeScript types for the TanmayPortfolio app.
 */

import type { ImageSourcePropType } from 'react-native';

export type ThemeColors = {
  background: string;
  card: string;
  surfaceElevated: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  onPrimary: string;
  accent: string;
  primaryAccent: string;
  secondaryAccent: string;
  interactive: string;
  highlight: string;
  glow: string;
  headerGlass: string;
  dock: string;
  inputBackground: string;
  destructive: string;
  success: string;
  ripple: string;
  icon: string;
  timeline: string;
};

export type Profile = {
  name: string;
  title: string;
  tagline: string;
  focus: string;
  bio: string;
  education: string;
  interests: string[];
  strengths: string[];
  careerDirection: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
  resumeSummary: string;
};

export type SkillCategoryData = {
  id: string;
  title: string;
  skills: string[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  coverImage?: ImageSourcePropType;
  accent?: string;
};

export type ExperienceEntry = {
  id: string;
  role: string;
  organization: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
};
