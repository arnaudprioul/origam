import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const TEXTAREA_MODE_ENUM_DOC: IEnumDoc = {
    slug: 'textarea-mode',
    name: 'TEXTAREA_MODE',
    category: 'Form & Input',
    descriptionKey: 'enums.catalog.textarea_mode.description',
    descriptionFallback: 'TypeScript enum for the render mode of OrigamTextareaField — plain (legacy textarea) or rich (contenteditable).',
    definition: `export enum TEXTAREA_MODE {
    PLAIN = 'plain',
    RICH  = 'rich',
}`,
    values: [
        { value: 'TEXTAREA_MODE.PLAIN', descriptionKey: 'enums.detail.textarea_mode.plain', descriptionFallback: 'Legacy mode — uses a native <textarea> element with a raw string v-model.' },
        { value: 'TEXTAREA_MODE.RICH', descriptionKey: 'enums.detail.textarea_mode.rich', descriptionFallback: 'Rich text mode — uses a contenteditable surface; v-model emits sanitised HTML or Markdown depending on the output prop.' },
    ],
    usedBy: [
        { slug: 'textarea-field', name: 'TextareaField', propName: 'mode' },
    ],
    sourceFile: 'packages/ds/src/enums/Textarea/textarea-mode.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.textarea_mode.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { TEXTAREA_MODE } from 'origam'

const mode: TEXTAREA_MODE = TEXTAREA_MODE.RICH`,
            lang: 'typescript',
        },
    ],
}
