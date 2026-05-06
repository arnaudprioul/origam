# Origam DS Sync — Figma plugin

A Figma plugin that syncs the Origam design system (tokens + component
metadata) into a Figma file. Lives inside the Origam UI repo so the
plugin and the runtime always agree on the shape of the data.

> Phase 1 scaffold only. The 3-tab UI (Tokens / Components / Library),
> token importer, component sync, and library publishing helpers land in
> later phases. See `../CLAUDE_CODE_BRIEF.md` at the repo root for the
> full plan.

## Requirements

- Node `>= 22` (matches the parent repo's `.nvmrc`).
- Figma desktop app — plugin development requires desktop, the web
  client cannot load local manifests.

## Install

```bash
cd figma-plugin
npm install
```

## Build

```bash
npm run build
```

This produces `dist/code.js` (main-thread bundle) and `dist/ui.html`
(self-contained UI iframe with the React bundle and any CSS inlined).
Figma reads only those two files plus `manifest.json`.

Watch mode for development:

```bash
npm run dev
```

Type-checking only:

```bash
npm run typecheck
```

## Load in Figma

1. Run `npm run build` (or `npm run dev`).
2. Open the **Figma desktop** app.
3. Open any file (the plugin runs against the active document).
4. Menu: **Plugins → Development → Import plugin from manifest…**
5. Select `figma-plugin/manifest.json` from this repo.
6. Run via **Plugins → Development → Origam DS Sync**.

After the first import Figma remembers the plugin; you only need to
rebuild (`npm run build`) and re-run from the menu after code changes.

## Project layout

```
figma-plugin/
  manifest.json          Figma plugin manifest (entrypoints, permissions)
  package.json           scripts + dependencies
  tsconfig.json          strict TS config
  esbuild.config.mjs     bundles code.ts + ui.tsx, inlines ui.html
  src/
    code.ts              main-thread entry (no DOM — Figma sandbox)
    ui.tsx               iframe entry (React 18 root)
    ui.html              HTML template with INLINE_JS / INLINE_CSS markers
  dist/                  build output (gitignored)
```

## Workflow overview

The plugin is built in phases. Phase 1 (this scaffold) only verifies the
manifest loads in Figma and the build pipeline emits a working
`dist/`. Subsequent phases — token import, component sync, library
publish helpers — are tracked in `../CLAUDE_CODE_BRIEF.md` at the repo
root and will be picked up by separate work streams.

Architectural conventions (`I` prefix for interfaces, `T` prefix for
types, files under `src/lib`, `src/components`, etc.) follow the parent
repo's `CLAUDE.md`.

## Network access

The manifest currently declares `networkAccess.allowedDomains: ["none"]`
— v1 is fully offline. If a future phase needs to fetch the published
token bundle from a remote URL, update both `manifest.json` and the
`CLAUDE_CODE_BRIEF.md` so the change is auditable.
