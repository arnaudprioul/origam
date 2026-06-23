import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const THEME_TYPE_DOC: ITypeDoc = {
    slug: 'theme',
    name: 'TTheme',
    kind: 'type',
    category: 'Theme & Tokens',
    descriptionKey: 'types.catalog.theme.description',
    descriptionFallback: 'Runtime brand name applied to the <html data-theme="…"> attribute or to a sub-tree via OrigamThemeProvider. Orthogonal to the light/dark mode axis.',
    definition: `export type TTheme = 'auto' | 'light' | 'dark' | (string & {})`,
    values: [
        {
            value: 'auto',
            descriptionKey: 'types.detail.theme.auto',
            descriptionFallback: 'No data-theme attribute is set. Children resolve against the closest ancestor theme, or the default brand at the document root.',
        },
        {
            value: 'light',
            descriptionKey: 'types.detail.theme.light',
            descriptionFallback: 'Legacy alias kept for backwards compatibility — was the default brand before the two-axis theming model.',
        },
        {
            value: 'dark',
            descriptionKey: 'types.detail.theme.dark',
            descriptionFallback: 'Legacy alias kept for backwards compatibility. As of the two-axis model, prefer setting mode="dark" on OrigamThemeProvider.',
        },
        {
            value: '(custom string)',
            descriptionKey: 'types.detail.theme.custom',
            descriptionFallback: 'Any other string is treated as a custom brand theme (e.g. "sobre", "brand-a"). The matching CSS token file must be loaded by the consumer.',
        },
    ],
    usedBy: [
        { slug: 'theme-provider', name: 'ThemeProvider', propName: 'theme' },
    ],
    sourceFile: 'packages/ds/src/types/Theme/theme.type.ts',
    examples: [
        {
            titleKey: 'types.detail.theme.example',
            titleFallback: 'Sub-tree with a custom brand theme',
            code: `<origam-theme-provider theme="brand-a">
  <origam-card>This card renders with the brand-a token set.</origam-card>
</origam-theme-provider>`,
            lang: 'html',
        },
    ],
}
