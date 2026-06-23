import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ALLOWED_ATTRIBUTES_CONST_DOC: IConstDoc = {
    slug: 'allowed-attributes',
    name: 'ALLOWED_ATTRIBUTES',
    category: 'Form & Input',
    descriptionKey: 'consts.catalog.allowed_attributes.description',
    descriptionFallback: 'Per-tag attribute allowlist used by the rich Textarea HTML sanitiser. Only the declared attributes survive sanitisation; all others are stripped. Values are still validated against URL-scheme and class-prefix rules downstream.',
    definition: `export const ALLOWED_ATTRIBUTES: Readonly<Record<string, ReadonlyArray<string>>> = {
    a: ['href', 'class'],
    p: ['class'],
    ul: ['class'],
    ol: ['class'],
    li: ['class'],
    h1: ['class'],
    h2: ['class'],
    h3: ['class'],
    code: ['class'],
    strong: ['class'],
    em: ['class'],
    u: ['class'],
    b: ['class'],
    i: ['class']
}`,
    values: [
        { value: "a: ['href', 'class']", descriptionKey: 'consts.detail.allowed_attributes.a', descriptionFallback: 'Links keep href and class.' },
        { value: "p: ['class']", descriptionKey: 'consts.detail.allowed_attributes.p', descriptionFallback: 'Paragraphs keep class only.' },
        { value: "ul: ['class'], ol: ['class'], li: ['class']", descriptionKey: 'consts.detail.allowed_attributes.lists', descriptionFallback: 'List elements keep class only.' },
        { value: "h1: ['class'], h2: ['class'], h3: ['class']", descriptionKey: 'consts.detail.allowed_attributes.headings', descriptionFallback: 'Headings keep class only.' },
        { value: "code: ['class']", descriptionKey: 'consts.detail.allowed_attributes.code', descriptionFallback: 'Code elements keep class only.' },
        { value: "strong: ['class'], em: ['class'], u: ['class'], b: ['class'], i: ['class']", descriptionKey: 'consts.detail.allowed_attributes.inline', descriptionFallback: 'Inline emphasis elements keep class only.' },
    ],
    usedBy: [
        { name: 'OrigamTextarea' },
    ],
    sourceFile: 'packages/ds/src/consts/Textarea/textarea.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.allowed_attributes.example',
            titleFallback: 'Checking which attributes are kept for a tag',
            code: `import { ALLOWED_ATTRIBUTES } from 'origam'

const kept = ALLOWED_ATTRIBUTES['a'] // ['href', 'class']`,
            lang: 'typescript',
        },
    ],
}
