import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const LIGHTEN_UTIL_DOC: IUtilDoc = {
    slug: 'lighten',
    name: 'lighten',
    category: 'Commons',
    icon: 'mdi-brightness-6',
    descriptionKey: 'utils.catalog.lighten.description',
    descriptionFallback: 'Lightens an RGBA color by the given amount using CIE-Lab L* adjustment (via XYZ intermediate). Each unit of amount raises L* by 10.',
    signature: `function lighten(value: TRGBA, amount: number): TRGBA`,
    params: [
        {
            name: 'value',
            type: 'TRGBA',
            required: true,
            descriptionKey: 'utils.detail.lighten.param_value',
            descriptionFallback: 'The base color as an RGBA object { r, g, b, a? } (channel values 0–255).',
        },
        {
            name: 'amount',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.lighten.param_amount',
            descriptionFallback: 'Lightness step. Each unit raises the CIE-Lab L* channel by 10. Negative values darken the color.',
        },
    ],
    returns: {
        type: 'TRGBA',
        descriptionKey: 'utils.detail.lighten.returns',
        descriptionFallback: 'A new TRGBA object with the adjusted lightness. The original object is not mutated.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.lighten.example_basic',
            titleFallback: 'Lighten a color by 2 steps',
            code: `import { lighten } from 'origam'

const base = { r: 100, g: 50, b: 200 }
const lighter = lighten(base, 2)
// lighter has higher L* than base`,
            lang: 'typescript',
        },
    ],
    related: ['darken', 'get-contrast', 'get-luma'],
}
