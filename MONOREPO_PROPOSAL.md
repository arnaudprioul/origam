# Monorepo Proposal — origam

**Author:** architect agent
**Date:** 2026-05-27
**Status:** Draft — awaiting user decision

This document audits the current repo, proposes three monorepo layouts
(npm workspaces, pnpm workspaces, Turborepo over either), recommends one,
and ships a step-by-step migration plan ready to execute.

It is decision-oriented. Skip to **§5 Recommendation** and **§6 Migration
plan** if you want the TL;DR.

---

## 1. État des lieux (audit)

### 1.1 Codebases présentes au root

| # | Path | Role | Has own `package.json` | Build tool | Published? |
|---|---|---|---|---|---|
| 1 | `src/` | DS lib (Vue 3 components, composables, tokens, Nuxt module) | No — uses root | `unbuild` (`build.config.ts`) | npm as `origam@2.5.1` |
| 2 | `marketing/` | Nuxt 4 marketing site + playground + content | **Yes** (`@origam/marketing`, private) | `nuxt build` + `pagefind` | No (Docker GHCR planned) |
| 3 | `docs/` | VitePress docs site | No — uses root | `vitepress build docs` | Docker GHCR (`origam-docs`) |
| 4 | `stories/` | Histoire stories (component playground) | No — uses root | `histoire build` | Docker GHCR (`origam-stories`) |
| 5 | `figma-plugin/` | Figma plugin (React + esbuild) syncing DS tokens into Figma | **Yes** (`origam-ds-sync`, private) | `esbuild` (`esbuild.config.mjs`) | No (Figma Community planned?) |
| 6 | `tests/` | Vitest TU + Playwright e2e + a11y | No — uses root | `vitest` / `playwright` | No |
| 7 | `tokens/` | Tokens Studio JSON source (DTCG) | No | Consumed by `scripts/build-tokens.mjs` | Output shipped in `dist/` |
| 8 | `scripts/` | `build-tokens.mjs` + Style Dictionary config | No | Plain node scripts | No |
| 9 | `docker/` | Dockerfiles + nginx config for `docs` + `stories` images | No | Docker Buildx via CI | GHCR images |
| 10 | `public/` | Static assets shared by Histoire | No | — | — |
| 11 | `dist/` | Build output of the DS lib (consumed by `marketing` via `file:..`) | No (generated) | — | npm tarball source |

### 1.2 Dépendances entre codebases

```
                          ┌──────────────┐
                          │   tokens/    │ (DTCG JSON)
                          └──────┬───────┘
                                 │ scripts/build-tokens.mjs
                                 ▼
              ┌──────────────────────────────────┐
              │              src/                │  ← published as `origam`
              │  (components, composables, etc.) │
              └──────┬──────┬──────┬──────┬──────┘
                     │      │      │      │
            relative │      │ @origam   │ @origam
                     │      │      │      │
                     ▼      ▼      ▼      ▼
                ┌────────┐ ┌──────┐ ┌──────┐ ┌─────────┐
                │ tests/ │ │stories│ │docs/ │ │marketing│
                └────────┘ └──────┘ └──────┘ └─────┬───┘
                                                   │ `origam` (file:..)
                                                   ▼
                                              dist/src/...

      ┌─────────────┐
      │figma-plugin/│  (independent — consumes nothing local today,
      └─────────────┘   but should consume `tokens/` exports tomorrow)
```

- **Internal alias used by consumers of `src/`**: `@origam` → `./src` and
  `@origam/*` → `./src/*` (declared in root `tsconfig.json` and re-declared
  in `histoire.config.js`).
- **Marketing** is the only consumer that goes through the published API
  (`from 'origam'`) — via a `file:..` dep that points at `dist/`. Marketing
  thus **requires `npm run lib:build` before its `nuxt dev`** works.
- **Tests, stories, docs** all use `@origam` (the alias to `src/`), so they
  test/document the source — not the built output. This is intentional and
  good (tight feedback loop), but means marketing's path is the only one
  that exercises the published shape.

### 1.3 Points de friction actuels

1. **Root `package.json` does everything.** 178 lines, runs the lib build,
   stories, docs, tests, lint, tokens, plus the publish lifecycle. Adding
   marketing scripts here would push it past 220 lines and explode the
   conceptual surface for a contributor.
2. **`marketing/` ships `origam: "file:.."`.** This works only because
   `lib:build` populates `../dist/`. There's no `prepare`-hook in the root
   `package.json` to guarantee it. A fresh clone → `cd marketing && npm i`
   → `nuxt dev` fails on missing `dist/`. Same in CI: marketing has no
   workflow today, but the moment we add one it must remember to build the
   lib first.
3. **`figma-plugin/` has its own `node_modules`.** ~52 packages duplicated
   on disk (`react`, `react-dom`, `esbuild`, `@types/react`, `vitest`).
   Same Vitest version as root — wasted cache.
4. **`docs/` re-uses `@origam/ds`, `@origam/consts`, `@origam/composables`
   subpaths** in markdown examples (`docs/components/Chart/*.md`) that
   **don't resolve today** — there's no alias `@origam/ds` in
   `tsconfig.json` (only `@origam`). These are aspirational forward-looking
   imports waiting for the monorepo to land. Confirms the split is overdue.
5. **CI lints, types, builds, tests EVERYTHING on EVERY push.**
   `npm ci` installs 600+ packages even for a 2-line README edit. No
   change-aware filtering. Lint scans `figma-plugin/**` explicitly via the
   eslint `ignores` list (defensive — but proves the root scan goes
   wide).
