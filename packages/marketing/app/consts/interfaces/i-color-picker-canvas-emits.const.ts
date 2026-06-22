import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COLOR_PICKER_CANVAS_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-color-picker-canvas-emits',
    name: 'IColorPickerCanvasEmits',
    category: 'Color',
    descriptionKey: 'interfaces.catalog.i_color_picker_canvas_emits.description',
    descriptionFallback: 'Emits fired by OrigamColorPickerCanvas — drag and click interactions push HSVA colour updates up through the shared IColorHsvEmits channel.',
    definition: `export interface IColorPickerCanvasEmits extends IColorHsvEmits {}`,
    extends: ['IColorHsvEmits'],
    props: [],
    usedBy: [
        { slug: 'color-picker-canvas', name: 'ColorPickerCanvas', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ColorPicker/color-picker-canvas.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_color_picker_canvas_emits.example',
            titleFallback: 'Listening to canvas colour changes in the parent',
            code: `<OrigamColorPickerCanvas
    :color-hsv="hsva"
    @update:color-hsv="hsva = $event"
/>`,
            lang: 'vue',
        },
    ],
}
