import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COLOR_PICKER_PREVIEW_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-color-picker-preview-emits',
    name: 'IColorPickerPreviewEmits',
    category: 'Color',
    descriptionKey: 'interfaces.catalog.i_color_picker_preview_emits.description',
    descriptionFallback: 'Emits fired by OrigamColorPickerPreview — the alpha slider pushes HSVA updates through the shared IColorHsvEmits channel.',
    definition: `export interface IColorPickerPreviewEmits extends IColorHsvEmits {}`,
    extends: ['IColorHsvEmits'],
    props: [],
    usedBy: [
        { slug: 'color-picker-preview', name: 'ColorPickerPreview', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ColorPicker/color-picker-preview.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_color_picker_preview_emits.example',
            titleFallback: 'Listening to preview alpha changes in the parent',
            code: `<OrigamColorPickerPreview
    :color-hsv="hsva"
    @update:color-hsv="hsva = $event"
/>`,
            lang: 'vue',
        },
    ],
}
