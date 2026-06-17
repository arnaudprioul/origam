import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const LOCATION_STRATEGIES_ENUM_DOC: IEnumDoc = {
    slug: 'location-strategies',
    name: 'LOCATION_STRATEGIES',
    category: 'Layout & Sizing',
    descriptionKey: 'enums.catalog.location_strategies.description',
    descriptionFallback: 'Positioning strategy for floating overlays: static (document flow) or connected (anchored to an activator).',
    definition: `export enum LOCATION_STRATEGIES {
    STATIC    = 'static',
    CONNECTED = 'connected',
}`,
    values: [
        { value: 'LOCATION_STRATEGIES.STATIC', descriptionKey: 'enums.detail.location_strategies.static', descriptionFallback: 'The overlay stays in the document flow without anchoring.' },
        { value: 'LOCATION_STRATEGIES.CONNECTED', descriptionKey: 'enums.detail.location_strategies.connected', descriptionFallback: 'The overlay is positioned relative to its activator element.' },
    ],
    usedBy: [
        { slug: 'menu', name: 'Menu', propName: 'locationStrategy' },
        { slug: 'tooltip', name: 'Tooltip', propName: 'locationStrategy' },
        { slug: 'contextual-menu', name: 'ContextualMenu', propName: 'locationStrategy' },
        { slug: 'overlay', name: 'Overlay', propName: 'locationStrategy' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/location.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.location_strategies.example',
            titleFallback: 'Choosing a positioning strategy',
            code: `import { LOCATION_STRATEGIES } from 'origam'

const strategy: LOCATION_STRATEGIES = LOCATION_STRATEGIES.CONNECTED`,
            lang: 'typescript',
        },
    ],
}
