import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const FILE_SIZE_TYPE_DOC: ITypeDoc = {
    slug: 'file-size',
    name: 'TFileSize',
    kind: 'type',
    category: 'Form & Input',
    descriptionKey: 'types.catalog.file_size.description',
    descriptionFallback: 'Controls whether and how file sizes are displayed in <OrigamFileField>. Accepts a boolean toggle or a numeric unit divisor (1000 for SI units, 1024 for binary units).',
    definition: `/**
 * Controls whether and how file sizes are rendered inside
 * \`<OrigamFileField>\`.
 *
 * - \`false\`  — do not show file sizes (default when \`showSize\` is omitted).
 * - \`true\`   — show file sizes using the default divisor (1000 / SI: KB, MB, GB).
 * - \`1000\`   — explicit SI units (KB = 1 000 bytes, MB = 1 000 000 bytes).
 * - \`1024\`   — binary / IEC units (KiB = 1 024 bytes, MiB = 1 048 576 bytes).
 */
export type TFileSize = boolean | 1000 | 1024`,
    values: [
        {
            value: 'false',
            descriptionKey: 'types.detail.file_size.false',
            descriptionFallback: 'File sizes are not displayed. This is the default behaviour when the showSize prop is omitted.',
        },
        {
            value: 'true',
            descriptionKey: 'types.detail.file_size.true',
            descriptionFallback: 'File sizes are displayed using the SI divisor (1 000) — KB, MB, GB.',
        },
        {
            value: '1000',
            descriptionKey: 'types.detail.file_size.1000',
            descriptionFallback: 'Explicit SI (decimal) units: 1 KB = 1 000 bytes, 1 MB = 1 000 000 bytes. Matches the marketing convention used by most storage providers.',
        },
        {
            value: '1024',
            descriptionKey: 'types.detail.file_size.1024',
            descriptionFallback: 'Binary / IEC units: 1 KiB = 1 024 bytes, 1 MiB = 1 048 576 bytes. Traditional computing convention; more accurate for OS-reported file sizes.',
        },
    ],
    usedBy: [
        { slug: 'file-field', name: 'FileField', propName: 'showSize' },
    ],
    sourceFile: 'packages/ds/src/types/FileField/file-field.type.ts',
    examples: [
        {
            titleKey: 'types.detail.file_size.example_si',
            titleFallback: 'Show size with SI units (default)',
            code: `<origam-file-field
  v-model="files"
  multiple
  :show-size="true"
  label="Attachments"
/>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.file_size.example_binary',
            titleFallback: 'Show size with binary / IEC units',
            code: `<origam-file-field
  v-model="files"
  multiple
  :show-size="1024"
  label="Attachments"
/>`,
            lang: 'html',
        },
    ],
}
