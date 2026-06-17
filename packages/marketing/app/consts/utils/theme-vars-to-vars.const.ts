import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const THEME_VARS_TO_VARS_UTIL_DOC: IUtilDoc = {
    slug: 'theme-vars-to-vars',
    name: 'themeVarsToVars',
    category: 'Theme',
    icon: 'mdi-palette-swatch-outline',
    descriptionKey: 'utils.catalog.theme_vars_to_vars.description',
    descriptionFallback: 'Flatten the structured IThemeVars token bucket (color / rounded / border / typo / shadow / spacing / motion groups) into a flat record of `--origam-*` CSS variable names to values.',
    signature: `function themeVarsToVars(vars: IThemeVars): TThemeVars`,
    params: [
        {
            name: 'vars',
            type: 'IThemeVars',
            required: true,
            descriptionKey: 'utils.detail.theme_vars_to_vars.param_vars',
            descriptionFallback: 'The structured token bucket. Each top-level key (`color`, `rounded`, `border`, `typo`, `shadow`, `spacing`, `motion`) is walked recursively and its leaves are emitted as `--origam-{group}-{path}: value` pairs.',
        },
    ],
    returns: {
        type: 'TThemeVars',
        descriptionKey: 'utils.detail.theme_vars_to_vars.returns',
        descriptionFallback: 'A flat `Record<string, string>` keyed by full CSS variable names. Groups not present in the input are silently skipped.',
    },
    sourceFile: 'packages/ds/src/utils/Theme/apply-theme.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.theme_vars_to_vars.example_basic',
            titleFallback: 'Flatten a partial token bucket',
            code: `import { themeVarsToVars } from 'origam'

const flat = themeVarsToVars({
  color: {
    'action-primary-bg': '#0057ff',
    'action-primary-fg': '#ffffff',
  },
})
// → {
//   '--origam-color---action-primary-bg': '#0057ff',
//   '--origam-color---action-primary-fg': '#ffffff',
// }`,
            lang: 'typescript',
        },
    ],
    related: ['theme-to-css', 'theme-selector', 'apply-theme'],
}
