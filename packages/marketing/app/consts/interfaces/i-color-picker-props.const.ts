import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COLOR_PICKER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-color-picker-props',
    name: 'IColorPickerProps',
    category: 'Color',
    descriptionKey: 'interfaces.catalog.i_color_picker_props.description',
    descriptionFallback: 'Props for OrigamColorPicker — a full-featured HSVA colour picker that composes Canvas, Preview, Edit and Swatches sub-components with optional sections controlled via hide* / show* flags.',
    definition: `export interface IColorPickerProps extends ICommonsComponentProps, IBorderProps, IRoundedProps, IElevationProps, IPaddingProps, IMarginProps, IPickerProps, IColorProps, IColorPickerCanvasProps, IColorPickerPreviewProps, IColorPickerEditProps, IColorPickerSwatchesProps {
    canvasHeight?: string | number
    canvasWidth?: string | number
    hideCanvas?: boolean
    hideSliders?: boolean
    hideInputs?: boolean
    showSwatches?: boolean
    swatchesMaxHeight?: string | number
    modelValue?: Record<string, unknown> | string | undefined | null
}`,
    extends: [
        'ICommonsComponentProps',
        'IBorderProps',
        'IRoundedProps',
        'IElevationProps',
        'IPaddingProps',
        'IMarginProps',
        'IPickerProps',
        'IColorProps',
        'IColorPickerCanvasProps',
        'IColorPickerPreviewProps',
        'IColorPickerEditProps',
        'IColorPickerSwatchesProps',
    ],
    props: [
        { name: 'canvasHeight', type: 'string | number', optional: true, descriptionFallback: 'Height of the 2-D canvas surface. Number → px.' },
        { name: 'canvasWidth', type: 'string | number', optional: true, descriptionFallback: 'Width of the 2-D canvas surface. Number → px.' },
        { name: 'hideCanvas', type: 'boolean', optional: true, descriptionFallback: 'Hide the saturation/brightness 2-D canvas.' },
        { name: 'hideSliders', type: 'boolean', optional: true, descriptionFallback: 'Hide the hue and alpha slider strip (preview row).' },
        { name: 'hideInputs', type: 'boolean', optional: true, descriptionFallback: 'Hide the text-field input row (edit area).' },
        { name: 'showSwatches', type: 'boolean', optional: true, descriptionFallback: 'Show the swatches palette.' },
        { name: 'swatchesMaxHeight', type: 'string | number', optional: true, descriptionFallback: 'Max height of the swatches section. Number → px.' },
        { name: 'modelValue', type: 'Record<string, unknown> | string | undefined | null', optional: true, descriptionFallback: 'The bound colour value — accepts an object (RGBA, HSVA, …) or a string (HEX, named colour). Synced via update:modelValue.' },
    ],
    usedBy: [
        { slug: 'color-picker', name: 'ColorPicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ColorPicker/color-picker.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_color_picker_props.example_basic',
            titleFallback: 'Basic colour picker with v-model',
            code: `<OrigamColorPicker v-model="color" />`,
            lang: 'vue',
        },
        {
            titleKey: 'interfaces.detail.i_color_picker_props.example_minimal',
            titleFallback: 'Minimal picker — canvas only, no inputs or swatches',
            code: `<OrigamColorPicker
    v-model="color"
    :hide-sliders="true"
    :hide-inputs="true"
/>`,
            lang: 'vue',
        },
    ],
}
