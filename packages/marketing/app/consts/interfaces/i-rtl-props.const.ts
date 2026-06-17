import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RTL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-rtl-props',
    name: 'IRtlProps',
    category: 'Locale & RTL',
    descriptionKey: 'interfaces.catalog.i_rtl_props.description',
    descriptionFallback: 'Per-instance RTL override prop. Extended by container components that need to force a right-to-left text direction independently of the global locale setting.',
    definition: `export interface IRtlProps {
    rtl?: boolean
}`,
    extends: [],
    props: [
        { name: 'rtl', type: 'boolean', optional: true, descriptionFallback: 'When true, forces the component subtree into right-to-left layout regardless of the current locale.' },
    ],
    usedBy: [
        { slug: 'use-locale', name: 'useLocale', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/locale.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_rtl_props.example',
            titleFallback: 'Forcing RTL on a specific component',
            code: `<OrigamCard :rtl="true">
    <!-- Content will render right-to-left -->
</OrigamCard>`,
            lang: 'html',
        },
    ],
}
