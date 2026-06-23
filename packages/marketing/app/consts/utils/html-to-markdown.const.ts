import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HTML_TO_MARKDOWN_UTIL_DOC: IUtilDoc = {
    slug: 'html-to-markdown',
    name: 'htmlToMarkdown',
    category: 'Textarea',
    icon: 'mdi-language-markdown',
    descriptionKey: 'utils.catalog.html_to_markdown.description',
    descriptionFallback: 'Converts a pre-sanitised HTML string (as produced by OrigamTextareaField in rich mode) to a Markdown string. Only the subset of tags emitted by the rich toolbar is translated; everything else is unwrapped and its text content kept.',
    signature: 'function htmlToMarkdown(input: string): string',
    params: [
        {
            name: 'input',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.html_to_markdown.param_input',
            descriptionFallback: 'A pre-sanitised HTML string. Null, empty string, and non-string values are returned as an empty string. If DOMParser is unavailable (SSR), the input is returned as-is.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.html_to_markdown.returns',
        descriptionFallback: 'The Markdown representation of the HTML content. Returns an empty string when input is null or empty.',
    },
    sourceFile: 'packages/ds/src/utils/Textarea/html-to-markdown.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.html_to_markdown.example_basic',
            titleFallback: 'Convert bold and italic HTML',
            code: `import { htmlToMarkdown } from 'origam'

htmlToMarkdown('<strong>Bold</strong> and <em>italic</em>')
// → '**Bold** and *italic*'

htmlToMarkdown('<ul><li>One</li><li>Two</li></ul>')
// → '- One\\n- Two'`,
            lang: 'typescript',
        },
    ],
    related: ['sanitize-html'],
}