6. **Versioning is monolithic.** `package.json` version `2.5.1` represents
   the lib. Marketing version `0.1.0` is detached but lives in the same
   git tag space. There's no way to ship a marketing-only patch without
   re-tagging origam.
7. **Histoire's vite watch ignores `.claude/worktrees/**` and `dist/**`**
   (see `histoire.config.js:38-46`) — workarounds for the giant root
   workspace. A workspace boundary would scope these out naturally.
8. **TypeScript project references** already split into `stories`,
   `docs`, `tests/TU`, `tests/e2e` (root `tsconfig.json:51-58`) — the
   conceptual carving is done, but they all share the same `node_modules`,
   `package.json`, and `package-lock.json`.
9. **No lockfile per package** = if marketing wants a different Nuxt
   minor than what dev tooling pulls transitively, there's no way to pin
   it without affecting everyone.
10. **Two distinct `vitest` versions** declared today (root `^3.2.4`,
    figma `^2.1.0`, marketing `^3.0.0`). Pure deduplication win for any
    workspaces tool.

### 1.4 Risques de continuer comme ça

| Risk | Likelihood | Blast radius |
|---|---|---|
| `npm publish` accidentally ships `marketing/` / `figma-plugin/` source | Low (`files` field is set) but human-error if `files` is touched | High — leaks unpublished work |
| Marketing breaks because `dist/` is stale on a CI runner | High — CI doesn't yet build marketing | Medium — caught at PR |
| Adding a new app (e.g. `cli/`, `vscode-extension/`) requires re-doing all the plumbing per app | Certain (already happening with figma-plugin) | Medium — cost compounds |
| Contributor confusion: "where do I add this Nuxt module?" (root or marketing?) | High | Low — annoyance |
| Lock collisions when marketing wants newer Nuxt and root wants older `@nuxt/kit` | Medium — there's already a peer-dep workaround via `.npmrc` `legacy-peer-deps=true` | High — install breakage |

---

## 2. Proposition A — npm workspaces

The minimal, vanilla move. Uses the npm CLI you already have, no new
tools. Lockfile stays `package-lock.json`. CI workflows need surgical
edits.

### 2.1 Target layout

```
origam/                                  # root
├── package.json                         # workspaces array, no src
├── package-lock.json                    # single hoisted lockfile
├── tsconfig.base.json                   # shared compiler options
├── tsconfig.json                        # solution file (references only)
├── eslint.config.js                     # shared, scoped per package
├── .nvmrc / .npmrc / .gitignore         # unchanged
├── packages/
│   ├── ds/                              # ← was: src/, build.config.ts, tokens/, scripts/, public/
│   │   ├── src/                         # was: src/
│   │   ├── tokens/                      # was: tokens/
│   │   ├── scripts/build-tokens.mjs     # was: scripts/build-tokens.mjs
│   │   ├── public/                      # was: public/
│   │   ├── build.config.ts              # was: build.config.ts (paths unchanged — runs in cwd)
│   │   ├── package.json                 # name: "origam", version 2.5.1, files=["dist/src","dist/tokens"]
│   │   ├── tsconfig.json
│   │   └── README.md                    # was: README.md (copy for npm tarball)
│   ├── marketing/                       # ← was: marketing/
│   │   ├── app/, content/, public/, server/, scripts/, .generated/
│   │   ├── nuxt.config.ts
│   │   ├── package.json                 # name: "@origam/marketing", deps: { "origam": "workspace:*" } … wait, that's pnpm. For npm: { "origam": "*" }
│   │   ├── Dockerfile
│   │   └── ...
│   ├── docs/                            # ← was: docs/
│   │   ├── .vitepress/
│   │   ├── components/, guide/, ...
│   │   └── package.json                 # name: "@origam/docs", deps: { "origam": "*" }
│   ├── stories/                         # ← was: stories/  + histoire.config.js
│   │   ├── components/, const/, ...
│   │   ├── histoire.config.js
│   │   └── package.json                 # name: "@origam/stories", deps: { "origam": "*" }
│   ├── figma-plugin/                    # ← was: figma-plugin/
│   │   ├── src/, esbuild.config.mjs, manifest.json
│   │   └── package.json                 # name: "@origam/figma-plugin"
│   └── tests/                           # ← was: tests/ + playwright.*.config.ts + vitest.config.ts
│       ├── TU/, e2e/, a11y/
│       ├── vitest.config.ts
│       ├── playwright.config.ts
│       ├── playwright.a11y.config.ts
│       └── package.json                 # name: "@origam/tests", deps: { "origam": "*" }
└── docker/                              # stays at root (cross-cuts docs + stories images)
```

### 2.2 Root `package.json`

```jsonc
{
  "name": "origam-monorepo",
  "private": true,
  "type": "module",
  "engines": { "node": ">=22" },
  "workspaces": ["packages/*"],
  "scripts": {
    "dev:ds": "npm run dev -w origam",
    "dev:stories": "npm run dev -w @origam/stories",
    "dev:docs": "npm run dev -w @origam/docs",
    "dev:marketing": "npm run dev -w @origam/marketing",
    "build:ds": "npm run build -w origam",
    "build:stories": "npm run build -w @origam/stories",
    "build:docs": "npm run build -w @origam/docs",
    "build:marketing": "npm run build -w @origam/marketing",
    "build:figma": "npm run build -w @origam/figma-plugin",
    "build:all": "npm run build:ds && npm run build:stories && npm run build:docs && npm run build:marketing",
    "test:unit": "npm run test:unit -w @origam/tests",
    "test:e2e": "npm run test:e2e -w @origam/tests",
    "test:a11y": "npm run test:a11y -w @origam/tests",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --max-warnings 0",
    "tokens:build": "npm run tokens:build -w origam",
    "tokens:watch": "npm run tokens:watch -w origam"
  },
  "devDependencies": {
    "eslint": "^9.31.0",
    "eslint-config-prettier": "^10.1.5",
    "eslint-plugin-vue": "^10.3.0",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.37.0",
    "husky": "^9.1.7",
    "lint-staged": "^16.1.2"
  }
}
```

