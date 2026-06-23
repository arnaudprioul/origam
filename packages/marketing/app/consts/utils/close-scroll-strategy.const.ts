import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CLOSE_SCROLL_STRATEGY_UTIL_DOC: IUtilDoc = {
    slug: 'close-scroll-strategy',
    name: 'closeScrollStrategy',
    category: 'Commons',
    icon: 'mdi-lock-outline',
    descriptionKey: 'utils.catalog.close_scroll_strategy.description',
    descriptionFallback: 'A scroll strategy that automatically closes an overlay (sets isActive to false) whenever a scroll event is detected on the target or content element. Used by OrigamMenu and similar floating components.',
    signature: `function closeScrollStrategy(data: IScrollStrategyData): void`,
    params: [
        {
            name: 'data',
            type: 'IScrollStrategyData',
            required: true,
            descriptionKey: 'utils.detail.close_scroll_strategy.param_data',
            descriptionFallback: 'The scroll strategy data object provided by the overlay infrastructure, containing refs to the content element, target element, and the isActive toggle.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.close_scroll_strategy.returns',
        descriptionFallback: 'Returns nothing. Registers a scroll listener that closes the overlay when triggered.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/scroll.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.close_scroll_strategy.example_basic',
            titleFallback: 'Used via the scrollStrategy prop',
            code: `<origam-menu scroll-strategy="close">
  <!-- closes on any scroll -->
</origam-menu>`,
            lang: 'html',
        },
    ],
    related: ['connected-location-strategy'],
}
