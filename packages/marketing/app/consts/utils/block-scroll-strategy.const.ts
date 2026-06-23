import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const BLOCK_SCROLL_STRATEGY_UTIL_DOC: IUtilDoc = {
    slug: 'block-scroll-strategy',
    name: 'blockScrollStrategy',
    category: 'Commons',
    icon: 'mdi-lock-outline',
    descriptionKey: 'utils.catalog.block_scroll_strategy.description',
    descriptionFallback: 'Prevent page scrolling while an overlay is open. Adds the origam-overlay--scroll-blocked class to all scroll parents, captures their current scroll positions as CSS custom properties, and restores everything on scope disposal.',
    signature: `function blockScrollStrategy(
  data: IScrollStrategyData,
  props: IScrollStrategyProps
): void`,
    params: [
        {
            name: 'data',
            type: 'IScrollStrategyData',
            required: true,
            descriptionKey: 'utils.detail.block_scroll_strategy.param_data',
            descriptionFallback: 'Context object carrying reactive refs for the overlay root, target element, and content element, plus an updateLocation callback.',
        },
        {
            name: 'props',
            type: 'IScrollStrategyProps',
            required: true,
            descriptionKey: 'utils.detail.block_scroll_strategy.param_props',
            descriptionFallback: 'Strategy configuration, notably the contained flag that restricts scroll-parent collection to within the offset parent rather than the full ancestor chain.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.block_scroll_strategy.returns',
        descriptionFallback: 'No return value. Cleanup (restoring scroll positions and removing classes) runs automatically on onScopeDispose.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/scroll.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.block_scroll_strategy.example_basic',
            titleFallback: 'Use inside an overlay composable',
            code: `import { blockScrollStrategy } from 'origam'
import { effectScope } from 'vue'

// Used internally by useScrollStrategy when scrollStrategy === 'block'
const scope = effectScope()
scope.run(() => {
    blockScrollStrategy(overlayData, { contained: false })
})
// Scroll is blocked while scope is alive
scope.stop() // → scroll restored`,
            lang: 'typescript',
        },
    ],
    related: ['bind-scroll', 'add-window-listener'],
}
