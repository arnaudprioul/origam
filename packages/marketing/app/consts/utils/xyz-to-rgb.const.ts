import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const XYZ_TO_RGB_UTIL_DOC: IUtilDoc = {
    slug: 'xyz-to-rgb',
    name: 'XyzToRgb',
    category: 'Color',
    icon: 'mdi-matrix',
    descriptionKey: 'utils.catalog.xyz_to_rgb.description',
    descriptionFallback: 'Convert a CIE XYZ (D65) tristimulus value to an sRGB object by applying the sRGB forward matrix and gamma curve, then clamping and rounding to [0, 255].',
    signature: `function XyzToRgb(xyz: TXYZ): TRGBA`,
    params: [
        {
            name: 'xyz',
            type: 'TXYZ',
            required: true,
            descriptionKey: 'utils.detail.xyz_to_rgb.param_xyz',
            descriptionFallback: 'CIE XYZ tristimulus tuple [X, Y, Z] normalised to the D65 illuminant.',
        },
    ],
    returns: {
        type: 'TRGBA',
        descriptionKey: 'utils.detail.xyz_to_rgb.returns',
        descriptionFallback: 'sRGB colour object with r, g, b as integers in [0, 255]. Alpha is not set.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.xyz_to_rgb.example_basic',
            titleFallback: 'XYZ back to sRGB',
            code: `import { XyzToRgb, RgbtoXyz } from 'origam'

const original = { r: 100, g: 150, b: 200 }
const roundTrip = XyzToRgb(RgbtoXyz(original))
// → { r: 100, g: 150, b: 200 }`,
            lang: 'typescript',
        },
    ],
    related: ['rgbto-xyz', 'xyzto-lab', 'labto-xyz'],
}
