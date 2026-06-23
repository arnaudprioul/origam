import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const REFERRER_POLICY_ENUM_DOC: IEnumDoc = {
    slug: 'referrer-policy',
    name: 'REFERRER_POLICY',
    category: 'Data Display',
    descriptionKey: 'enums.catalog.referrer_policy.description',
    descriptionFallback: 'TypeScript enum for the HTML referrerpolicy attribute — controls how much referrer information is sent with image requests.',
    definition: `export enum REFERRER_POLICY {
    NO_REFERRER                     = 'no-referrer',
    NO_REFERRER_WHEN_DOWNGRADE      = 'no-referrer-when-downgrade',
    ORIGIN                          = 'origin',
    ORIGIN_WHEN_CROSS_ORIGIN        = 'origin-when-cross-origin',
    SAME_ORIGIN                     = 'same-origin',
    STRICT_ORIGIN                   = 'strict-origin',
    STRICT_ORIGIN_WHEN_CROSS_ORIGIN = 'strict-origin-when-cross-origin',
    UNSAFE_URL                      = 'unsafe-url'
}`,
    values: [
        { value: 'REFERRER_POLICY.NO_REFERRER', descriptionKey: 'enums.detail.referrer_policy.no_referrer', descriptionFallback: 'No Referer header is sent with requests.' },
        { value: 'REFERRER_POLICY.NO_REFERRER_WHEN_DOWNGRADE', descriptionKey: 'enums.detail.referrer_policy.no_referrer_when_downgrade', descriptionFallback: 'Full URL sent to same-security-level origins; no Referer on downgrade (HTTPS → HTTP).' },
        { value: 'REFERRER_POLICY.ORIGIN', descriptionKey: 'enums.detail.referrer_policy.origin', descriptionFallback: 'Only the origin (scheme + host + port) is sent, never the path or query string.' },
        { value: 'REFERRER_POLICY.ORIGIN_WHEN_CROSS_ORIGIN', descriptionKey: 'enums.detail.referrer_policy.origin_when_cross_origin', descriptionFallback: 'Full URL for same-origin requests; only the origin for cross-origin requests.' },
        { value: 'REFERRER_POLICY.SAME_ORIGIN', descriptionKey: 'enums.detail.referrer_policy.same_origin', descriptionFallback: 'Full URL sent only to same-origin destinations; no Referer header cross-origin.' },
        { value: 'REFERRER_POLICY.STRICT_ORIGIN', descriptionKey: 'enums.detail.referrer_policy.strict_origin', descriptionFallback: 'Origin sent when same security level; no Referer on downgrade.' },
        { value: 'REFERRER_POLICY.STRICT_ORIGIN_WHEN_CROSS_ORIGIN', descriptionKey: 'enums.detail.referrer_policy.strict_origin_when_cross_origin', descriptionFallback: 'Full URL for same-origin; origin only cross-origin; nothing on downgrade. Browser default.' },
        { value: 'REFERRER_POLICY.UNSAFE_URL', descriptionKey: 'enums.detail.referrer_policy.unsafe_url', descriptionFallback: 'Full URL always sent — leaks path and query string even cross-origin. Use with care.' },
    ],
    usedBy: [
        { slug: 'img', name: 'Img', propName: 'referrerpolicy' },
    ],
    sourceFile: 'packages/ds/src/enums/Img/img.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.referrer_policy.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { REFERRER_POLICY } from 'origam'

const policy: REFERRER_POLICY = REFERRER_POLICY.STRICT_ORIGIN_WHEN_CROSS_ORIGIN`,
            lang: 'typescript',
        },
    ],
}
