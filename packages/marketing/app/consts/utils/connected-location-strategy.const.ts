import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CONNECTED_LOCATION_STRATEGY_UTIL_DOC: IUtilDoc = {
    slug: 'connected-location-strategy',
    name: 'connectedLocationStrategy',
    category: 'Commons',
    icon: 'mdi-map-marker-outline',
    descriptionKey: 'utils.catalog.connected_location_strategy.description',
    descriptionFallback: 'Positions a floating overlay relative to its activator by computing the preferred anchor and origin, then adjusting to avoid viewport overflow. Handles both fixed and scrolled activators.',
    signature: `function connectedLocationStrategy(
  data: ILocationStrategyData,
  props: ILocationStrategyProps,
  contentStyles: Ref<Record<string, string>>
): void`,
    params: [
        {
            name: 'data',
            type: 'ILocationStrategyData',
            required: true,
            descriptionKey: 'utils.detail.connected_location_strategy.param_data',
            descriptionFallback: 'Runtime data provided by the overlay (target ref, content ref, root ref, scroll parent).',
        },
        {
            name: 'props',
            type: 'ILocationStrategyProps',
            required: true,
            descriptionKey: 'utils.detail.connected_location_strategy.param_props',
            descriptionFallback: 'Component props driving the strategy: location, origin, offset, strategy.',
        },
        {
            name: 'contentStyles',
            type: 'Ref<Record<string, string>>',
            required: true,
            descriptionKey: 'utils.detail.connected_location_strategy.param_content_styles',
            descriptionFallback: 'A reactive ref that the strategy mutates to update the overlay\'s position styles.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.connected_location_strategy.returns',
        descriptionFallback: 'Returns nothing. Applies position styles reactively via the contentStyles ref and sets up resize/scroll watchers.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/location.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.connected_location_strategy.example_basic',
            titleFallback: 'Used via the locationStrategy prop',
            code: `<origam-menu location-strategy="connected" location="bottom">
  <!-- floats below activator, flips on overflow -->
</origam-menu>`,
            lang: 'html',
        },
    ],
    related: ['close-scroll-strategy'],
}
