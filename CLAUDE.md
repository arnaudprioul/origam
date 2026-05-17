# origam — Engineering Principles

This document is the canonical reference for AI agents and humans working on
the origam design system. It complements the global CLAUDE.md instructions
by capturing project-specific conventions.

---

## ⛔ "Test-as-you-build" rule for stories (mandatory)

**Every new story MUST ship with a matching Playwright spec that asserts
every prop / Variant produces a distinct runtime behaviour.** Don't write
the doc + story and call it done — write the doc, the story, AND
`tests/e2e/{component}.spec.ts` together. The spec must:

1. Navigate to each `<Variant>` (via the dedicated Variant titles, not
   via the HstSelect picker dropdown which is custom DOM and brittle).
2. For each prop exposed in the variant's controls, programmatically
   exercise the prop (mouse, scroll, value swap, …) and assert the
   computed style / class actually changes between values.
3. Catch silently-ignored props (component types `IXxxProps` but the
   `<style>` block is empty, or a class is emitted without a matching
   SCSS rule). If the SCSS is missing, **fix it in the same PR**, don't
   defer to a remediation ticket — that's how the user ends up clicking
   through 10 broken Variants.

If a prop can't be tested headlessly (audio, deviceorientation on
desktop without sensor support), document that in the spec with a
diagnostic block AND mention the limitation explicitly when reporting
to the user.

---

## ⛔ "Don't claim it's fixed" rule (mandatory)

**Never tell the user "it's fixed" / "ça devrait marcher" / "fait" without
having actually verified the runtime behaviour.** Type-check passing or
file-edit success is NOT verification.

Before claiming a fix:

1. **Component logic / pure functions** — write a Vitest unit test (or
   re-run an existing one) and confirm green.
2. **SCSS / CSS rules** — grep the rendered class output OR ask the user
   for a screenshot of the DOM-inspected element with computed styles.
3. **Stories / Histoire interactions (mouse, scroll, focus, drag, …)** —
   you cannot test these in CLI. Acknowledge the limitation explicitly:
   *"I can't verify interactive behaviour from here — please reload and
   confirm X, Y, Z. If it still fails, paste the console errors or a
   screenshot."* Do **not** say "it's fixed" — say "I changed X, please
   verify it works."
4. **Fixes that touched composables consumed by many components** —
   surface the blast radius and ask the user to spot-check at least one
   component besides the one originally reported.

When in doubt, **stop and ask** rather than claim correctness. A wrong
"it's fixed" wastes the user's testing cycle and erodes trust.

## ⛔ `withDefaults()` — inline literals only (mandatory)

Vue 3 SFC compiler statically analyses `withDefaults(defineProps<T>(), {…})`
at compile time to extract the runtime props options descriptor. Values
on the right side of each key **must be inline literals** (strings,
numbers, booleans, `() => ({})` for objects). Property accesses on
imported `as const` objects are NOT statically resolvable — the compiler
emits a descriptor with `undefined` defaults and the props object itself
becomes undefined at any reactive access.

```ts
// ❌ Broken — compiler can't resolve XXX_DEFAULTS.tag statically
const props = withDefaults(defineProps<IXxxProps>(), {
    tag: XXX_DEFAULTS.tag,
    variant: XXX_DEFAULTS.variant
})

// ✅ Working — literal values inlined
const props = withDefaults(defineProps<IXxxProps>(), {
    tag: 'div',
    variant: 'default'
})
```

The shared `XXX_DEFAULTS` constant stays exported (for story-side
iteration and consumer reference) but is **never** referenced inside
`withDefaults`. The crash propagates through the import graph and
breaks unrelated specs — failures look like
`TypeError: Cannot read properties of undefined (reading '<key>')`
sourced at the component file, even though the crashing spec doesn't
import the component directly.

This rule applies to **every** component using `withDefaults`. Audit
your delivery once before commit.

## ⛔ Story + doc sync on every component change (mandatory)

**Every PR that adds, renames, or removes a prop / slot / emit on a
component MUST update the matching `.story.vue` and `.md` in the
same commit.** A Variant that doesn't reflect the live API is a
documentation lie; a doc table missing the latest prop wastes the
user's debugging cycle.

### Story file structure (canonical)

Every `stories/components/stories/{Name}/Origam{Name}.story.vue`
MUST follow this exact section order:

1. **`<Variant title="Default">`** — the playground. Renders the
   component with every reactive control wired into the
   `#controls` block. Use `useStoryInitState({...})` for the
   state. Never name this `"Playground"` — the canonical title
   is `"Default"`.
