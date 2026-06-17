import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_INTENT_UTIL_DOC: IUtilDoc = {
    slug: 'is-intent',
    name: 'isIntent',
    category: 'Commons',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.is_intent.description',
    descriptionFallback: 'Type guard that narrows a TColor | TIntent value to TIntent. Returns true when the value is a known semantic intent token (primary, success, danger, …), false for raw CSS colors or null/undefined.',
    signature: `function isIntent(v: TColor | TIntent | null | undefined): v is TIntent`,
    params: [
        {
            name: 'v',
            type: 'TColor | TIntent | null | undefined',
            required: true,
            descriptionKey: 'utils.detail.is_intent.param_v',
            descriptionFallback: 'The color-or-intent value to test. Checked against the internal COLOR_INTENTS Set which contains all semantic intent tokens defined in the design system.',
        },
    ],
    returns: {
        type: 'v is TIntent',
        descriptionKey: 'utils.detail.is_intent.returns',
        descriptionFallback: 'true and narrows the type to TIntent when v is a recognised semantic intent; false for hex colors, CSS values, gradient strings, or nullish values.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_intent.example_basic',
            titleFallback: 'Distinguishing intents from raw colors',
            code: `import { isIntent } from 'origam'

isIntent('primary')   // → true
isIntent('success')   // → true
isIntent('#ff0000')   // → false (raw hex)
isIntent('ghost')     // → true
isIntent(null)        // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-utility-intent', 'is-parsable-color'],
}
