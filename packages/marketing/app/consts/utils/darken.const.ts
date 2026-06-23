import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const DARKEN_UTIL_DOC: IUtilDoc = {
    slug: 'darken',
    name: 'darken',
    category: 'Commons',
    icon: 'mdi-brightness-4',
    descriptionKey: 'utils.catalog.darken.description',
    descriptionFallback: 'Darkens an RGBA colour by reducing its CIE L* lightness in CIELAB space by amount × 10. Returns the modified RGBA without mutating the input.',
    signature: `function darken(value: TRGBA, amount: number): TRGBA`,
    params: [
        {
            name: 'value',
            type: 'TRGBA',
            required: true,
            descriptionKey: 'utils.detail.darken.param_value',
            descriptionFallback: 'The source colour as an RGBA tuple [r, g, b, a] with channels in [0, 255] except alpha in [0, 1].',
        },
        {
            name: 'amount',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.darken.param_amount',
            descriptionFallback: 'The darkening step. Each unit reduces L* by 10. Use values between 0.5 and 3 for typical tonal shifts.',
        },
    ],
    returns: {
        type: 'TRGBA',
        descriptionKey: 'utils.detail.darken.returns',
        descriptionFallback: 'A new RGBA tuple with the reduced lightness. The original is not mutated.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.darken.example_basic',
            titleFallback: 'Darken a primary colour',
            code: `import { darken } from 'origam'

const base: TRGBA = [33, 150, 243, 1]   // blue-500
const darker = darken(base, 1)
// → approximately [14, 107, 186, 1]`,
            lang: 'typescript',
        },
    ],
    related: ['class-to-hex'],
}
