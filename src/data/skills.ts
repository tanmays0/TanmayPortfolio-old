/**
 * Skills from Tanmay's resume, grouped for scanability.
 */
import type { SkillCategoryData } from '../types';

export const SKILL_CATEGORIES: SkillCategoryData[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    skills: ['JavaScript (ES6+)', 'Java', 'Python', 'HTML5', 'CSS3'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: ['React.js', 'React Native', 'Bootstrap', 'Vite'],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'REST API Design', 'MVC'],
  },
  {
    id: 'databases',
    title: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    skills: ['Microsoft Azure', 'Docker', 'Jenkins', 'Redis', 'BullMQ'],
  },
  {
    id: 'data',
    title: 'Data / Analytics',
    skills: ['Data Structures & Algorithms', 'System Design', 'Data Viz'],
  },
  {
    id: 'tools',
    title: 'Tools & Testing',
    skills: ['Git', 'GitHub', 'Postman', 'VS Code', 'Jest', 'TestNG', 'Selenium'],
  },
  {
    id: 'soft',
    title: 'Soft Skills',
    skills: [
      'End-to-end product delivery',
      'Clear technical communication',
      'Independent problem solving',
      'Team collaboration',
      'Time management',
      'Ownership and accountability',
    ],
  },
];
