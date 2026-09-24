# Assignment 3 — Components, Props, and useState (code pointers)

## Reusable functional components

Browse `src/components/`. Key examples:

| Component | Props idea | Demonstrates |
| --- | --- | --- |
| `ProjectCard` | title, description, techStack, features | Props + local `useState` expand |
| `SkillChip` / `SkillCategory` | label / title + skills[] | Props + Flexbox wrap |
| `ThemeToggle` | isDark, onToggle | `Switch` + parent state |
| `ContactForm` | (internal state) | `useState` + validation + `Button` `onPress` |
| `ProfileCard` | name, title, bio, imageSource | `Image` + Props |

## Props data flow

```
src/data/projects.ts  →  ProjectsScreen  →  <ProjectCard {...} />
src/data/skills.ts    →  SkillsScreen    →  <SkillCategory {...} />
src/data/profile.ts   →  Home / About    →  <ProfileCard {...} />
```

## useState locations

1. **Theme (app-wide):** `App.tsx` — `const [isDark, setIsDark] = useState(false)`
2. **Contact form:** `ContactForm.tsx` — name, email, message, errors, submitting
3. **Project details:** `ProjectCard.tsx` — `expanded`

## Screenshots

See `docs/screenshots/assignment-3/` and `docs/submission/assignment-3/`.
