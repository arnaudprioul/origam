import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LAYOUT_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-layout-item-props',
    name: 'ILayoutItemProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_layout_item_props.description',
    descriptionFallback: 'Props for components that register themselves as layout items (AppBar, Drawer, BottomNav …) inside an OrigamLayout.',
    definition: `export interface ILayoutItemProps extends ICommonsComponentProps {
    name?: string
    order?: string | number
    absolute?: boolean
    location?: TDirectionBoth
}`,
    extends: ['ICommonsComponentProps'],
    props: [
        {
            name: 'name',
            type: 'string',
            optional: true,
            descriptionFallback: 'Identifier used to match overlapping layout items declared in the parent ILayoutProps.overlaps.',
        },
        {
            name: 'order',
            type: 'string | number',
            optional: true,
            descriptionFallback: 'Stacking order in the parent OrigamLayout. Falls back to a unique-ID-based order when omitted.',
        },
        {
            name: 'absolute',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'When true, the item does not consume layout space — it is positioned absolutely over the main area.',
        },
        {
            name: 'location',
            type: 'TDirectionBoth',
            optional: true,
            descriptionFallback: 'Docking edge: "top" | "bottom" | "left" | "right". Determines which side of the layout the item occupies.',
        },
    ],
    usedBy: [
        { slug: 'app-bar', name: 'AppBar', kind: 'component' },
        { slug: 'navigation-drawer', name: 'NavigationDrawer', kind: 'component' },
        { slug: 'bottom-navigation', name: 'BottomNavigation', kind: 'component' },
        { slug: 'use-layout-item', name: 'useLayoutItem', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/layout.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_layout_item_props.example',
            titleFallback: 'AppBar as a layout item',
            code: `<OrigamLayout>
    <OrigamAppBar location="top" :order="0">
        My App
    </OrigamAppBar>
    <OrigamMain>...</OrigamMain>
</OrigamLayout>`,
            lang: 'html',
        },
    ],
}
