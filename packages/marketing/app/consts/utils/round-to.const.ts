import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ROUND_TO_UTIL_DOC: IUtilDoc = {
    slug: 'round-to',
    name: 'roundTo',
    category: 'Commons',
    icon: 'mdi-decimal',
    descriptionKey: 'utils.catalog.round_to.description',
    descriptionFallback: 'Round a number to a given number of decimal places using the standard half-up rule.',
    signature: `function roundTo(value: number, places?: number): number`,
    params: [
        {
            name: 'value',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.round_to.param_value',
            descriptionFallback: 'The number to round.',
        },
        {
            name: 'places',
            type: 'number',
            required: false,
            defaultValue: '0',
            descriptionKey: 'utils.detail.round_to.param_places',
            descriptionFallback: 'The number of decimal places to keep. Defaults to 0 (integer rounding).',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.round_to.returns',
        descriptionFallback: 'The rounded number.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.round_to.example_basic',
            titleFallback: 'Integer and decimal rounding',
            code: `import { roundTo } from 'origam'

roundTo(3.14159)        // → 3
roundTo(3.14159, 2)     // → 3.14
roundTo(3.14159, 4)     // → 3.1416`,
            lang: 'typescript',
        },
    ],
    related: ['convert-to-unit'],
}
