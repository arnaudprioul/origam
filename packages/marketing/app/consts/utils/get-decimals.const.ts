import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_DECIMALS_UTIL_DOC: IUtilDoc = {
    slug: 'get-decimals',
    name: 'getDecimals',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_decimals.description',
    descriptionFallback: 'Returns the number of decimal digits in a numeric value by inspecting its string representation. Used by Slider to infer step precision.',
    signature: `function getDecimals(value: number): number`,
    params: [
        {
            name: 'value',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.get_decimals.param_value',
            descriptionFallback: 'The number to inspect. Its string form is trimmed before counting digits after the decimal point.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_decimals.returns',
        descriptionFallback: 'The count of digits after the decimal separator (0 for integers).',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_decimals.example_basic',
            titleFallback: 'Count decimal places',
            code: `import { getDecimals } from 'origam'

getDecimals(3.14)   // → 2
getDecimals(0.001)  // → 3
getDecimals(42)     // → 0`,
            lang: 'typescript',
        },
    ],
    related: ['convert-to-unit'],
}
