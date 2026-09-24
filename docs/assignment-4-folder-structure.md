# Assignment 4 — React Native Project Folder Structure

**Student:** Tanmay Shinde  
**Project:** TanmayPortfolio  
**CLI:** `@react-native-community/cli` (React Native 0.87.1)

---

## 1. Goal of this document

Explain the folder layout of a Community CLI React Native app, show where reusable components and state live, and connect the structure to Assignments 3–6 (Props, `useState`, core components, Flexbox).

---

## 2. High-level tree

```
TanmayPortfolio/
├── android/                 # Native Android project (open in Android Studio)
├── ios/                     # Native iOS project (not required for this demo)
├── assets/
│   ├── images/profile.jpg   # Profile photo
│   └── docs/                # Local resume PDF for submission
├── docs/                    # Assignment reports & screenshots
├── src/
│   ├── components/          # Reusable functional components (Props)
│   ├── screens/             # One screen per portfolio section
│   ├── data/                # Static content arrays/objects
│   ├── theme/               # Colors, tokens, ThemeContext (useState)
│   ├── navigation/          # Bottom tabs + More stack
│   ├── types/               # TypeScript interfaces
│   └── utils/               # Linking helpers
├── App.tsx                  # Root: useState theme + NavigationContainer
├── index.js                 # JS entry registered with native
├── package.json             # Dependencies & scripts
├── metro.config.js          # Metro bundler config
├── babel.config.js          # Babel / RN preset
└── tsconfig.json            # TypeScript config
```

---

## 3. Important root files

| File / folder | Purpose |
| --- | --- |
| `App.tsx` | Root React component. Holds `useState` for dark/light mode and wraps `ThemeProvider` + `NavigationContainer`. |
| `index.js` | Registers the app name with the native host (`AppRegistry`). |
| `package.json` | Declares `react-native`, navigation, Phosphor icons; scripts: `npm start`, `npm run android`. |
| `metro.config.js` | Configures the Metro JS bundler used during development. |
| `android/` | Gradle project. **Open this folder in Android Studio** to run, debug, and demo on the emulator. |
| `node_modules/` | Installed packages (not edited by hand). |

---

## 4. The `android/` folder (Assignment 1 / Studio demo)

When you open `android/` in Android Studio:

- Gradle syncs SDK / NDK dependencies
- You select the **Pixel_9** AVD
- Run ▶ installs the debug APK
- **Logcat** shows `ReactNativeJS` logs

Key native paths (for viva awareness):

- `android/app/src/main/java/.../MainActivity.kt` — launches the RN activity
- `android/app/build.gradle` — app-level Android build config
- `android/gradle.properties` — Gradle flags

You still write almost all UI in TypeScript under `src/`; the native project hosts and builds it.

---

## 5. The `src/` architecture

### 5.1 `src/components/` — reusable functional components

Examples: `ProjectCard`, `SkillChip`, `SkillCategory`, `ContactForm`, `ThemeToggle`, `ProfileCard`.

- Each file exports one functional component
- Data enters through **Props** (Assignment 3)
- Styles use `StyleSheet.create` (Assignment 5)

### 5.2 `src/screens/` — full pages

`HomeScreen`, `ProjectsScreen`, `SkillsScreen`, `ExperienceScreen`, plus More-stack screens (`About`, `Certifications`, `Resume`, `Contact`).

Screens **compose** components and pass slices of `src/data/*` as Props.

### 5.3 `src/data/` — data-driven content

| File | Feeds |
| --- | --- |
| `profile.ts` | Name, bio, education (CGPA 8.52), GitHub, LinkedIn, resume summary |
| `skills.ts` | Skill categories |
| `projects.ts` | FlowForge, ELEVARE, AdMax India |
| `experience.ts` | AdMax India + CodSoft |
| `certifications.ts` | Credential cards |

Changing data updates the UI without rewriting component markup — demonstrates Props + separation of concerns.

### 5.4 `src/theme/` — state-based theming

| File | Role |
| --- | --- |
| `colors.ts` | Light / dark semantic palettes (blue accent) |
| `tokens.ts` | Spacing, radius, elevation |
| `typography.ts` | Type scale |
| `ThemeContext.tsx` | Exposes theme to the tree |

**State flow (Assignment 3 & 4):**

```
App.tsx: const [isDark, setIsDark] = useState(false)
   → ThemeProvider(isDark, toggleTheme)
      → useTheme() in screens/components
         → ThemeToggle uses <Switch />
```

Toggling the Switch updates `isDark` → colors change across the app (dynamic UI).

### 5.5 `src/navigation/`

- 5 bottom tabs (Home, Projects, Skills, Experience, More) — Material “max 5” guidance
- More stack: About, Certifications, Resume, Contact

---

## 6. How structure supports reusable components + state

| Requirement | Where it lives |
| --- | --- |
| Reusable components | `src/components/*` |
| Props | Screens → components (e.g. `ProjectsScreen` → `ProjectCard`) |
| `useState` theme | `App.tsx` + `ThemeToggle` |
| `useState` form | `ContactForm.tsx` (name, email, message, errors) |
| Expandable project details | `ProjectCard` local `useState` |
| Core RN components | Spread across screens (see Assignment 5 mapping in `docs/assignment-mapping.md`) |

---

## 7. Development workflow mapped to folders

1. Edit TS/TSX in Cursor under `src/` or `App.tsx`
2. Metro serves the bundle (`npm start`)
3. Android Studio / `npm run android` builds `android/` and installs on emulator
4. Fast Refresh updates JS without a full native rebuild for most UI edits

---

## 8. Conclusion

The Community CLI layout cleanly separates:

- **Native host** (`android/`) for Studio demos  
- **Shared UI & logic** (`src/`) for assignments  
- **Content** (`src/data/`) for easy portfolio updates  

This structure keeps the app maintainable for a viva while meeting folder-structure documentation requirements for Assignment 4.
