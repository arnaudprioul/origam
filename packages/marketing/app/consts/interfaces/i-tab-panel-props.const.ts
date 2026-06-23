import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TAB_PANEL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-tab-panel-props',
    name: 'ITabPanelProps',
    category: 'Navigation',
    descriptionKey: 'interfaces.catalog.i_tab_panel_props.description',
    descriptionFallback: 'Props for <OrigamTabPanel> — a single content panel paired with a tab. Uses group-item registration (value matching a sibling <OrigamTab>) and lazy mounting via ILazyProps.',
    definition: `export interface ITabPanelProps extends ICommonsComponentProps, ITagProps, IGroupItemProps, ILazyProps {
    tag?: string
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IGroupItemProps', 'ILazyProps'],
    props: [
        { name: 'tag', type: 'string', optional: true, descriptionFallback: 'HTML tag rendered as the panel root. Defaults to div.' },
    ],
    usedBy: [
        { slug: 'tab-panel', name: 'TabPanel', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Tabs/tab-panel.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_tab_panel_props.example',
            titleFallback: 'Lazy tab panel',
            code: `<OrigamTabPanels v-model="tab">
  <OrigamTabPanel value="overview" :eager="false">
    <p>Overview content loaded on first activation.</p>
  </OrigamTabPanel>
</OrigamTabPanels>`,
            lang: 'html',
        },
    ],
}
