import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_NUXT_DEFAULT_THEME_CONST_DOC: IConstDoc = {
    slug: 'origam-nuxt-default-theme',
    name: 'ORIGAM_NUXT_DEFAULT_THEME',
    category: 'Nuxt / SSR',
    descriptionKey: 'consts.catalog.origam_nuxt_default_theme.description',
    descriptionFallback: 'Default brand-theme name applied by the Nuxt module when no theme cookie is present. Defaults to "auto", which lets the module resolve the appropriate built-in theme from the active color mode.',
    definition: `export const ORIGAM_NUXT_DEFAULT_THEME = 'auto'`,
    value: `'auto'`,
    usedBy: [
        { name: 'plugin.server (Nuxt)' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_nuxt_default_theme.example',
            titleFallback: 'Falling back to the default theme',
            code: `import { ORIGAM_NUXT_DEFAULT_THEME } from 'origam'

const theme = useCookie('origam-theme').value ?? ORIGAM_NUXT_DEFAULT_THEME
// → 'auto'`,
            lang: 'typescript',
        },
    ],
}
