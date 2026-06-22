import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FILE_FIELD_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-file-field-emits',
    name: 'IFileFieldEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_file_field_emits.description',
    descriptionFallback: 'Emit contract for OrigamFileField — extends IFieldEmits and IInputEmits with file-specific events: control clicks, remove, download, drop and max-size error.',
    definition: `export interface IFileFieldEmits extends IFieldEmits, IInputEmits {
    (e: 'click:control', value: MouseEvent): void
    (e: 'mousedown:control', value: MouseEvent): void
    (e: 'click:remove', value: { file: File, index: number }): void
    (e: 'click:download', value: { file: File, index: number }): void
    (e: 'drop', value: { files: Array<File>, event: DragEvent }): void
    (e: 'error:max-size', value: { files: Array<File>, maxFileSize: number, message: Array<string> }): void
}`,
    extends: ['IFieldEmits', 'IInputEmits'],
    props: [
        { name: 'click:control', type: '(e: "click:control", value: MouseEvent) => void', optional: false, descriptionFallback: 'Emitted when the field control area is clicked.' },
        { name: 'mousedown:control', type: '(e: "mousedown:control", value: MouseEvent) => void', optional: false, descriptionFallback: 'Emitted on mousedown inside the field control area.' },
        { name: 'click:remove', type: '(e: "click:remove", value: { file: File, index: number }) => void', optional: false, descriptionFallback: 'Emitted when the remove icon of a file item is clicked.' },
        { name: 'click:download', type: '(e: "click:download", value: { file: File, index: number }) => void', optional: false, descriptionFallback: 'Emitted when the download icon of a file item is clicked.' },
        { name: 'drop', type: '(e: "drop", value: { files: Array<File>, event: DragEvent }) => void', optional: false, descriptionFallback: 'Emitted when files are dropped onto the dropzone.' },
        { name: 'error:max-size', type: '(e: "error:max-size", value: { files: Array<File>, maxFileSize: number, message: Array<string> }) => void', optional: false, descriptionFallback: 'Emitted when one or more dropped files exceed the maxFileSize limit.' },
    ],
    usedBy: [
        { slug: 'file-field', name: 'FileField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/FileField/file-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_file_field_emits.example',
            titleFallback: 'Handling drop and max-size error',
            code: `<OrigamFileField
    :max-file-size="5_000_000"
    @drop="({ files }) => console.log(files)"
    @error:max-size="({ message }) => alert(message.join(', '))"
/>`,
            lang: 'vue',
        },
    ],
}
