import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HS_LTO_RGB_UTIL_DOC: IUtilDoc = {
    slug: 'hs-lto-rgb',
    name: 'HSLtoRGB',
    category: 'Color',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.hs_lto_rgb.description',
    descriptionFallback: 'Convert an HSL colour (hue, saturation, lightness) to sRGB. Implemented as HSLtoHSV followed by HSVtoRGB.',
    signature: `function HSLtoRGB(hsla: THSLA): TRGBA`,
    params: [
        {
            name: 'hsla',
            type: 'THSLA',
            required: true,
            descriptionKey: 'utils.detail.hs_lto_rgb.param_hsla',
            descriptionFallback: 'Colour in HSL space with optional alpha. h in [0, 360], s and l in [0, 1], a in [0, 1].',
        },
    ],
    returns: {
        type: 'TRGBA',
        descriptionKey: 'utils.detail.hs_lto_rgb.returns',
        descriptionFallback: 'Equivalent sRGB colour object with r, g, b in [0, 255] and optional a in [0, 1].',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.hs_lto_rgb.example_basic',
            titleFallback: 'Convert green HSL to RGB',
            code: `import { HSLtoRGB } from 'origam'

HSLtoRGB({ h: 120, s: 1, l: 0.5, a: 1 })
// → { r: 0, g: 255, b: 0, a: 1 }`,
            lang: 'typescript',
        },
    ],
    related: ['hs-lto-hsv', 'hs-vto-rgb', 'rg-bto-css'],
}
