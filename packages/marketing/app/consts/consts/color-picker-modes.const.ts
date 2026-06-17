import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const COLOR_PICKER_MODES_CONST_DOC: IConstDoc = {
    slug: 'color-picker-modes',
    name: 'COLOR_PICKER_MODES',
    category: 'Color',
    descriptionKey: 'consts.catalog.color_picker_modes.description',
    descriptionFallback: 'Record of IColorPickerMode descriptors keyed by format string. Each mode defines the input fields, channel constraints, and to/from conversion functions used by OrigamColorPicker to render and parse the selected color format.',
    definition: `export const COLOR_PICKER_MODES = {
    rgb:  COLOR_PICKER_MODE_RGB,
    rgba: COLOR_PICKER_MODE_RGBA,
    hsl:  COLOR_PICKER_MODE_HSL,
    hsla: COLOR_PICKER_MODE_HSLA,
    hex:  COLOR_PICKER_MODE_HEX,
    hexa: COLOR_PICKER_MODE_HEXA
} satisfies Record<string, IColorPickerMode>`,
    values: [
        { value: 'rgb', descriptionKey: 'consts.detail.color_picker_modes.rgb', descriptionFallback: 'Three numeric inputs (R 0-255, G 0-255, B 0-255) without alpha.' },
        { value: 'rgba', descriptionKey: 'consts.detail.color_picker_modes.rgba', descriptionFallback: 'Four numeric inputs (R, G, B 0-255 + A 0-1).' },
        { value: 'hsl', descriptionKey: 'consts.detail.color_picker_modes.hsl', descriptionFallback: 'Three numeric inputs (H 0-360, S 0-1, L 0-1) without alpha.' },
        { value: 'hsla', descriptionKey: 'consts.detail.color_picker_modes.hsla', descriptionFallback: 'Four numeric inputs (H, S, L + A 0-1).' },
        { value: 'hex', descriptionKey: 'consts.detail.color_picker_modes.hex', descriptionFallback: 'Single text input for 6-digit HEX (#RRGGBB).' },
        { value: 'hexa', descriptionKey: 'consts.detail.color_picker_modes.hexa', descriptionFallback: 'Single text input for 8-digit HEXA (#RRGGBBAA).' },
    ],
    usedBy: [
        { name: 'OrigamColorPicker', slug: 'color-picker' },
    ],
    sourceFile: 'packages/ds/src/consts/ColorPicker/color-picker.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.color_picker_modes.example',
            titleFallback: 'Listing available picker modes',
            code: `import { COLOR_PICKER_MODES } from 'origam'

const modes = Object.keys(COLOR_PICKER_MODES)
// ['rgb', 'rgba', 'hsl', 'hsla', 'hex', 'hexa']`,
            lang: 'typescript',
        },
    ],
}
