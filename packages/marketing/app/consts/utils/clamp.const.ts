import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CLAMP_UTIL_DOC: IUtilDoc = {
    slug: 'clamp',
    name: 'clamp',
    category: 'Commons',
    icon: 'mdi-arrow-collapse-horizontal',
    descriptionKey: 'utils.catalog.clamp.description',
    descriptionFallback: 'Constrains a number to stay within [min, max]. Returns min when value is below range, max when above, otherwise the value itself.',
    signature: `function clamp(value: number, min?: number, max?: number): number`,
    params: [
        {
            name: 'value',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.clamp.param_value',
            descriptionFallback: 'The number to constrain.',
        },
        {
            name: 'min',
            type: 'number',
            required: false,
            defaultValue: '0',
            descriptionKey: 'utils.detail.clamp.param_min',
            descriptionFallback: 'Lower bound. Defaults to 0.',
        },
        {
            name: 'max',
            type: 'number',
            required: false,
            defaultValue: '1',
            descriptionKey: 'utils.detail.clamp.param_max',
            descriptionFallback: 'Upper bound. Defaults to 1.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.clamp.returns',
        descriptionFallback: 'The clamped number within [min, max].',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.clamp.example_basic',
            titleFallback: 'Clamping values',
            code: `import { clamp } from 'origam'

clamp(0.5)         // → 0.5
clamp(1.5)         // → 1
clamp(-0.1)        // → 0
clamp(150, 0, 100) // → 100`,
            lang: 'typescript',
        },
    ],
    related: ['clamp-target'],
}
