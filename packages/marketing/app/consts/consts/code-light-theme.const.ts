import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const CODE_LIGHT_THEME_CONST_DOC: IConstDoc = {
    slug: 'code-light-theme',
    name: 'CODE_LIGHT_THEME',
    category: 'Components',
    descriptionKey: 'consts.catalog.code_light_theme.description',
    descriptionFallback: "Shiki theme name used by useCode for light mode. Maps to GitHub's light theme — best contrast and nicest defaults. Override at the composable level for a different palette.",
    definition: `export const CODE_LIGHT_THEME = 'github-light'`,
    value: "'github-light'",
    usedBy: [
        { name: 'useCode' },
        { name: 'OrigamCode', slug: 'code' },
    ],
    sourceFile: 'packages/ds/src/consts/Code/code.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.code_light_theme.example',
            titleFallback: 'Referencing CODE_LIGHT_THEME to build a custom highlighter',
            code: `import { CODE_LIGHT_THEME } from 'origam'
import { createHighlighter } from 'shiki'

const hl = await createHighlighter({ themes: [CODE_LIGHT_THEME] })`,
            lang: 'typescript',
        },
    ],
}
