import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const TEXTAREA_OUTPUT_TYPE_DOC: ITypeDoc = {
    slug: 'textarea-output',
    name: 'TTextareaOutput',
    kind: 'type',
    category: 'Form & Input',
    descriptionKey: 'types.catalog.textarea_output.description',
    descriptionFallback: 'Output format of the rich-text textarea — controls how the editor DOM is serialised back into the v-model string.',
    definition: `export type TTextareaOutput = \`\${TEXTAREA_OUTPUT}\`

// Where TEXTAREA_OUTPUT is:
export enum TEXTAREA_OUTPUT {
    HTML     = 'html',
    MARKDOWN = 'markdown'
}`,
    values: [
        {
            value: 'html',
            descriptionKey: 'types.detail.textarea_output.html',
            descriptionFallback: 'Emits sanitised HTML (allowlist on tags, attributes and URL schemes). Preserves rich formatting such as bold, italic, links and lists.',
        },
        {
            value: 'markdown',
            descriptionKey: 'types.detail.textarea_output.markdown',
            descriptionFallback: 'Emits a CommonMark-flavoured subset (bold, italic, links, lists, headings, code). The <u> tag is preserved verbatim because vanilla Markdown has no underline syntax.',
        },
    ],
    usedBy: [
        { slug: 'textarea', name: 'Textarea', propName: 'output' },
    ],
    sourceFile: 'packages/ds/src/enums/Textarea/textarea-output.enum.ts',
    examples: [
        {
            titleKey: 'types.detail.textarea_output.example',
            titleFallback: 'Choosing Markdown output',
            code: `<origam-textarea output="markdown" v-model="content" />`,
            lang: 'html',
        },
    ],
}
