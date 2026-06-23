import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HS_LTO_HSV_UTIL_DOC: IUtilDoc = {
    slug: 'hs-lto-hsv',
    name: 'HSLtoHSV',
    category: 'Color',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.hs_lto_hsv.description',
    descriptionFallback: 'Convert an HSL colour (hue, saturation, lightness) to HSV (hue, saturation, value). Both representations span the same visible gamut; HSV is more convenient for colour-picker math.',
    signature: `function HSLtoHSV(hsl: THSLA): THSVA`,
    params: [
        {
            name: 'hsl',
            type: 'THSLA',
            required: true,
            descriptionKey: 'utils.detail.hs_lto_hsv.param_hsl',
            descriptionFallback: 'Colour in HSL space with optional alpha. h in [0, 360], s and l in [0, 1], a in [0, 1].',
        },
    ],
    returns: {
        type: 'THSVA',
        descriptionKey: 'utils.detail.hs_lto_hsv.returns',
        descriptionFallback: 'Equivalent colour in HSV space. h in [0, 360], s and v in [0, 1], a preserved.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.hs_lto_hsv.example_basic',
            titleFallback: 'Convert HSL to HSV',
            code: `import { HSLtoHSV } from 'origam'

HSLtoHSV({ h: 120, s: 1, l: 0.5, a: 1 })
// → { h: 120, s: 1, v: 1, a: 1 }`,
            lang: 'typescript',
        },
    ],
    related: ['hs-lto-rgb', 'hs-vto-hsl', 'hs-vto-rgb'],
}
