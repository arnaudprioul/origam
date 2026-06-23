import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HEX_TO_HSV_UTIL_DOC: IUtilDoc = {
    slug: 'hex-to-hsv',
    name: 'HexToHSV',
    category: 'Color',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.hex_to_hsv.description',
    descriptionFallback: 'Convert a hexadecimal colour string to HSV. Delegates to HexToRGB then RGBtoHSV. Useful when feeding a user-picked hex value into the colour-picker engine.',
    signature: `function HexToHSV(hex: THex): THSVA`,
    params: [
        {
            name: 'hex',
            type: 'THex',
            required: true,
            descriptionKey: 'utils.detail.hex_to_hsv.param_hex',
            descriptionFallback: 'Hexadecimal colour string with or without a leading "#". Accepts 3-, 4-, 6- and 8-character forms.',
        },
    ],
    returns: {
        type: 'THSVA',
        descriptionKey: 'utils.detail.hex_to_hsv.returns',
        descriptionFallback: 'Equivalent colour in HSV space. h in [0, 360], s and v in [0, 1], a in [0, 1] when an alpha channel was present.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.hex_to_hsv.example_basic',
            titleFallback: 'Hex red to HSV',
            code: `import { HexToHSV } from 'origam'

HexToHSV('#ff0000')
// → { h: 0, s: 1, v: 1, a: undefined }`,
            lang: 'typescript',
        },
    ],
    related: ['hex-to-rgb', 'rg-bto-hsv', 'hs-vto-hex'],
}