2. **Props Variants** grouped by semantic theme (Visual /
   Behaviour / Layout / Accessibility / Data / …). Pick the
   grouping that tells the prop story best, keep group order
   stable. Each title starts with `Prop — ` followed by the
   prop name(s).
3. **Slot Variants** — one per slot, with a custom snippet that
   visibly differs from the default render. Title `Slot — {name}`.
4. **Emit Variants** — one per emit (or one per logical cluster
   when they make sense to demo together). Each Variant surfaces
   a live counter or log of fires. Title `Emit — {names}`.

### Doc file structure (canonical)

`docs/components/{Name}/Origam{Name}.md` exposes:
- Description + quick-start snippet
- **Props** table — sub-tabled by group if the surface is large
  (mirror the story groups)
- **Emits** table
- **Slots** table or list
- Behaviour notes (animations, focus, a11y, SSR, browser support)
- Composable reference (`use{Name}`) if the component ships one
- 2-3 runnable usage examples

### Pre-commit sanity

Before committing, eyeball:
- every prop in the `.vue` has a control in the Default Variant
  AND a row in the doc's Props table
- every emit in the `.vue` has at least one Variant
- every slot in the `.vue` is exercised by at least one Variant

If you're spawning an agent on a component, **the agent prompt
MUST include this rule explicitly** so the deliverable lands
story + doc + implementation together — not as a follow-up.

## ⛔ Stash before ANY branch / checkout / reset operation (mandatory)

**If you have uncommitted changes (working tree dirty) and you're
about to do anything that could touch the working tree — switch
branches, reset, checkout files, `git flow feature start/finish`,
spawn an agent in a worktree, run a command that might be cancelled
mid-flight — `git stash push -m "<descriptive label>"` FIRST.**

This isn't optional. Lost work because of a `git checkout` that
silently failed, an agent worktree that rolled the parent tree back,
or a commit that "looked successful but the merge said Already up to
date" is the most common avoidable disaster in this repo's history.
It has happened multiple times in this codebase already — stop
relearning it.

### The mandatory flow

```bash
# Step 1 — ALWAYS stash if dirty
git stash push -m "wip: <what you were doing>"

# Step 2 — do the risky operation
git checkout <branch>          # or merge, reset, flow op, …

# Step 3 — pop the stash back
git stash pop

# Step 4 — if pop conflicted, resolve, don't discard
#         the original stash entry stays in `git stash list`
#         until you `git stash drop` explicitly
```

### When to stash (non-exhaustive)

- Before `git checkout <branch>` when dirty.
- Before `git flow feature start | finish | rebase`.
- Before `git reset --hard | --mixed` on a dirty tree.
- Before `git pull` on a dirty tree.
- Before spawning a parallel agent that might create a worktree on
  the same repo.
- Before any "let me just check the other branch real quick" move.

### When stash is NOT enough

If you're about to do something destructive (force-push a tag,
delete a branch with unpushed commits, `git clean -fd`), stash
AND save a tag pointing at the current commit:

```bash
git stash push -m "before <op>"
git tag -a backup/<date>-<topic> -m "safety net"
# … do the risky thing …
# if you need to recover: git checkout backup/<date>-<topic>
```

### Why this matters

The runtime that hosts this repo has historically rolled back file
edits between agent turns when worktrees collide or when an agent
runs in an isolated copy that doesn't sync. The stash entry is the
only artefact that survives those rollbacks — it lives in the local
git object DB and is independent of the working tree state.

## Tech stack (snapshot)

- **Vue 3** (Composition API + `<script setup lang="ts">`), strict TS.
- **Vite + Histoire + VitePress** for dev, stories, and docs.
- **unbuild** for the published library (consumed by external apps).
- **Cypress** (component tests), **Vitest** (unit tests, jsdom).
- **Style Dictionary v4** + **@tokens-studio/sd-transforms** for design
  tokens (multi-theme, multi-output: CSS, SCSS, TS types).

The project requires **Node >= 22** (see `.nvmrc`). The unit tests do not
run on Node 18 because `@vitejs/plugin-vue` calls `crypto.hash()` (Node 21+).

---

## Core principle — **CSS-first, JS-fallback**

Modern CSS is powerful. Use it.

| Need | First choice (CSS) | Fallback only if unsupported |
|---|---|---|
| Layout | `display: grid` + `grid-template-areas` | flex + JS positioning |
| Subdividing | `grid-template-columns: subgrid` | re-implement nested grid |
| Fluid sizing | `min()` / `max()` / `clamp()` | JS `ResizeObserver` + style mutations |
| Component-level breakpoints | `@container (...)` | JS `ResizeObserver` |
| Parent-aware styling | `:has()` selector | JS class toggling |
| Aspect-locked elements | `aspect-ratio: 16 / 9` | JS padding-bottom hack |
| Color blending | `color-mix(in srgb, …)` | JS color math |
| Form controls | `accent-color` | JS-painted custom controls |
| Smooth transitions | `view-transition-name` | JS animation libs |

