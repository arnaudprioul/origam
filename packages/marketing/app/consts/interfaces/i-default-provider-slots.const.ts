import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DEFAULT_PROVIDER_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-default-provider-slots',
    name: 'IDefaultProviderSlots',
    category: 'Theme & Defaults',
    descriptionKey: 'interfaces.catalog.i_default_provider_slots.description',
    descriptionFallback: 'Slot contract for OrigamDefaultsProvider. The component renders no visible chrome — its only slot is default, which carries the subtree that inherits the injected defaults.',
    definition: `export interface IDefaultProviderSlots {
    default(): unknown
}`,
    extends: [],
    props: [
        { name: 'default', type: '() => unknown', optional: false, descriptionFallback: 'The subtree that will inherit the provided defaults. The provider itself renders no wrapper element.' },
    ],
    usedBy: [
        { slug: 'default-provider', name: 'OrigamDefaultsProvider', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DefaultProvider/default-provider.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_default_provider_slots.example',
            titleFallback: 'Using the default slot',
            code: `<OrigamDefaultsProvider :defaults="{ global: { density: 'compact' } }">
    <OrigamBtn>Save</OrigamBtn>
    <OrigamBtn color="danger">Delete</OrigamBtn>
</OrigamDefaultsProvider>`,
            lang: 'html',
        },
    ],
}
