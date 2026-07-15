import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..', '..')

/**
 * Vitest `globalSetup` — runs once, in a plain Node process, BEFORE Vite
 * starts collecting/transforming any spec file.
 *
 * `packages/marketing/tsconfig.json` extends the Nuxt-generated
 * `./.nuxt/tsconfig.json` (git-ignored, produced by `nuxi prepare` — see
 * `packages/marketing/nuxt.config.ts` / the package's own `postinstall`).
 * TU/marketing/*.spec.ts imports plain (non-Nuxt-runtime) utils under
 * `packages/marketing/src/`, and Vite's built-in `vite:esbuild` transform
 * does its OWN per-file tsconfig lookup (via `tsconfck`, independent of
 * the `tsconfigPaths` plugin below) for every `.ts` file it transforms —
 * walking up from the file to the nearest `tsconfig.json`, which is
 * `packages/marketing/tsconfig.json`. When `.nuxt/` hasn't been generated
 * (true on a fresh CI runner — the package's `postinstall` script
 * deliberately no-ops in CI via `nuxt prepare || [ "$CI" = "true" ]`,
 * since `origam` isn't built yet at `pnpm install` time), that `extends`
 * target is missing and esbuild's tsconfig resolution throws a hard
 * `TSConfckParseError`, failing every spec that imports a marketing file
 * — regardless of what those specs actually test.
 *
 * `esbuild.tsconfigRaw` in the Vite config does NOT avoid this: Vite's
 * `transformWithEsbuild` calls `loadTsconfigJsonForFile` unconditionally
 * for `.ts`/`.tsx` files whenever a raw tsconfig object (not a string) is
 * supplied, merging the loaded file's fields AFTER the lookup — the
 * lookup itself still throws before any override is ever applied
 * (verified by reading `vite/dist/node/chunks/config.js`).
 *
 * The only fix that doesn't touch `packages/marketing/tsconfig.json`
 * itself (needed as-is for Nuxt-aware IDE/typecheck) or the CI workflow
 * (which would need `origam` built first just to run `nuxi prepare`) is
 * making the `extends` TARGET resolvable. This stub is intentionally
 * minimal — nothing under `TU/marketing/` needs Nuxt path aliases or
 * component-auto-import types, only the plain TS compiler defaults) —
 * and is NEVER written over an existing file, so a real `nuxi prepare`
 * (local dev, `nuxt build`) always wins.
 */
export default function globalSetup (): void {
    const nuxtTsconfigDir = resolve(REPO_ROOT, 'packages/marketing/.nuxt')
    const nuxtTsconfigPath = resolve(nuxtTsconfigDir, 'tsconfig.json')
    if (existsSync(nuxtTsconfigPath)) return

    mkdirSync(nuxtTsconfigDir, { recursive: true })
    writeFileSync(
        nuxtTsconfigPath,
        JSON.stringify({ compilerOptions: {} }, null, 2) + '\n',
        'utf-8'
    )
}
