import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CLASS_TO_HEX_UTIL_DOC: IUtilDoc = {
    slug: 'class-to-hex',
    name: 'classToHex',
    category: 'Commons',
    icon: 'mdi-palette',
    descriptionKey: 'utils.catalog.class_to_hex.description',
    descriptionFallback: 'Resolves a named colour class string (e.g. "red lighten-2") to its hex value by looking it up in a colour map. Returns an empty string when the colour is not found.',
    signature: `function classToHex(
  color: string,
  colors: Record<string, Record<string, string>>
): string`,
    params: [
        {
            name: 'color',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.class_to_hex.param_color',
            descriptionFallback: 'A colour class name in the form "colorName modifier" (e.g. "red lighten-2") or just "colorName" for the base shade.',
        },
        {
            name: 'colors',
            type: 'Record<string, Record<string, string>>',
            required: true,
            descriptionKey: 'utils.detail.class_to_hex.param_colors',
            descriptionFallback: 'A nested map of colour-name → modifier → hex string. The origam colour palette is the default source.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.class_to_hex.returns',
        descriptionFallback: 'The resolved hex string, or an empty string when the colour name or modifier is not found.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.class_to_hex.example_basic',
            titleFallback: 'Resolve a colour class to hex',
            code: `import { classToHex } from 'origam'

const palette = { red: { base: '#f44336', lighten2: '#ef9a9a' } }
classToHex('red', palette)          // → '#f44336'
classToHex('red lighten-2', palette) // → '#ef9a9a'
classToHex('purple', palette)       // → ''`,
            lang: 'typescript',
        },
    ],
    related: ['darken'],
}
