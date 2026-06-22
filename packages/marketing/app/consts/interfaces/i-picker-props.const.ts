import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PICKER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-picker-props',
    name: 'IPickerProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_picker_props.description',
    descriptionFallback: 'Props contract for <OrigamPicker>. Extends ISheetProps, IBgColorProps and IPickerTitleProps with layout flags for landscape orientation and optional header visibility.',
    definition: `export interface IPickerProps extends ISheetProps, IBgColorProps, IPickerTitleProps {
    landscape?: boolean
    hideHeader?: boolean
}`,
    extends: ['ISheetProps', 'IBgColorProps', 'IPickerTitleProps'],
    props: [
        { name: 'landscape', type: 'boolean', optional: true, descriptionFallback: 'Render the picker in landscape orientation (header on the left side).' },
        { name: 'hideHeader', type: 'boolean', optional: true, descriptionFallback: 'Hide the picker header section entirely.' },
    ],
    usedBy: [
        { slug: 'picker', name: 'Picker', kind: 'component' },
        { slug: 'date-picker', name: 'DatePicker', kind: 'component' },
        { slug: 'time-picker', name: 'TimePicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Picker/picker.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_picker_props.example',
            titleFallback: 'Using a landscape picker',
            code: `<origam-date-picker
    v-model="date"
    :landscape="true"
    bg-color="surface"
/>`,
            lang: 'html',
        },
    ],
}
