import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HAS_ALPHA_UTIL_DOC: IUtilDoc = {
    slug: 'has-alpha',
    name: 'hasAlpha',
    category: 'ColorPicker',
    icon: 'mdi-alpha-a-box-outline',
    descriptionKey: 'utils.catalog.has_alpha.description',
    descriptionFallback: 'Detects whether a colour value carries an alpha channel. For strings it checks that the length exceeds 7 characters (8-digit hex or rgba/hsla). For objects it looks for an "a" or "alpha" own property. Returns false for falsy values.',
    signature: `function hasAlpha(color: any): boolean`,
    params: [
        {
            name: 'color',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.has_alpha.param_color',
            descriptionFallback: 'A colour value in any format: hex string (#rrggbbaa), CSS string (rgba/hsla), or a colour object with an "a" or "alpha" property.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.has_alpha.returns',
        descriptionFallback: 'true when an alpha channel is detected, false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/ColorPicker/color-picker.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.has_alpha.example_basic',
            titleFallback: 'String and object colour detection',
            code: `import { hasAlpha } from 'origam'

hasAlpha('#ff0000')          // → false  (6-char hex)
hasAlpha('#ff000080')        // → true   (8-char hex)
hasAlpha({ r: 255, g: 0, b: 0 })        // → false
hasAlpha({ r: 255, g: 0, b: 0, a: 0.5 })  // → true`,
            lang: 'typescript',
        },
    ],
    related: ['has', 'gradient-from-object'],
}
