import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_LAYOUT_ITEM_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-layout-item-key',
    name: 'ORIGAM_LAYOUT_ITEM_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_layout_item_key.description',
    descriptionFallback: 'Vue provide/inject symbol that carries a ShallowRef<{ id: string }> from OrigamLayout to each registered layout item (AppBar, NavigationDrawer, Footer…), giving it access to its own layout-slot identifier.',
    definition: `export const ORIGAM_LAYOUT_ITEM_KEY: InjectionKey<ShallowRef<{ id: string; }>> = Symbol.for('origam:layout-item')`,
    value: "Symbol.for('origam:layout-item')",
    usedBy: [
        { name: 'OrigamLayout', slug: 'layout' },
        { name: 'OrigamAppBar', slug: 'app-bar' },
        { name: 'OrigamNavigationDrawer', slug: 'navigation-drawer' },
        { name: 'useLayoutItem' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/layout.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_layout_item_key.example',
            titleFallback: 'Reading the layout-item id inside a custom layout panel',
            code: `import { inject } from 'vue'
import { ORIGAM_LAYOUT_ITEM_KEY } from 'origam'

const layoutItem = inject(ORIGAM_LAYOUT_ITEM_KEY)
// layoutItem?.value.id  → 'app-bar-0'`,
            lang: 'typescript',
        },
    ],
}
