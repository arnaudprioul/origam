import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COLOR_PICKER_SWATCHES_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-color-picker-swatches-emits',
    name: 'IColorPickerSwatchesEmits',
    category: 'Color',
    descriptionKey: 'interfaces.catalog.i_color_picker_swatches_emits.description',
    descriptionFallback: 'Emits fired by OrigamColorPickerSwatches — clicking a swatch tile pushes the colour up through the shared HSVA channel.',
    definition: `export interface IColorPickerSwatchesEmits extends IColorHsvEmits {}`,
    extends: ['IColorHsvEmits'],
    props: [],
    usedBy: [
        { slug: 'color-picker-swatches', name: 'ColorPickerSwatches', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ColorPicker/color-picker-swatches.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_color_picker_swatches_emits.example',
            titleFallback: 'Listening to swatch selection in the parent',
            code: `<OrigamColorPickerSwatches
    :color-hsv="hsva"
    @update:color-hsv="hsva = $event"
/>`,
            lang: 'vue',
        },
    ],
}
