import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LOCALE_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-locale-options',
    name: 'ILocaleOptions',
    category: 'Internationalisation',
    descriptionKey: 'interfaces.catalog.i_locale_options.description',
    descriptionFallback: 'Configuration options for the built-in Origam locale adapter — passed to createLocale() when not using a third-party i18n library.',
    definition: `export interface ILocaleOptions {
    locale?: string
    fallbackLocale: string
    messages: Record<string, unknown>
}`,
    extends: [],
    props: [
        {
            name: 'locale',
            type: 'string',
            optional: true,
            descriptionFallback: 'Initial locale code, e.g. "en". Falls back to browser navigator.language when omitted.',
        },
        {
            name: 'fallbackLocale',
            type: 'string',
            optional: false,
            descriptionFallback: 'Locale code used when a key is not found in the active locale messages.',
        },
        {
            name: 'messages',
            type: 'Record<string, unknown>',
            optional: false,
            descriptionFallback: 'Map of locale codes to their message objects, e.g. { en: { ok_label: "OK" }, fr: { ok_label: "OK" } }.',
        },
    ],
    usedBy: [
        { slug: 'use-locale', name: 'useLocale', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/locale.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_locale_options.example',
            titleFallback: 'Providing locale options to createOrigam',
            code: `import { createOrigam } from 'origam'

const origam = createOrigam({
    locale: {
        locale: 'fr',
        fallbackLocale: 'en',
        messages: {
            en: { ok_label: 'OK' },
            fr: { ok_label: 'OK' },
        },
    },
})`,
            lang: 'typescript',
        },
    ],
}
