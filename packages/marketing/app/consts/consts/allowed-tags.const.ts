import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ALLOWED_TAGS_CONST_DOC: IConstDoc = {
    slug: 'allowed-tags',
    name: 'ALLOWED_TAGS',
    category: 'Form & Input',
    descriptionKey: 'consts.catalog.allowed_tags.description',
    descriptionFallback: 'Tags retained by the rich Textarea HTML sanitiser. Anything outside this allowlist is unwrapped (children preserved, parent tag dropped). Scripts and dangerous containers are instead fully removed via BLOCKED_TAGS.',
    definition: `export const ALLOWED_TAGS: ReadonlyArray<string> = [
    'p', 'br', 'strong', 'b', 'em', 'i', 'u',
    'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'code'
]`,
    values: [
        { value: "'p'", descriptionKey: 'consts.detail.allowed_tags.p', descriptionFallback: 'Paragraph tag.' },
        { value: "'br'", descriptionKey: 'consts.detail.allowed_tags.br', descriptionFallback: 'Line break.' },
        { value: "'strong', 'b'", descriptionKey: 'consts.detail.allowed_tags.bold', descriptionFallback: 'Bold emphasis.' },
        { value: "'em', 'i'", descriptionKey: 'consts.detail.allowed_tags.italic', descriptionFallback: 'Italic emphasis.' },
        { value: "'u'", descriptionKey: 'consts.detail.allowed_tags.underline', descriptionFallback: 'Underline.' },
        { value: "'a'", descriptionKey: 'consts.detail.allowed_tags.a', descriptionFallback: 'Hyperlink.' },
        { value: "'ul', 'ol', 'li'", descriptionKey: 'consts.detail.allowed_tags.list', descriptionFallback: 'Unordered / ordered list and list items.' },
        { value: "'h1', 'h2', 'h3'", descriptionKey: 'consts.detail.allowed_tags.headings', descriptionFallback: 'Heading levels 1–3.' },
        { value: "'code'", descriptionKey: 'consts.detail.allowed_tags.code', descriptionFallback: 'Inline code.' },
    ],
    usedBy: [
        { name: 'OrigamTextarea' },
    ],
    sourceFile: 'packages/ds/src/consts/Textarea/textarea.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.allowed_tags.example',
            titleFallback: 'Checking if a tag is allowed',
            code: `import { ALLOWED_TAGS } from 'origam'

const isSafe = (tag: string) => ALLOWED_TAGS.includes(tag)
// isSafe('strong') // true
// isSafe('script') // false`,
            lang: 'typescript',
        },
    ],
}
