import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FORMAT_ROUNDED_STYLES_VAR_UTIL_DOC: IUtilDoc = {
    slug: 'format-rounded-styles-var',
    name: 'formatRoundedStylesVar',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.format_rounded_styles_var.description',
    descriptionFallback: 'Build an array of CSS border-radius declarations from a 1- or 4-value shorthand array, using logical corner properties (border-start-start-radius, etc.).',
    signature: `function formatRoundedStylesVar(values: Array<string>): Array<string>`,
    params: [
        {
            name: 'values',
            type: 'Array<string>',
            required: true,
            descriptionKey: 'utils.detail.format_rounded_styles_var.param_values',
            descriptionFallback: '1 value → all corners (border-radius shorthand), 4 values → start-start, start-end, end-start, end-end (CSS logical corners).',
        },
    ],
    returns: {
        type: 'Array<string>',
        descriptionKey: 'utils.detail.format_rounded_styles_var.returns',
        descriptionFallback: 'Array of CSS declaration strings ready to be injected as inline style entries.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/rounded.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.format_rounded_styles_var.example_basic',
            titleFallback: 'Generate border-radius declarations',
            code: `import { formatRoundedStylesVar } from 'origam'

formatRoundedStylesVar(['8px'])
// → ['border-radius: 8px']

formatRoundedStylesVar(['8px', '0', '8px', '0'])
// → ['border-start-start-radius: 8px', 'border-start-end-radius: 0',
//    'border-end-start-radius: 8px', 'border-end-end-radius: 0']`,
            lang: 'typescript',
        },
    ],
    related: ['format-border-styles-var', 'format-padding-styles-var', 'format-margin-styles-var'],
}
