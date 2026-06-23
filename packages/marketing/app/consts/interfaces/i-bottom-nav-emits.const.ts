import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BOTTOM_NAV_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-bottom-nav-emits',
    name: 'IBottomNavEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_bottom_nav_emits.description',
    descriptionFallback: 'Emit contract for <OrigamBottomNav> — propagates active-state and hover-state changes through the shared Commons, IActiveEmits and IHoverEmits contracts.',
    definition: `export interface IBottomNavEmits extends ICommonsComponentEmits, IActiveEmits, IHoverEmits {}`,
    extends: ['ICommonsComponentEmits', 'IActiveEmits', 'IHoverEmits'],
    props: [],
    usedBy: [
        { slug: 'bottom-nav', name: 'BottomNav', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/BottomNav/bottom-nav.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_bottom_nav_emits.example',
            titleFallback: 'Listening to BottomNav emits',
            code: `<OrigamBottomNav
  @update:active="onActiveChange"
  @update:hover="onHoverChange"
/>`,
            lang: 'html',
        },
    ],
}
