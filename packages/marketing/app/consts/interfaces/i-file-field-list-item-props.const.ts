import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FILE_FIELD_LIST_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-file-field-list-item-props',
    name: 'IFileFieldListItemProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_file_field_list_item_props.description',
    descriptionFallback: 'Props for the list-style file item card rendered inside FileField — mirrors IFileFieldDragNDropItemProps with the same file, index, progress, icon overrides and showSize options.',
    definition: `export interface IFileFieldListItemProps extends ICommonsComponentProps, IColorProps {
    file: File
    index: number
    progress?: number
    fileIcon?: string
    removeIcon?: string
    disabled?: boolean
    readonly?: boolean
    showSize?: boolean | 1000 | 1024
}`,
    extends: ['ICommonsComponentProps', 'IColorProps'],
    props: [
        { name: 'file', type: 'File', optional: false, descriptionFallback: 'The native File object this list item represents.' },
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Zero-based index of the file in the selection.' },
        { name: 'progress', type: 'number', optional: true, descriptionFallback: 'Upload progress from 0 to 100.' },
        { name: 'fileIcon', type: 'string', optional: true, descriptionFallback: 'Override the default file type icon.' },
        { name: 'removeIcon', type: 'string', optional: true, descriptionFallback: 'Override the default remove icon.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disable interaction with this list item.' },
        { name: 'readonly', type: 'boolean', optional: true, descriptionFallback: 'Render in read-only mode (no remove action).' },
        { name: 'showSize', type: 'boolean | 1000 | 1024', optional: true, descriptionFallback: 'Display the file size. Pass 1000 for SI units (kB) or 1024 for binary units (KiB).' },
    ],
    usedBy: [
        { slug: 'file-field', name: 'FileField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/FileField/file-field-list-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_file_field_list_item_props.example',
            titleFallback: 'List item with progress and binary size display',
            code: `<OrigamFileFieldListItem
    :file="myFile"
    :index="0"
    :progress="75"
    :show-size="1024"
/>`,
            lang: 'vue',
        },
    ],
}