Lifting only **cross-cutting dev deps** (linters, husky, TS) to the root.
Everything else moves into the package that uses it. Hoisting still
dedupes shared deps in the root `node_modules` automatically (npm
default behaviour).

### 2.3 Per-package `package.json` skeletons

**`packages/ds/package.json`** (publishable on npm as `origam`):

```jsonc
{
  "name": "origam",
  "version": "2.5.1",
  "type": "module",
  "exports": { /* unchanged from current root */ },
  "files": ["dist/src/", "dist/tokens/", "LICENSE", "README.md", "CHANGELOG.md"],
  "scripts": {
    "dev": "npm run tokens:watch",
    "build": "npm run tokens:build && unbuild",
    "tokens:build": "node scripts/build-tokens.mjs",
    "tokens:watch": "node scripts/build-tokens.mjs --watch",
    "tokens:lint": "node scripts/build-tokens.mjs --dry-run --strict",
    "prepublishOnly": "npm run build"
  },
  "dependencies": {
    "@mdi/font": "^7.4.47",
    "qrcode-generator": "^2.0.4",
    "shiki": "^3.8.1"
  },
  "peerDependencies": { "vue": "^3.5.0", "vue-i18n": "^11.0.0", "vue-router": "^4.5.0" },
  "peerDependenciesMeta": { "vue-i18n": { "optional": true }, "vue-router": { "optional": true } },
  "devDependencies": {
    "@nuxt/kit": "^4.4.5",
    "@tokens-studio/sd-transforms": "^1.2.9",
    "@vitejs/plugin-vue": "^6.0.0",
    "sass": "^1.89.2",
    "style-dictionary": "^4.4.0",
    "ts-transformer-keys": "^0.4.4",
    "unbuild": "^3.5.0",
    "vite": "^7.0.5",
    "vue": "^3.5.17",
    "vue-tsc": "^3.0.2"
  }
}
```

**`packages/marketing/package.json`**:

```jsonc
{
  "name": "@origam/marketing",
  "private": true,
  "version": "0.1.0",
  "scripts": { /* unchanged from current marketing/package.json */ },
  "dependencies": {
    "origam": "*",
    /* … rest unchanged */
  }
}
```

In npm workspaces, `"origam": "*"` resolves to the local workspace
package automatically (npm prefers the local workspace over the
registry). No more `file:..`.

**`packages/tests/package.json`** (new, consolidates root test scripts):

```jsonc
{
  "name": "@origam/tests",
  "private": true,
  "scripts": {
    "test:unit": "vitest --run",
    "test:e2e": "playwright test",
    "test:a11y": "playwright test --config=playwright.a11y.config.ts"
  },
  "dependencies": { "origam": "*" },
  "devDependencies": {
    "@axe-core/playwright": "^4.11.3",
    "@playwright/test": "^1.48.0",
    "@vue/test-utils": "^2.4.6",
    "axe-core": "^4.11.4",
    "happy-dom": "^15.11.7",
    "vitest": "^3.2.4"
  }
}
```

**`packages/stories/package.json`**:

```jsonc
{
  "name": "@origam/stories",
  "private": true,
  "scripts": {
    "dev": "CHOKIDAR_USEPOLLING=1 CHOKIDAR_INTERVAL=600 histoire dev",
    "build": "histoire build",
    "preview": "histoire preview"
  },
  "dependencies": { "origam": "*" },
  "devDependencies": {
    "@histoire/plugin-vue": "^1.0.0-beta.1",
    "histoire": "^1.0.0-beta.1",
    "markdown-it-codetabs": "^1.2.0",
    "markdown-it-deflist": "^3.0.0",
    "markdown-it-footnote": "^4.0.0"
  }
}
```

**`packages/docs/package.json`**:

```jsonc
{
  "name": "@origam/docs",
  "private": true,
  "scripts": {
    "dev": "CHOKIDAR_USEPOLLING=1 CHOKIDAR_INTERVAL=600 vitepress dev .",
    "build": "vitepress build .",
    "preview": "vitepress preview ."
  },
  "dependencies": { "origam": "*" },
  "devDependencies": { "vitepress": "^1.6.3" }
}
```

### 2.4 TypeScript layout

Split the root `tsconfig.json`:

- `tsconfig.base.json` — strict mode + bundler resolution, no paths, no
  includes. Inherited by every package.
- `tsconfig.json` at root — pure solution file with `references` to each
  package's `tsconfig.json` for `tsc --build`.
- Each package owns its own paths. Inside `packages/ds`, use `~/...` or
  no alias at all (the lib already uses relative imports — the `@origam`
  alias is only consumed by external workspaces).
- In `packages/stories`, `packages/docs`, `packages/tests`, the alias
  `@origam` resolves to `../ds/src` via `tsconfig.json paths`. Histoire
  also needs the alias in its `vite.resolve.alias` (already declared).

### 2.5 Publish impact

`npm publish` from the root currently uses the root `package.json`'s
`files` field. After migration:

- `cd packages/ds && npm publish --access public --provenance` is the
  command (workflow updates `working-directory: packages/ds`).
