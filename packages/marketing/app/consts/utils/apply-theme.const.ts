import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const APPLY_THEME_UTIL_DOC: IUtilDoc = {
    slug: 'apply-theme',
    name: 'applyTheme',
    category: 'Theme',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.apply_theme.description',
    descriptionFallback: 'Inject (or replace) a single theme\'s CSS variable block into <head> at runtime. SSR-safe: returns null when document is unavailable or the theme is empty.',
    signature: 'function applyTheme(theme: IOrigamTheme): string | null',
    params: [
        {
            name: 'theme',
            type: 'IOrigamTheme',
            required: true,
            descriptionKey: 'utils.detail.apply_theme.param_theme',
            descriptionFallback: 'The theme object containing name, mode (light | dark), and the CSS variable map to inject.',
        },
    ],
    returns: {
        type: 'string | null',
        descriptionKey: 'utils.detail.apply_theme.returns',
        descriptionFallback: 'The id of the injected <style> element (keyed by name × mode), or null when skipped (SSR or empty theme).',
    },
    sourceFile: 'packages/ds/src/utils/Theme/apply-theme.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.apply_theme.example_basic',
            titleFallback: 'Inject a brand theme at runtime',
            code: `import { applyTheme } from 'origam'

const id = applyTheme({
    name: 'brand-x',
    mode: 'light',
    colors: { primary: '#005EFF', secondary: '#FF6B35' },
})
// id → 'origam-theme-brand-x-light'`,
            lang: 'typescript',
        },
    ],
    related: ['apply-themes'],
}
