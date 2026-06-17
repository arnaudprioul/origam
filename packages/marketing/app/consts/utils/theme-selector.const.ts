import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const THEME_SELECTOR_UTIL_DOC: IUtilDoc = {
    slug: 'theme-selector',
    name: 'themeSelector',
    category: 'Theme',
    icon: 'mdi-palette-swatch-outline',
    descriptionKey: 'utils.catalog.theme_selector.description',
    descriptionFallback: 'Compute the CSS selector that a theme block targets based on its name and mode. Returns `:root` for the default theme, `[data-theme="name"]` for named themes, and compound selectors when both name and mode are set.',
    signature: `function themeSelector(theme: IOrigamTheme): string`,
    params: [
        {
            name: 'theme',
            type: 'IOrigamTheme',
            required: true,
            descriptionKey: 'utils.detail.theme_selector.param_theme',
            descriptionFallback: 'The theme descriptor. `name` and `mode` ("light" | "dark" | "auto") control which selector is emitted. A mode of "auto" is treated as absent.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.theme_selector.returns',
        descriptionFallback: 'A CSS selector string: `:root`, `[data-theme="name"]`, `[data-mode="dark"]`, or a compound `[data-theme="name"][data-mode="dark"]`.',
    },
    sourceFile: 'packages/ds/src/utils/Theme/apply-theme.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.theme_selector.example_basic',
            titleFallback: 'Selector for various theme configurations',
            code: `import { themeSelector } from 'origam'

themeSelector({ name: '', mode: 'auto' })
// → ':root'

themeSelector({ name: 'brand-x', mode: 'auto' })
// → '[data-theme="brand-x"]'

themeSelector({ name: 'brand-x', mode: 'dark' })
// → '[data-theme="brand-x"][data-mode="dark"]'`,
            lang: 'typescript',
        },
    ],
    related: ['theme-to-css', 'theme-vars-to-vars', 'apply-theme'],
}
