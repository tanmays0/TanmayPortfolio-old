# Submission guide — Assignments 1–6

Use this folder plus `docs/screenshots/` and the reports in `docs/` for college submission.

## Quick pack list

| Assignment | Primary deliverables |
| --- | --- |
| 1 | Project runs on emulator + screenshot of app + `package.json` + README run steps |
| 2 | [`../assignment-2-comparison-report.md`](../assignment-2-comparison-report.md) (export PDF if required) |
| 3 | Screenshots of components/Props/theme + point to `src/components/` and `App.tsx` |
| 4 | [`../assignment-4-folder-structure.md`](../assignment-4-folder-structure.md) + file-tree screenshot (optional) |
| 5 | Profile screenshots showing View/Text/Image/TextInput/Button/Switch/ScrollView |
| 6 | Skills Flexbox + Contact TextInput/`onPress` validation screenshots |

## Screenshot locations

All captures are under [`../screenshots/`](../screenshots/).

## Mapping document

See [`../assignment-mapping.md`](../assignment-mapping.md) for viva talking points.

## How to zip for submission

From the project root:

```bash
zip -r TanmayPortfolio-Assignment-Submission.zip \
  App.tsx package.json README.md \
  src docs assets \
  -x "*/node_modules/*" -x "*/android/build/*" -x "*/android/app/build/*" -x "*/.git/*"
```

Include `android/` only if your faculty asks for the full project.

## Personal checklist before submit

- [ ] GitHub / LinkedIn open correctly on emulator
- [ ] CGPA shows **8.52** on Home / About
- [ ] Profile photo visible
- [ ] Dark mode toggle works (bottom of Home + More)
- [ ] Contact empty submit shows errors; valid submit shows academic Alert
- [ ] Assignment 2 report reviewed / converted to PDF if needed
- [ ] Assignment 4 folder doc reviewed
