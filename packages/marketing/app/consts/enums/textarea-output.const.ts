import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const TEXTAREA_OUTPUT_ENUM_DOC: IEnumDoc = {
    slug: 'textarea-output',
    name: 'TEXTAREA_OUTPUT',
    category: 'Form & Input',
    descriptionKey: 'enums.catalog.textarea_output.description',
    descriptionFallback: 'TypeScript enum for the serialisation format of the rich-text textarea v-model — HTML or Markdown.',
    definition: `export enum TEXTAREA_OUTPUT {
    HTML     = 'html',
    MARKDOWN = 'markdown',
}`,
    values: [
        { value: 'TEXTAREA_OUTPUT.HTML', descriptionKey: 'enums.detail.textarea_output.html', descriptionFallback: 'Emits sanitised HTML (allowlisted tags, attributes and URL schemes).' },
        { value: 'TEXTAREA_OUTPUT.MARKDOWN', descriptionKey: 'enums.detail.textarea_output.markdown', descriptionFallback: 'Emits CommonMark-flavoured Markdown (bold, italic, links, lists, headings, code). Underline is preserved verbatim.' },
    ],
    usedBy: [
        { slug: 'textarea-field', name: 'TextareaField', propName: 'output' },
    ],
    sourceFile: 'packages/ds/src/enums/Textarea/textarea-output.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.textarea_output.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { TEXTAREA_MODE, TEXTAREA_OUTPUT } from 'origam'

const mode: TEXTAREA_MODE = TEXTAREA_MODE.RICH
const output: TEXTAREA_OUTPUT = TEXTAREA_OUTPUT.MARKDOWN`,
            lang: 'typescript',
        },
    ],
}
