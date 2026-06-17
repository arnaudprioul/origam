import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const NUMBER_FORMAT_FALLBACK_LOCALE_CONST_DOC: IConstDoc = {
    slug: 'number-format-fallback-locale',
    name: 'NUMBER_FORMAT_FALLBACK_LOCALE',
    category: 'Internationalisation',
    descriptionKey: 'consts.catalog.number_format_fallback_locale.description',
    descriptionFallback: "SSR-safe fallback locale for OrigamNumberFormat. Applied when neither the <html lang> attribute, navigator.language nor the explicit locale prop are available. Defaults to 'en-US'.",
    definition: `export const NUMBER_FORMAT_FALLBACK_LOCALE = 'en-US'`,
    value: "'en-US'",
    usedBy: [
        { name: 'OrigamNumberFormat', slug: 'number-format' },
        { name: 'useNumberFormat' },
    ],
    sourceFile: 'packages/ds/src/consts/NumberFormat/number-format.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.number_format_fallback_locale.example',
            titleFallback: 'Using the fallback locale on SSR',
            code: `import { NUMBER_FORMAT_FALLBACK_LOCALE } from 'origam'

// Resolve locale in SSR-safe way
const locale =
  (typeof document !== 'undefined' && document.documentElement.lang)
  || NUMBER_FORMAT_FALLBACK_LOCALE // 'en-US'`,
            lang: 'typescript',
        },
    ],
}
