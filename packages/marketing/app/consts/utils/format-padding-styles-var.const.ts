import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FORMAT_PADDING_STYLES_VAR_UTIL_DOC: IUtilDoc = {
    slug: 'format-padding-styles-var',
    name: 'formatPaddingStylesVar',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.format_padding_styles_var.description',
    descriptionFallback: 'Build an array of CSS padding declarations from a 1-, 2-, or 4-value shorthand array, using logical block/inline properties (padding-block, padding-inline, etc.).',
    signature: `function formatPaddingStylesVar(values: Array<string>): Array<string>`,
    params: [
        {
            name: 'values',
            type: 'Array<string>',
            required: true,
            descriptionKey: 'utils.detail.format_padding_styles_var.param_values',
            descriptionFallback: '1 value → all sides, 2 values → block + inline, 4 values → block-start, inline-end, block-end, inline-start.',
        },
    ],
    returns: {
        type: 'Array<string>',
        descriptionKey: 'utils.detail.format_padding_styles_var.returns',
        descriptionFallback: 'Array of CSS declaration strings ready to be injected as inline style entries.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/padding.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.format_padding_styles_var.example_basic',
            titleFallback: 'Generate padding declarations',
            code: `import { formatPaddingStylesVar } from 'origam'

formatPaddingStylesVar(['8px'])
// → ['padding: 8px']

formatPaddingStylesVar(['4px', '8px'])
// → ['padding-block: 4px', 'padding-inline: 8px']

formatPaddingStylesVar(['4px', '8px', '4px', '8px'])
// → ['padding-block-start: 4px', 'padding-block-end: 4px',
//    'padding-inline-start: 8px', 'padding-inline-end: 8px']`,
            lang: 'typescript',
        },
    ],
    related: ['format-margin-styles-var', 'format-border-styles-var', 'format-rounded-styles-var'],
}
