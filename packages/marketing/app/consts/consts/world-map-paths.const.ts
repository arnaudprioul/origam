import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const WORLD_MAP_PATHS_CONST_DOC: IConstDoc = {
    slug: 'world-map-paths',
    name: 'WORLD_MAP_PATHS',
    category: 'Chart & Map',
    descriptionKey: 'consts.catalog.world_map_paths.description',
    descriptionFallback: 'Simplified Mercator-projected SVG path strings on a 1000 x 500 canvas. Keys are ISO-3166-1 alpha-2 country codes; values are SVG "d" attribute strings. Covers 31 countries across 6 regions.',
    definition: `export const WORLD_MAP_PATHS: Record<string, string> = {
    US: 'M 55,118 L 58,110 L 70,108 … Z',
    CA: 'M 55,70 L 58,60 … Z M 45,80 … Z',
    // … 29 more country entries (31 total, source file 50 lines)
}`,
    values: [
        { value: 'US', descriptionKey: 'consts.detail.world_map_paths.us', descriptionFallback: 'United States — contiguous mainland polygon.' },
        { value: 'CA', descriptionKey: 'consts.detail.world_map_paths.ca', descriptionFallback: 'Canada — two-polygon entry (mainland + eastern extension).' },
        { value: 'BR', descriptionKey: 'consts.detail.world_map_paths.br', descriptionFallback: 'Brazil.' },
        { value: 'RU', descriptionKey: 'consts.detail.world_map_paths.ru', descriptionFallback: 'Russia — single simplified polygon.' },
        { value: 'CN', descriptionKey: 'consts.detail.world_map_paths.cn', descriptionFallback: 'China.' },
        { value: 'AU', descriptionKey: 'consts.detail.world_map_paths.au', descriptionFallback: 'Australia.' },
    ],
    usedBy: [
        { name: 'OrigamWorldMap', slug: 'world-map' },
        { name: 'OrigamChart', slug: 'chart' },
    ],
    sourceFile: 'packages/ds/src/consts/Chart/world-map.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.world_map_paths.example',
            titleFallback: 'Render a specific country path in an SVG',
            code: `import { WORLD_MAP_PATHS } from 'origam'

// In a template:
// <path :d="WORLD_MAP_PATHS['FR']" />`,
            lang: 'typescript',
        },
    ],
}
