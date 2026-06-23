import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TAB_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-tab-props',
    name: 'ITabProps',
    category: 'Navigation',
    descriptionKey: 'interfaces.catalog.i_tab_props.description',
    descriptionFallback: 'Props for <OrigamTab> — a single registered tab inside an <OrigamTabs> tablist. Supports optional leading icon and trailing appendIcon. ARIA wiring (role=tab, aria-selected, tabindex) is computed automatically.',
    definition: `export interface ITabProps extends ICommonsComponentProps, ITagProps, IGroupItemProps {
    tag?: string
    icon?: TIcon
    appendIcon?: TIcon
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IGroupItemProps'],
    props: [
        { name: 'tag', type: 'string', optional: true, descriptionFallback: 'HTML tag rendered as the tab root element.' },
        { name: 'icon', type: 'TIcon', optional: true, descriptionFallback: 'Optional leading icon rendered before the label text.' },
        { name: 'appendIcon', type: 'TIcon', optional: true, descriptionFallback: 'Optional trailing icon rendered after the label text.' },
    ],
    usedBy: [
        { slug: 'tab', name: 'Tab', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Tabs/tab.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_tab_props.example',
            titleFallback: 'Tab with leading icon',
            code: `<OrigamTabs v-model="tab">
  <OrigamTab value="home" icon="mdi-home">Home</OrigamTab>
  <OrigamTab value="settings" icon="mdi-cog">Settings</OrigamTab>
</OrigamTabs>`,
            lang: 'html',
        },
    ],
}
