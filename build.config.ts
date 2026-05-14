import * as fs from "node:fs"
import { defineBuildConfig } from "unbuild"

export default defineBuildConfig({
    // If entries is not provided, will be automatically inferred from package.json
    entries: [
        {
            builder: 'mkdist',
            input: './src',
            pattern: ['**/*.vue', '!**/*.story.vue'],
            loaders: ['vue']
        },
        {
            builder: 'mkdist',
            input: './src',
            format: 'cjs',
            pattern: [
                '**/*.ts',
                '!**/*.story.ts',
                '!**/*.spec.ts',
                '!**/__tests__/**',
                '!**/*.cy.ts'
            ],
            loaders: ['js'],
            ext: 'cjs'
        },
        {
            builder: 'mkdist',
            input: './src',
            format: 'esm',
            pattern: [
                '**/*.ts',
                '!**/*.story.ts',
                '!**/*.spec.ts',
                '!**/__tests__/**',
                '!**/*.cy.ts'
            ],
            loaders: ['js'],
            ext: 'js'
        }
    ],

    // Change outDir, default is 'dist'
    outDir: 'dist/src',

    // Generates *.d.ts declaration file
    declaration: true,
    sourcemap: true,
    clean: true,
    failOnWarn: false,

    hooks: {
        'build:done': () => {
            fs.cpSync('./src/assets', './dist/src/assets', {recursive: true})
        }
    },

    externals: ['vue', 'vue-i18n', 'vue-router', '@mdi/font']
})
