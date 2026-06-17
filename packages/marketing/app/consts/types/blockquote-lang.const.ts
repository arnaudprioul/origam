import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const BLOCKQUOTE_LANG_TYPE_DOC: ITypeDoc = {
    slug: 'blockquote-lang',
    name: 'TBlockquoteLang',
    kind: 'type',
    category: 'Misc',
    descriptionKey: 'types.catalog.blockquote_lang.description',
    descriptionFallback: 'Locale hint for OrigamBlockquote decorative quote marks — only active for variant="quoted".',
    definition: `export type TBlockquoteLang =
    | 'fr'
    | 'en'
    | 'es'
    | 'de'
    | 'auto'`,
    values: [
        {
            value: 'fr',
            descriptionKey: 'types.detail.blockquote_lang.fr',
            descriptionFallback: 'French guillemets: « … »',
        },
        {
            value: 'en',
            descriptionKey: 'types.detail.blockquote_lang.en',
            descriptionFallback: 'Curly double quotes: " … "',
        },
        {
            value: 'es',
            descriptionKey: 'types.detail.blockquote_lang.es',
            descriptionFallback: 'Spanish angular quotes: « … » (same glyphs as French, distinct key for future locale tweaks).',
        },
        {
            value: 'de',
            descriptionKey: 'types.detail.blockquote_lang.de',
            descriptionFallback: 'German low-9 / high-6 pair: „ … "',
        },
        {
            value: 'auto',
            descriptionKey: 'types.detail.blockquote_lang.auto',
            descriptionFallback: 'Reads the lang attribute from the element or <html lang>. Falls back to "en" when no locale is found. Default.',
        },
    ],
    usedBy: [
        { slug: 'blockquote', name: 'Blockquote', propName: 'lang' },
    ],
    sourceFile: 'packages/ds/src/types/Blockquote/blockquote-lang.type.ts',
    examples: [
        {
            titleKey: 'types.detail.blockquote_lang.example',
            titleFallback: 'French vs German decorative quotes',
            code: `<!-- French: « … » -->
<origam-blockquote variant="quoted" lang="fr">
  La vie est belle.
</origam-blockquote>

<!-- German: „ … " -->
<origam-blockquote variant="quoted" lang="de">
  Das Leben ist schön.
</origam-blockquote>`,
            lang: 'html',
        },
    ],
}
