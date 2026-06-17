import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_NUXT_DEFAULT_COOKIE_MAX_AGE_CONST_DOC: IConstDoc = {
    slug: 'origam-nuxt-default-cookie-max-age',
    name: 'ORIGAM_NUXT_DEFAULT_COOKIE_MAX_AGE',
    category: 'Nuxt / SSR',
    descriptionKey: 'consts.catalog.origam_nuxt_default_cookie_max_age.description',
    descriptionFallback: 'Default max-age (in seconds) for the theme and mode persistence cookies set by the Origam Nuxt module — equals exactly one year (60 × 60 × 24 × 365).',
    definition: `export const ORIGAM_NUXT_DEFAULT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365`,
    value: '31536000',
    usedBy: [
        { name: 'plugin.server (Nuxt)' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_nuxt_default_cookie_max_age.example',
            titleFallback: 'Overriding the cookie max-age in createOrigam()',
            code: `import { createOrigam, ORIGAM_NUXT_DEFAULT_COOKIE_MAX_AGE } from 'origam'

// Default: one year
console.log(ORIGAM_NUXT_DEFAULT_COOKIE_MAX_AGE) // 31536000

// Pass a custom value when installing the Nuxt module
// origam: { cookieMaxAge: 60 * 60 * 24 * 7 } // one week`,
            lang: 'typescript',
        },
    ],
}
