import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RG_BTO_HSV_UTIL_DOC: IUtilDoc = {
    slug: 'rg-bto-hsv',
    name: 'RGBtoHSV',
    category: 'Color',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.rg_bto_hsv.description',
    descriptionFallback: 'Convert an sRGB colour to HSV (hue, saturation, value). Returns a safe default {h:0, s:1, v:1, a:1} when rgba is falsy.',
    signature: `function RGBtoHSV(rgba: TRGBA): THSVA`,
    params: [
        {
            name: 'rgba',
            type: 'TRGBA',
            required: true,
            descriptionKey: 'utils.detail.rg_bto_hsv.param_rgba',
            descriptionFallback: 'sRGB colour object with r, g, b in [0, 255] and optional alpha in [0, 1].',
        },
    ],
    returns: {
        type: 'THSVA',
        descriptionKey: 'utils.detail.rg_bto_hsv.returns',
        descriptionFallback: 'Equivalent colour in HSV space. h in [0, 360], s and v in [0, 1], a preserved from the input.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.rg_bto_hsv.example_basic',
            titleFallback: 'Convert sRGB green to HSV',
            code: `import { RGBtoHSV } from 'origam'

RGBtoHSV({ r: 0, g: 255, b: 0 })
// → { h: 120, s: 1, v: 1, a: undefined }`,
            lang: 'typescript',
        },
    ],
    related: ['hs-vto-rgb', 'hex-to-hsv'],
}
