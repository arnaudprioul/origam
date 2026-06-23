import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RG_BTO_HEX_UTIL_DOC: IUtilDoc = {
    slug: 'rg-bto-hex',
    name: 'RGBtoHex',
    category: 'Color',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.rg_bto_hex.description',
    descriptionFallback: 'Convert an sRGB object to a hex colour string. Each channel is rounded to the nearest integer before encoding. The alpha component is appended only when defined.',
    signature: `function RGBtoHex({ r, g, b, a }: TRGBA): THex`,
    params: [
        {
            name: '{ r, g, b, a }',
            type: 'TRGBA',
            required: true,
            descriptionKey: 'utils.detail.rg_bto_hex.param_rgba',
            descriptionFallback: 'sRGB colour object. r, g, b in [0, 255], a (optional) in [0, 1].',
        },
    ],
    returns: {
        type: 'THex',
        descriptionKey: 'utils.detail.rg_bto_hex.returns',
        descriptionFallback: 'Uppercase hex colour string with leading "#". 7 characters for opaque colours (#RRGGBB), 9 characters when alpha is present (#RRGGBBAA).',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.rg_bto_hex.example_basic',
            titleFallback: 'RGB to hex encoding',
            code: `import { RGBtoHex } from 'origam'

RGBtoHex({ r: 26, g: 43, b: 60 })
// → '#1A2B3C'

RGBtoHex({ r: 255, g: 0, b: 0, a: 0.5 })
// → '#FF000080'`,
            lang: 'typescript',
        },
    ],
    related: ['hex-to-rgb', 'rg-bto-css'],
}