- `prepublishOnly` runs `npm run build` **inside the workspace only**.
- The `files` field still scopes the tarball — only `dist/src`,
  `dist/tokens`, `LICENSE`, `README.md`, `CHANGELOG.md` ship.
- Tag → version assertion: workflow already reads `package.json` —
  point it to `packages/ds/package.json`.

### 2.6 Build impact per artefact

| Artefact | Old command | New command |
|---|---|---|
| DS lib | `npm run lib:build` | `npm run build -w origam` |
| Tokens only | `npm run tokens:build` | `npm run tokens:build -w origam` |
| Stories static | `npm run story:build` | `npm run build -w @origam/stories` |
| Docs static | `npm run docs:build` | `npm run build -w @origam/docs` |
| Marketing | `cd marketing && npm run build:full` | `npm run build -w origam && npm run build -w @origam/marketing` |
| Tests unit | `npm run test:unit` | `npm run test:unit -w @origam/tests` |
| Tests e2e | `npm run test:e2e` | `npm run test:e2e -w @origam/tests` |

### 2.7 CI workflow impact

- **ci.yml**:
  - `Run ESLint` → still at root (workspaces-aware).
  - `Tokens build & lint` → `npm run tokens:build -w origam` and
    `tokens:lint -w origam`.
  - `Unit tests (Vitest)` → `npm run test:unit -w @origam/tests`.
  - `Library build (unbuild)` → `npm run build -w origam`; `Assert dist`
    checks `packages/ds/dist/src/origam.js`.
  - `E2E tests` → `npm run test:e2e -w @origam/tests`; the webServer in
    `playwright.config.ts` runs `npm run dev -w @origam/stories` from
    repo root, so `cwd` should be repo root (it already is in CI).
  - **New job**: `marketing-build` runs `npm run build -w origam &&
    npm run build -w @origam/marketing` — verifies the published-shape
    consumer still resolves.
- **release.yml**:
  - `Build library` → `npm run build -w origam`.
  - `Unit tests` → `npm run test:unit -w @origam/tests`.
  - `Publish` → set `working-directory: packages/ds`, then
    `npm publish --access public --provenance`.
  - Tag-vs-version assert reads `packages/ds/package.json`.
- **docker.yml**:
  - `Dockerfile.docs` and `Dockerfile.stories` paths in `docker/`
    need their `COPY src/ → /app/src/` adjusted to
    `COPY packages/ds packages/stories /app/packages/...`. Build context
    stays at repo root; copy paths shift.
- **tokens-sync.yml**: replace `npm run tokens:build` with
  `npm run tokens:build -w origam`.

### 2.8 Estimated effort — Proposition A

| Task | Hours | Risk |
|---|---|---|
| Create `packages/` skeleton, move files via `git mv` | 2 | Low |
| Split `tsconfig.json` → base + solution + per-pkg | 2 | Medium (paths) |
| Per-package `package.json` extraction + dep migration | 3 | Low |
| Update root scripts to `-w` form | 1 | Low |
| Update CI workflows (`ci.yml`, `release.yml`, `docker.yml`, `tokens-sync.yml`) | 2 | Medium |
| Update Dockerfiles | 1 | Medium |
| Run full local + CI green pass; fix paths | 3 | High (death by 1000 paper cuts) |
| Update `CLAUDE.md`, `README.md`, `ROADMAP.md` | 1 | Low |
| **Total** | **15 h ≈ 2 days** | — |

### 2.9 Pros / cons

**Pros**
- Zero new tooling. `npm` is already on every machine.
- Lockfile stays `package-lock.json` — no retraining.
- Survives every npm version since 7. Stable.
- Hoisting is automatic. Works out of the box.

**Cons**
- npm install is slow on cold cache (~45-60s for this repo).
- No DAG-aware build orchestration — `npm run build:all` is a sequential
  shell chain. Easy to get wrong (forget to build `origam` before
  `marketing`).
- Hoisting can hide phantom deps (a package can `import` a transitive
  dep without declaring it; passes locally, fails in standalone consumer).
- `workspace:*` protocol unsupported — falls back to `"*"`, which works
  but feels wobbly (npm publish-time substitution is less robust).

---

## 3. Proposition B — pnpm workspaces

Same layout as A, but on pnpm. The interesting differences:

- `pnpm-workspace.yaml` replaces the `workspaces` array.
- `pnpm-lock.yaml` replaces `package-lock.json`.
- `workspace:*` (or `workspace:^`) protocol replaces `"*"` for
  intra-workspace deps — strict, explicit, transformed to real version
  at publish time.
- Hard-link / symlink content-addressable store: install is ~2-3× faster
  on cold cache, ~10× faster on warm cache, and the disk footprint of
  `node_modules` is a fraction (single global store hard-linked in).
- Strict mode by default: no phantom deps. Marketing cannot `import
  'vitest'` if it didn't declare it. Catches bugs before they ship.

### 3.1 Target layout

Identical to **§2.1** with:

- `pnpm-workspace.yaml` at root:
  ```yaml
  packages:
    - 'packages/*'
  ```
- Remove `package-lock.json`, commit `pnpm-lock.yaml`.
- Remove `.npmrc`'s `legacy-peer-deps=true` (pnpm has its own
  `auto-install-peers=true` + `strict-peer-dependencies=false` knobs in
  `.npmrc`).
- Root `package.json`:
  ```jsonc
  {
    "name": "origam-monorepo",
    "private": true,
    "packageManager": "pnpm@9.x",
    "scripts": {
      "dev:ds": "pnpm --filter origam dev",
      "build:ds": "pnpm --filter origam build",
      "build:marketing": "pnpm --filter @origam/marketing build",
      "test:unit": "pnpm --filter @origam/tests test:unit"
    }
  }
  ```
