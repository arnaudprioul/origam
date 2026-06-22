import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COLOR_MODE_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-color-mode-emits',
    name: 'IColorModeEmits',
    category: 'Color',
    descriptionKey: 'interfaces.catalog.i_color_mode_emits.description',
    descriptionFallback: 'Shared emit shape for ColorPicker sub-components that flip between colour input modes (RGB / HSL / HSV / HEX).',
    definition: `export interface IColorModeEmits {
    (e: 'update:mode', value: TColorModes): void
}`,
    extends: [],
    props: [
        { name: "update:mode", type: '(value: TColorModes) => void', optional: false, descriptionFallback: 'Emitted when the active colour input mode changes (e.g. from "rgb" to "hex").' },
    ],
    usedBy: [
        { slug: 'color-picker-edit', name: 'ColorPickerEdit', kind: 'component' },
        { slug: 'color-picker', name: 'ColorPicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ColorPicker/color-picker.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_color_mode_emits.example',
            titleFallback: 'Extending the interface on a sub-component that controls the mode',
            code: `import type { IColorHsvEmits, IColorModeEmits } from 'origam'

interface IMyEditEmits extends IColorHsvEmits, IColorModeEmits {}`,
            lang: 'typescript',
        },
    ],
}
