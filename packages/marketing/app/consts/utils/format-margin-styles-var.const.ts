import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FORMAT_MARGIN_STYLES_VAR_UTIL_DOC: IUtilDoc = {
    slug: 'format-margin-styles-var',
    name: 'formatMarginStylesVar',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.format_margin_styles_var.description',
    descriptionFallback: 'Build an array of CSS margin declarations from a 1- or 4-value shorthand array, using logical block/inline properties (margin-block-start, etc.).',
    signature: `function formatMarginStylesVar(values: Array<string>): Array<string>`,
    params: [
        {
            name: 'values',
            type: 'Array<string>',
            required: true,
            descriptionKey: 'utils.detail.format_margin_styles_var.param_values',
            descriptionFallback: '1 value → all sides (margin shorthand), 4 values → block-start, inline-end, block-end, inline-start (CSS logical order).',
        },
    ],
    returns: {
        type: 'Array<string>',
        descriptionKey: 'utils.detail.format_margin_styles_var.returns',
        descriptionFallback: 'Array of CSS declaration strings ready to be injected as inline style entries.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/margin.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.format_margin_styles_var.example_basic',
            titleFallback: 'Generate margin declarations',
            code: `import { formatMarginStylesVar } from 'origam'

formatMarginStylesVar(['8px'])
// → ['margin: 8px']

formatMarginStylesVar(['4px', '8px', '4px', '8px'])
// → ['margin-block-start: 4px', 'margin-block-end: 4px',
//    'margin-inline-start: 8px', 'margin-inline-end: 8px']`,
            lang: 'typescript',
        },
    ],
    related: ['format-padding-styles-var', 'format-border-styles-var', 'format-rounded-styles-var'],
}
