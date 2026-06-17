import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const FILE_FIELD_DISPLAY_TYPE_DOC: ITypeDoc = {
    slug: 'file-field-display',
    name: 'TFileFieldDisplay',
    kind: 'type',
    category: 'Form & Input',
    descriptionKey: 'types.catalog.file_field_display.description',
    descriptionFallback: 'Controls how a multi-file selection is rendered inside <OrigamFileField>.',
    definition: `/**
 * How a multi-file selection is rendered.
 *   - \`'list'\`    (default) — vertical card stack under the field.
 *   - \`'chips'\`   — each file as a closable \`<OrigamChip>\` inline.
 *   - \`'counter'\` — single "N files" line + an \`<OrigamCounter>\`.
 */
export type TFileFieldDisplay = 'list' | 'chips' | 'counter'`,
    values: [
        {
            value: 'list',
            descriptionKey: 'types.detail.file_field_display.list',
            descriptionFallback: 'Default. Renders each selected file as a card in a vertical stack below the field. Suitable when filenames and per-file actions (remove, download, progress) need to be visible.',
        },
        {
            value: 'chips',
            descriptionKey: 'types.detail.file_field_display.chips',
            descriptionFallback: 'Renders each selected file as a closable <OrigamChip> inline inside the field. Compact mode — best for forms where many files can be selected but vertical space is limited.',
        },
        {
            value: 'counter',
            descriptionKey: 'types.detail.file_field_display.counter',
            descriptionFallback: 'Shows a single "N files selected" line with an <OrigamCounter>. Most compact mode — use when the file names are irrelevant to the user after selection.',
        },
    ],
    usedBy: [
        { slug: 'file-field', name: 'FileField', propName: 'display' },
    ],
    sourceFile: 'packages/ds/src/types/FileField/file-field.type.ts',
    examples: [
        {
            titleKey: 'types.detail.file_field_display.example_list',
            titleFallback: 'List display (default)',
            code: `<origam-file-field
  v-model="files"
  multiple
  display="list"
  label="Attachments"
/>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.file_field_display.example_chips',
            titleFallback: 'Chips display',
            code: `<origam-file-field
  v-model="files"
  multiple
  display="chips"
  label="Images"
/>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.file_field_display.example_counter',
            titleFallback: 'Counter display',
            code: `<origam-file-field
  v-model="files"
  multiple
  display="counter"
  label="Documents"
/>`,
            lang: 'html',
        },
    ],
}
