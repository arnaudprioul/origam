import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_GRADIENT_UTIL_DOC: IUtilDoc = {
    slug: 'is-gradient',
    name: 'isGradient',
    category: 'Commons',
    icon: 'mdi-gradient-vertical',
    descriptionKey: 'utils.catalog.is_gradient.description',
    descriptionFallback: 'Returns true when the value is a CSS gradient string (linear-gradient, radial-gradient, …), a preset gradient name, or a gradient object descriptor. Excludes intents, hex colors, and transparent.',
    signature: `function isGradient(value: unknown): boolean`,
    params: [
        {
            name: 'value',
            type: 'unknown',
            required: true,
            descriptionKey: 'utils.detail.is_gradient.param_value',
            descriptionFallback: 'The raw value to test. Can be a string, object, or any other type. Strings are checked against CSS gradient syntax and preset names; objects are checked for a gradient descriptor shape.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_gradient.returns',
        descriptionFallback: 'true when the value is recognised as a gradient (string or object form); false for intents, plain hex colors, transparent, null, or undefined.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/gradient.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_gradient.example_basic',
            titleFallback: 'CSS gradient strings and non-gradient values',
            code: `import { isGradient } from 'origam'

isGradient('linear-gradient(to right, #000, #fff)') // → true
isGradient('radial-gradient(circle, red, blue)')    // → true
isGradient('primary')                               // → false (intent)
isGradient('#ff0000')                               // → false (hex color)
isGradient(null)                                    // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-intent', 'is-parsable-color'],
}
