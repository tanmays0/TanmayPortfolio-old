/**
 * Central profile and social links — professional copy for portfolio presentation.
 */
import type { ImageSourcePropType } from 'react-native';
import type { Profile } from '../types';

export const PROFILE_IMAGE: ImageSourcePropType = require('../../assets/images/profile.jpg');

export const PROFILE: Profile = {
  name: 'Tanmay Shinde',
  title: 'Full Stack Software Developer',
  tagline:
    'I design and build scalable web platforms, cross-platform mobile applications, and AI-assisted products.',
  focus: 'React · Node.js · React Native · Java · PostgreSQL',
  bio: 'I am a B.Tech Information Technology student at MIT ADT University and a Full Stack & Software Developer Intern at AdMax India. My work spans full-stack web systems, iOS and Android applications, and AI-enabled product features. As founder of AdMax, I contribute to production SaaS architecture, billing integrations, and cloud-based delivery.',
  education:
    'MIT ADT University, Pune · B.Tech (Information Technology) · 2023 – 2027 · CGPA: 8.52 / 10.0',
  interests: [
    'Full-stack SaaS platforms',
    'Cross-platform mobile engineering',
    'AI and LLM integrations',
    'Workflow automation systems',
    'Cloud deployment on Microsoft Azure',
  ],
  strengths: [
    'End-to-end product delivery',
    'REST API and database design',
    'Object-oriented design and data structures',
    'Cross-platform mobile development',
    'Ownership-driven problem solving',
  ],
  careerDirection:
    'I aim to grow as a full-stack and mobile engineer, building reliable production systems that combine React, Node.js, and intelligent automation.',
  email: 'shinde.tanmay@gmail.com',
  phone: '+91 8007736520',
  location: 'Pune, India',
  githubUrl: 'https://github.com/tanmays0',
  linkedinUrl: 'https://www.linkedin.com/in/tanmay-shinde-160a60282/',
  /** Optional hosted resume URL. If empty, Android opens the bundled PDF from assets. */
  resumeUrl: '',
  resumeSummary:
    'Tanmay Shinde is a Full Stack & Software Developer Intern at AdMax India and a B.Tech IT student at MIT ADT University (CGPA 8.52). He ships React / Node.js / PostgreSQL systems and cross-platform mobile (React Native, Swift, Android). Focus areas: production SaaS, APIs, and AI-assisted product features.',
};
