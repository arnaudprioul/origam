import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HS_VTO_HEX_UTIL_DOC: IUtilDoc = {
    slug: 'hs-vto-hex',
    name: 'HSVtoHex',
    category: 'Color',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.hs_vto_hex.description',
    descriptionFallback: 'Convert an HSV colour to a hexadecimal CSS colour string (e.g. "#FF0000" or "#FF0000FF" when alpha is present). Delegates to HSVtoRGB then RGBtoHex.',
    signature: `function HSVtoHex(hsva: THSVA): THex`,
    params: [
        {
            name: 'hsva',
            type: 'THSVA',
            required: true,
            descriptionKey: 'utils.detail.hs_vto_hex.param_hsva',
            descriptionFallback: 'Colour in HSV space with optional alpha. h in [0, 360], s and v in [0, 1], a in [0, 1].',
        },
    ],
    returns: {
        type: 'THex',
        descriptionKey: 'utils.detail.hs_vto_hex.returns',
        descriptionFallback: 'Hex colour string with leading "#". Includes an alpha component when the input carries an alpha channel.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.hs_vto_hex.example_basic',
            titleFallback: 'Convert red HSV to hex',
            code: `import { HSVtoHex } from 'origam'

HSVtoHex({ h: 0, s: 1, v: 1 })
// → '#FF0000'`,
            lang: 'typescript',
        },
    ],
    related: ['hs-vto-rgb', 'rg-bto-hex', 'hex-to-hsv'],
}
