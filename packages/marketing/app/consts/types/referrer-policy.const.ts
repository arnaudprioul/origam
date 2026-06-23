import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const REFERRER_POLICY_TYPE_DOC: ITypeDoc = {
    slug: 'referrer-policy',
    name: 'TReferrerPolicy',
    kind: 'type',
    category: 'Data Display',
    descriptionKey: 'types.catalog.referrer_policy.description',
    descriptionFallback: 'Enum-derived union of all standard Referrer-Policy header values accepted by the referrerpolicy prop on OrigamImg — controls what information is sent in the Referer header when the browser fetches the image.',
    definition: `export type TReferrerPolicy = \`\${REFERRER_POLICY}\`

// Where REFERRER_POLICY is:
export enum REFERRER_POLICY {
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
        { value: 'no-referrer', descriptionKey: 'types.detail.referrer_policy.no_referrer', descriptionFallback: 'No Referer header is sent with any request — maximum privacy.' },
        { value: 'no-referrer-when-downgrade', descriptionKey: 'types.detail.referrer_policy.no_referrer_when_downgrade', descriptionFallback: 'Full URL sent on same-protocol requests; no header on HTTPS→HTTP downgrades (browser default).' },
        { value: 'origin', descriptionKey: 'types.detail.referrer_policy.origin', descriptionFallback: 'Sends only the origin (scheme + host + port) without the path.' },
        { value: 'origin-when-cross-origin', descriptionKey: 'types.detail.referrer_policy.origin_when_cross_origin', descriptionFallback: 'Full URL for same-origin requests; origin only for cross-origin.' },
        { value: 'same-origin', descriptionKey: 'types.detail.referrer_policy.same_origin', descriptionFallback: 'Full URL for same-origin requests; no header for cross-origin.' },
        { value: 'strict-origin', descriptionKey: 'types.detail.referrer_policy.strict_origin', descriptionFallback: 'Origin only on same-protocol requests; no header on HTTPS→HTTP downgrades.' },
        { value: 'strict-origin-when-cross-origin', descriptionKey: 'types.detail.referrer_policy.strict_origin_when_cross_origin', descriptionFallback: 'Full URL for same-origin; origin only for cross-origin same-protocol; nothing on downgrade. Recommended default.' },
        { value: 'unsafe-url', descriptionKey: 'types.detail.referrer_policy.unsafe_url', descriptionFallback: 'Full URL always sent — exposes path and query string to third parties, even over HTTP.' },
    ],
    usedBy: [
        { slug: 'img', name: 'Img', propName: 'referrerpolicy' },
    ],
    sourceFile: 'packages/ds/src/types/Img/img.type.ts',
    examples: [
        {
            titleKey: 'types.detail.referrer_policy.example',
            titleFallback: 'Strict referrer policy on a cross-origin image',
            code: `<origam-img
  src="https://cdn.example.com/photo.jpg"
  referrerpolicy="strict-origin-when-cross-origin"
  alt="Photo"
/>`,
            lang: 'html',
        },
    ],
}
