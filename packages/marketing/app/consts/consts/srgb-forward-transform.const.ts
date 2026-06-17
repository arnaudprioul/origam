import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SRGB_FORWARD_TRANSFORM_CONST_DOC: IConstDoc = {
    slug: 'srgb-forward-transform',
    name: 'SRGB_FORWARD_TRANSFORM',
    category: 'Color & Theming',
    descriptionKey: 'consts.catalog.srgb_forward_transform.description',
    descriptionFallback: 'sRGB gamma-expansion function (linear → sRGB encoded). Applies the IEC 61966-2-1 piecewise formula: values ≤ 0.0031308 are linearised as C × 12.92; values above use the power-curve branch 1.055 × C^(1/2.4) − 0.055.',
    definition: `export const SRGB_FORWARD_TRANSFORM = (C: number): number => (
    C <= 0.0031308
        ? C * 12.92
        : 1.055 * C ** (1 / 2.4) - 0.055
)`,
    value: '(C: number): number => …',
    usedBy: [
        { name: 'color.util.ts' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.srgb_forward_transform.example',
            titleFallback: 'Converting a linear channel value to sRGB',
            code: `import { SRGB_FORWARD_TRANSFORM } from 'origam'

// Linearised red channel → sRGB encoded
const linearR = 0.5
const encodedR = SRGB_FORWARD_TRANSFORM(linearR) // ~0.7354`,
            lang: 'typescript',
        },
    ],
}
