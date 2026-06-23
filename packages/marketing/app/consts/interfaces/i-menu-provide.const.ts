import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MENU_PROVIDE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-menu-provide',
    name: 'IMenuProvide',
    category: 'Component Provide',
    descriptionKey: 'interfaces.catalog.i_menu_provide.description',
    descriptionFallback: 'Provide/inject contract used by <OrigamMenu> to coordinate nested menus. register() and unregister() manage child menu registration; closeParents() traverses the injection chain to close all ancestor menus when an item is selected.',
    definition: `export interface IMenuProvide {
    register(): void
    unregister(): void
    closeParents(): void
}`,
    extends: [],
    props: [
        { name: 'register', type: '() => void', optional: false, descriptionFallback: 'Called by a child menu when it mounts to register itself with the parent menu context.' },
        { name: 'unregister', type: '() => void', optional: false, descriptionFallback: 'Called by a child menu when it unmounts to clean up its registration.' },
        { name: 'closeParents', type: '() => void', optional: false, descriptionFallback: 'Called to close all ancestor menus in the injection chain — typically triggered when the user selects a leaf item in a nested menu.' },
    ],
    usedBy: [
        { slug: 'menu', name: 'Menu', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Menu/menu.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_menu_provide.example',
            titleFallback: 'Injecting the menu context in a nested child',
            code: `import { inject } from 'vue'
import type { IMenuProvide } from 'origam'

const menu = inject<IMenuProvide>('origam:menu')

function selectItem() {
    // Close all parent menus when an item is selected
    menu?.closeParents()
}`,
            lang: 'typescript',
        },
    ],
}
