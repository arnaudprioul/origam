import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FILE_FIELD_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-file-field-slots',
    name: 'IFileFieldSlots',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_file_field_slots.description',
    descriptionFallback: 'Slot signatures for OrigamFileField — extends IFieldSlots and IInputSlots with file-specific slots: counter, field, dropzone, item, chip and selection.',
    definition: `export interface IFileFieldSlots extends IFieldSlots, Omit<IInputSlots, 'default'> {
    counter?: (data: { counter: string, value: string | number, max?: string | number }) => any
    field?: (data: { id: string, isDisabled: boolean, isDirty: boolean, isValid: boolean, isReadonly: boolean }) => any
    dropzone?: (data: { isDragging: boolean, browse: () => void }) => any
    item?: (data: { file: File, index: number, progress: number, remove: () => void, download: () => void }) => any
    chip?: (data: { fileNames: string, totalBytes: number, totalBytesReadable: string, props: Record<string, any> }) => any
    selection?: () => any
}`,
    extends: ['IFieldSlots', 'IInputSlots'],
    props: [
        { name: 'counter', type: '(data: { counter: string, value: string | number, max?: string | number }) => any', optional: true, descriptionFallback: 'Custom counter display.' },
        { name: 'field', type: '(data: { id: string, isDisabled: boolean, isDirty: boolean, isValid: boolean, isReadonly: boolean }) => any', optional: true, descriptionFallback: 'Replace the inner field content.' },
        { name: 'dropzone', type: '(data: { isDragging: boolean, browse: () => void }) => any', optional: true, descriptionFallback: 'Custom dropzone content — isDragging reflects drag-over state, browse() opens the file picker.' },
        { name: 'item', type: '(data: { file: File, index: number, progress: number, remove: () => void, download: () => void }) => any', optional: true, descriptionFallback: 'Custom list item renderer for each selected file.' },
        { name: 'chip', type: '(data: { fileNames: string, totalBytes: number, totalBytesReadable: string, props: Record<string, any> }) => any', optional: true, descriptionFallback: 'Custom chip renderer when display="chips".' },
        { name: 'selection', type: '() => any', optional: true, descriptionFallback: 'Fully replace the selected-files display area.' },
    ],
    usedBy: [
        { slug: 'file-field', name: 'FileField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/FileField/file-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_file_field_slots.example',
            titleFallback: 'Custom dropzone slot with drag indicator',
            code: `<OrigamFileField v-model="files" dropzone>
    <template #dropzone="{ isDragging, browse }">
        <div :class="{ dragging: isDragging }" @click="browse">
            Drop files here or click to browse
        </div>
    </template>
</OrigamFileField>`,
            lang: 'vue',
        },
    ],
}
