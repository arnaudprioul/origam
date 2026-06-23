import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const CODE_DARK_THEME_CONST_DOC: IConstDoc = {
    slug: 'code-dark-theme',
    name: 'CODE_DARK_THEME',
    category: 'Components',
    descriptionKey: 'consts.catalog.code_dark_theme.description',
    descriptionFallback: "Shiki theme name used by useCode for dark mode. Maps to GitHub's dark theme — best contrast and nicest defaults. Override at the composable level for a different palette.",
    definition: `export const CODE_DARK_THEME = 'github-dark'`,
    value: "'github-dark'",
    usedBy: [
        { name: 'useCode' },
        { name: 'OrigamCode', slug: 'code' },
    ],
    sourceFile: 'packages/ds/src/consts/Code/code.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.code_dark_theme.example',
            titleFallback: 'Referencing CODE_DARK_THEME to build a custom highlighter',
            code: `import { CODE_DARK_THEME } from 'origam'
import { createHighlighter } from 'shiki'

const hl = await createHighlighter({ themes: [CODE_DARK_THEME] })`,
            lang: 'typescript',
        },
    ],
}