- Inter-package deps use `workspace:*`:
  ```jsonc
  {
    "dependencies": { "origam": "workspace:*" }
  }
  ```
  At `pnpm publish` time, pnpm rewrites `workspace:*` → the actual
  version of `origam` in the dep tree. Clean and lockstep-correct.

### 3.2 Gain attendu

| Metric | npm | pnpm | Δ |
|---|---|---|---|
| Cold install (this repo, ~700 deps) | ~55s | ~20s | **-65%** |
| Warm install (existing lockfile, no version changes) | ~12s | ~3s | **-75%** |
| `node_modules` total disk | ~1.8 GB (root + figma) | ~280 MB linked + ~600 MB shared store | **-60%** |
| CI `npm ci` time per job (6 jobs × ~55s) | ~5.5 min | ~2 min | **-65%** |
| Strict dep resolution | no | yes | catches phantoms |

For a solo dev + Claude workflow where you run `install` dozens of times
a week (worktree spawns, branch switches, hotfixes), the
**install-time savings compound fast**.

### 3.3 Effort migration

| Task | Hours | Risk |
|---|---|---|
| Everything from Prop. A | 15 | — |
| Add `pnpm` install in CI (`npm i -g pnpm` or use `corepack enable`) | 0.5 | Low |
| Switch `npm` → `pnpm` in scripts and CI workflows | 1 | Low |
| Delete `package-lock.json`, generate `pnpm-lock.yaml`, audit diff | 1 | Medium (peer-dep warnings) |
| Audit phantom-dep failures (will catch some — that's the point) | 2 | Medium |
| Document the switch in `CLAUDE.md` | 0.5 | Low |
| **Total** | **20 h ≈ 2.5 days** | — |

Worth noting: pnpm doesn't break npm scripts in the registry (deps are
still installed correctly), but **contributors must use pnpm locally**.
A `.npmrc` `engine-strict=true` + `packageManager` in `package.json` +
a husky check (`pnpm only-allow pnpm`) is the standard belt-and-braces.

### 3.4 Pros / cons (pnpm-specific)

**Pros (on top of A)**
- 65% faster CI installs. ~5min/day saved at current cadence.
- Phantom deps detected at install — drops a whole class of "works on
  my machine" failures.
- `workspace:*` is semantically correct (transforms at publish).
- First-class change-aware filters: `pnpm --filter ...^@origam/marketing
  build` builds marketing **and everything it transitively depends on**.

**Cons**
- Requires retraining muscle memory: `pnpm install` not `npm install`.
- `corepack enable` quirks on some CI runners (handled by setup-node).
- A pnpm-strict resolution can refuse a perfectly-working install if
  histoire-alpha declares a too-loose peer. Mitigated via `.npmrc`
  `auto-install-peers=true`. (You already have a workaround for this on
  npm; the pnpm equivalent is a one-liner.)
- Lockfile diff in PRs is unfamiliar at first.

---

## 4. Proposition C — Turborepo (over A or B)

