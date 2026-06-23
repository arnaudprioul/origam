import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HS_VTO_HSL_UTIL_DOC: IUtilDoc = {
    slug: 'hs-vto-hsl',
    name: 'HSVtoHSL',
    category: 'Color',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.hs_vto_hsl.description',
    descriptionFallback: 'Convert an HSV colour (hue, saturation, value) to HSL (hue, saturation, lightness).',
    signature: `function HSVtoHSL(hsva: THSVA): THSLA`,
    params: [
        {
            name: 'hsva',
            type: 'THSVA',
            required: true,
            descriptionKey: 'utils.detail.hs_vto_hsl.param_hsva',
            descriptionFallback: 'Colour in HSV space with optional alpha. h in [0, 360], s and v in [0, 1], a in [0, 1].',
        },
    ],
    returns: {
        type: 'THSLA',
        descriptionKey: 'utils.detail.hs_vto_hsl.returns',
        descriptionFallback: 'Equivalent colour in HSL space. h in [0, 360], s and l in [0, 1], a preserved.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.hs_vto_hsl.example_basic',
            titleFallback: 'Convert HSV to HSL',
            code: `import { HSVtoHSL } from 'origam'

HSVtoHSL({ h: 120, s: 1, v: 1, a: 1 })
// → { h: 120, s: 1, l: 0.5, a: 1 }`,
            lang: 'typescript',
        },
    ],
    related: ['hs-lto-hsv', 'hs-vto-rgb'],
}
