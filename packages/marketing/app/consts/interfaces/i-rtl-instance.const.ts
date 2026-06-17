import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RTL_INSTANCE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-rtl-instance',
    name: 'IRtlInstance',
    category: 'Locale & RTL',
    descriptionKey: 'interfaces.catalog.i_rtl_instance.description',
    descriptionFallback: 'Runtime RTL context returned by the locale composable. Exposes whether the current locale renders right-to-left and the per-locale RTL override map.',
    definition: `export interface IRtlInstance {
    isRtl: Ref<boolean>
    rtl: Ref<Record<string, boolean>>
}`,
    extends: [],
    props: [
        { name: 'isRtl', type: 'Ref<boolean>', optional: false, descriptionFallback: 'Reactive flag — true when the active locale is right-to-left.' },
        { name: 'rtl', type: 'Ref<Record<string, boolean>>', optional: false, descriptionFallback: 'Map of locale codes to their RTL status, merged from IRtlOptions at install time.' },
    ],
    usedBy: [
        { slug: 'use-locale', name: 'useLocale', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/locale.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_rtl_instance.example',
            titleFallback: 'Reading the RTL flag from the locale composable',
            code: `import { useLocale } from 'origam'

const { isRtl } = useLocale()
// isRtl.value === true when locale is 'ar', 'he', …`,
            lang: 'typescript',
        },
    ],
}
