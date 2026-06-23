import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_RIPPLE_ENABLED_UTIL_DOC: IUtilDoc = {
    slug: 'is-ripple-enabled',
    name: 'isRippleEnabled',
    category: 'Commons',
    icon: 'mdi-gesture-tap',
    descriptionKey: 'utils.catalog.is_ripple_enabled.description',
    descriptionFallback: 'Type guard that returns true when the ripple effect should be active: when the value is undefined (default-on) or any truthy value. Mirrors isHoverEnabled for the ripple directive.',
    signature: `function isRippleEnabled(value: any): value is true`,
    params: [
        {
            name: 'value',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.is_ripple_enabled.param_value',
            descriptionFallback: 'The raw directive binding value. undefined means the directive was applied without a value and ripple is enabled by default; any falsy non-undefined value disables the ripple.',
        },
    ],
    returns: {
        type: 'value is true',
        descriptionKey: 'utils.detail.is_ripple_enabled.returns',
        descriptionFallback: 'true when ripple is enabled (value is undefined or truthy), narrowing the type to true. false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/ripple.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_ripple_enabled.example_basic',
            titleFallback: 'Checking ripple state from a directive binding',
            code: `import { isRippleEnabled } from 'origam'

isRippleEnabled(undefined) // → true  (default enabled)
isRippleEnabled(true)      // → true
isRippleEnabled({ center: true }) // → true (truthy object)
isRippleEnabled(false)     // → false
isRippleEnabled(null)      // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-hover-enabled', 'is-touch-event', 'is-keyboard-event'],
}