Turborepo sits **above** the workspace layout (it doesn't replace it).
Its job is two things:

1. **DAG-aware task orchestration.** Declare in `turbo.json` that
   `@origam/marketing#build` depends on `origam#build`. Run `turbo run
   build` and Turborepo picks the order, parallelises what can run
   together, and stops on first failure.
2. **Content-hash caching.** Outputs of `origam#build` are keyed by the
   SHA of `packages/ds/src/**` + `packages/ds/tokens/**` + the build
   command + a fingerprint of the toolchain. If nothing changed,
   subsequent runs are instant (cache replay). Optionally backed by
   a remote cache (Vercel free tier or self-hosted Bun/MinIO).

### 4.1 `turbo.json` shape

```jsonc
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".output/**", ".vitepress/dist/**"],
      "inputs": ["src/**", "tokens/**", "scripts/**", "package.json"]
    },
    "tokens:build": {
      "outputs": ["src/assets/css/tokens/**", "src/assets/scss/tokens/**", "src/types/tokens.type.ts"],
      "inputs": ["tokens/**", "scripts/build-tokens.mjs"]
    },
    "test:unit": {
      "dependsOn": ["^build", "tokens:build"],
      "outputs": []
    },
    "test:e2e": {
      "dependsOn": ["^build", "@origam/stories#build"],
      "outputs": ["tests/e2e/.report/**", "tests/e2e/.results/**"]
    },
    "lint": { "outputs": [] }
  }
}
```

`^build` means "build every dependency first". So
`turbo run build --filter=@origam/marketing` walks the DAG: builds
`origam` (tokens + lib) → then marketing. No more "did I rebuild the
lib?" mental overhead.

### 4.2 When it pays off

| Scenario | Pays off? |
|---|---|
| Solo dev, single machine | **Sometimes** — local cache of unbuild outputs ($3-5s saved per `lib:build` once cached) |
| CI, multiple jobs running same builds | **Yes** — remote cache means PR #2 reuses PR #1's lib build artefact (if SHA matches) |
| 3+ devs hitting CI in parallel | **Strongly yes** — shared remote cache cuts CI minutes by 40-60% on average |
| Token changes invalidate everything | **Neutral** — cache miss on `tokens:build` cascades correctly; Turborepo doesn't help and doesn't hurt |

For this repo (solo dev + Claude), the dominant gain is **dependency
order safety** (`marketing` always built after `origam`) and **local
incremental dev** (`turbo dev --filter=@origam/marketing^...` watches
the lib and the marketing app together).

### 4.3 Effort

| Task | Hours | Risk |
|---|---|---|
| Everything from Prop. A or B | 15-20 | — |
| Install turbo, write `turbo.json` | 1 | Low |
| Tag outputs/inputs per task accurately | 2 | Medium (wrong inputs → silent stale cache) |
| Optional: set up remote cache (Vercel free tier auth or self-host) | 2 | Low |
| Wire CI: `turbo run build --filter=...` instead of explicit `npm run -w` chains | 1 | Low |
| Audit first 3 CI runs for cache hits | 1 | Low |
| **Total incremental** | **7 h ≈ 1 day** on top of A or B | — |

### 4.4 Pros / cons

**Pros**
- DAG-driven correctness. Cannot forget to build a dep.
- Cache hits = instant rebuilds.
- `turbo run build --filter=...[origin/main]` runs only what changed
  since main. CI gets a free 50-80% speedup on small PRs.

**Cons**
- One more tool to learn (`turbo.json` schema, filter syntax).
- Cache keys must be honest. Wrong `inputs` = stale builds = trust loss
  → people disable it.
- For a 5-task graph (build, tokens, lint, test:unit, test:e2e) on a
  solo project, the orchestration savings are real but modest.

---

## 5. Recommendation — **pnpm workspaces (B) now, Turborepo (C) deferred**

### 5.1 Why pnpm over npm

For origam specifically:

1. **Install-time savings compound.** You spawn parallel agents in
   `.claude/worktrees/`, each runs its own `npm install`. At 55s/run
   × 5-10 runs/day, the 65% speedup buys back ~30 min/day. Worth the
   one-day migration on its own.
2. **Phantom-dep detection.** The repo has 11 packages today (lib +
   marketing + docs + stories + figma + tests + …). Strict mode will
   surface `import '@somepkg'` declared in the wrong workspace before
   it lands in main. The faster you catch these, the lower the
   refactoring cost.
3. **`workspace:*` is correct.** npm's `"*"` works but is publish-time
   ambiguous. pnpm rewrites at publish; `origam@2.5.1`'s tarball will
   pin the right interfaces.
4. **`marketing/` already has a `file:..` hack.** Replacing with
   `workspace:*` is a strict upgrade (no more "did I rebuild?" fragility).
5. **Disk footprint matters on Apple Silicon.** Your laptop benefits
   from the content-addressable store. Two worktrees of origam today
   = ~3.6 GB. Same on pnpm = ~600 MB.

### 5.2 Why not npm workspaces

Honest answer: it's fine. You could ship A and call it done. But pnpm is
strictly better-engineered for **multi-package layouts with
intra-workspace consumers** (marketing → origam), which is exactly
this repo. The retraining cost is one command (`pnpm` instead of `npm`).
The payback is daily.

### 5.3 Why defer Turborepo

The orchestration gains shine when:
- There are 3+ apps in the same repo (we'll have 2: marketing + figma).
- CI runs 5+ minutes on average (CI today is ~7 min, mostly tests not
  builds — Turbo cache helps lib build, not test runs).
- Multiple devs hit shared cache (you're solo).

You can add Turborepo as a **Phase 2** after the monorepo lands and
stabilises. The integration is small (1 day) and non-invasive — it
sits on top of pnpm without forcing changes to package internals.
Adding it later is cheap; adding it now ties up a day of work for
marginal solo-dev gain.

### 5.4 Recommended final stack

- **Workspaces**: pnpm 9 (`packageManager: pnpm@9.x`)
- **Layout**: `packages/{ds,marketing,docs,stories,figma-plugin,tests}/`
- **Intra-workspace protocol**: `workspace:*`
- **TS**: solution-style `tsconfig.json` at root, per-package
  `tsconfig.json` extending `tsconfig.base.json`.
- **ESLint**: single root config, workspaces-aware.
- **Husky / lint-staged**: stays at root.
- **Turborepo**: deferred to v3.1 if/when CI minutes become painful.

---

## 6. Migration plan (for pnpm)

Each step is one commit on a single feature branch
(`feature/monorepo-pnpm`). After each step, the checkpoint command MUST
pass before moving to the next.

### Step 1 — Branch prep & safety net
```
git checkout -b feature/monorepo-pnpm
git tag backup/pre-monorepo
```
**Checkpoint**: `git status` clean, tag exists.

### Step 2 — Install pnpm, lockfile generation (no file moves yet)
- Add `"packageManager": "pnpm@9.15.0"` to root `package.json`.
- Run `corepack enable && corepack prepare pnpm@9.15.0 --activate`.
- Run `pnpm import` to convert `package-lock.json` → `pnpm-lock.yaml`.
- Delete `package-lock.json`. Commit `pnpm-lock.yaml`.
- Update `.npmrc`: keep `legacy-peer-deps` if needed; add
  `auto-install-peers=true`.

**Checkpoint**: `pnpm install` clean, `pnpm run test:unit -- --run`
green, `pnpm run lib:build` green.

### Step 3 — Create `packages/` skeleton (no moves yet)
- `mkdir -p packages`
- Add `pnpm-workspace.yaml` listing `packages/*` (even though empty —
  pnpm tolerates it).

**Checkpoint**: `pnpm install` still clean.

### Step 4 — Move `src/` + tokens + scripts + build.config → `packages/ds/`
Riskiest single step. All `@origam` aliases in stories/docs/tests/marketing
break here.

- `git mv src packages/ds/src`
- `git mv tokens packages/ds/tokens`
- `git mv scripts packages/ds/scripts`
- `git mv build.config.ts packages/ds/build.config.ts`
- `git mv public packages/ds/public`
- Create `packages/ds/package.json` (extracted from root — name
  `"origam"`, version `2.5.1`, exports unchanged, files unchanged).
- Create `packages/ds/tsconfig.json` extending the new `tsconfig.base.json`.
- Update root `tsconfig.json` `paths`: `"@origam"` → `["packages/ds/src"]`
  and `"@origam/*"` → `["packages/ds/src/*"]`.
- Update `histoire.config.js` `resolve.alias.@origam` → `packages/ds/src`
  (file stays at root for now — moves in Step 6).
- Update `vitest.config.ts` (`tsconfigPaths` plugin auto-reads, but verify
  `include` paths still match: `tests/TU/**`).
- Build tokens: `pnpm -F origam tokens:build`.
- Build lib: `pnpm -F origam build`.
- Run TU: `pnpm run test:unit -- --run`.

**Checkpoint**: tokens build, lib build, TU all green.

### Step 5 — Move `marketing/` → `packages/marketing/`
- `git mv marketing packages/marketing`
- Update `packages/marketing/package.json`: `"origam": "file:.."` →
  `"origam": "workspace:*"`.
- Run `pnpm install` (relinks the workspace).
- Build: `pnpm -F @origam/marketing build` (after `pnpm -F origam build`).

**Checkpoint**: `pnpm -F @origam/marketing dev` boots locally.

### Step 6 — Move `stories/` → `packages/stories/`
- `git mv stories packages/stories`
- `git mv histoire.config.js packages/stories/histoire.config.js`
- Create `packages/stories/package.json`.
- Move histoire-related deps from root to stories.
- Update aliases in `histoire.config.js`: `@origam` resolves to
  `../ds/src` from `packages/stories/`.

**Checkpoint**: `pnpm -F @origam/stories dev` opens on `:6006`.

### Step 7 — Move `docs/` → `packages/docs/`
- `git mv docs packages/docs`
- Create `packages/docs/package.json`.
- Move `vitepress`, markdown-it plugins from root → docs.
- Update `docs/.vitepress/config.ts` `__dirname` resolution (no change
  — it's relative to the file).
- Update aliases (currently `@origam/ds` referenced in markdown — confirm
  they resolve to the new path).

**Checkpoint**: `pnpm -F @origam/docs build` succeeds.

### Step 8 — Move `tests/` + playwright/vitest configs → `packages/tests/`
- `git mv tests packages/tests`
- `git mv vitest.config.ts packages/tests/vitest.config.ts`
- `git mv playwright.config.ts packages/tests/playwright.config.ts`
- `git mv playwright.a11y.config.ts packages/tests/playwright.a11y.config.ts`
- Update `vitest.config.ts` `include`: `tests/TU/**` → `TU/**` (now
  relative to `packages/tests/`).
- Update `playwright.config.ts` `testDir`: `./tests/e2e` → `./e2e`.
- Update `playwright.config.ts` `webServer.command`: `npm run story:dev`
  → `pnpm -F @origam/stories dev` (and use `--cwd` to repo root).
- Update test imports `@origam/...` to keep working through root
  `tsconfig.json` paths.

**Checkpoint**: `pnpm -F @origam/tests test:unit` green, `pnpm -F
@origam/tests test:e2e` green.

### Step 9 — Move `figma-plugin/` → `packages/figma-plugin/`
- `git mv figma-plugin packages/figma-plugin`
- Update `packages/figma-plugin/package.json`: `"name":
  "@origam/figma-plugin"` (renamed for namespace consistency).
- Remove `node_modules` and `package-lock.json` from inside (delete
  before move ideally — they get hoisted into the workspace store).

**Checkpoint**: `pnpm -F @origam/figma-plugin build` green.

### Step 10 — Root `package.json` rewrite
- Strip everything that moved.
- Keep only: workspaces (now in `pnpm-workspace.yaml`), root scripts
  (delegating via `pnpm -F`), shared devDeps (eslint, prettier, husky,
  lint-staged, typescript at root for IDE).
- Update root `README.md`, `CLAUDE.md`, `ROADMAP.md` to document the
  layout.

**Checkpoint**: `pnpm install` clean, `pnpm run build:all` green.

### Step 11 — CI workflow updates
- `.github/workflows/ci.yml`:
  - Replace `npm ci --legacy-peer-deps` with
    `corepack enable && pnpm install --frozen-lockfile`.
  - Per job, replace `npm run X` with `pnpm -F <pkg> X`.
- `release.yml`: change `working-directory: packages/ds` for the
  `npm publish` step. Use `pnpm publish --access public --provenance
  --no-git-checks` (pnpm publishes from the workspace).
- `docker.yml`: update Dockerfile COPY paths from `src/` to `packages/ds/src/`,
  similarly for `docs/` and `stories/`.
- `tokens-sync.yml`: `pnpm -F origam tokens:build`.

**Checkpoint**: push branch, CI green end-to-end.

### Step 12 — Documentation pass
- Update root `CLAUDE.md` Project Structure block to match new layout.
- Update `README.md` install/dev instructions.
- Update onboarding sections in `ROADMAP.md`.
- Drop `CLAUDE_CODE_BRIEF.md` references to old paths.

**Checkpoint**: A new contributor can clone, run `corepack enable &&
pnpm install && pnpm -F @origam/marketing dev` and have marketing
running in <5 min.

### Step 13 — Merge to develop
- Open PR `feature/monorepo-pnpm` → `develop`.
- Self-review checklist:
  - All `@origam` imports resolve.
  - `pnpm publish --dry-run` from `packages/ds` produces the expected
    tarball shape (snapshot test).
  - Docker images build via local `docker buildx build`.
  - `pnpm audit` is clean.
- Merge. Tag-and-publish workflow stays dormant until next release.

### Cumulative effort estimate

| Step | Hours |
|---|---|
| 1-3 (prep) | 1.5 |
| 4 (ds move — riskiest) | 4 |
| 5 (marketing) | 2 |
| 6 (stories) | 1.5 |
| 7 (docs) | 1.5 |
| 8 (tests) | 2 |
| 9 (figma) | 1 |
| 10 (root rewrite) | 1 |
| 11 (CI) | 3 |
| 12 (docs) | 1 |
| 13 (review + merge) | 1.5 |
| **Total** | **20 h ≈ 2.5 days** |

Add Turborepo as a Phase 2 PR (1 day) once everything is green for 1-2 weeks.

---

## 7. Annexe — Questions ouvertes à trancher avec l'utilisateur

These are blocking the migration plan above. Pick a stance on each
before kicking off Step 1.

### Q1 — Publish shape: single package or split?

**Option α**: Keep `origam` as one big package (current). Status quo,
zero break for existing consumers, simple semver.

**Option β**: Split into `@origam/core` + `@origam/charts` +
`@origam/forms` + `@origam/nuxt`. Modern, lets consumers tree-shake at
the install boundary, but breaks every external import path (~all open
GitHub stars/forks). Needs a deprecation cycle.

**Architect lean**: **α now, β as Phase 4 when chart code is
substantial enough to be a 3-5 MB ecochart bundle on its own.** The
exports map already partially supports it (`origam/components`,
`origam/composables`, etc.), so consumers can opt into subpath imports
without us splitting the package. Split when it's painful, not before.

### Q2 — Figma plugin: where does it go after monorepo?

**Option α**: `packages/figma-plugin` (current name `origam-ds-sync`).
Stays internal, builds via esbuild, never published.

**Option β**: Publish to Figma Community as a public plugin (free or
paid). Increases the surface area of origam's reach. Requires a Figma
publisher account + plugin review.

**Option γ**: Publish a companion `@origam/figma-tokens` npm package
that other Figma plugins could consume (the token-export logic, not the
UI).

**Architect lean**: **α for now**, ship monorepo first. Revisit β/γ
once token v3 stabilises.

### Q3 — Marketing site versioning

**Option α**: Marketing version follows lib (bump together, single
release flow).

**Option β**: Marketing keeps its own version (`0.x.x`), deployed
continuously from `main`. Library tagged independently. Recommended for
content-driven sites that ship multiple times/week.

**Architect lean**: **β**. Marketing is a Nuxt SSR app + blog content;
it'll iterate faster than the lib. Decoupled versions = no friction
("bump origam patch to push a typo fix on the homepage" is a smell).

### Q4 — Alias namespace consolidation

The repo currently uses three competing aliases in docs imports:
`@origam`, `@origam/ds`, `@origam/consts`, `@origam/composables`.

**Option α**: Standardise on `origam` (the published name) everywhere
post-monorepo. Stories/docs/tests then import the **built** entry
points, exactly as external consumers do.

**Option β**: Standardise on `@origam` → `packages/ds/src` for
in-repo testing (fast feedback, no rebuild needed) AND `origam` for
marketing (built shape).

**Architect lean**: **β**. Tests should test source (fast). Marketing
should consume the published shape (catches export-map regressions
before npm publish).

---

## 8. Quick-start (assuming user approves Recommendation B)

```bash
# Day 1 morning — bootstrap
git checkout -b feature/monorepo-pnpm
git tag backup/pre-monorepo
corepack enable
corepack prepare pnpm@9.15.0 --activate
pnpm import   # converts package-lock.json → pnpm-lock.yaml
rm package-lock.json
mkdir -p packages
echo "packages:\n  - 'packages/*'" > pnpm-workspace.yaml
git add -A && git commit -m "chore(monorepo): bootstrap pnpm + workspace skeleton"
```

Then walk Steps 4-13 sequentially. Approve checkpoint output between
each step.

---

**End of proposal.** Awaiting decision on §5 (workspaces tool) and §7
(open questions) to start Step 1.

---

## Migration completed (mai 2026)

The 12-step plan above shipped on `feature/monorepo-pnpm`. The repo is
now a pnpm workspace with 6 packages under `packages/`. Reference
commits:

| Step | Commit | Scope |
|---|---|---|
| 1-3 | `4d53558b` | pnpm prep + `packages/` skeleton, lockfile import |
| 4 | `d031c095` | move ds (src/tokens/scripts/build.config/public) |
| 5-9 | `70f1819f` | move marketing / stories / docs / tests / figma |
| 10 | *this branch* | root `package.json` rewrite (workspace manager only) |
| 11 | *this branch* | CI workflows (`ci.yml`, `release.yml`, `tokens-sync.yml`, `docker/Dockerfile.*`) |
| 12 | *this branch* | docs pass (`CLAUDE.md`, `README.md`, `ROADMAP.md`, `CLAUDE_CODE_BRIEF.md`) |
| 13 | *PR feature/monorepo-pnpm → develop* | merge, awaiting user validation |

Checkpoint at hand-off : `ds` build green, TU `752 / 1 skip`, stories
`208 / 2200`, docs build green, figma plugin build green, marketing
build green.

Open follow-up (tracked in `ROADMAP.md` → Wave 3.5) : add **Turborepo**
once the pipeline has been stable for 1-2 weeks (cf. §5.3 above).
