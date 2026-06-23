import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TAB_PANELS_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-tab-panels-emits',
    name: 'ITabPanelsEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_tab_panels_emits.description',
    descriptionFallback: 'Emit contract for <OrigamTabPanels> — mirrors the parent tablist v-model via ICommonsComponentEmits (update:modelValue).',
    definition: `export interface ITabPanelsEmits extends ICommonsComponentEmits {}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [
        { slug: 'tab-panels', name: 'TabPanels', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Tabs/tab-panels.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_tab_panels_emits.example',
            titleFallback: 'Syncing panels with a tabs v-model',
            code: `<OrigamTabs v-model="activeTab">
  <OrigamTab value="a">Tab A</OrigamTab>
  <OrigamTab value="b">Tab B</OrigamTab>
</OrigamTabs>
<OrigamTabPanels v-model="activeTab">
  <OrigamTabPanel value="a">Panel A</OrigamTabPanel>
  <OrigamTabPanel value="b">Panel B</OrigamTabPanel>
</OrigamTabPanels>`,
            lang: 'html',
        },
    ],
}
