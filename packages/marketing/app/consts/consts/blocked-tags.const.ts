import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BLOCKED_TAGS_CONST_DOC: IConstDoc = {
    slug: 'blocked-tags',
    name: 'BLOCKED_TAGS',
    category: 'Form & Input',
    descriptionKey: 'consts.catalog.blocked_tags.description',
    descriptionFallback: 'Tags whose entire subtree is removed (not just unwrapped) by the rich Textarea HTML sanitiser. Their inner text is also dropped. Mirrors the OWASP HTML Sanitizer "blocked content" list.',
    definition: `export const BLOCKED_TAGS: ReadonlyArray<string> = [
    'script', 'style', 'iframe', 'object', 'embed',
    'form', 'svg', 'math', 'link', 'meta', 'base'
]`,
    values: [
        { value: "'script'", descriptionKey: 'consts.detail.blocked_tags.script', descriptionFallback: 'JavaScript execution — fully removed.' },
        { value: "'style'", descriptionKey: 'consts.detail.blocked_tags.style', descriptionFallback: 'Inline stylesheet injection — fully removed.' },
        { value: "'iframe'", descriptionKey: 'consts.detail.blocked_tags.iframe', descriptionFallback: 'Frame embedding — fully removed.' },
        { value: "'object', 'embed'", descriptionKey: 'consts.detail.blocked_tags.object', descriptionFallback: 'Plugin embeds — fully removed.' },
        { value: "'form'", descriptionKey: 'consts.detail.blocked_tags.form', descriptionFallback: 'Form nesting — fully removed.' },
        { value: "'svg', 'math'", descriptionKey: 'consts.detail.blocked_tags.svg', descriptionFallback: 'SVG / MathML content that can carry script — fully removed.' },
        { value: "'link', 'meta', 'base'", descriptionKey: 'consts.detail.blocked_tags.meta', descriptionFallback: 'Head metadata injection — fully removed.' },
    ],
    usedBy: [
        { name: 'OrigamTextarea' },
    ],
    sourceFile: 'packages/ds/src/consts/Textarea/textarea.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.blocked_tags.example',
            titleFallback: 'Checking if a tag is blocked',
            code: `import { BLOCKED_TAGS } from 'origam'

const isBlocked = (tag: string) => BLOCKED_TAGS.includes(tag)
// isBlocked('script') // true
// isBlocked('p')      // false`,
            lang: 'typescript',
        },
    ],
}
