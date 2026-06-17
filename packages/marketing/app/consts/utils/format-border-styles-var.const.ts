import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FORMAT_BORDER_STYLES_VAR_UTIL_DOC: IUtilDoc = {
    slug: 'format-border-styles-var',
    name: 'formatBorderStylesVar',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.format_border_styles_var.description',
    descriptionFallback: 'Build an array of CSS border shorthand declarations (border-width, border-color, or border-style) from a 1-, 2-, or 4-value shorthand array, using logical block/inline properties.',
    signature: `function formatBorderStylesVar(values: Array<string>, type: string): Array<string>`,
    params: [
        {
            name: 'values',
            type: 'Array<string>',
            required: true,
            descriptionKey: 'utils.detail.format_border_styles_var.param_values',
            descriptionFallback: 'Shorthand values. 1 value → all sides, 2 values → block + inline, 4 values → start/end per axis.',
        },
        {
            name: 'type',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.format_border_styles_var.param_type',
            descriptionFallback: "The border sub-property to target: 'width', 'color', or 'style'.",
        },
    ],
    returns: {
        type: 'Array<string>',
        descriptionKey: 'utils.detail.format_border_styles_var.returns',
        descriptionFallback: 'Array of CSS declaration strings ready to be injected as inline style entries.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/border.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.format_border_styles_var.example_basic',
            titleFallback: 'Generate border-width declarations',
            code: `import { formatBorderStylesVar } from 'origam'

formatBorderStylesVar(['1px'], 'width')
// → ['border-width: 1px']

formatBorderStylesVar(['1px', '2px'], 'width')
// → ['border-block-width: 1px', 'border-inline-width: 2px']

formatBorderStylesVar(['1px', '2px', '3px', '4px'], 'width')
// → ['border-block-start-width: 1px', 'border-block-end-width: 3px',
//    'border-inline-start-width: 2px', 'border-inline-end-width: 4px']`,
            lang: 'typescript',
        },
    ],
    related: ['format-margin-styles-var', 'format-padding-styles-var', 'format-rounded-styles-var'],
}
