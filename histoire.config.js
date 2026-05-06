import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import markdownItCodetabs from 'markdown-it-codetabs'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItFootnote from 'markdown-it-footnote'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    // your Histoire configuration
    setupFile: '/stories/histoire.setup.ts',
    outDir: 'dist/stories',
    plugins: [
        HstVue()
    ],
    // Histoire spawns its own Vite instance and does NOT read `vite.config.ts`.
    // The aliases consumed by stories (`@origam`, `@stories`, `@docs`) must be
    // re-declared here, otherwise `<docs lang="md" src="@docs/...">` resolves
    // to nothing and Histoire renders "No documentation available".
    vite: {
        resolve: {
            alias: {
                '@origam': resolve(__dirname, './src'),
                '@stories': resolve(__dirname, './stories'),
                '@docs': resolve(__dirname, './docs'),
                '@cypress': resolve(__dirname, './cypress'),
            }
        }
    },
    theme: {
        title: 'Origam Page Builder',
        favicon: 'favicon.ico',
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
