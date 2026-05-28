import vue from "@vitejs/plugin-vue"
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from "vitest/config"
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..', '..')

export default defineConfig({
    plugins: [
        vue(),
        // Walk up to the repo root tsconfig.json so the @origam / @stories /
        // @docs path aliases resolve consistently with the rest of the build.
        tsconfigPaths({
            projects: [resolve(REPO_ROOT, 'tsconfig.json')]
        })
    ],
    test: {
        /*
         * Unit tests live in `TU/` (this package), mirroring the
         * `packages/ds/src/` tree (e.g.
         * `packages/ds/src/composables/Foo/foo.composable.ts` → its spec
         * is at `packages/tests/TU/composables/Foo/foo.composable.spec.ts`).
         *
         * - `e2e/` runs via Playwright (own config) — keep out of vitest
         *   discovery so `test.describe` doesn't collide with Playwright's
         *   runtime.
         * - `a11y/` runs via Playwright (separate config) — same reason.
         * - `.claude/worktrees/**` holds throwaway git worktrees spawned
         *   by parallel Claude agents — must NOT be collected (would
         *   multiply the run by N and surface unrelated branch failures).
         */
        include: ['TU/**/*.spec.ts'],
        exclude: ['node_modules/**', 'dist/**', 'e2e/**', 'a11y/**', '.claude/**', '../../**/node_modules/**', '../../.claude/**'],
        globals: true,
        environment: 'jsdom',
        /*
         * jsdom@25+ does NOT expose the Web Pointer Events spec
         * (PointerEvent class is undefined). useSheetSwipe relies on it
         * for synthetic gesture dispatch. The setup file (loaded before
         * every spec) polyfills PointerEvent on the jsdom window so
         * those tests run unmodified. happy-dom was tested as an
         * alternative environment but broke 5 unrelated specs
         * (sanitize-html string normalisation, ssr-smoke class shape).
         */
        setupFiles: ['./TU/vitest.setup.ts']
    }
})
