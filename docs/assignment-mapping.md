# Assignment Mapping — How TanmayPortfolio Completes Assignments 1–10

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
| Pass data via Props | `src/screens/ProjectsScreen.tsx` → `<ProjectCard title={...} />` from `src/data/projectCatalog.ts` |
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

## Assignment 7 — Multi-screen Stack Navigation

| Requirement | Evidence |
| --- | --- |
| Home, About, Contact screens | `HomeScreen`, `AboutScreen`, `ContactScreen` |
| Stack Navigation | `src/navigation/AppNavigator.tsx` — `createNativeStackNavigator` |
| Navigate with buttons | Home CTAs call `navigation.navigate('About' \| 'Contact' \| …)` |

**Demo tip:** From Home tap **About Me** / **Contact Me** and show the stack header back button.

---

## Assignment 8 — Dynamic data + FlatList

| Requirement | Evidence |
| --- | --- |
| Local JSON (or API) | `src/data/projects.json` loaded by `fetchProjects()` in `src/data/projectCatalog.ts` |
| FlatList | `ProjectsScreen.tsx` renders projects with `FlatList` |
| Efficient scrolling | `initialNumToRender`, `windowSize`, `removeClippedSubviews` on the list |

**Demo tip:** Open Projects — brief “Loading projects…” then scroll the FlatList.

---

## Assignments 9 & 10 — Student / Personal Portfolio

| Requirement | Evidence |
| --- | --- |
| Home: name, photo, intro | `ProfileCard` + `PROFILE` / `profile.jpg` on `HomeScreen` |
| About: education + career objectives | About cards for education and career direction |
| Skills: technical + soft | `SKILL_CATEGORIES` includes Soft Skills in `skills.ts` |
| Projects: FlatList | `ProjectsScreen` + `projects.json` |
| Contact: TextInput + Button | `ContactForm` / `ContactInput` + RN `Button` |
| Stack Navigator | Entire app is a Stack (Home initial route) |
| StyleSheet + Flexbox | All screens; Home CTA wrap; skill chips `flexWrap` |

---

## Rubric alignment (Excellent)

| Criteria | How this project scores |
| --- | --- |
| Functionality & Output | All sections work; theme; form validation; links; stack nav |
| Code Structure & Syntax | `src/` modular layout; TypeScript; consistent naming |
| Concept Implementation | Props, useState, FlatList, JSON fetch, Flexbox, Stack |
| Readability & Documentation | File comments + `docs/` + README |

---

## Suggested viva walkthrough (4–5 minutes)

1. Home — name, photo, intro; point out Stack CTAs  
2. About Me — education + career direction (stack push + back)  
3. Skills — technical categories + Soft Skills chips  
4. Projects — loading state, FlatList scroll, expand a card  
5. Contact — empty submit errors, then valid submit Alert  
6. Toggle dark mode on Home  
7. Mention `projects.json` + `fetchProjects` for Assignment 8
