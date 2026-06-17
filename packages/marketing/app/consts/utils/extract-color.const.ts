import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const EXTRACT_COLOR_UTIL_DOC: IUtilDoc = {
    slug: 'extract-color',
    name: 'extractColor',
    category: 'ColorPicker',
    icon: 'mdi-eyedropper',
    descriptionKey: 'utils.catalog.extract_color.description',
    descriptionFallback: 'Converts an internal HSVA color value to the format expected by the consumer (string → hex, RGB object, HSL object, or HSV object), preserving alpha when appropriate.',
    signature: `function extractColor(color: THSVA, input: any): string | Record<string, number>`,
    params: [
        {
            name: 'color',
            type: 'THSVA',
            required: true,
            descriptionKey: 'utils.detail.extract_color.param_color',
            descriptionFallback: 'The internal HSVA color value to convert. THSVA = { h: number, s: number, v: number, a?: number }.',
        },
        {
            name: 'input',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.extract_color.param_input',
            descriptionFallback: 'The original input value passed to the color picker. Its type determines the output format: null/string → hex string; { r, g, b } → RGB object; { h, s, l } → HSL object; { h, s, v } → HSV object.',
        },
    ],
    returns: {
        type: 'string | Record<string, number>',
        descriptionKey: 'utils.detail.extract_color.returns',
        descriptionFallback: 'The color in the same format as the input. Alpha is stripped when the original input had no alpha channel and the alpha value is 1.',
    },
    sourceFile: 'packages/ds/src/utils/ColorPicker/color-picker.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.extract_color.example_basic',
            titleFallback: 'Extract to hex vs RGB object',
            code: `import { extractColor } from 'origam'

const hsva = { h: 210, s: 0.8, v: 0.9, a: 1 }

extractColor(hsva, '#000000')              // → '#2d96e5' (hex string)
extractColor(hsva, { r: 0, g: 0, b: 0 }) // → { r: 45, g: 150, b: 229 }`,
            lang: 'typescript',
        },
    ],
    related: ['extract-keys'],
}
