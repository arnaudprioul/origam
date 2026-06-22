import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PICKER_TITLE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-picker-title-props',
    name: 'IPickerTitleProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_picker_title_props.description',
    descriptionFallback: 'Props contract for <OrigamPickerTitle>. Extends common component, tag, color and bgColor contracts with a title string prop for the picker header.',
    definition: `export interface IPickerTitleProps extends ICommonsComponentProps, ITagProps, IColorProps, IBgColorProps {
    title?: string
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IColorProps', 'IBgColorProps'],
    props: [
        { name: 'title', type: 'string', optional: true, descriptionFallback: 'Text rendered in the picker header bar.' },
    ],
    usedBy: [
        { slug: 'picker-title', name: 'PickerTitle', kind: 'component' },
        { slug: 'picker', name: 'Picker', kind: 'component' },
        { slug: 'date-picker', name: 'DatePicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Picker/picker-title.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_picker_title_props.example',
            titleFallback: 'Standalone picker title with custom color',
            code: `<origam-picker-title
    title="Select a date"
    color="primary"
    bg-color="surface-variant"
/>`,
            lang: 'html',
        },
    ],
}
