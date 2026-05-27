import vue from "@vitejs/plugin-vue"
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from "vitest/config"

export default defineConfig({
    plugins: [
        vue(),
        tsconfigPaths()
    ],
    test: {
        /*
         * Unit tests live in `tests/TU/` mirroring the `src/` tree
         * (e.g. `src/composables/Foo/foo.composable.ts` → its spec
         * is at `tests/TU/composables/Foo/foo.composable.spec.ts`).
         *
         * - `tests/e2e/` runs via Playwright (own config) — keep
         *   out of vitest discovery so `test.describe` doesn't
         *   collide with Playwright's runtime.
         * - `tests/a11y/` runs via Playwright (separate config) —
         *   same reason.
         * - `.claude/worktrees/**` holds throwaway git worktrees
         *   spawned by parallel Claude agents — must NOT be
         *   collected (would multiply the run by N and surface
         *   unrelated branch failures).
         */
        include: ['tests/TU/**/*.spec.ts'],
        exclude: ['node_modules/**', 'dist/**', 'tests/e2e/**', 'tests/a11y/**', '.claude/**'],
        globals: true,
        environment: 'jsdom'
    }
})
