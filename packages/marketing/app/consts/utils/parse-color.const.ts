import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PARSE_COLOR_UTIL_DOC: IUtilDoc = {
    slug: 'parse-color',
    name: 'parseColor',
    category: 'Commons',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.parse_color.description',
    descriptionFallback: 'Normalise any supported color representation — integer, CSS string (hex, rgb, rgba, hsl, hsla, hsv, hsva), or an RGBA/HSLA/HSVA object — into a unified `TRGBA` object.',
    signature: `function parseColor(color: TColorType): TRGBA`,
    params: [
        {
            name: 'color',
            type: 'TColorType',
            required: true,
            descriptionKey: 'utils.detail.parse_color.param_color',
            descriptionFallback: 'Any color value accepted by the design system: a 24-bit integer (0x000000–0xFFFFFF), a CSS color string (`"#rrggbb"`, `"rgb(…)"`, `"hsl(…)"`, etc.), or a plain `{r,g,b}` / `{h,s,l}` / `{h,s,v}` object.',
        },
    ],
    returns: {
        type: 'TRGBA',
        descriptionKey: 'utils.detail.parse_color.returns',
        descriptionFallback: 'A normalised `{ r, g, b, a? }` object with channel values in the range 0–255 (and `a` in 0–1).',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.parse_color.example_basic',
            titleFallback: 'Parse various color formats',
            code: `import { parseColor } from 'origam'

parseColor('#3b82f6')            // → { r: 59, g: 130, b: 246 }
parseColor('rgb(59, 130, 246)')  // → { r: 59, g: 130, b: 246 }
parseColor(0x3b82f6)             // → { r: 59, g: 130, b: 246 }`,
            lang: 'typescript',
        },
    ],
    related: ['parse-hex', 'parse-gradient', 'get-contrast', 'get-luma'],
}
