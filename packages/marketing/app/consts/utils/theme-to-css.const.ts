import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const THEME_TO_CSS_UTIL_DOC: IUtilDoc = {
    slug: 'theme-to-css',
    name: 'themeToCss',
    category: 'Theme',
    icon: 'mdi-palette-swatch-outline',
    descriptionKey: 'utils.catalog.theme_to_css.description',
    descriptionFallback: 'Serialise an IOrigamTheme object to a complete CSS rule string (selector + declarations). Pure function with no DOM access — usable both at runtime and in the Theme Builder CSS export.',
    signature: `function themeToCss(theme: IOrigamTheme): string`,
    params: [
        {
            name: 'theme',
            type: 'IOrigamTheme',
            required: true,
            descriptionKey: 'utils.detail.theme_to_css.param_theme',
            descriptionFallback: 'The theme descriptor including `vars` (structured token bucket), `cssVars` (raw escape hatch), `name`, and `mode`.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.theme_to_css.returns',
        descriptionFallback: 'A CSS rule string of the form `<selector> {\\n  --origam-…: value;\\n  …\\n}\\n`. Empty when the resolved token map is empty.',
    },
    sourceFile: 'packages/ds/src/utils/Theme/apply-theme.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.theme_to_css.example_basic',
            titleFallback: 'Produce a CSS rule for a named theme',
            code: `import { themeToCss } from 'origam'

const css = themeToCss({
  name: 'brand-x',
  mode: 'auto',
  cssVars: {
    '--origam-color__action--primary---bg': '#0057ff',
    '--origam-color__action--primary---fg': '#ffffff',
  },
})
// → '[data-theme="brand-x"] {\\n  --origam-color__action--primary---bg: #0057ff;\\n  …\\n}\\n'`,
            lang: 'typescript',
        },
    ],
    related: ['theme-selector', 'theme-vars-to-vars', 'apply-theme'],
}
