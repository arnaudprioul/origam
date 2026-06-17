import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CODE_THEME_ENUM_DOC: IEnumDoc = {
    slug: 'code-theme',
    name: 'CODE_THEME',
    category: 'Code',
    descriptionKey: 'enums.catalog.code_theme.description',
    descriptionFallback: 'Controls which shiki colour theme OrigamCode applies. AUTO follows the host page data-theme attribute or prefers-color-scheme.',
    definition: `export enum CODE_THEME {
    AUTO  = 'auto',
    LIGHT = 'light',
    DARK  = 'dark',
}`,
    values: [
        {
            value: 'CODE_THEME.AUTO',
            descriptionKey: 'enums.detail.code_theme.auto',
            descriptionFallback: 'Follows the host page theme (data-theme or prefers-color-scheme).',
        },
        {
            value: 'CODE_THEME.LIGHT',
            descriptionKey: 'enums.detail.code_theme.light',
            descriptionFallback: 'Forces the light shiki theme regardless of the page theme.',
        },
        {
            value: 'CODE_THEME.DARK',
            descriptionKey: 'enums.detail.code_theme.dark',
            descriptionFallback: 'Forces the dark shiki theme regardless of the page theme.',
        },
    ],
    usedBy: [
        { slug: 'code', name: 'Code', propName: 'theme' },
    ],
    sourceFile: 'packages/ds/src/enums/Code/code-theme.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.code_theme.example',
            titleFallback: 'Forcing dark highlighting',
            code: `<origam-code :theme="CODE_THEME.DARK" :lang="CODE_LANG.TS" :code="snippet" />`,
            lang: 'vue',
        },
    ],
}
