import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SRGB_REVERSE_MATRIX_CONST_DOC: IConstDoc = {
    slug: 'srgb-reverse-matrix',
    name: 'SRGB_REVERSE_MATRIX',
    category: 'Color & Theming',
    descriptionKey: 'consts.catalog.srgb_reverse_matrix.description',
    descriptionFallback: 'sRGB-to-XYZ linear transformation matrix (3×3) used in the color pipeline to convert linear sRGB channel values to CIE XYZ tristimulus values. Paired with SRGB_REVERSE_TRANSFORM for the sRGB → XYZ direction.',
    definition: `export const SRGB_REVERSE_MATRIX = [
    [0.4124, 0.3576, 0.1805],
    [0.2126, 0.7152, 0.0722],
    [0.0193, 0.1192, 0.9505]
]`,
    values: [
        { value: '[0.4124, 0.3576, 0.1805]', descriptionKey: 'consts.detail.srgb_reverse_matrix.row_0', descriptionFallback: 'X channel row of the sRGB→XYZ matrix.' },
        { value: '[0.2126, 0.7152, 0.0722]', descriptionKey: 'consts.detail.srgb_reverse_matrix.row_1', descriptionFallback: 'Y channel row (luminance) of the sRGB→XYZ matrix.' },
        { value: '[0.0193, 0.1192, 0.9505]', descriptionKey: 'consts.detail.srgb_reverse_matrix.row_2', descriptionFallback: 'Z channel row of the sRGB→XYZ matrix.' },
    ],
    usedBy: [
        { name: 'color.util.ts' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.srgb_reverse_matrix.example',
            titleFallback: 'Applying the sRGB→XYZ matrix (internal use)',
            code: `import { SRGB_REVERSE_MATRIX, SRGB_REVERSE_TRANSFORM } from 'origam'

// Decode sRGB channel value then project to XYZ
const sR = 0.8 // sRGB-encoded red channel
const linearR = SRGB_REVERSE_TRANSFORM(sR)
const X = SRGB_REVERSE_MATRIX[0][0] * linearR // partial; add G and B contributions`,
            lang: 'typescript',
        },
    ],
}
