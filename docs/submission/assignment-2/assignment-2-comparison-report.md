# Assignment 2 — Native vs Hybrid vs React Native

**Student:** Tanmay Shinde  
**Subject:** Mobile Application Development  
**Project:** TanmayPortfolio (React Native Community CLI)

---

## 1. Introduction

Mobile apps can be built in several ways. This report compares **Native**, **Hybrid (WebView-based)**, and **React Native** development across features, advantages, limitations, and use cases. It also explains why React Native was chosen for this developer portfolio project.

---

## 2. What each approach means

### Native development

Apps are written with platform SDKs and languages:

- **Android:** Kotlin / Java + Android SDK (Android Studio)
- **iOS:** Swift / Objective-C + UIKit / SwiftUI (Xcode)

Each platform is a separate codebase with full access to device APIs.

### Hybrid development (WebView-based)

Apps wrap a web app (HTML, CSS, JavaScript) inside a native WebView shell (e.g. older Cordova / PhoneGap-style apps, or simple WebView wrappers). UI is mostly rendered by the browser engine, not by native UI widgets.

### React Native

A **cross-platform** framework where you write UI in JavaScript/TypeScript with React. React Native bridges to **real native views** (`View`, `Text`, etc.) on Android and iOS — not a full-page WebView. One shared JS codebase can target both platforms; this portfolio focuses on Android with the Community CLI `android/` project.

---

## 3. Feature comparison

| Feature | Native | Hybrid (WebView) | React Native |
| --- | --- | --- | --- |
| Languages | Kotlin/Swift (platform-specific) | HTML / CSS / JS | JavaScript / TypeScript + React |
| UI rendering | Native widgets | Web (HTML/CSS in WebView) | Native widgets via bridge |
| Performance (UI) | Excellent | Often weaker for complex UI | Near-native for most apps |
| Access to device APIs | Full / first-party | Via plugins | Via modules / community packages |
| Code sharing | Low (separate apps) | High (one web codebase) | High (shared JS/TS) |
| Tooling | Android Studio / Xcode | Web tools + WebView shell | Metro + Android Studio / Xcode |
| Hot reload | Limited | Fast (web) | Fast Refresh / Metro |
| Look & feel | Fully platform-native | Often “web-like” | Native-looking with shared design |

---

## 4. Advantages

### Native

- Best performance and smoothest animations
- Immediate access to newest OS features
- Strongest platform guidelines compliance
- Mature debugging in Android Studio / Xcode

### Hybrid (WebView)

- Reuse existing web skills and code
- Single UI for many platforms quickly
- Faster MVP for content-heavy apps
- Smaller team if the product is mostly web

### React Native

- One codebase for Android and iOS (with shared components)
- Uses React patterns (`Props`, `useState`, reusable components)
- Renders native views — better feel than many WebView apps
- Large ecosystem; Community CLI gives a real `android/` folder for Studio demos
- Fast iteration with Metro bundler (ideal for academic demos)

---

## 5. Limitations

### Native

- Two codebases to hire for and maintain
- Slower to ship identical features on both platforms
- Higher cost for small teams / student projects

### Hybrid (WebView)

- Performance and gesture feel can lag behind native
- Plugin gaps for advanced hardware features
- UI may look inconsistent with OS design language
- Debugging spans web + native shell

### React Native

- Occasional need for native modules for cutting-edge APIs
- Must understand some Android/iOS build tooling (Gradle, SDK)
- Bridge / New Architecture concepts to learn over time
- Third-party library quality varies

---

## 6. Use cases

| Approach | Best when… | Examples |
| --- | --- | --- |
| **Native** | Maximum performance, heavy graphics, deep OS integration | Banking apps with custom biometrics, AAA mobile games, camera-intensive tools |
| **Hybrid** | Content sites wrapped as apps, simple forms, web-first products | News readers, brochure apps, internal tools that are mostly HTML |
| **React Native** | Cross-platform product UI, startups, portfolios, CRUD/SaaS mobile clients | Social apps, e-commerce clients, **this developer portfolio**, many B2B mobile apps |

---

## 7. Why React Native for TanmayPortfolio

1. **Academic requirements** map cleanly to React Native: functional components, Props, `useState`, core components (`View`, `Text`, `Image`, `ScrollView`, `TextInput`, `Button`, `Switch`, `StyleSheet`), and Flexbox.
2. **Android Studio workflow** works well with Community CLI — open `android/`, run on Pixel_9 emulator, show Logcat.
3. **One project** demonstrates a full student profile / portfolio without maintaining separate Kotlin and Swift apps.
4. **Professional relevance** — React Native is widely used in industry for cross-platform mobile UI, matching internship interview expectations.

Native would be ideal for a single-platform deep dive, but would not satisfy a shared React component curriculum as directly. A pure Hybrid WebView app would meet “one codebase” but would not teach React Native’s native component model required by the assignments.

---

## 8. Conclusion

| Criteria | Winner for this course project |
| --- | --- |
| Learning React concepts + mobile UI | React Native |
| Raw performance / OS depth | Native |
| Fastest web reuse | Hybrid |

**React Native** is the best balance for TanmayPortfolio: shared TypeScript UI, real Android native views, and clear mapping to Assignments 1–6 while remaining runnable and demonstrable in Android Studio.

---

## References (study material)

- React Native documentation — https://reactnative.dev  
- Android Developers — https://developer.android.com  
- Comparison based on standard MAD curriculum topics: native SDKs, WebView hybrid apps, and cross-platform frameworks
