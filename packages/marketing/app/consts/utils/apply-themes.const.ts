import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const APPLY_THEMES_UTIL_DOC: IUtilDoc = {
    slug: 'apply-themes',
    name: 'applyThemes',
    category: 'Theme',
    icon: 'mdi-palette-swatch-outline',
    descriptionKey: 'utils.catalog.apply_themes.description',
    descriptionFallback: 'Install a list of themes at once by calling applyTheme for each entry. Returns the ids that were actually written; SSR-skipped or empty themes are omitted from the result.',
    signature: 'function applyThemes(themes: IOrigamTheme[]): string[]',
    params: [
        {
            name: 'themes',
            type: 'IOrigamTheme[]',
            required: true,
            descriptionKey: 'utils.detail.apply_themes.param_themes',
            descriptionFallback: 'Array of theme objects to inject. Each is processed by applyTheme individually.',
        },
    ],
    returns: {
        type: 'string[]',
        descriptionKey: 'utils.detail.apply_themes.returns',
        descriptionFallback: 'Array of injected <style> element ids (may be shorter than the input when some entries are skipped in SSR or have no variables).',
    },
    sourceFile: 'packages/ds/src/utils/Theme/apply-theme.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.apply_themes.example_basic',
            titleFallback: 'Inject multiple themes at once',
            code: `import { applyThemes } from 'origam'

const ids = applyThemes([
    { name: 'brand-x', mode: 'light', colors: { primary: '#005EFF' } },
    { name: 'brand-x', mode: 'dark',  colors: { primary: '#4D8FFF' } },
])
// ids → ['origam-theme-brand-x-light', 'origam-theme-brand-x-dark']`,
            lang: 'typescript',
        },
    ],
    related: ['apply-theme'],
}
