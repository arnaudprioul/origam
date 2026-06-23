import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MENU_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-menu-emits',
    name: 'IMenuEmits',
    category: 'Component Emits',
    descriptionKey: 'interfaces.catalog.i_menu_emits.description',
    descriptionFallback: 'Emits fired by <OrigamMenu> — extends ICommonsComponentEmits (v-model on open state) and adds a contextmenu event forwarded so parents can intercept the native right-click and show their own context menu instead.',
    definition: `export interface IMenuEmits extends ICommonsComponentEmits {
    (e: 'contextmenu', event: MouseEvent): void
}`,
    extends: ['ICommonsComponentEmits'],
    props: [
        { name: 'contextmenu', type: '(event: MouseEvent) => void', optional: false, descriptionFallback: 'The native contextmenu event forwarded from the menu root. Allows parents to intercept right-click and substitute their own context menu.' },
    ],
    usedBy: [
        { slug: 'menu', name: 'Menu', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Menu/menu.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_menu_emits.example',
            titleFallback: 'Intercepting the contextmenu event from a Menu',
            code: `<OrigamMenu
    v-model="isOpen"
    @contextmenu.prevent="showCustomContextMenu"
>
    …
</OrigamMenu>`,
            lang: 'vue',
        },
    ],
}
