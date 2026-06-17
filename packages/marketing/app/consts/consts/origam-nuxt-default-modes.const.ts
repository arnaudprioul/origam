import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_NUXT_DEFAULT_MODES_CONST_DOC: IConstDoc = {
    slug: 'origam-nuxt-default-modes',
    name: 'ORIGAM_NUXT_DEFAULT_MODES',
    category: 'Nuxt / SSR',
    descriptionKey: 'consts.catalog.origam_nuxt_default_modes.description',
    descriptionFallback: 'Readonly tuple of supported color modes shipped by the Nuxt module by default. Contains "light" and "dark"; additional modes require explicit configuration.',
    definition: `export const ORIGAM_NUXT_DEFAULT_MODES = ['light', 'dark'] as const`,
    values: [
        { value: `'light'`, descriptionKey: 'consts.detail.origam_nuxt_default_modes.light', descriptionFallback: 'Light color mode.' },
        { value: `'dark'`, descriptionKey: 'consts.detail.origam_nuxt_default_modes.dark', descriptionFallback: 'Dark color mode.' },
    ],
    usedBy: [
        { name: 'plugin.server (Nuxt)' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_nuxt_default_modes.example',
            titleFallback: 'Checking whether a mode is built-in',
            code: `import { ORIGAM_NUXT_DEFAULT_MODES } from 'origam'

const isBuiltIn = (m: string) =>
  (ORIGAM_NUXT_DEFAULT_MODES as readonly string[]).includes(m)`,
            lang: 'typescript',
        },
    ],
}
