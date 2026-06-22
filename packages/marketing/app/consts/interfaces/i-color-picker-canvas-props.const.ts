import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COLOR_PICKER_CANVAS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-color-picker-canvas-props',
    name: 'IColorPickerCanvasProps',
    category: 'Color',
    descriptionKey: 'interfaces.catalog.i_color_picker_canvas_props.description',
    descriptionFallback: 'Props for OrigamColorPickerCanvas — the 2-D saturation/brightness gradient surface that the user drags to pick a colour.',
    definition: `export interface IColorPickerCanvasProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    dotSize?: string | number
    ariaLabel?: string
}`,
    extends: ['ICommonsComponentProps', 'IDimensionProps'],
    props: [
        { name: 'colorHsv', type: 'THSVA | null', optional: true, descriptionFallback: 'The current colour as an HSVA tuple. The canvas renders the gradient for the active hue and positions the thumb at the corresponding saturation/brightness.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Prevent user interaction with the canvas.' },
        { name: 'dotSize', type: 'string | number', optional: true, descriptionFallback: 'Diameter of the draggable thumb indicator. Number → px.' },
        { name: 'ariaLabel', type: 'string', optional: true, descriptionFallback: 'Accessible label for the canvas drag area (used by screen readers).' },
    ],
    usedBy: [
        { slug: 'color-picker-canvas', name: 'ColorPickerCanvas', kind: 'component' },
        { slug: 'color-picker', name: 'ColorPicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ColorPicker/color-picker-canvas.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_color_picker_canvas_props.example',
            titleFallback: 'Standalone canvas with controlled HSVA',
            code: `<OrigamColorPickerCanvas
    :color-hsv="{ h: 200, s: 0.8, v: 0.9, a: 1 }"
    :dot-size="14"
    @update:color-hsv="onHsvChange"
/>`,
            lang: 'vue',
        },
    ],
}
