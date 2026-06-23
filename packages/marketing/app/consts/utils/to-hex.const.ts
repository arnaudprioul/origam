import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TO_HEX_UTIL_DOC: IUtilDoc = {
    slug: 'to-hex',
    name: 'toHex',
    category: 'Commons',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.to_hex.description',
    descriptionFallback: 'Convert a single 0–255 integer channel value to a zero-padded, uppercase 2-digit hexadecimal string. Used internally by RGBtoHex and HSVtoHex.',
    signature: `function toHex(v: number): string`,
    params: [
        {
            name: 'v',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.to_hex.param_v',
            descriptionFallback: 'An integer colour channel value in the 0–255 range. The value is rounded before conversion.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.to_hex.returns',
        descriptionFallback: 'A 2-character uppercase hex string, e.g. "0A", "FF", "1E".',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.to_hex.example_basic',
            titleFallback: 'Convert integer channels to hex digits',
            code: `import { toHex } from 'origam'

toHex(0)    // → '00'
toHex(10)   // → '0A'
toHex(255)  // → 'FF'
toHex(16.7) // → '11' (rounds to 17)`,
            lang: 'typescript',
        },
    ],
    related: ['strip-alpha', 'hex-to-rgb', 'hex-to-hsv'],
}
