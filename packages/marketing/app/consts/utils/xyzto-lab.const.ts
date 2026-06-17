import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const XYZTO_LAB_UTIL_DOC: IUtilDoc = {
    slug: 'xyzto-lab',
    name: 'XyztoLab',
    category: 'Color',
    icon: 'mdi-matrix',
    descriptionKey: 'utils.catalog.xyzto_lab.description',
    descriptionFallback: 'Convert a CIE XYZ (D65) colour to CIE L*a*b* by applying the CIELAB forward transform. Used to perform perceptually uniform lightness adjustments (lighten/darken).',
    signature: `function XyztoLab(xyz: TXYZ): TLAB`,
    params: [
        {
            name: 'xyz',
            type: 'TXYZ',
            required: true,
            descriptionKey: 'utils.detail.xyzto_lab.param_xyz',
            descriptionFallback: 'CIE XYZ tristimulus tuple [X, Y, Z] normalised to the D65 illuminant.',
        },
    ],
    returns: {
        type: 'TLAB',
        descriptionKey: 'utils.detail.xyzto_lab.returns',
        descriptionFallback: 'CIE L*a*b* triplet as a tuple [L, a, b]. L in [0, 100], a and b typically in [-128, 127].',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.xyzto_lab.example_basic',
            titleFallback: 'XYZ to Lab',
            code: `import { XyztoLab, RgbtoXyz } from 'origam'

XyztoLab(RgbtoXyz({ r: 255, g: 255, b: 255 }))
// → [100, 0, 0]  (white in L*a*b*)`,
            lang: 'typescript',
        },
    ],
    related: ['labto-xyz', 'rgbto-xyz', 'xyz-to-rgb'],
}
