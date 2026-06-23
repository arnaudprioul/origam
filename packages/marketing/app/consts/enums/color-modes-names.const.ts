import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const COLOR_MODES_NAMES_ENUM_DOC: IEnumDoc = {
    slug: 'color-modes-names',
    name: 'COLOR_MODES_NAMES',
    category: 'ColorPicker',
    descriptionKey: 'enums.catalog.color_modes_names.description',
    descriptionFallback: 'Color model identifiers used by OrigamColorPicker to switch between input representations (hex, rgb, hsl, …).',
    definition: `export enum COLOR_MODES_NAMES {
    RGB  = 'rgb',
    RGBA = 'rgba',
    HSL  = 'hsl',
    HSLA = 'hsla',
    HEX  = 'hex',
    HEXA = 'hexa',
}`,
    values: [
        { value: 'COLOR_MODES_NAMES.RGB', descriptionKey: 'enums.detail.color_modes_names.rgb', descriptionFallback: 'Red / Green / Blue (no alpha).' },
        { value: 'COLOR_MODES_NAMES.RGBA', descriptionKey: 'enums.detail.color_modes_names.rgba', descriptionFallback: 'Red / Green / Blue / Alpha.' },
        { value: 'COLOR_MODES_NAMES.HSL', descriptionKey: 'enums.detail.color_modes_names.hsl', descriptionFallback: 'Hue / Saturation / Lightness (no alpha).' },
        { value: 'COLOR_MODES_NAMES.HSLA', descriptionKey: 'enums.detail.color_modes_names.hsla', descriptionFallback: 'Hue / Saturation / Lightness / Alpha.' },
        { value: 'COLOR_MODES_NAMES.HEX', descriptionKey: 'enums.detail.color_modes_names.hex', descriptionFallback: 'Hexadecimal (6-digit, no alpha).' },
        { value: 'COLOR_MODES_NAMES.HEXA', descriptionKey: 'enums.detail.color_modes_names.hexa', descriptionFallback: 'Hexadecimal with alpha channel (8-digit).' },
    ],
    usedBy: [
        { slug: 'color-picker', name: 'ColorPicker', propName: 'mode' },
    ],
    sourceFile: 'packages/ds/src/enums/ColorPicker/color-picker.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.color_modes_names.example',
            titleFallback: 'Restricting the colour picker to hex input',
            code: `<origam-color-picker :mode="COLOR_MODES_NAMES.HEX" />`,
            lang: 'vue',
        },
    ],
}
