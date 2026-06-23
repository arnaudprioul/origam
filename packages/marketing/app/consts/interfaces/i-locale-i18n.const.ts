import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LOCALE_I18N_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-locale-i18n',
    name: 'ILocaleI18n',
    category: 'Internationalisation',
    descriptionKey: 'interfaces.catalog.i_locale_i18n.description',
    descriptionFallback: 'Pair of the raw vue-i18n I18n instance and its useI18n composable — injected by createLocale() and consumed by the locale adapter.',
    definition: `export interface ILocaleI18n {
    i18n: I18n<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, string, false>
    useI18n: typeof useI18n
}`,
    extends: [],
    props: [
        {
            name: 'i18n',
            type: 'I18n<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, string, false>',
            optional: false,
            descriptionFallback: 'The raw vue-i18n I18n instance created by createI18n().',
        },
        {
            name: 'useI18n',
            type: 'typeof useI18n',
            optional: false,
            descriptionFallback: 'The useI18n composable from vue-i18n, forwarded so adapters can call it without re-importing.',
        },
    ],
    usedBy: [
        { slug: 'use-locale', name: 'useLocale', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/locale.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_locale_i18n.example',
            titleFallback: 'Providing a vue-i18n adapter to Origam',
            code: `import { createI18n, useI18n } from 'vue-i18n'
import { createOrigam } from 'origam'
import type { ILocaleI18n } from 'origam'

const i18n = createI18n({ legacy: false, locale: 'en', messages: { en: {} } })

const origam = createOrigam({
    locale: {
        adapter: { i18n, useI18n } satisfies ILocaleI18n,
    },
})`,
            lang: 'typescript',
        },
    ],
}
