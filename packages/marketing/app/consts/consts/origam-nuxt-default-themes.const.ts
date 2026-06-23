import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_NUXT_DEFAULT_THEMES_CONST_DOC: IConstDoc = {
    slug: 'origam-nuxt-default-themes',
    name: 'ORIGAM_NUXT_DEFAULT_THEMES',
    category: 'Nuxt / SSR',
    descriptionKey: 'consts.catalog.origam_nuxt_default_themes.description',
    descriptionFallback: 'Readonly tuple of built-in brand-theme names shipped by the Nuxt module. Contains "light" and "dark"; custom brand themes are registered via the themes option in nuxt.config.',
    definition: `export const ORIGAM_NUXT_DEFAULT_THEMES = ['light', 'dark'] as const`,
    values: [
        { value: `'light'`, descriptionKey: 'consts.detail.origam_nuxt_default_themes.light', descriptionFallback: 'Built-in light brand theme.' },
        { value: `'dark'`, descriptionKey: 'consts.detail.origam_nuxt_default_themes.dark', descriptionFallback: 'Built-in dark brand theme.' },
    ],
    usedBy: [
        { name: 'plugin.server (Nuxt)' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_nuxt_default_themes.example',
            titleFallback: 'Checking whether a theme name is built-in',
            code: `import { ORIGAM_NUXT_DEFAULT_THEMES } from 'origam'

const isBuiltIn = (t: string) =>
  (ORIGAM_NUXT_DEFAULT_THEMES as readonly string[]).includes(t)`,
            lang: 'typescript',
        },
    ],
}
