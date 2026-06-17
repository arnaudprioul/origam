import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const LABTO_XYZ_UTIL_DOC: IUtilDoc = {
    slug: 'labto-xyz',
    name: 'LabtoXyz',
    category: 'Color',
    icon: 'mdi-matrix',
    descriptionKey: 'utils.catalog.labto_xyz.description',
    descriptionFallback: 'Convert a CIE L*a*b* colour to the CIE XYZ (D65) colour space. Used in the lighten/darken pipeline alongside XyztoLab.',
    signature: `function LabtoXyz(lab: TLAB): TXYZ`,
    params: [
        {
            name: 'lab',
            type: 'TLAB',
            required: true,
            descriptionKey: 'utils.detail.labto_xyz.param_lab',
            descriptionFallback: 'CIE L*a*b* triplet as a tuple [L, a, b]. L in [0, 100], a and b typically in [-128, 127].',
        },
    ],
    returns: {
        type: 'TXYZ',
        descriptionKey: 'utils.detail.labto_xyz.returns',
        descriptionFallback: 'CIE XYZ tristimulus tuple [X, Y, Z] normalised to the D65 illuminant.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.labto_xyz.example_basic',
            titleFallback: 'Lab to XYZ round-trip with lighten',
            code: `import { LabtoXyz, XyztoLab, RgbtoXyz, XyzToRgb } from 'origam'

// Lighten a colour by 20 Lab units
const rgb = { r: 100, g: 50, b: 200 }
const lab = XyztoLab(RgbtoXyz(rgb))
lab[0] = Math.min(100, lab[0] + 20)
const lightened = XyzToRgb(LabtoXyz(lab))`,
            lang: 'typescript',
        },
    ],
    related: ['xyzto-lab', 'rgbto-xyz', 'xyz-to-rgb'],
}
