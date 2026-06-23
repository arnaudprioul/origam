import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BLOCKQUOTE_DEFAULTS_CONST_DOC: IConstDoc = {
    slug: 'blockquote-defaults',
    name: 'BLOCKQUOTE_DEFAULTS',
    category: 'Typography',
    descriptionKey: 'consts.catalog.blockquote_defaults.description',
    descriptionFallback: 'Canonical default prop values for OrigamBlockquote. Centralised so consumers can reference them when authoring wrappers. Never referenced from withDefaults() itself.',
    definition: `export const BLOCKQUOTE_DEFAULTS = {
    variant: 'default' as TBlockquoteVariant,
    lang: 'auto' as TBlockquoteLang,
    tag: 'blockquote'
} as const`,
    values: [
        { value: "variant: 'default'", descriptionKey: 'consts.detail.blockquote_defaults.variant', descriptionFallback: 'The standard blockquote visual style.' },
        { value: "lang: 'auto'", descriptionKey: 'consts.detail.blockquote_defaults.lang', descriptionFallback: "Auto-detect language from the page's lang attribute." },
        { value: "tag: 'blockquote'", descriptionKey: 'consts.detail.blockquote_defaults.tag', descriptionFallback: 'Renders as a semantic <blockquote> element.' },
    ],
    usedBy: [
        { name: 'OrigamBlockquote' },
    ],
    sourceFile: 'packages/ds/src/consts/Blockquote/blockquote.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.blockquote_defaults.example',
            titleFallback: 'Overriding a single default',
            code: `import { BLOCKQUOTE_DEFAULTS } from 'origam'

const myConfig = { ...BLOCKQUOTE_DEFAULTS, variant: 'pull' }`,
            lang: 'typescript',
        },
    ],
}
