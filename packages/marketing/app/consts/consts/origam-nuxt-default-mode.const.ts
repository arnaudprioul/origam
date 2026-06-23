import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_NUXT_DEFAULT_MODE_CONST_DOC: IConstDoc = {
    slug: 'origam-nuxt-default-mode',
    name: 'ORIGAM_NUXT_DEFAULT_MODE',
    category: 'Nuxt / SSR',
    descriptionKey: 'consts.catalog.origam_nuxt_default_mode.description',
    descriptionFallback: 'Default color mode applied by the Nuxt module when no mode cookie is present. Defaults to "auto" so the OS preference is respected on first visit.',
    definition: `export const ORIGAM_NUXT_DEFAULT_MODE = 'auto'`,
    value: `'auto'`,
    usedBy: [
        { name: 'plugin.server (Nuxt)' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_nuxt_default_mode.example',
            titleFallback: 'Using the default mode in a custom Nuxt plugin',
            code: `import { ORIGAM_NUXT_DEFAULT_MODE } from 'origam'

export default defineNuxtPlugin(() => {
  // falls back to 'auto' if no cookie is found
  const mode = useCookie('origam-mode').value ?? ORIGAM_NUXT_DEFAULT_MODE
})`,
            lang: 'typescript',
        },
    ],
}
