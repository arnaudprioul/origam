import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_CSS_COLOR_UTIL_DOC: IUtilDoc = {
    slug: 'is-css-color',
    name: 'isCssColor',
    category: 'Commons',
    icon: 'mdi-eyedropper-variant',
    descriptionKey: 'utils.catalog.is_css_color.description',
    descriptionFallback: 'Type guard that returns true when the input string is a valid CSS color value: a hex code, a functional notation (rgb, hsl, hwb, lab, lch, oklab, oklch, color), a CSS variable (var(--…)), or one of the 148 named CSS colors.',
    signature: 'function isCssColor(color?: string | null | false): boolean',
    params: [
        {
            name: 'color',
            type: 'string | null | false | undefined',
            required: false,
            descriptionKey: 'utils.detail.is_css_color.param_color',
            descriptionFallback: 'The value to test. Falsy values (null, undefined, false, empty string) return false.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_css_color.returns',
        descriptionFallback: 'true when the string matches a recognised CSS color format; false for intent strings like "primary" or non-color values.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_css_color.example_basic',
            titleFallback: 'Distinguish raw CSS colors from intent tokens',
            code: `import { isCssColor } from 'origam'

isCssColor('#ff0000')       // → true
isCssColor('rgba(0,0,0,1)') // → true
isCssColor('red')           // → true (named color)
isCssColor('primary')       // → false (intent token)
isCssColor(null)            // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-parsable-color', 'extract-color'],
}
