import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COMMONS_COMPONENT_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-commons-component-emits',
    name: 'ICommonsComponentEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_commons_component_emits.description',
    descriptionFallback: 'Default v-model emit shape shared by every input-style component. Provides the standard update:modelValue event.',
    definition: `export interface ICommonsComponentEmits {
    (e: 'update:modelValue', event: any): void
}`,
    extends: [],
    props: [
        { name: 'update:modelValue', type: '(event: any) => void', optional: false, descriptionFallback: 'Emitted when the component value changes — the standard Vue v-model contract.' },
    ],
    usedBy: [
        { slug: 'tabs', name: 'Tabs', kind: 'component' },
        { slug: 'tab-panels', name: 'TabPanels', kind: 'component' },
        { slug: 'tooltip', name: 'Tooltip', kind: 'component' },
        { slug: 'pagination', name: 'Pagination', kind: 'component' },
        { slug: 'dialog', name: 'Dialog', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_commons_component_emits.example',
            titleFallback: 'Extending ICommonsComponentEmits for a custom input',
            code: `import type { ICommonsComponentEmits } from 'origam'

interface IMyInputEmits extends ICommonsComponentEmits {
    (e: 'focus', event: FocusEvent): void
}`,
            lang: 'typescript',
        },
    ],
}
