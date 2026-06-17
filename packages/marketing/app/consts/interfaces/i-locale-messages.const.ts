import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LOCALE_MESSAGES_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-locale-messages',
    name: 'ILocaleMessages',
    category: 'Internationalisation',
    descriptionKey: 'interfaces.catalog.i_locale_messages.description',
    descriptionFallback: 'Recursive message map type — each value is either a translated string or a nested ILocaleMessages object.',
    definition: `export interface ILocaleMessages {
    [key: string]: ILocaleMessages | string
}`,
    extends: [],
    props: [
        {
            name: '[key: string]',
            type: 'ILocaleMessages | string',
            optional: false,
            descriptionFallback: 'Any string key mapping to a translated string or a nested message namespace.',
        },
    ],
    usedBy: [
        { slug: 'i-locale-instance', name: 'ILocaleInstance', kind: 'composable' },
        { slug: 'i-locale-options', name: 'ILocaleOptions', kind: 'composable' },
        { slug: 'use-locale', name: 'useLocale', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/locale.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_locale_messages.example',
            titleFallback: 'Defining locale messages',
            code: `import type { ILocaleMessages } from 'origam'

const en: ILocaleMessages = {
    ok_label: 'OK',
    cancel_label: 'Cancel',
    form: {
        required_field: 'This field is required',
    },
}`,
            lang: 'typescript',
        },
    ],
}
