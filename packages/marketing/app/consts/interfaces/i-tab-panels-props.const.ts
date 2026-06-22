import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TAB_PANELS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-tab-panels-props',
    name: 'ITabPanelsProps',
    category: 'Navigation',
    descriptionKey: 'interfaces.catalog.i_tab_panels_props.description',
    descriptionFallback: 'Props for <OrigamTabPanels> — the content area mirroring the tablist selection. Supports direction, group registration, transition name and horizontal swipe navigation.',
    definition: `export interface ITabPanelsProps extends ICommonsComponentProps, ITagProps, IDirectionProps, IGroupProps {
    tag?: string
    transition?: string | false
    swipeable?: boolean
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IDirectionProps', 'IGroupProps'],
    props: [
        { name: 'tag', type: 'string', optional: true, descriptionFallback: 'HTML tag rendered as the panels container root.' },
        { name: 'transition', type: "string | false", optional: true, descriptionFallback: "Transition name passed to <OrigamTransition>. Default is 'fade'. Pass false to disable." },
        { name: 'swipeable', type: 'boolean', optional: true, descriptionFallback: 'Enables horizontal touch-swipe between panels via the vTouch directive.' },
    ],
    usedBy: [
        { slug: 'tab-panels', name: 'TabPanels', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Tabs/tab-panels.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_tab_panels_props.example',
            titleFallback: 'Swipeable panels with slide transition',
            code: `<OrigamTabPanels v-model="tab" transition="slide-x" swipeable>
  <OrigamTabPanel value="home">Home</OrigamTabPanel>
  <OrigamTabPanel value="profile">Profile</OrigamTabPanel>
</OrigamTabPanels>`,
            lang: 'html',
        },
    ],
}
