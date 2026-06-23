import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_PARSABLE_COLOR_UTIL_DOC: IUtilDoc = {
    slug: 'is-parsable-color',
    name: 'isParsableColor',
    category: 'Commons',
    icon: 'mdi-palette-swatch-outline',
    descriptionKey: 'utils.catalog.is_parsable_color.description',
    descriptionFallback: 'Returns true when a string is a parsable CSS color value (hex, rgb, hsl, named…) but is NOT a CSS custom property reference (var(--…)). Combines the CSS color check with a var() exclusion.',
    signature: `function isParsableColor(color: string): boolean`,
    params: [
        {
            name: 'color',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.is_parsable_color.param_color',
            descriptionFallback: 'The color string to test. CSS variables (var(--…)) are excluded even though they are syntactically valid CSS, because they cannot be parsed at runtime without resolving against the DOM.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_parsable_color.returns',
        descriptionFallback: 'true when the string is a parsable CSS color that can be processed immediately (no var() reference); false for intents, CSS variables, or non-color strings.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_parsable_color.example_basic',
            titleFallback: 'Parsable vs non-parsable color strings',
            code: `import { isParsableColor } from 'origam'

isParsableColor('#ff0000')               // → true
isParsableColor('rgb(255, 0, 0)')        // → true
isParsableColor('hsl(0, 100%, 50%)')     // → true
isParsableColor('var(--origam-color-x)') // → false (CSS variable)
isParsableColor('primary')               // → false (intent)`,
            lang: 'typescript',
        },
    ],
    related: ['is-intent', 'is-gradient'],
}
