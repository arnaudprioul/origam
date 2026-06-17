import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BLOCKQUOTE_LANGS_CONST_DOC: IConstDoc = {
    slug: 'blockquote-langs',
    name: 'BLOCKQUOTE_LANGS',
    category: 'Typography',
    descriptionKey: 'consts.catalog.blockquote_langs.description',
    descriptionFallback: "Closed list of valid lang values for OrigamBlockquote. Controls which decorative quote glyphs are rendered. 'auto' detects the page language at runtime.",
    definition: `export const BLOCKQUOTE_LANGS: ReadonlyArray<TBlockquoteLang> = [
    'auto',
    'fr',
    'en',
    'es',
    'de'
]`,
    values: [
        { value: "'auto'", descriptionKey: 'consts.detail.blockquote_langs.auto', descriptionFallback: "Detects language from document.documentElement.lang; falls back to 'en'." },
        { value: "'fr'", descriptionKey: 'consts.detail.blockquote_langs.fr', descriptionFallback: 'French guillemets (« … »).' },
        { value: "'en'", descriptionKey: 'consts.detail.blockquote_langs.en', descriptionFallback: 'English curly quotes (“…”).' },
        { value: "'es'", descriptionKey: 'consts.detail.blockquote_langs.es', descriptionFallback: 'Spanish guillemets (« … »).' },
        { value: "'de'", descriptionKey: 'consts.detail.blockquote_langs.de', descriptionFallback: 'German quotes („…“).' },
    ],
    usedBy: [
        { name: 'OrigamBlockquote' },
    ],
    sourceFile: 'packages/ds/src/consts/Blockquote/blockquote.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.blockquote_langs.example',
            titleFallback: 'Iterating available languages',
            code: `import { BLOCKQUOTE_LANGS } from 'origam'

for (const lang of BLOCKQUOTE_LANGS) {
  console.log(lang) // 'auto', 'fr', 'en', 'es', 'de'
}`,
            lang: 'typescript',
        },
    ],
}
