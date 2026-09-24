# Assignment Mapping — How TanmayPortfolio Completes Assignments 1–6

**App:** React Native Developer Portfolio — Tanmay Shinde  
**Run:** Android emulator (Pixel_9) via Community CLI + Android Studio

---

## Assignment 1 — Setup + Hello World

| Requirement | Evidence |
| --- | --- |
| Create RN project with Community CLI | Project root `TanmayPortfolio`, `package.json` with `react-native` |
| `android/` openable in Android Studio | Folder `android/` |
| Run on emulator | `npm run android` / Studio Run on Pixel_9 |
| Hello World / basic first app | Early `App.tsx` Hello World stage; screenshots in `docs/screenshots/assignment-1/` |

**Demo tip:** Mention CLI init, Metro, and first successful emulator install.

---

## Assignment 2 — Comparison report

| Requirement | Evidence |
| --- | --- |
| Native vs Hybrid vs React Native | [`docs/assignment-2-comparison-report.md`](assignment-2-comparison-report.md) |
| Features, advantages, limitations, use cases | Sections 3–6 of that report |
| Why RN for this project | Section 7 |

**Submit:** Export/print the Markdown to PDF if your college requires PDF.

---

## Assignment 3 — Components, Props, useState

| Requirement | Evidence |
| --- | --- |
| Reusable functional components | `src/components/` (`ProjectCard`, `SkillChip`, `ThemeToggle`, …) |
| Pass data via Props | `src/screens/ProjectsScreen.tsx` → `<ProjectCard title={...} />` from `src/data/projects.ts` |
| Dynamic UI with `useState` | Theme: `App.tsx`; Form: `ContactForm.tsx`; Expand: `ProjectCard.tsx` |

**Viva lines:**

1. “Data lives in `src/data`; components stay reusable via Props.”  
2. “`isDark` in `App.tsx` updates the whole theme when Switch toggles.”

---

## Assignment 4 — Folder structure + components + state

| Requirement | Evidence |
| --- | --- |
| Document folder structure | [`docs/assignment-4-folder-structure.md`](assignment-4-folder-structure.md) |
| Reusable components | Same as Assignment 3 |
| State-based updates | Theme Switch + contact validation errors |

---

## Assignment 5 — Student Profile app + core components

| Core component | Where used |
| --- | --- |
| `View` | Almost every component |
| `Text` | Titles, bio, errors |
| `Image` | `ProfileCard` + `assets/images/profile.jpg` |
| `TextInput` | `ContactInput` / Contact form |
| `Button` | `ContactForm` submit |
| `Switch` | `ThemeToggle` |
| `ScrollView` | `ScreenContainer` |
| `StyleSheet` | Every styled component |

Portfolio sections = profile-style app (Home, About, Skills, Projects, Experience, Certs, Resume, Contact).

---

## Assignment 6 — Flexbox, TextInput, onPress

| Requirement | Evidence |
| --- | --- |
| Flexbox layouts | Home CTA wrap; `SkillCategory` `flexWrap`; Experience row + rail |
| TextInput handling | Controlled inputs in `ContactForm` |
| Button `onPress` | `ContactForm` `<Button onPress={handleSubmit} />`; also `Pressable` CTAs |

---

## Rubric alignment (Excellent)

| Criteria | How this project scores |
| --- | --- |
| Functionality & Output | All sections work; theme; form validation; links |
| Code Structure & Syntax | `src/` modular layout; TypeScript; consistent naming |
| Concept Implementation | Props, useState, core components, Flexbox all visible |
| Readability & Documentation | File comments + `docs/` + README |

---

## Suggested viva walkthrough (3–4 minutes)

1. Home — identity, photo, CTAs (no theme first)  
2. Toggle dark mode at bottom of Home  
3. Projects — Props + expand Details  
4. Skills — Flexbox chips  
5. Experience — AdMax + CodSoft from resume  
6. More → Contact — empty submit errors, then valid submit Alert  
7. Open `android/` in Studio; mention Logcat
