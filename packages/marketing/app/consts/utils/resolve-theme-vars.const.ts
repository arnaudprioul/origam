import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RESOLVE_THEME_VARS_UTIL_DOC: IUtilDoc = {
    slug: 'resolve-theme-vars',
    name: 'resolveThemeVars',
    category: 'Theme',
    icon: 'mdi-palette',
    descriptionKey: 'utils.catalog.resolve_theme_vars.description',
    descriptionFallback: 'Flatten an IOrigamTheme object into a flat TThemeVars map of --origam-* CSS custom properties. The cssVars escape hatch always wins over vars on key collision.',
    signature: `function resolveThemeVars(theme: IOrigamTheme): TThemeVars`,
    params: [
        {
            name: 'theme',
            type: 'IOrigamTheme',
            required: true,
            descriptionKey: 'utils.detail.resolve_theme_vars.param_theme',
            descriptionFallback: 'The theme object to resolve. Its vars property is converted via the token authoring path; its cssVars property provides a raw --origam-* escape hatch that overrides vars on collision.',
        },
    ],
    returns: {
        type: 'TThemeVars',
        descriptionKey: 'utils.detail.resolve_theme_vars.returns',
        descriptionFallback: 'A flat TThemeVars record mapping --origam-* property names to their CSS values, ready to be applied as inline styles on the theme root element.',
    },
    sourceFile: 'packages/ds/src/utils/Theme/apply-theme.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.resolve_theme_vars.example_basic',
            titleFallback: 'Flatten a theme object to CSS vars',
            code: `import { resolveThemeVars } from 'origam'

const vars = resolveThemeVars({
  name: 'brand-x',
  vars: {
    color: { primary: { bg: '#6366f1' } }
  },
  cssVars: {
    '--origam-color-primary-fg': '#fff'
  }
})
// → {
//   '--origam-color-primary-bg': '#6366f1',
//   '--origam-color-primary-fg': '#fff'
// }`,
            lang: 'typescript',
        },
    ],
    related: ['apply-theme', 'apply-themes', 'resolve-theme-vars'],
}
