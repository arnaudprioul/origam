import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_NUXT_DEFAULT_COOKIE_NAME_CONST_DOC: IConstDoc = {
    slug: 'origam-nuxt-default-cookie-name',
    name: 'ORIGAM_NUXT_DEFAULT_COOKIE_NAME',
    category: 'Nuxt / SSR',
    descriptionKey: 'consts.catalog.origam_nuxt_default_cookie_name.description',
    descriptionFallback: 'Default cookie name used by the Origam Nuxt module to persist the active theme selection across SSR page loads.',
    definition: `export const ORIGAM_NUXT_DEFAULT_COOKIE_NAME = 'origam-theme'`,
    value: `'origam-theme'`,
    usedBy: [
        { name: 'plugin.server (Nuxt)' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_nuxt_default_cookie_name.example',
            titleFallback: 'Reading the theme cookie server-side',
            code: `import { useCookie } from '#imports'
import { ORIGAM_NUXT_DEFAULT_COOKIE_NAME } from 'origam'

const themeCookie = useCookie(ORIGAM_NUXT_DEFAULT_COOKIE_NAME)
console.log(themeCookie.value) // 'light' | 'dark' | undefined`,
            lang: 'typescript',
        },
    ],
}
