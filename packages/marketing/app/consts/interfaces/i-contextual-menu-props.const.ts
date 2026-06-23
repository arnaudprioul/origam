import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CONTEXTUAL_MENU_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-contextual-menu-props',
    name: 'IContextualMenuProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_contextual_menu_props.description',
    descriptionFallback: 'Props for <OrigamContextualMenu> — a right-click / long-press floating menu. Inherits the full IMenuProps surface (activator, positioning, transitions, dimensions) and the commons component contract.',
    definition: `export interface IContextualMenuProps extends ICommonsComponentProps, IMenuProps {

}`,
    extends: ['ICommonsComponentProps', 'IMenuProps'],
    props: [],
    usedBy: [
        { slug: 'contextual-menu', name: 'ContextualMenu', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ContextualMenu/contextual-menu.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_contextual_menu_props.example',
            titleFallback: 'Right-click contextual menu',
            code: `<OrigamContextualMenu activator="parent" openOnContextMenu>
    <OrigamList>
        <OrigamListItem title="Copy" />
        <OrigamListItem title="Paste" />
    </OrigamList>
</OrigamContextualMenu>`,
            lang: 'vue',
        },
    ],
}
