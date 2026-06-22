import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COLOR_HSV_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-color-hsv-emits',
    name: 'IColorHsvEmits',
    category: 'Color',
    descriptionKey: 'interfaces.catalog.i_color_hsv_emits.description',
    descriptionFallback: 'Shared emit shape for ColorPicker sub-components (Canvas, Edit, Preview, Swatches) that push HSVA colour changes up through the same channel.',
    definition: `export interface IColorHsvEmits {
    (e: 'update:colorHsv', value: THSVA): void
}`,
    extends: [],
    props: [
        { name: "update:colorHsv", type: '(value: THSVA) => void', optional: false, descriptionFallback: 'Emitted whenever the HSVA colour value changes. The parent ColorPicker listens to this to synchronise all sub-components.' },
    ],
    usedBy: [
        { slug: 'color-picker-canvas', name: 'ColorPickerCanvas', kind: 'component' },
        { slug: 'color-picker-edit', name: 'ColorPickerEdit', kind: 'component' },
        { slug: 'color-picker-preview', name: 'ColorPickerPreview', kind: 'component' },
        { slug: 'color-picker-swatches', name: 'ColorPickerSwatches', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ColorPicker/color-picker.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_color_hsv_emits.example',
            titleFallback: 'Extending the interface on a custom ColorPicker sub-component',
            code: `import type { IColorHsvEmits } from 'origam'

interface IMyPickerEmits extends IColorHsvEmits {
    (e: 'update:mode', value: string): void
}`,
            lang: 'typescript',
        },
    ],
}
