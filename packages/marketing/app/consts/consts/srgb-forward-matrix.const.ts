import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SRGB_FORWARD_MATRIX_CONST_DOC: IConstDoc = {
    slug: 'srgb-forward-matrix',
    name: 'SRGB_FORWARD_MATRIX',
    category: 'Color & Theming',
    descriptionKey: 'consts.catalog.srgb_forward_matrix.description',
    descriptionFallback: 'XYZ-to-sRGB linear transformation matrix (3×3) used in the color pipeline to convert CIE XYZ tristimulus values to linear sRGB channel values before gamma expansion via SRGB_FORWARD_TRANSFORM.',
    definition: `export const SRGB_FORWARD_MATRIX = [
    [3.2406, -1.5372, -0.4986],
    [-0.9689, 1.8758, 0.0415],
    [0.0557, -0.2040, 1.0570]
]`,
    values: [
        { value: '[3.2406, -1.5372, -0.4986]', descriptionKey: 'consts.detail.srgb_forward_matrix.row_0', descriptionFallback: 'Red channel row of the XYZ→sRGB matrix.' },
        { value: '[-0.9689, 1.8758, 0.0415]', descriptionKey: 'consts.detail.srgb_forward_matrix.row_1', descriptionFallback: 'Green channel row of the XYZ→sRGB matrix.' },
        { value: '[0.0557, -0.2040, 1.0570]', descriptionKey: 'consts.detail.srgb_forward_matrix.row_2', descriptionFallback: 'Blue channel row of the XYZ→sRGB matrix.' },
    ],
    usedBy: [
        { name: 'color.util.ts' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.srgb_forward_matrix.example',
            titleFallback: 'Applying the XYZ→sRGB matrix (internal use)',
            code: `import { SRGB_FORWARD_MATRIX, SRGB_FORWARD_TRANSFORM } from 'origam'

// Convert XYZ [X, Y, Z] to linear sRGB
const [X, Y, Z] = [0.2126, 0.7152, 0.0722]
const linearR = SRGB_FORWARD_MATRIX[0][0] * X + SRGB_FORWARD_MATRIX[0][1] * Y + SRGB_FORWARD_MATRIX[0][2] * Z
const r = SRGB_FORWARD_TRANSFORM(linearR)`,
            lang: 'typescript',
        },
    ],
}
