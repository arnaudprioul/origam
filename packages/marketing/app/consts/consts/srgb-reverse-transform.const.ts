import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SRGB_REVERSE_TRANSFORM_CONST_DOC: IConstDoc = {
    slug: 'srgb-reverse-transform',
    name: 'SRGB_REVERSE_TRANSFORM',
    category: 'Color & Theming',
    descriptionKey: 'consts.catalog.srgb_reverse_transform.description',
    descriptionFallback: 'sRGB gamma-compression function (sRGB encoded → linear). Applies the IEC 61966-2-1 piecewise decode: values ≤ 0.04045 are linearised as C / 12.92; values above use the power-curve branch ((C + 0.055) / 1.055)^2.4.',
    definition: `export const SRGB_REVERSE_TRANSFORM = (C: number): number => (
    C <= 0.04045
        ? C / 12.92
        : ((C + 0.055) / 1.055) ** 2.4
)`,
    value: '(C: number): number => …',
    usedBy: [
        { name: 'color.util.ts' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.srgb_reverse_transform.example',
            titleFallback: 'Decoding an sRGB channel value to linear',
            code: `import { SRGB_REVERSE_TRANSFORM } from 'origam'

// sRGB-encoded red channel → linearised value for matrix multiplication
const encodedR = 0.8
const linearR = SRGB_REVERSE_TRANSFORM(encodedR) // ~0.6038`,
            lang: 'typescript',
        },
    ],
}
