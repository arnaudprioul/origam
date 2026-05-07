import vue from "@vitejs/plugin-vue"
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from "vitest/config"

export default defineConfig({
    plugins: [
        vue(),
        tsconfigPaths()
    ],
    test: {
        include: ['**/*.spec.ts'],
        // Vitest collects every `**/*.spec.ts`, but `tests/e2e/*.spec.ts`
        // are Playwright suites that import `@playwright/test` — Vitest
        // chokes on `test.describe` from Playwright's runtime. Keep the
        // e2e tree out of the unit-test surface.
        exclude: ['node_modules/**', 'dist/**', 'tests/e2e/**'],
        globals: true,
        environment: 'jsdom'
    }
})
