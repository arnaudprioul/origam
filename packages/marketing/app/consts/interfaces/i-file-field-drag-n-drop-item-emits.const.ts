import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FILE_FIELD_DRAG_N_DROP_ITEM_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-file-field-drag-n-drop-item-emits',
    name: 'IFileFieldDragNDropItemEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_file_field_drag_n_drop_item_emits.description',
    descriptionFallback: 'Emit contract for the drag-and-drop file item — fires click:remove when the user removes a file from the drop zone.',
    definition: `export interface IFileFieldDragNDropItemEmits {
    (e: 'click:remove', value: { file: File, index: number }): void
}`,
    extends: [],
    props: [
        {
            name: 'click:remove',
            type: "(e: 'click:remove', value: { file: File, index: number }) => void",
            optional: false,
            descriptionFallback: 'Emitted when the user clicks the remove button on a drag-and-drop file item. Carries the File object and its index in the list.',
        },
    ],
    usedBy: [
        { slug: 'file-field', name: 'FileField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/FileField/file-field-dragndrop-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_file_field_drag_n_drop_item_emits.example',
            titleFallback: 'Listening to the remove event on a drag-and-drop file item',
            code: `<OrigamFileField
    dragndrop
    @click:remove="({ file, index }) => removeFile(index)"
/>`,
            lang: 'vue',
        },
    ],
}
