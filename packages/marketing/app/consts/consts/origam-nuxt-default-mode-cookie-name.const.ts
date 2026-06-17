import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_NUXT_DEFAULT_MODE_COOKIE_NAME_CONST_DOC: IConstDoc = {
    slug: 'origam-nuxt-default-mode-cookie-name',
    name: 'ORIGAM_NUXT_DEFAULT_MODE_COOKIE_NAME',
    category: 'Nuxt / SSR',
    descriptionKey: 'consts.catalog.origam_nuxt_default_mode_cookie_name.description',
    descriptionFallback: 'Default cookie name used by the Origam Nuxt module to persist the active color-mode selection (light/dark/auto) across SSR page loads.',
    definition: `export const ORIGAM_NUXT_DEFAULT_MODE_COOKIE_NAME = 'origam-mode'`,
    value: `'origam-mode'`,
    usedBy: [
        { name: 'plugin.server (Nuxt)' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_nuxt_default_mode_cookie_name.example',
            titleFallback: 'Reading the mode cookie server-side',
            code: `import { useCookie } from '#imports'
import { ORIGAM_NUXT_DEFAULT_MODE_COOKIE_NAME } from 'origam'

const modeCookie = useCookie(ORIGAM_NUXT_DEFAULT_MODE_COOKIE_NAME)
console.log(modeCookie.value) // 'light' | 'dark' | 'auto' | undefined`,
            lang: 'typescript',
        },
    ],
}
