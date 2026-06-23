import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RTL_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-rtl-options',
    name: 'IRtlOptions',
    category: 'Locale & RTL',
    descriptionKey: 'interfaces.catalog.i_rtl_options.description',
    descriptionFallback: 'Install-time RTL configuration merged into the locale options of createOrigam(). Maps locale codes to a boolean indicating whether that locale is right-to-left.',
    definition: `export interface IRtlOptions {
    rtl?: Record<string, boolean>
}`,
    extends: [],
    props: [
        { name: 'rtl', type: 'Record<string, boolean>', optional: true, descriptionFallback: 'Map of locale code → is-RTL, e.g. { ar: true, he: true }. Merged with built-in defaults at plugin install time.' },
    ],
    usedBy: [
        { slug: 'use-locale', name: 'useLocale', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/locale.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_rtl_options.example',
            titleFallback: 'Passing RTL options to createOrigam',
            code: `import { createOrigam } from 'origam'

const origam = createOrigam({
    locale: {
        locale: 'ar',
        fallbackLocale: 'en',
        messages: { ar: {}, en: {} },
        rtl: { ar: true },
    },
})`,
            lang: 'typescript',
        },
    ],
}
