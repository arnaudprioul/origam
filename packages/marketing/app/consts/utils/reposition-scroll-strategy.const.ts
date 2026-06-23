import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const REPOSITION_SCROLL_STRATEGY_UTIL_DOC: IUtilDoc = {
    slug: 'reposition-scroll-strategy',
    name: 'repositionScrollStrategy',
    category: 'Commons',
    icon: 'mdi-arrow-collapse-all',
    descriptionKey: 'utils.catalog.reposition_scroll_strategy.description',
    descriptionFallback: 'Scroll strategy that repositions a floating overlay (menu, tooltip, popover) to track its anchor when the page scrolls. Automatically throttles updates via requestIdleCallback when repositioning is slow.',
    signature: `function repositionScrollStrategy(
  data: IScrollStrategyData,
  _props: IScrollStrategyProps,
  scope: EffectScope
): void`,
    params: [
        {
            name: 'data',
            type: 'IScrollStrategyData',
            required: true,
            descriptionKey: 'utils.detail.reposition_scroll_strategy.param_data',
            descriptionFallback: 'Runtime context for the scroll strategy: references to the target element, content element, and the updateLocation callback used to reposition the overlay.',
        },
        {
            name: '_props',
            type: 'IScrollStrategyProps',
            required: true,
            descriptionKey: 'utils.detail.reposition_scroll_strategy.param_props',
            descriptionFallback: 'Component props for the scroll strategy. Not used directly by reposition but required by the shared scroll-strategy interface.',
        },
        {
            name: 'scope',
            type: 'EffectScope',
            required: true,
            descriptionKey: 'utils.detail.reposition_scroll_strategy.param_scope',
            descriptionFallback: 'Vue EffectScope in which the scroll listener and animation-frame cleanup are registered. The strategy is automatically torn down when the scope stops.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.reposition_scroll_strategy.returns',
        descriptionFallback: 'No return value. The strategy wires up and tears down scroll listeners reactively within the provided EffectScope.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/scroll.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.reposition_scroll_strategy.example_basic',
            titleFallback: 'Attach to an overlay via the scrollStrategy prop',
            code: `<!-- In an OrigamMenu or OrigamTooltip consumer -->
<origam-menu scroll-strategy="reposition">
  …
</origam-menu>`,
            lang: 'html',
        },
    ],
    related: ['block-scroll-strategy', 'close-scroll-strategy', 'bind-scroll', 'request-new-frame'],
}
