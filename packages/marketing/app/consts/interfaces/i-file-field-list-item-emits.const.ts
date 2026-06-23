import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FILE_FIELD_LIST_ITEM_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-file-field-list-item-emits',
    name: 'IFileFieldListItemEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_file_field_list_item_emits.description',
    descriptionFallback: 'Emit contract for the list-style file item card — fires click:remove when the user removes a file.',
    definition: `export interface IFileFieldListItemEmits {
    (e: 'click:remove', value: { file: File, index: number }): void
}`,
    extends: [],
    props: [
        { name: 'click:remove', type: '(e: "click:remove", value: { file: File, index: number }) => void', optional: false, descriptionFallback: 'Emitted when the remove icon of this file list item is clicked.' },
    ],
    usedBy: [
        { slug: 'file-field', name: 'FileField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/FileField/file-field-list-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_file_field_list_item_emits.example',
            titleFallback: 'Handling file removal in a list item',
            code: `<OrigamFileFieldListItem
    :file="file"
    :index="0"
    @click:remove="({ file, index }) => removeFile(index)"
/>`,
            lang: 'vue',
        },
    ],
}
