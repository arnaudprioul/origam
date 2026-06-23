import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SCROLL_STRATEGY_DATA_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-scroll-strategy-data',
    name: 'IScrollStrategyData',
    category: 'Scroll',
    descriptionKey: 'interfaces.catalog.i_scroll_strategy_data.description',
    descriptionFallback: 'Runtime data bag passed to every TScrollStrategyFn. Gives the strategy access to the overlay root element, content element, positioning target, active state flag and the update-location callback to recompute floating position.',
    definition: `export interface IScrollStrategyData {
    root: Ref<HTMLElement | undefined>
    contentEl: Ref<HTMLElement | undefined>
    targetEl: Ref<HTMLElement | undefined>
    isActive: Ref<boolean>
    updateLocation: Ref<((e: Event) => void) | undefined>
}`,
    extends: [],
    props: [
        { name: 'root', type: 'Ref<HTMLElement | undefined>', optional: false, descriptionFallback: 'The overlay root element whose scroll listeners are managed by the strategy.' },
        { name: 'contentEl', type: 'Ref<HTMLElement | undefined>', optional: false, descriptionFallback: 'The floating content element (tooltip bubble, menu panel, …).' },
        { name: 'targetEl', type: 'Ref<HTMLElement | undefined>', optional: false, descriptionFallback: 'The anchor / activator element that the floating panel is positioned relative to.' },
        { name: 'isActive', type: 'Ref<boolean>', optional: false, descriptionFallback: 'Reactive flag controlling overlay visibility. Strategies may set this to false to close the overlay on scroll.' },
        { name: 'updateLocation', type: 'Ref<((e: Event) => void) | undefined>', optional: false, descriptionFallback: 'Callback provided by the positioning engine. The strategy calls it on scroll events to recompute the floating panel position.' },
    ],
    usedBy: [
        { slug: 'overlay', name: 'Overlay', kind: 'component' },
        { slug: 'tooltip', name: 'Tooltip', kind: 'component' },
        { slug: 'use-scroll', name: 'useScroll', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/scroll.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_scroll_strategy_data.example',
            titleFallback: 'Writing a custom TScrollStrategyFn',
            code: `import type { IScrollStrategyData } from 'origam'

function closeOnScroll(data: IScrollStrategyData, props: any, scope: any) {
    // Close the overlay as soon as the user scrolls
    window.addEventListener('scroll', () => {
        data.isActive.value = false
    }, { once: true })
}`,
            lang: 'typescript',
        },
    ],
}
