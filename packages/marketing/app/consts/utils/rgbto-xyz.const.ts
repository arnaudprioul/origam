import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RGBTO_XYZ_UTIL_DOC: IUtilDoc = {
    slug: 'rgbto-xyz',
    name: 'RgbtoXyz',
    category: 'Color',
    icon: 'mdi-matrix',
    descriptionKey: 'utils.catalog.rgbto_xyz.description',
    descriptionFallback: 'Convert an sRGB colour to the CIE XYZ (D65) colour space by linearising the sRGB gamma curve then applying a 3x3 matrix transform. Used internally for APCA contrast and lighten/darken operations.',
    signature: `function RgbtoXyz({ r, g, b }: TRGBA): TXYZ`,
    params: [
        {
            name: '{ r, g, b }',
            type: 'TRGBA',
            required: true,
            descriptionKey: 'utils.detail.rgbto_xyz.param_rgba',
            descriptionFallback: 'sRGB colour object. r, g, b in [0, 255]. Alpha is ignored.',
        },
    ],
    returns: {
        type: 'TXYZ',
        descriptionKey: 'utils.detail.rgbto_xyz.returns',
        descriptionFallback: 'CIE XYZ tristimulus tuple [X, Y, Z] normalised to the D65 illuminant.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.rgbto_xyz.example_basic',
            titleFallback: 'sRGB red to XYZ',
            code: `import { RgbtoXyz } from 'origam'

RgbtoXyz({ r: 255, g: 0, b: 0 })
// → [0.4124, 0.2126, 0.0193]  (approx, D65)`,
            lang: 'typescript',
        },
    ],
    related: ['xyz-to-rgb', 'xyzto-lab', 'labto-xyz'],
}
