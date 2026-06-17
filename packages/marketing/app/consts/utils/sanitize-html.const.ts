import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const SANITIZE_HTML_UTIL_DOC: IUtilDoc = {
    slug: 'sanitize-html',
    name: 'sanitizeHtml',
    category: 'Textarea',
    icon: 'mdi-shield-check',
    descriptionKey: 'utils.catalog.sanitize_html.description',
    descriptionFallback: 'Walk a DOMParser-parsed tree and remove disallowed tags, attributes, and event handlers. Returns the cleaned HTML string. SSR-safe: returns the raw input when DOMParser is unavailable.',
    signature: `function sanitizeHtml(input: string): string`,
    params: [
        {
            name: 'input',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.sanitize_html.param_input',
            descriptionFallback: 'The raw HTML string to sanitise. Null or empty string returns an empty string immediately.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.sanitize_html.returns',
        descriptionFallback: 'The sanitised HTML string with all blocked tags, unknown attributes, and on* handlers removed.',
    },
    sourceFile: 'packages/ds/src/utils/Textarea/sanitize-html.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.sanitize_html.example_basic',
            titleFallback: 'Strip script tags and event handlers',
            code: `import { sanitizeHtml } from 'origam'

sanitizeHtml('<p onclick="alert(1)">Hello</p><script>evil()</script>')
// → '<p>Hello</p>'

sanitizeHtml('<b>Bold</b> and <em>italic</em>')
// → '<b>Bold</b> and <em>italic</em>'`,
            lang: 'typescript',
        },
    ],
    related: [],
    noteKey: 'utils.detail.sanitize_html.note',
    noteFallback: 'Used internally by OrigamTextareaField in mode="rich". The allowlist is defined by ALLOWED_TAGS, ALLOWED_ATTRIBUTES, BLOCKED_TAGS, and ALLOWED_URL_SCHEMES constants in the DS.',
}
