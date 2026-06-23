import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const NORMALIZE_UTIL_DOC: IUtilDoc = {
    slug: 'normalize',
    name: 'normalize',
    category: 'Commons',
    icon: 'mdi-equalizer-outline',
    descriptionKey: 'utils.catalog.normalize.description',
    descriptionFallback: 'Re-maps a number from one numeric range to another. First normalises to [0, 1] relative to the current scale, then projects onto the new scale.',
    signature: `function normalize(
  number: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin?: number,
  newScaleMax?: number
): number`,
    params: [
        {
            name: 'number',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.normalize.param_number',
            descriptionFallback: 'The value to re-map.',
        },
        {
            name: 'currentScaleMin',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.normalize.param_current_scale_min',
            descriptionFallback: 'The lower bound of the input range.',
        },
        {
            name: 'currentScaleMax',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.normalize.param_current_scale_max',
            descriptionFallback: 'The upper bound of the input range.',
        },
        {
            name: 'newScaleMin',
            type: 'number',
            required: false,
            defaultValue: '0',
            descriptionKey: 'utils.detail.normalize.param_new_scale_min',
            descriptionFallback: 'The lower bound of the output range. Defaults to 0.',
        },
        {
            name: 'newScaleMax',
            type: 'number',
            required: false,
            defaultValue: '1',
            descriptionKey: 'utils.detail.normalize.param_new_scale_max',
            descriptionFallback: 'The upper bound of the output range. Defaults to 1.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.normalize.returns',
        descriptionFallback: 'The re-mapped value in [newScaleMin, newScaleMax].',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.normalize.example_basic',
            titleFallback: 'Map a slider value to an opacity',
            code: `import { normalize } from 'origam'

// Slider 0–100 → opacity 0–1
normalize(75, 0, 100)         // → 0.75

// Slider 0–100 → degrees 0–360
normalize(50, 0, 100, 0, 360) // → 180`,
            lang: 'typescript',
        },
    ],
    related: ['clamp', 'get-decimals'],
}