Concretely, every component that previously needed JS for one of those tasks
should:
1. Implement the CSS-only path first.
2. Branch via the `useCssSupport()` composable to a JS fallback ONLY when
   `CSS.supports()` returns false.

### `useCssSupport()` — the single feature-detection layer

Located at `src/composables/CssSupport/cssSupport.composable.ts`.

```ts
import { useCssSupport } from '@/composables'

const { css, supports, supportsAny, has } = useCssSupport()

// Reactive named flag (preferred when the feature is part of the public matrix)
if (css.value.containerQueries) { /* CSS path */ }
else { /* JS resize-observer path */ }

// Free-form query (cached after the first call)
if (supports('selector(:has(*))')) { … }

// Logical combinators
if (supportsAny('display: grid', 'display: -ms-grid')) { … }
```

Rules:
- **Never call `CSS.supports()` directly in a component**. Always go through
  the composable so the matrix stays auditable in one place.
- **Never gate hydration-sensitive markup** on `css.value.*` — during SSR
  every flag is `false`. Wrap branches with `<ClientOnly>` or `onMounted`
  if the difference would cause hydration mismatch.
- **Add a new feature** by editing `FEATURE_QUERIES` in
  `cssSupport.composable.ts`. The map is the single source of truth for
  what we monitor.

When in doubt, ask: "can I express this with CSS today?". If yes, do it
with CSS. If a target browser cannot, branch via `useCssSupport`. This
keeps bundles smaller, performance better, and theming free.

---

## Design tokens

Source of truth: `tokens/` (Tokens Studio JSON, DTCG format).

Three tiers — agents must respect the boundary:

```
primitive    →  raw values (color.neutral.500, space.4, …)        – tokens/primitive.json
semantic     →  intent (color.surface.default, color.action.primary.bg)  – tokens/semantic/{theme}.json
component    →  per-component refs (btn.background-color)         – tokens/component/{name}.json
```

Naming convention emitted in CSS (handled by Style Dictionary transform):

| Layer | Path in JSON | CSS variable |
|---|---|---|
| Primitive | `color.neutral.500` | `--origam-color-neutral-500` |
| Semantic | `color.surface.default` | `--origam-color-surface-default` |
| Component | `component.btn.background-color` | `--origam-btn---background-color` |
| Component (state) | `component.btn.primary.background-color` | `--origam-btn--primary---background-color` |
| Component (BEM child) | `component.card.overlay.bg` | `--origam-card__overlay---bg` |

Build:
- `npm run tokens:build` — one-shot rebuild of CSS + SCSS + TS types.
- `npm run tokens:watch` — rebuild on `tokens/**/*.json` change.
- `npm run tokens:lint` — dry-run validation.
- Auto-prereq of `server:dev` and `server:build`.

When migrating a component:
1. Audit every `--origam-{cmp}---*` var the SCSS uses.
2. Make sure `tokens/component/{cmp}.json` declares each (with full
   property names, e.g. `background-color` not `bg`).
3. Replace any hardcoded hex/rgb in the SCSS by `var(--origam-color-…)`
   references (or `var(--origam-shadow-{rung})` for elevation).
4. Remove the global `<style>:root{}` block — defaults now come from the
   generated `:root, [data-theme="light"] { … }` rules.
5. Keep calc-based vars that depend on instance-level state (size variant,
   density modifier, …) inside the scoped `<style>` block.

---

## Multi-theme

`<html data-theme="light|dark|brand-x">` switches the active token set.
`prefers-color-scheme: dark` is honoured when no `data-theme` attribute
is present (auto mode).

Runtime helpers:
- `useTheme()` (composable) — singleton ref + persistence + toggle.
- `<OrigamThemeProvider theme="dark">…</OrigamThemeProvider>` — sub-tree
  override (e.g. a brand-X Card inside a neutral page).

To add a brand theme:
1. Drop a `tokens/semantic/brand-{name}.json` overriding the semantics
   you need.
2. Optionally add `tokens/{name}/primitive-override.json` if the brand
   needs a different primary ramp.
3. Register the theme in `tokens/$themes.json`.
4. Rebuild — `[data-theme="brand-{name}"] { … }` is auto-emitted.

---

## Color / intent props

