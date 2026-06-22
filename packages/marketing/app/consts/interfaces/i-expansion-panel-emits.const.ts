import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_EXPANSION_PANEL_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-expansion-panel-emits',
    name: 'IExpansionPanelEmits',
    category: 'Disclosure',
    descriptionKey: 'interfaces.catalog.i_expansion_panel_emits.description',
    descriptionFallback: 'Emits contract for OrigamExpansionPanel — inherits IGroupEmits which carries the group membership lifecycle events (click, update:modelValue) used by the accordion group coordination layer.',
    definition: `export interface IExpansionPanelEmits extends IGroupEmits {}`,
    extends: ['IGroupEmits'],
    props: [],
    usedBy: [
        { slug: 'expansion-panel', name: 'OrigamExpansionPanel', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ExpensionPanel/expansion-panel.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_expansion_panel_emits.example',
            titleFallback: 'Listening to panel open/close',
            code: `<OrigamExpansionPanel @update:model-value="v => console.log('open', v)">
    <!-- header + content -->
</OrigamExpansionPanel>`,
            lang: 'html',
        },
    ],
}
