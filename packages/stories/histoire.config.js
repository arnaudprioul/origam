import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import vue from '@vitejs/plugin-vue'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import markdownItCodetabs from 'markdown-it-codetabs'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItFootnote from 'markdown-it-footnote'

const __dirname = dirname(fileURLToPath(import.meta.url))

// After the monorepo migration:
//   - this config lives at packages/stories/histoire.config.js
//   - the design-system source lives at packages/ds/src
//   - the VitePress docs live at packages/docs
//   - all `.story.vue` files live IN this package (under components/, etc.)
export default defineConfig({
    // your Histoire configuration
    setupFile: '/histoire.setup.ts',
    // Built into the marketing site's public dir so Nuxt serves the static
    // stories SPA at /stories (see vite.base below). One deployable origin —
    // the marketing site — instead of a separate stories host. `histoire dev`
    // is unaffected (base only applies to the production build).
    outDir: '../marketing/public/stories',
    plugins: [
        HstVue()
    ],
    // Histoire spawns its own Vite instance and does NOT read `vite.config.ts`.
    // The aliases consumed by stories (`@origam`, `@stories`, `@docs`) must be
    // re-declared here, otherwise `<docs lang="md" src="@docs/...">` resolves
    // to nothing and Histoire renders "No documentation available".
    vite: {
        // Serve the built stories SPA under /stories on the marketing origin.
        // All hashed asset URLs are prefixed with this base so they resolve
        // when Nuxt serves public/stories/** at /stories/**.
        base: '/stories/',
        /*
         * Histoire spawns its own Vite. In a pnpm workspace, @vitejs/plugin-vue
         * is not always auto-loaded — declare it explicitly so .vue files
         * (incl. .story.vue) are parsed as SFCs.
         */
        plugins: [vue()],
        resolve: {
            alias: {
                '@origam': resolve(__dirname, '../ds/src'),
                '@stories': resolve(__dirname, '.'),
                '@docs': resolve(__dirname, '../docs'),
            }
        },
        server: {
            // pnpm stores @mdi/font under node_modules/@mdi/.ignored_font;
            // its webfont files (materialdesignicons-webfont.woff2/woff/ttf)
            // live outside Vite's default fs.allow root, so the dev server
            // returned 403 for them and every `.mdi` glyph rendered as an
            // empty box (font-family fell back to the body font). Allow the
            // monorepo root so the font binaries are served.
            fs: {
                allow: [resolve(__dirname, '..', '..')]
            },
            watch: {
                // `.claude/worktrees/<agent-id>` holds throwaway git
                // worktrees spawned by parallel agents — each carries a
                // full repo copy. Watching them blows past the macOS
                // per-process file-descriptor cap (EMFILE: too many
                // open files, watch) and crashes `histoire dev` at boot.
                // Same logic for `tests/e2e/.results` (Playwright dumps
                // screenshots / videos on every run) and `dist/`.
                ignored: [
                    '**/.claude/**',
                    '**/tests/e2e/.results/**',
                    '**/tests/e2e/.report/**',
                    '**/dist/**'
                ]
            }
        }
    },
    theme: {
        title: 'Origam Page Builder',
        favicon: './public/favicon.ico',
        logo: {
            square: './public/logo.svg',
            light: './public/logo.svg',
            dark: './public/logo.svg'
        }
    },
    defaultStoryProps: {
        icon: 'carbon:assembly-reference',
        iconColor: '#00c5a5',
        autoPropsDisabled: true
    },
    markdown: (md) => {
        md.use(markdownItCodetabs)
        md.use(markdownItDeflist)
        md.use(markdownItFootnote)
    },
    tree: {
        groups: [
            {
                id: 'top'
            },
            {
                id: 'stylesAndDesignTokens',
                title: 'Styles & Design token' // No toggle
            },
            {
                id: 'components',
                title: 'Components' // No toggle
            },
            {
                id: 'pageBuilder',
                title: 'Page Builder' // No toggle
            },
            {
                id: 'helpers',
                title: 'Helpers' // No toggle
            }
        ]
    }
})
