import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_LOCALE_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-locale-key',
    name: 'ORIGAM_LOCALE_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_locale_key.description',
    descriptionFallback: 'Vue provide/inject symbol that carries the combined ILocaleInstance & IRtlInstance context (current locale, t() translator, isRtl flag, rtlClasses) from the origam locale provider to all components consuming useLocale().',
    definition: `export const ORIGAM_LOCALE_KEY: InjectionKey<ILocaleInstance & IRtlInstance> = Symbol.for('origam:locale')`,
    value: "Symbol.for('origam:locale')",
    usedBy: [
        { name: 'useLocale' },
        { name: 'OrigamLocaleProvider' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/locale.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_locale_key.example',
            titleFallback: 'Setting the locale at plugin level',
            code: `import { createOrigam } from 'origam'

const origam = createOrigam({
  locale: {
    locale: 'fr',
    fallback: 'en',
    messages: { fr: frMessages, en: enMessages },
  },
})`,
            lang: 'typescript',
        },
    ],
}
