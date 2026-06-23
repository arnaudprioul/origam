import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const QUOTE_MARKS_BY_LANG_CONST_DOC: IConstDoc = {
    slug: 'quote-marks-by-lang',
    name: 'QUOTE_MARKS_BY_LANG',
    category: 'Blockquote',
    descriptionKey: 'consts.catalog.quote_marks_by_lang.description',
    descriptionFallback: "Map of locale codes to decorative opening and closing quote glyphs used by OrigamBlockquote. The 'auto' key is resolved at runtime from document.documentElement.lang; missing languages fall back to the 'en' pair.",
    definition: `export const QUOTE_MARKS_BY_LANG: Record<Exclude<TBlockquoteLang, 'auto'>, { open: string, close: string }> = {
    fr: { open: '« ', close: ' »' },
    en: { open: '“', close: '”' },
    es: { open: '« ', close: ' »' },
    de: { open: '„', close: '“' }
}`,
    values: [
        { value: "fr: { open: '« ', close: ' »' }", descriptionKey: 'consts.detail.quote_marks_by_lang.fr', descriptionFallback: 'French guillemets with non-breaking thin spaces.' },
        { value: "en: { open: '“', close: '”' }", descriptionKey: 'consts.detail.quote_marks_by_lang.en', descriptionFallback: 'English curly double quotes.' },
        { value: "es: { open: '« ', close: ' »' }", descriptionKey: 'consts.detail.quote_marks_by_lang.es', descriptionFallback: 'Spanish guillemets (same shape as French).' },
        { value: "de: { open: '„', close: '“' }", descriptionKey: 'consts.detail.quote_marks_by_lang.de', descriptionFallback: 'German low-9 opening quote and curly closing quote.' },
    ],
    usedBy: [
        { name: 'OrigamBlockquote', slug: 'blockquote' },
    ],
    sourceFile: 'packages/ds/src/consts/Blockquote/blockquote.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.quote_marks_by_lang.example',
            titleFallback: 'Wrapping a citation in locale-aware quotes',
            code: `import { QUOTE_MARKS_BY_LANG } from 'origam'

const lang = 'fr'
const { open, close } = QUOTE_MARKS_BY_LANG[lang]
console.log(\`\${open}Hello\${close}\`) // « Hello »`,
            lang: 'typescript',
        },
    ],
}
