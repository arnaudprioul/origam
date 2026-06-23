import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const APCACONTRAST_UTIL_DOC: IUtilDoc = {
    slug: 'apc-acontrast',
    name: 'APCAcontrast',
    category: 'Color',
    icon: 'mdi-contrast-circle',
    descriptionKey: 'utils.catalog.apc_acontrast.description',
    descriptionFallback: 'Compute the APCA (Accessible Perceptual Contrast Algorithm) contrast value between a text colour and a background colour. Returns a signed float in the range [-108, 106] — positive for dark text on light background, negative for light text on dark background.',
    signature: `function APCAcontrast(text: TRGBA, background: TRGBA): number`,
    params: [
        {
            name: 'text',
            type: 'TRGBA',
            required: true,
            descriptionKey: 'utils.detail.apc_acontrast.param_text',
            descriptionFallback: 'The foreground (text) colour as an RGBA object with r, g, b in [0, 255].',
        },
        {
            name: 'background',
            type: 'TRGBA',
            required: true,
            descriptionKey: 'utils.detail.apc_acontrast.param_background',
            descriptionFallback: 'The background colour as an RGBA object with r, g, b in [0, 255].',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.apc_acontrast.returns',
        descriptionFallback: 'Signed APCA contrast value. Absolute value >= 45 is the recommended minimum for body text.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.apc_acontrast.example_basic',
            titleFallback: 'Black text on white background',
            code: `import { APCAcontrast } from 'origam'

const black = { r: 0,   g: 0,   b: 0 }
const white = { r: 255, g: 255, b: 255 }

Math.abs(APCAcontrast(black, white)) // → ~107.9`,
            lang: 'typescript',
        },
    ],
    related: ['hex-to-rgb', 'rg-bto-css'],
}
