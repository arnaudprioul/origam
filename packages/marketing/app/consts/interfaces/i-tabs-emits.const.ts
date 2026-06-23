import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TABS_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-tabs-emits',
    name: 'ITabsEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_tabs_emits.description',
    descriptionFallback: 'Emit contract for <OrigamTabs> — inherits update:modelValue from ICommonsComponentEmits to sync the active tab value with v-model.',
    definition: `export interface ITabsEmits extends ICommonsComponentEmits {}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [
        { slug: 'tabs', name: 'Tabs', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Tabs/tabs.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_tabs_emits.example',
            titleFallback: 'Reacting to tab changes',
            code: `<OrigamTabs v-model="activeTab" @update:model-value="onTabChange">
  <OrigamTab value="a">A</OrigamTab>
  <OrigamTab value="b">B</OrigamTab>
</OrigamTabs>`,
            lang: 'html',
        },
    ],
}