The legacy `color="#ff0080"` API is **deprecated since v0.4** (warns once
per value via `useColorEffect`). The migration path is:
- Pass a `TIntent` value (`'primary' | 'success' | 'danger' | …`).
- For one-off custom colors, use `:style="{'--origam-btn---background-color': myColor}"`.

`TIntent` is defined in `src/types/Commons/intent.type.ts`.

---

## Classes-first conventions (since v2.1)

Transversal composables (`useColor`, `useBackgroundColor`, `useTextColor`,
`useColorEffect`, `useElevation`, `useRounded`, `useBorder`, `useMargin`,
`usePadding`, `useSize`) emit utility classes when the consumer passes a
**tokenised** value, and fall back to inline styles only for **custom**
values. The 66 utility classes live in `src/assets/css/tokens/origam-utilities.css`
(generated by Style Dictionary). Naming convention: `.origam--{group}-{value}`
with **double-tiret** as the utility-root separator
(e.g. `.origam--color-primary`, `.origam--shadow-md`, `.origam--rounded-lg`).

### Rules for component authors

1. **Tokenised → class. Custom → inline style.**
   `color="primary"` → `:class="[..., colorClasses]"` (utility resolves the var).
   `color="#ff00aa"` → `:style="[..., colorStyles]"` (raw value preserved).
   Bind both — the empty side is harmless.

2. **Surface BEM child, never the teleport root.** Floating components
   (Menu, Tooltip, Picker, Snackbar, Badge) carry the utility class on the
   element that owns the visible surface (`__content`, `__pill`, `__wrapper`),
   not on the overlay/teleport root — otherwise the bg paints the entire
   teleport target.

3. **Don't double-apply.** If `roundedClasses` lives on the root, do NOT
   re-inject it on a child via `mergeProps` — only the channel that's
   missing on that level (e.g. `colorClasses` on `__wrapper`) should be
   added. Pre-fix Snackbar duplicated all classes on `__wrapper`, polluting
   the cascade. Read the full template before deciding what to merge.

4. **State-dependent styling stays inline.** `useColorEffect` returns
   `colorClasses=[]` when `isHover` / `isActive` / `isDisabled` is true —
   utility classes are static by design. Components that bind
   `useActive(props, 'modelValue')` (Alert, Badge, BottomNav) therefore
   never expose a utility class while visible. The inline `colorStyles`
   keeps the surface painted. Do **not** assert on the utility class in
   tests for these components — assert on `getComputedStyle` instead.

5. **Extracting a sub-component? Audit the inline-style contract.**
   When a parent emitted a `:style="..."` declaration that an SCSS rule
   relied on (selectors like `[style*="color:"]`, `:has(…)`, attribute
   selectors), and you extract that markup into a child component, verify
   the contract still holds. Either preserve the inline path or migrate
   the SCSS rule to a class-based selector. The Switch-thumb regression
   in v2.0 → v2.1 came from breaking exactly this rule when `OrigamSwitchTrack`
   was extracted.

### Strategy A — classes AND styles in parallel (transition)

For one major cycle (v2.x), every refactored composable returns BOTH
`*Classes` and `*Styles`. When the value is tokenised, `*Styles` is
empty and the class does the work; when it's custom, `*Classes` is
empty and the style does. This is intentional — it lets components
migrate at their own pace without breaking external consumers. v3.0.0
will retire the `*Styles` returns.

---

## Component conventions (origam-specific)

- Files: `Origam{PascalCase}.vue`, `Origam{PascalCase}.spec.js`,
  `Origam{PascalCase}.cy.ts`, `Origam{PascalCase}.md` per component dir.
- Composables: `src/composables/{Domain}/{kebabCase}.composable.ts`.
- Types: `T` prefix, files under `src/types/{Domain}/{kebab-case}.type.ts`.
- Interfaces: `I` prefix, files under `src/interfaces/{Domain}/{kebab-case}.interface.ts`.
- CSS variables (component-local): `--origam-{component}---{property}`
  with **triple-tiret** as the block/property separator. State variants
  use `--origam-{component}--{state}---{property}` (double-tiret).

---

## Pre-delivery (project-specific overlay)

The global pre-delivery policy (TU + e2e + security) applies. Specific to
origam:
- Run tests on **Node 22** (`.nvmrc`); Node 18 produces unrelated
  `crypto.hash` failures.
- `npm run tokens:build` must succeed and not produce a token resolution
  warning ("token collisions detected" is acceptable — caused by
  cross-theme name reuse, expected).
- `npm audit --omit=dev` should be clean to ship; dev tree contains
  pre-existing histoire-alpha vulns documented as accepted risk.
