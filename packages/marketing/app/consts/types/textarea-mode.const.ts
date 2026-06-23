import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const TEXTAREA_MODE_TYPE_DOC: ITypeDoc = {
    slug: 'textarea-mode',
    name: 'TTextareaMode',
    kind: 'type',
    category: 'Form & Input',
    descriptionKey: 'types.catalog.textarea_mode.description',
    descriptionFallback: 'Render mode for OrigamTextareaField — plain keeps the legacy textarea element while rich swaps it for a contenteditable surface with formatting support.',
    definition: `export type TTextareaMode = \`\${TEXTAREA_MODE}\`

// Where TEXTAREA_MODE is:
export enum TEXTAREA_MODE {
    PLAIN = 'plain',
    RICH  = 'rich'
}`,
    values: [
        {
            value: 'plain',
            descriptionKey: 'types.detail.textarea_mode.plain',
            descriptionFallback: 'Keeps the legacy <textarea> element. The v-model contract is a raw string. No toolbar is rendered.',
        },
        {
            value: 'rich',
            descriptionKey: 'types.detail.textarea_mode.rich',
            descriptionFallback: 'Swaps the textarea for a contenteditable surface wrapped by the Field shell. The v-model becomes sanitised HTML or Markdown depending on the output prop.',
        },
    ],
    usedBy: [
        { slug: 'textarea-field', name: 'TextareaField', propName: 'mode' },
    ],
    sourceFile: 'packages/ds/src/enums/Textarea/textarea-mode.enum.ts',
    examples: [
        {
            titleKey: 'types.detail.textarea_mode.example',
            titleFallback: 'Rich text textarea with toolbar',
            code: `<origam-textarea-field
  v-model="content"
  mode="rich"
  output="html"
  toolbar-position="top"
  label="Description"
/>`,
            lang: 'html',
        },
    ],
}
