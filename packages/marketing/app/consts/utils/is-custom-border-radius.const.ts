import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_CUSTOM_BORDER_RADIUS_UTIL_DOC: IUtilDoc = {
    slug: 'is-custom-border-radius',
    name: 'isCustomBorderRadius',
    category: 'Commons',
    icon: 'mdi-rounded-corner',
    descriptionKey: 'utils.catalog.is_custom_border_radius.description',
    descriptionFallback: 'Returns true when a border-radius value is a custom CSS length (px, %, rem, em, vh, etc.) rather than a semantic Origam token name (sm, md, lg, …). Used by useRounded to decide whether to emit a utility class or an inline style.',
    signature: 'function isCustomBorderRadius(value: string): boolean',
    params: [
        {
            name: 'value',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.is_custom_border_radius.param_value',
            descriptionFallback: 'The border-radius candidate string. Matched against CUSTOM_BORDER_RADIUS_REGEX after trimming.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_custom_border_radius.returns',
        descriptionFallback: 'true for raw CSS lengths; false for token aliases that map to utility classes.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/rounded.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_custom_border_radius.example_basic',
            titleFallback: 'Token alias vs raw length',
            code: `import { isCustomBorderRadius } from 'origam'

isCustomBorderRadius('12px')   // → true  (raw length → inline style)
isCustomBorderRadius('50%')    // → true
isCustomBorderRadius('lg')     // → false (token alias → utility class)`,
            lang: 'typescript',
        },
    ],
    related: ['format-rounded-styles-var'],
}
