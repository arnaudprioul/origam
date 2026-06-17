import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const FILE_TYPE_DOC: ITypeDoc = {
    slug: 'file',
    name: 'TFile',
    kind: 'type',
    category: 'Form & Input',
    descriptionKey: 'types.catalog.file.description',
    descriptionFallback: 'Model-value type for <OrigamFileField>. Accepts a single File object, an array of File objects, or null when no file is selected.',
    definition: `/**
 * Model-value type accepted by \`<OrigamFileField>\`.
 *
 * - \`File\`         — single-file mode (\`multiple\` is false or absent).
 * - \`Array<File>\`  — multi-file mode (\`multiple\` is true).
 * - \`null\`         — no file selected / cleared state.
 */
export type TFile = Array<File> | File | null`,
    values: [
        {
            value: 'File',
            descriptionKey: 'types.detail.file.single',
            descriptionFallback: 'A single browser File object — used when the multiple prop is false (default).',
        },
        {
            value: 'Array<File>',
            descriptionKey: 'types.detail.file.array',
            descriptionFallback: 'An array of File objects — used when the multiple prop is true.',
        },
        {
            value: 'null',
            descriptionKey: 'types.detail.file.null',
            descriptionFallback: 'No file is currently selected, or the selection has been cleared.',
        },
    ],
    usedBy: [
        { slug: 'file-field', name: 'FileField', propName: 'modelValue' },
    ],
    sourceFile: 'packages/ds/src/types/FileField/file-field.type.ts',
    examples: [
        {
            titleKey: 'types.detail.file.example_single',
            titleFallback: 'Single-file v-model',
            code: `<script setup lang="ts">
import type { TFile } from 'origam'
import { ref } from 'vue'

const selectedFile = ref<TFile>(null)
</script>

<template>
  <origam-file-field v-model="selectedFile" label="Upload document" />
</template>`,
            lang: 'vue',
        },
        {
            titleKey: 'types.detail.file.example_multiple',
            titleFallback: 'Multi-file v-model',
            code: `<script setup lang="ts">
import type { TFile } from 'origam'
import { ref } from 'vue'

const files = ref<TFile>(null)
</script>

<template>
  <origam-file-field v-model="files" multiple label="Upload images" />
</template>`,
            lang: 'vue',
        },
    ],
}
