/**
 * Experience entries — professional role descriptions.
 */
import type { ExperienceEntry } from '../types';

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'admax',
    role: 'Full Stack & Software Developer Intern',
    organization: 'AdMax India',
    duration: 'Jun 2026 — Present',
    description:
      'Contribute to the AdMax India SaaS platform across advertiser dashboard, admin panel, marketing site, and screen player modules, spanning frontend and backend development.',
    technologies: [
      'React',
      'Node.js',
      'Express',
      'PostgreSQL',
      'React Native',
      'Swift',
      'Android (Java)',
    ],
    achievements: [
      'Developing cross-platform mobile applications for iOS (Swift) and Android (Java) to support campaign, screen, and billing management.',
      'Designing and implementing REST APIs, database schemas, and full-stack features from React interfaces through Node.js/Express services and PostgreSQL.',
    ],
  },
  {
    id: 'codsoft',
    role: 'Java Development Intern',
    organization: 'CodSoft',
    duration: 'Dec 2024 — Jan 2025',
    description:
      'Completed a Java development internship at CodSoft, an ISO 9001:2015 certified software organization.',
    technologies: ['Java', 'OOP', 'Core Concepts'],
    achievements: [
      'Completed Java assignments covering core language concepts, object-oriented principles, and structured problem solving.',
      'Delivered functional implementations for assigned tasks and applied coursework concepts to practical coding challenges.',
    ],
  },
];
