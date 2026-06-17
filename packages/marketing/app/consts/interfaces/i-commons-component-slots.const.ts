import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COMMONS_COMPONENT_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-commons-component-slots',
    name: 'ICommonsComponentSlots',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_commons_component_slots.description',
    descriptionFallback: 'Default slot signature shared by container components. Provides the optional default slot returning any renderable content.',
    definition: `export interface ICommonsComponentSlots {
    default?: () => any
}`,
    extends: [],
    props: [
        { name: 'default', type: '() => any', optional: true, descriptionFallback: 'Default slot — accepts any renderable content (VNode, string, array).' },
    ],
    usedBy: [
        { slug: 'form', name: 'Form', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_commons_component_slots.example',
            titleFallback: 'Extending ICommonsComponentSlots with additional named slots',
            code: `import type { ICommonsComponentSlots } from 'origam'

interface IMyContainerSlots extends ICommonsComponentSlots {
    header?: () => any
    footer?: () => any
}`,
            lang: 'typescript',
        },
    ],
}
