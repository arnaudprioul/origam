import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const SCROLL_STRATEGY_TYPE_DOC: ITypeDoc = {
    slug: 'scroll-strategy',
    name: 'TScrollStrategy',
    kind: 'type',
    category: 'Navigation',
    descriptionKey: 'types.catalog.scroll_strategy.description',
    descriptionFallback: 'Behaviour of a floating element (Overlay, Dialog, Tooltip, Menu) when the user scrolls the page while it is open — none, close, block or reposition.',
    definition: `export type TScrollStrategy = \`\${SCROLL_STRATEGIES}\`

// Where SCROLL_STRATEGIES is:
export enum SCROLL_STRATEGIES {
    NONE        = 'none',
    CLOSE       = 'close',
    BLOCK       = 'block',
    REPOSITION  = 'reposition'
}`,
    values: [
        { value: 'none', descriptionKey: 'types.detail.scroll_strategy.none', descriptionFallback: 'Scroll events have no effect — the overlay stays open and in place regardless of page scroll.' },
        { value: 'close', descriptionKey: 'types.detail.scroll_strategy.close', descriptionFallback: 'Scrolling closes the overlay immediately — used by menus and tooltips where stale positioning would confuse the user.' },
        { value: 'block', descriptionKey: 'types.detail.scroll_strategy.block', descriptionFallback: 'Page scroll is prevented while the overlay is open — used by modal dialogs and full-screen drawers.' },
        { value: 'reposition', descriptionKey: 'types.detail.scroll_strategy.reposition', descriptionFallback: 'The overlay repositions itself to stay anchored to its activator as the page scrolls — used by anchored menus and select dropdowns.' },
    ],
    usedBy: [
        { slug: 'overlay', name: 'Overlay', propName: 'scrollStrategy' },
        { slug: 'dialog', name: 'Dialog', propName: 'scrollStrategy' },
        { slug: 'tooltip', name: 'Tooltip', propName: 'scrollStrategy' },
        { slug: 'menu', name: 'Menu', propName: 'scrollStrategy' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/scroll.type.ts',
    examples: [
        {
            titleKey: 'types.detail.scroll_strategy.example_block',
            titleFallback: 'Dialog blocking page scroll while open',
            code: `<origam-dialog scroll-strategy="block">
  <origam-card title="Confirm action" />
</origam-dialog>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.scroll_strategy.example_reposition',
            titleFallback: 'Menu that repositions when the page scrolls',
            code: `<origam-menu scroll-strategy="reposition">
  <template #activator="{ props }">
    <origam-btn v-bind="props">Open Menu</origam-btn>
  </template>
  <origam-list>
    <origam-list-item title="Option A" />
    <origam-list-item title="Option B" />
  </origam-list>
</origam-menu>`,
            lang: 'html',
        },
    ],
}
