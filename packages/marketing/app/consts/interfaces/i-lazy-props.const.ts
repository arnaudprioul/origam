import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LAZY_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-lazy-props',
    name: 'ILazyProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_lazy_props.description',
    descriptionFallback: 'Minimal eager-load contract shared by components that support deferred rendering — a single boolean to bypass lazy behaviour.',
    definition: `export interface ILazyProps {
    eager?: boolean
}`,
    extends: [],
    props: [
        {
            name: 'eager',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'When true, the component renders immediately without waiting for the intersection observer trigger.',
        },
    ],
    usedBy: [
        { slug: 'dialog', name: 'Dialog', kind: 'component' },
        { slug: 'menu', name: 'Menu', kind: 'component' },
        { slug: 'tooltip', name: 'Tooltip', kind: 'component' },
        { slug: 'expansion-panel', name: 'ExpansionPanel', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/lazy.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_lazy_props.example',
            titleFallback: 'Forcing eager render in a dialog (prevents flash on first open)',
            code: `<OrigamDialog eager v-model="open">
    <template #default>Long form content</template>
</OrigamDialog>`,
            lang: 'html',
        },
    ],
}
