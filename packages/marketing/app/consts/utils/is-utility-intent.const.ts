import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_UTILITY_INTENT_UTIL_DOC: IUtilDoc = {
    slug: 'is-utility-intent',
    name: 'isUtilityIntent',
    category: 'Commons',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.is_utility_intent.description',
    descriptionFallback: 'Type guard that narrows to the subset of TIntent values for which the design system ships a global utility class (.origam--bg-<intent> / .origam--color-<intent>). The "ghost" intent is intentionally excluded.',
    signature: `function isUtilityIntent(v: TColor | TIntent | null | undefined): v is TIntent`,
    params: [
        {
            name: 'v',
            type: 'TColor | TIntent | null | undefined',
            required: true,
            descriptionKey: 'utils.detail.is_utility_intent.param_v',
            descriptionFallback: 'The value to test. Checked against the internal COLOR_UTILITY_INTENTS Set, which excludes "ghost" and any intent without a matching utility class.',
        },
    ],
    returns: {
        type: 'v is TIntent',
        descriptionKey: 'utils.detail.is_utility_intent.returns',
        descriptionFallback: 'true and narrows the type to TIntent when v is an intent that has a corresponding utility CSS class; false for raw colors, ghost, and nullish values.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_utility_intent.example_basic',
            titleFallback: 'Checking whether an intent has a utility class',
            code: `import { isUtilityIntent } from 'origam'

isUtilityIntent('primary') // → true  (.origam--bg-primary exists)
isUtilityIntent('success') // → true
isUtilityIntent('ghost')   // → false (.origam--bg-ghost does NOT exist)
isUtilityIntent('#ff0000') // → false (raw color)
isUtilityIntent(null)      // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-intent'],
    noteKey: 'utils.detail.is_utility_intent.note',
    noteFallback: 'The distinction between isIntent and isUtilityIntent exists because "ghost" is a valid semantic intent but does not ship a utility class in the current token set. Use isUtilityIntent when deciding whether to emit a class vs an inline style.',
}
