import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PARSE_HEX_UTIL_DOC: IUtilDoc = {
    slug: 'parse-hex',
    name: 'parseHex',
    category: 'Commons',
    icon: 'mdi-pound',
    descriptionKey: 'utils.catalog.parse_hex.description',
    descriptionFallback: 'Normalise any hex color string — with or without leading `#`, short-form (3/4 digits) or long-form (6/8 digits) — into a canonical 6-character `THex` string, replacing invalid characters with `F`.',
    signature: `function parseHex(hex: string): THex`,
    params: [
        {
            name: 'hex',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.parse_hex.param_hex',
            descriptionFallback: 'A hex color string in any accepted format: with or without `#`, 3/4/6/8 digit. Invalid characters are silently coerced to `F`.',
        },
    ],
    returns: {
        type: 'THex',
        descriptionKey: 'utils.detail.parse_hex.returns',
        descriptionFallback: 'A normalised 6-character uppercase hex string (e.g. `"3B82F6"`). Invalid inputs are padded/coerced rather than throwing.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.parse_hex.example_basic',
            titleFallback: 'Normalise hex color strings',
            code: `import { parseHex } from 'origam'

parseHex('#3b82f6')   // → '3b82f6'
parseHex('abc')       // → 'aabbcc'
parseHex('#abc8')     // → 'aabbcc88'`,
            lang: 'typescript',
        },
    ],
    related: ['parse-color', 'parse-gradient', 'hex-to-rgb', 'hex-to-hsv'],
}
