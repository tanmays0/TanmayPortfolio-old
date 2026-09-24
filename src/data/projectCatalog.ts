/**
 * Assignment 8 — project catalog + async JSON loader.
 * File is named projectCatalog.ts (not projects.ts) so Metro does not
 * resolve "../data/projects" to projects.json and drop named exports.
 */
import type { ImageSourcePropType } from 'react-native';
import type { Project } from '../types';

type ProjectSeed = Omit<Project, 'coverImage' | 'accent'>;

const coverFlowforge: ImageSourcePropType = require('../../assets/images/projects/flowforge.png');
const coverElevare: ImageSourcePropType = require('../../assets/images/projects/elevare.png');
const coverAdmax: ImageSourcePropType = require('../../assets/images/projects/admax.png');

const PROJECT_SEEDS: ProjectSeed[] = [
  {
    id: 'flowforge',
    title: 'FlowForge',
    description:
      'A rule-based workflow automation platform that executes trigger → condition → action pipelines asynchronously with Redis and BullMQ, including retry and dead-letter handling.',
    techStack: ['React', 'Node.js', 'Express', 'MySQL', 'Redis', 'BullMQ'],
    features: [
      'Backend services for REST, webhook, and cron listeners with Boolean rule evaluation and job dispatch.',
      'MySQL schema with foreign keys, workflow indexing, and status enums.',
      'JWT authentication, rate limiting, and encrypted secret storage.',
    ],
    githubUrl: 'https://github.com/tanmays0',
  },
  {
    id: 'elevare',
    title: 'ELEVARE',
    description:
      'An AI-assisted career discovery platform that applies the OCEAN personality framework and Ikigai model to generate personalized recommendations.',
    techStack: ['React', 'Node.js', 'Python FastAPI', 'MongoDB', 'Groq', 'Llama 3.3'],
    features: [
      'Python FastAPI pipeline integrated with Groq (Llama 3.3) for personalized career path generation.',
      'React and Vite frontend with a structured multi-step assessment experience.',
      'MongoDB persistence for sessions and assessment responses.',
    ],
    githubUrl: 'https://github.com/tanmays0',
  },
  {
    id: 'admax-india',
    title: 'AdMax India',
    description:
      'A hyperlocal SaaS advertising network that enables local businesses to display advertisements on nearby screens using proximity-based targeting.',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Razorpay', 'Maps API'],
    features: [
      'Four modules: marketing site, advertiser dashboard, admin panel, and screen player with periodic ad polling.',
      'Razorpay billing, Cloudinary media storage, and Google Maps-based screen targeting.',
      'PostgreSQL data model with JWT-secured authentication across the platform.',
    ],
    githubUrl: 'https://github.com/tanmays0',
  },
];

const COVER_BY_ID: Record<string, ImageSourcePropType> = {
  flowforge: coverFlowforge,
  elevare: coverElevare,
  'admax-india': coverAdmax,
};

const ACCENT_BY_ID: Record<string, string> = {
  flowforge: '#22D3EE',
  elevare: '#8B5CF6',
  'admax-india': '#EC4899',
};

function attachPresentation(seed: ProjectSeed): Project {
  return {
    ...seed,
    coverImage: COVER_BY_ID[seed.id],
    accent: ACCENT_BY_ID[seed.id] ?? '#3B82F6',
  };
}

function readJsonSeeds(): ProjectSeed[] {
  try {
    // Explicit .json path — Assignment 8 local JSON requirement.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const raw = require('./projects.json') as unknown;
    const list = Array.isArray(raw)
      ? (raw as ProjectSeed[])
      : raw &&
          typeof raw === 'object' &&
          Array.isArray((raw as { default: unknown }).default)
        ? (raw as { default: ProjectSeed[] }).default
        : null;
    if (list && list.length > 0) {
      return list;
    }
  } catch {
    // Fall through to typed seeds.
  }
  return PROJECT_SEEDS;
}

/** Sync catalog for Home teasers and screen fallbacks. */
export const PROJECTS: Project[] = readJsonSeeds().map(attachPresentation);

/**
 * Async loader for ProjectsScreen loading state (Assignments 8–10).
 */
export async function fetchProjects(): Promise<Project[]> {
  await new Promise<void>(resolve => {
    setTimeout(resolve, 200);
  });
  const next = readJsonSeeds().map(attachPresentation);
  return next.length > 0 ? next : PROJECTS;
}
