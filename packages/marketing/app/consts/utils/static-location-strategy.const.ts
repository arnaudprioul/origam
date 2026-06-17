import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const STATIC_LOCATION_STRATEGY_UTIL_DOC: IUtilDoc = {
    slug: 'static-location-strategy',
    name: 'staticLocationStrategy',
    category: 'Commons',
    icon: 'mdi-map-marker-outline',
    descriptionKey: 'utils.catalog.static_location_strategy.description',
    descriptionFallback: 'A no-op location strategy placeholder used when an overlay component should not reposition itself. The function currently does nothing and is reserved for future implementation.',
    signature: `function staticLocationStrategy(): void`,
    params: [],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.static_location_strategy.returns',
        descriptionFallback: 'No return value. Currently a no-op (TODO in the source).',
    },
    sourceFile: 'packages/ds/src/utils/Commons/location.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.static_location_strategy.example_basic',
            titleFallback: 'Pass as the locationStrategy prop',
            code: `import { staticLocationStrategy } from 'origam'

// <OrigamMenu :locationStrategy="staticLocationStrategy" />`,
            lang: 'typescript',
        },
    ],
    related: ['connected-location-strategy'],
    noteKey: 'utils.detail.static_location_strategy.note',
    noteFallback: 'This function is a stub. It is exported for API surface completeness but currently has no behaviour (TODO marker in the source).',
}
