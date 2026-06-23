import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HEX_TO_RGB_UTIL_DOC: IUtilDoc = {
    slug: 'hex-to-rgb',
    name: 'HexToRGB',
    category: 'Color',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.hex_to_rgb.description',
    descriptionFallback: 'Convert a hexadecimal colour string to an sRGB object. Accepts 3-, 4-, 6- and 8-character hex values, with or without a leading "#".',
    signature: `function HexToRGB(hex: THex): TRGBA`,
    params: [
        {
            name: 'hex',
            type: 'THex',
            required: true,
            descriptionKey: 'utils.detail.hex_to_rgb.param_hex',
            descriptionFallback: 'Hexadecimal colour string. Short forms (3 or 4 chars) are expanded by doubling each digit.',
        },
    ],
    returns: {
        type: 'TRGBA',
        descriptionKey: 'utils.detail.hex_to_rgb.returns',
        descriptionFallback: 'sRGB colour object with r, g, b in [0, 255]. Alpha is provided as a decimal in [0, 1] when the hex string contains an alpha channel, otherwise undefined.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.hex_to_rgb.example_basic',
            titleFallback: 'Parse a 6-digit hex colour',
            code: `import { HexToRGB } from 'origam'

HexToRGB('#1a2b3c')
// → { r: 26, g: 43, b: 60, a: undefined }

HexToRGB('#ff000080')
// → { r: 255, g: 0, b: 0, a: 0.502 }`,
            lang: 'typescript',
        },
    ],
    related: ['hex-to-hsv', 'rg-bto-hex', 'rg-bto-css'],
}
