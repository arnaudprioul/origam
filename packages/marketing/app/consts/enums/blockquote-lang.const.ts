import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const BLOCKQUOTE_LANG_ENUM_DOC: IEnumDoc = {
    slug: 'blockquote-lang',
    name: 'BLOCKQUOTE_LANG',
    category: 'Typography',
    descriptionKey: 'enums.catalog.blockquote_lang.description',
    descriptionFallback: 'TypeScript enum for the language of a blockquote — controls locale-aware quotation marks and hyphenation (fr, en, es, de, auto).',
    definition: `export enum BLOCKQUOTE_LANG {
    FR   = 'fr',
    EN   = 'en',
    ES   = 'es',
    DE   = 'de',
    AUTO = 'auto',
}`,
    values: [
        { value: 'BLOCKQUOTE_LANG.FR', descriptionKey: 'enums.detail.blockquote_lang.fr', descriptionFallback: 'French — uses « guillemets » and French typographic conventions.' },
        { value: 'BLOCKQUOTE_LANG.EN', descriptionKey: 'enums.detail.blockquote_lang.en', descriptionFallback: 'English — uses "curly double quotes" and English conventions.' },
        { value: 'BLOCKQUOTE_LANG.ES', descriptionKey: 'enums.detail.blockquote_lang.es', descriptionFallback: 'Spanish — uses «comillas angulares» and Spanish conventions.' },
        { value: 'BLOCKQUOTE_LANG.DE', descriptionKey: 'enums.detail.blockquote_lang.de', descriptionFallback: 'German — uses „Anführungszeichen" and German conventions.' },
        { value: 'BLOCKQUOTE_LANG.AUTO', descriptionKey: 'enums.detail.blockquote_lang.auto', descriptionFallback: 'Auto — inherits the document language attribute.' },
    ],
    usedBy: [
        { slug: 'blockquote', name: 'Blockquote', propName: 'lang' },
    ],
    sourceFile: 'packages/ds/src/enums/Blockquote/blockquote-lang.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.blockquote_lang.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { BLOCKQUOTE_LANG } from 'origam'

const lang: BLOCKQUOTE_LANG = BLOCKQUOTE_LANG.FR`,
            lang: 'typescript',
        },
    ],
}
