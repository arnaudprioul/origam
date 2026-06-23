import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LOCALE_INSTANCE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-locale-instance',
    name: 'ILocaleInstance',
    category: 'Internationalisation',
    descriptionKey: 'interfaces.catalog.i_locale_instance.description',
    descriptionFallback: 'Runtime locale adapter contract — provides reactive locale state, a translate function (t), a number formatter (n) and a scoped child adapter factory.',
    definition: `export interface ILocaleInstance {
    name: string
    messages: ComputedRef<ILocaleMessages>
    current: Ref<string>
    fallback: Ref<string>
    t: (key: string, ...params: unknown[]) => string
    n: (value: number) => string
    provide: (props: ILocaleProps) => ILocaleInstance
}`,
    extends: [],
    props: [
        {
            name: 'name',
            type: 'string',
            optional: false,
            descriptionFallback: 'Identifier of the adapter implementation, e.g. "vue-i18n" or "default".',
        },
        {
            name: 'messages',
            type: 'ComputedRef<ILocaleMessages>',
            optional: false,
            descriptionFallback: 'Reactive computed ref of the full message map for the current locale.',
        },
        {
            name: 'current',
            type: 'Ref<string>',
            optional: false,
            descriptionFallback: 'Reactive ref of the active locale code, e.g. "en" or "fr".',
        },
        {
            name: 'fallback',
            type: 'Ref<string>',
            optional: false,
            descriptionFallback: 'Reactive ref of the fallback locale code used when a key is missing.',
        },
        {
            name: 't',
            type: '(key: string, ...params: unknown[]) => string',
            optional: false,
            descriptionFallback: 'Translates a message key with optional interpolation parameters.',
        },
        {
            name: 'n',
            type: '(value: number) => string',
            optional: false,
            descriptionFallback: 'Formats a number according to the active locale conventions.',
        },
        {
            name: 'provide',
            type: '(props: ILocaleProps) => ILocaleInstance',
            optional: false,
            descriptionFallback: 'Creates a scoped child locale instance for sub-tree overrides.',
        },
    ],
    usedBy: [
        { slug: 'use-locale', name: 'useLocale', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/locale.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_locale_instance.example',
            titleFallback: 'Accessing the locale instance from a component',
            code: `import { useLocale } from 'origam'

const { t, current, fallback } = useLocale()
// t('ok_label') → 'OK'
// current.value → 'en'`,
            lang: 'typescript',
        },
    ],
}
