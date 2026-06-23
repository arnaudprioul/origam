import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const LOCATION_STRATEGIES_CONST_DOC: IConstDoc = {
    slug: 'location-strategies',
    name: 'LOCATION_STRATEGIES',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.location_strategies.description',
    descriptionFallback: 'Map of the two built-in positioning strategies used by floating components (Menu, Tooltip, Picker). static = fixed viewport position (centered by default); connected = anchored to a triggering element.',
    definition: `export const LOCATION_STRATEGIES = {
    static: staticLocationStrategy,   // fixed viewport position, usually centered
    connected: connectedLocationStrategy // connected to a certain element
}`,
    values: [
        { value: 'static', descriptionKey: 'consts.detail.location_strategies.static', descriptionFallback: 'staticLocationStrategy — places the overlay at a fixed position in the viewport (default: centered).' },
        { value: 'connected', descriptionKey: 'consts.detail.location_strategies.connected', descriptionFallback: 'connectedLocationStrategy — anchors the overlay to a reference element and tracks its position.' },
    ],
    usedBy: [
        { name: 'useLocationStrategies' },
        { name: 'OrigamMenu', slug: 'menu' },
        { name: 'OrigamTooltip', slug: 'tooltip' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/location.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.location_strategies.example',
            titleFallback: 'Referencing a location strategy by name',
            code: `import { LOCATION_STRATEGIES } from 'origam'

const strategy = LOCATION_STRATEGIES['connected']
// → connectedLocationStrategy function`,
            lang: 'typescript',
        },
    ],
}
