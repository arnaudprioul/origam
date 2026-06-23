import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LOCALE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-locale-props',
    name: 'ILocaleProps',
    category: 'Locale & i18n',
    descriptionKey: 'interfaces.catalog.i_locale_props.description',
    descriptionFallback: 'Per-instance locale override — messages, active locale, fallback locale and an optional adapter instance. Components consuming this interface honour a sub-tree locale without requiring a global store mutation.',
    definition: `export interface ILocaleProps {
    messages?: ILocaleMessages
    locale?: string
    fallback?: string
    adapter?: ILocaleInstance
}`,
    extends: [],
    props: [
        { name: 'messages', type: 'ILocaleMessages', optional: true, descriptionFallback: 'Flat or nested message map to merge with the global locale messages for this component sub-tree.' },
        { name: 'locale', type: 'string', optional: true, descriptionFallback: 'BCP-47 language tag that overrides the active global locale for this component (e.g. "fr", "en-US").' },
        { name: 'fallback', type: 'string', optional: true, descriptionFallback: 'BCP-47 language tag used when a translation key is not found in the active locale.' },
        { name: 'adapter', type: 'ILocaleInstance', optional: true, descriptionFallback: 'Custom locale adapter instance. When provided, it replaces the global adapter for this component and all its descendants.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/locale.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_locale_props.example',
            titleFallback: 'Overriding locale on a specific component',
            code: `import type { ILocaleProps } from 'origam'

interface IDialogProps extends ILocaleProps {
    title?: string
}`,
            lang: 'typescript',
        },
    ],
}
