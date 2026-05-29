# Origam Marketing v3 — Phase 2 reference (features architecture)

> Companion to `SPECS-v3.md`. Frozen architecture + ticket reference for
> the Phase 2 features (Theme Builder, Marketplace, evolution of
> `/components` & `/playground`). Built on the Phase 1 foundation
> (two-axis theming, shadow tier) — see ADR-001 / ADR-002 in
> `packages/docs/internal/` and the marketing overlay
> `packages/marketing/CLAUDE.md`.

## Validated v1 defaults (user decisions, reversible)

1. **Marketplace data = static const** (`marketplace-sections.const.ts`).
   A `server/api/themes.get.ts` route is an *evolution*, not v1.
2. **Builder draft persistence = localStorage only** in v1. No auth /
   backend / "save to account".
3. **`/docs` & `/stories` = proxy/iframe** to the existing VitePress and
   Histoire builds. No reimplementation in the marketing app.

## Delivery cadence (user decision)

Ship **in validated stages**. **Stage 2 (Theme Builder) starts only once
Stage 1 (theming foundation: T1+T2+T-DS3+T4+T5, 8 themes matching the
mockups) is validated by the user.** Until then, the Builder tickets stay
pending and unassigned; P2-B0 / P2-M0 visual specs (ui/ux) and ticket
assignment happen at Stage-2 kickoff.

---

## Stage 1 — Theming foundation (in flight)

| Ticket | Scope | Owner |
|---|---|---|
| T1 (#2) | DS runtime two-axis (`data-theme` + `data-mode`), `ORIGAM_MODE_ATTR`, module `modes`/`defaultMode` + `origam-mode` cookie, plugins set both attrs, `OrigamThemeProvider` `mode` prop, docs | fe-lead |
| T2 (#3) | `shadow`/`elevation` semantic tier per theme (+ missing border/font); `tokens:build` green | tokens-dev |
| T-DS3 (#9) | `createOrigam({theme})` ingests a token object (runtime CSS-var injection) + extract shared `tokenPathToCssVar` naming util + ramp-derivation function, exported from the DS | fe-lead |
| T3 (#4) | i18n → `app/assets/locales`; move `II18nLocale` to `app/interfaces/` | i18n-dev |
| T4 (#5) | `ThemeSwitcher` → `useTheme()` DS; delete `ThemeToggle.vue` + home-grown cookies/`useHead` | fe-lead |
| T5 (#6) | Delete `[data-theme]`/`--m-*` blocks + effects layer in `marketing-chrome.css`; migrate look to tokens; isolate inexpressible bits in `app/assets/css/theme-effects.css` | fe-dev |
| T6 (#7) | Reduce `--m-*` to decor-only; migrate `.m-*` chrome to DS components/utilities (optional/iterative) | fe-dev |
| T7 (#8) | e2e theming: each theme × mode actually repaints btn/card; a11y; marketing build green | qa |

**Stage-1 acceptance (gate for Stage 2):** the 8 themes × light/dark render
per the mockup PDF, switched through `useTheme()` only, with zero parallel
theming layer remaining.

---

## Stage 2 — Theme Builder (`/themes/builder`)

Data model: ADR-002 (editable **anchors** → derived **ramps** via the
shared DS function; `ITheme` is DTCG-shaped). Preview is scoped through
`OrigamThemeProvider`, never on `<html>`.

| Ticket | Scope | Depends on | Parallel |
|---|---|---|---|
| **P2-B0** | ui+ux visual specs: sidebar + dashboard layout, field states, edit flow, preview responsive | — | blocks 7b/7c/7d |
| **7a (#10)** | Foundation (non-UI): `useThemeBuilder` + interfaces/types/enums/consts + `BUILDER_TOKEN_SCHEMA` + defaults + localStorage draft | T3 | blocks 7b–7f |
| 7b (#11) | `BuilderSidebar` + token fields (color/radius/typo/shadow/spacing/anim); native `<details>` accordions | 7a, T2, P2-B0 | ✅ |
| 7c (#12) | `BuilderComponentConfig` (Button/Card/TextField + 11 more); schema in consts | 7a, P2-B0 | ✅ |
| 7d (#13) | `BuilderPreviewDashboard` (full dashboard, **reused as Marketplace card**) + `useThemeBuilderPreview` + `useDeviceFrame` + scoped `OrigamThemeProvider` mode | 7a, T1 | ✅ |
| 7e (#14) | `useThemeExport` JSON/TS/CSS + integration snippet (**two variants behind a flag** per A1) | 7a, T-DS3 | ✅ |
| 7f (#15) | `BuilderExportDialog` + `themes/builder.vue` assembly (CSS Grid `360px 1fr`, sticky preview) | 7b+7c+7d+7e | final |

Export snippet variants (A1, team-lead trancha avec le user):
- (a) `import { myTheme } from './my-theme'; createOrigam({ theme: myTheme })` — if `createOrigam({theme})` lands (T-DS3).
- (b) `import './my-theme.css'` + `<html data-theme="my-theme">` — fallback.

File layout (marketing conventions): components in `app/components/builder/`,
composables `use*`, interfaces `I*` in `app/interfaces/`, types `T*`,
enums/consts SCREAMING_SNAKE in their folders.

---

## Stage 2 — Marketplace (`/themes`)

| Ticket | Scope | Depends on | Parallel |
|---|---|---|---|
| **P2-M0** | ui visual specs: gallery + card | — | blocks M1 |
| P2-M1 | `useThemeMarketplace` + interfaces/consts + `themes/index.vue` + 3 sections (Official/Community/Premium); Official = 8 DS themes; Community/Premium = **static const v1** | 7d (dashboard reused), P2-M0 | — |
| P2-M2 | Card actions: Apply (`useTheme` official / `createOrigam`-or-CSS custom), Open-in-Builder (loads `ITheme` into `useThemeBuilder`), Export | P2-M1, 7a, T-DS3 | — |

Card preview = `BuilderPreviewDashboard` scaled (props `theme`/`mode`/`scale`).

---

## Stage 2/3 — Page evolutions

| Ticket | Scope | Depends on |
|---|---|---|
| P2-C1 | `/components`: status badge (`COMPONENT_STATUS` enum), docs/stories links on `IComponentMeta`, live preview per card (reuse `ComponentMiniPreview`) | T1 (correct render) |
| P2-P1 | `/playground`: Vue REPL, integrated console, bundle info (`PlaygroundConsole.vue`, `PlaygroundBundleInfo.vue`) | — |
| P2-P2 | `/playground`: extra templates incl. a "Theme Switcher" template showcasing two-axis `useTheme()` | T1 |
| P2-S1 | Skeleton routes: `/themes`, `/themes/builder`, `/docs` (iframe VitePress), `/stories` (iframe Histoire) + chrome layout + i18n keys | — |

---

## Critical path

`(T1, T2, T-DS3) → [Stage-1 user validation] → P2-B0 → 7a → {7b, 7c, 7d, 7e} → 7f → P2-M1 → P2-M2 → T-QA`

`P2-S1`, `P2-P1` can start independently of the foundation.

## Mandatory designer touchpoints

- **P2-B0** — Theme Builder (sidebar + preview dashboard).
- **P2-M0** — Marketplace (gallery + card).
- **ux** — validate each of the 8 themes against the mockup PDF (tracked under T5/T7).
