import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_EXPANSION_PANELS_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-expansion-panels-emits',
    name: 'IExpansionPanelsEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_expansion_panels_emits.description',
    descriptionFallback: 'Emit contract for the expansion-panels container — extends ICommonsComponentEmits to propagate v-model and lifecycle events.',
    definition: `export interface IExpansionPanelsEmits extends ICommonsComponentEmits {}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [
        { slug: 'expansion-panels', name: 'ExpansionPanels', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ExpensionPanel/expansion-panels.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_expansion_panels_emits.example',
            titleFallback: 'Listening to update:modelValue on a panels container',
            code: `<OrigamExpansionPanels v-model="openPanels" @update:model-value="onUpdate">
    <OrigamExpansionPanel>Panel 1</OrigamExpansionPanel>
</OrigamExpansionPanels>`,
            lang: 'vue',
        },
    ],
}
