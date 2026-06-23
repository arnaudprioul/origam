import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MENU_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-menu-props',
    name: 'IMenuProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_menu_props.description',
    descriptionFallback: 'Props for <OrigamMenu> — a floating overlay combining the full surface of IOverlayProps, IListProps, and IListItemProps, plus an optional id to link the activator via aria-controls.',
    definition: `export interface IMenuProps extends IOverlayProps, IListProps, IListItemProps {
    id?: string
}`,
    extends: ['IOverlayProps', 'IListProps', 'IListItemProps'],
    props: [
        { name: 'id', type: 'string', optional: true, descriptionFallback: 'Optional DOM id for the menu panel. Used to link the activator via aria-controls and to scope nested menus.' },
    ],
    usedBy: [
        { slug: 'menu', name: 'Menu', kind: 'component' },
        { slug: 'use-menu', name: 'useMenu', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Menu/menu.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_menu_props.example',
            titleFallback: 'Menu with activator and list items',
            code: `<OrigamMenu id="nav-menu" open-on-hover>
    <template #activator="{ props }">
        <origam-btn v-bind="props">Open</origam-btn>
    </template>
    <origam-list>
        <origam-list-item title="Profile" />
        <origam-list-item title="Settings" />
        <origam-list-item title="Logout" />
    </origam-list>
</OrigamMenu>`,
            lang: 'vue',
        },
    ],
}
