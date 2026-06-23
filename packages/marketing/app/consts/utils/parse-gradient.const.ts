import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PARSE_GRADIENT_UTIL_DOC: IUtilDoc = {
    slug: 'parse-gradient',
    name: 'parseGradient',
    category: 'Commons',
    icon: 'mdi-gradient-horizontal',
    descriptionKey: 'utils.catalog.parse_gradient.description',
    descriptionFallback: 'Resolve human-readable Vuetify/Origam color names embedded in a CSS gradient string (e.g. `"to right, primary, secondary"`) into real hex values, and expand short `rgba(#rrggbb, …)` syntax into valid CSS.',
    signature: `function parseGradient(
  gradient: string,
  colors: Record<string, Record<string, string>>
): string`,
    params: [
        {
            name: 'gradient',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.parse_gradient.param_gradient',
            descriptionFallback: 'A CSS gradient value that may contain design-system color names (e.g. `"to right, primary, success"`) and/or `rgba(#hex, alpha)` shorthand.',
        },
        {
            name: 'colors',
            type: 'Record<string, Record<string, string>>',
            required: true,
            descriptionKey: 'utils.detail.parse_gradient.param_colors',
            descriptionFallback: 'A map of color families and their shades (e.g. `{ primary: { base: "#3b82f6", "lighten-1": "#60a5fa" } }`). Typically the current theme\'s color palette.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.parse_gradient.returns',
        descriptionFallback: 'The gradient string with all recognisable color names replaced by their hex values and `rgba(#hex, …)` converted to `rgba(r, g, b, …)` form.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.parse_gradient.example_basic',
            titleFallback: 'Resolve named colors in a gradient',
            code: `import { parseGradient } from 'origam'

const palette = { primary: { base: '#3b82f6' }, success: { base: '#22c55e' } }

parseGradient('to right, primary, success', palette)
// → 'to right, #3b82f6, #22c55e'`,
            lang: 'typescript',
        },
    ],
    related: ['parse-color', 'parse-hex', 'class-to-hex'],
}
