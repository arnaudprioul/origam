import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FILE_FIELD_DRAG_N_DROP_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-file-field-drag-n-drop-item-props',
    name: 'IFileFieldDragNDropItemProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_file_field_drag_n_drop_item_props.description',
    descriptionFallback: 'Props for the individual drag-and-drop file card rendered inside the FileField dropzone — exposes the file object, its index, upload progress, icon overrides, and disabled/readonly/showSize flags.',
    definition: `export interface IFileFieldDragNDropItemProps extends ICommonsComponentProps, IColorProps {
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
        { name: 'file', type: 'File', optional: false, descriptionFallback: 'The native File object this card represents.' },
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Zero-based index of the file in the selection.' },
        { name: 'progress', type: 'number', optional: true, descriptionFallback: 'Upload progress from 0 to 100. Drives an internal OrigamProgress bar.' },
        { name: 'fileIcon', type: 'string', optional: true, descriptionFallback: 'Override the default file icon shown on the card.' },
        { name: 'removeIcon', type: 'string', optional: true, descriptionFallback: 'Override the default remove/delete icon.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disable interaction with this file card.' },
        { name: 'readonly', type: 'boolean', optional: true, descriptionFallback: 'Render the card in a read-only state (no remove action).' },
        { name: 'showSize', type: 'boolean | 1000 | 1024', optional: true, descriptionFallback: 'Display the file size. Pass 1000 for SI units (kB) or 1024 for binary units (KiB).' },
    ],
    usedBy: [
        { slug: 'file-field', name: 'FileField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/FileField/file-field-dragndrop-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_file_field_drag_n_drop_item_props.example',
            titleFallback: 'Dropzone item with progress and size',
            code: `<OrigamFileFieldDragNDropItem
    :file="myFile"
    :index="0"
    :progress="42"
    :show-size="1024"
/>`,
            lang: 'vue',
        },
    ],
}
