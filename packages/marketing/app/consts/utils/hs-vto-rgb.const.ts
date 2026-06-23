import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HS_VTO_RGB_UTIL_DOC: IUtilDoc = {
    slug: 'hs-vto-rgb',
    name: 'HSVtoRGB',
    category: 'Color',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.hs_vto_rgb.description',
    descriptionFallback: 'Convert an HSV colour (hue, saturation, value) to sRGB. Used internally by all HSV-to-CSS and HSV-to-Hex conversions.',
    signature: `function HSVtoRGB(hsva: THSVA): TRGBA`,
    params: [
        {
            name: 'hsva',
            type: 'THSVA',
            required: true,
            descriptionKey: 'utils.detail.hs_vto_rgb.param_hsva',
            descriptionFallback: 'Colour in HSV space with optional alpha. h in [0, 360], s and v in [0, 1], a in [0, 1].',
        },
    ],
    returns: {
        type: 'TRGBA',
        descriptionKey: 'utils.detail.hs_vto_rgb.returns',
        descriptionFallback: 'Equivalent sRGB colour object with r, g, b in [0, 255] and alpha preserved.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.hs_vto_rgb.example_basic',
            titleFallback: 'Convert HSV red to RGB',
            code: `import { HSVtoRGB } from 'origam'

HSVtoRGB({ h: 0, s: 1, v: 1 })
// → { r: 255, g: 0, b: 0, a: undefined }`,
            lang: 'typescript',
        },
    ],
    related: ['hs-vto-css', 'hs-vto-hex', 'rg-bto-hsv'],
}
