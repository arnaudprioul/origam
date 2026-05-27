---
title: About origam
description: Why we built origam, what's inside, who's behind it.
lastUpdated: '2026-05-27'
---

## The story

Every Vue 3 project we touched started the same way: picking a UI library, fighting its theme system, patching a11y issues in components that should just work, and wiring design tokens manually because the library had its own opinion about styling. We evaluated every serious option — none combined production-grade accessibility, native design tokens, Vue 3 Composition API, and a CSS-first architecture in a single coherent package.

origam started as an internal design system for a SaaS product. It grew component by component, each one tested with axe-core from day one. When the token pipeline landed — Tokens Studio JSON compiled by Style Dictionary v4 into CSS variables, utility classes, and TypeScript types — we realised it was worth sharing properly.

The goal was never to compete with Vuetify or PrimeVue on raw component count. The goal was to make a design system that treats accessibility as a feature, not an afterthought, and that lets teams own their visual language through tokens rather than overriding opaque CSS.

## Philosophy

**CSS-first, JS-fallback.** Modern CSS can do what used to require JavaScript. Container queries, `:has()`, `color-mix()`, `clamp()`, `view-transition-name` — origam uses all of them. A JS fallback is added only when feature detection via `useCssSupport()` returns false.

**Eat your own dog food.** The origam.dev marketing site itself is built with origam components. If a component is annoying to consume, that friction shows up immediately. There is no comfortable distance between author and user.

**Production-ready means testable.** Every component ships with Playwright specs. The a11y suite runs axe-core on every story. Flaky tests are treated as bugs. A component without a green CI badge is not considered done.

**Open source, MIT, no strings attached.** origam is free to use commercially, fork, and redistribute. The npm package, the token sources, the docs — all public. The project depends on contributors, not on a commercial tier above it.

**No bullshit.** No magic, no hidden overrides, no "just wrap it in a Provider and it will work". Everything is documented, every CSS variable is named, every composable is tested. When something breaks, the call stack tells you where to look.

## What's inside

origam ships around 95 component families, 29 chart primitives built on a lightweight canvas engine, and 66 utility classes generated directly from the token graph. Every component is a `.vue` SFC written with `<script setup>` and strict TypeScript. There is no dependency on a framework-level CSS reset or a third-party CSS framework — the token pipeline is the only style dependency.

The CHANGELOG tracks every addition and breaking change since day one. Components are grouped into eight categories: Layout, Navigation, Forms, Data, Feedback, Overlay, Media, and Utilities. The full catalogue is browsable at `/components`.

## Stack we use

The toolchain is intentionally minimal: everything in service of the component and token pipeline, nothing for the sake of having a longer README. Tokens Studio exports DTCG JSON, Style Dictionary v4 compiles it to CSS and TypeScript types, Histoire hosts the interactive stories, VitePress hosts the reference docs. unbuild produces the distributable ES module. Vitest covers unit and composable logic; Playwright with axe-core covers component behaviour and accessibility end-to-end. Tauri 2 wraps the dev server into a desktop shell for local development. Nuxt 4 powers this site; Coolify handles deployment.

## The team

**Arnaud Prioul** — creator and lead. Designs the API contracts, writes the components, maintains the token pipeline, and makes the call when trade-offs need resolving. You can reach him at [arnaud.prioul@gmail.com](mailto:arnaud.prioul@gmail.com) or on GitHub.

**Claude (Anthropic)** — co-author on a significant portion of commits since the project adopted the agent-assisted workflow. Reviews implementations, writes tests, catches spec drift, and brings up issues that a single pair of eyes would miss. Every commit that involved Claude carries the `Co-Authored-By` trailer.

origam is a two-person project in a practical sense. Contributions from the community are welcome and valued — see below.

## Get involved

The best way to contribute is to open an issue describing what you ran into. Bug reports with a minimal reproduction get triaged first. Feature requests with a use-case are more likely to land than API wishes. Pull requests that include a story update and a Playwright spec are merged faster than those that don't.

- **GitHub Issues** — bugs, regressions, documentation gaps: [github.com/arnaudprioul/origam/issues](https://github.com/arnaudprioul/origam/issues)
- **GitHub Discussions** — ideas, API questions, show-and-tell: [github.com/arnaudprioul/origam/discussions](https://github.com/arnaudprioul/origam/discussions)
- **Contributing guide** — conventions, test requirements, token authoring: [CLAUDE.md in the repo](https://github.com/arnaudprioul/origam/blob/main/CLAUDE.md)

## Contact

For anything that doesn't fit an issue: [arnaud.prioul@gmail.com](mailto:arnaud.prioul@gmail.com). Response time is best-effort — this is an open source side project, not a support contract.

For public questions that others might benefit from: prefer [GitHub Discussions](https://github.com/arnaudprioul/origam/discussions) so the answer is searchable.
