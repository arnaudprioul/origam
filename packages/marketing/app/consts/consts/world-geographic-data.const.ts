import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const WORLD_GEOGRAPHIC_DATA_CONST_DOC: IConstDoc = {
    slug: 'world-geographic-data',
    name: 'WORLD_GEOGRAPHIC_DATA',
    category: 'Chart & Map',
    descriptionKey: 'consts.catalog.world_geographic_data.description',
    descriptionFallback: 'Multi-polygon geographic data in WGS-84 (lng, lat) degrees. Keys are ISO-3166-1 alpha-2 codes; values are arrays of closed rings. Covers 58 countries with 1-2 decimal-place precision (~1-11 km accuracy). Source file: 1815 lines.',
    definition: `export const WORLD_GEOGRAPHIC_DATA: Record<string, Array<Array<[number, number]>>> = {
    // ─── North America ───────────────────────────────────────────────
    US: [[ [-124.7, 48.4], [-117.0, 49.0], /* … ~30 vertices */ ]],
    CA: [[ [-140.9, 60.0], [-120.0, 60.0], /* … */ ], /* islands */],
    // … 56 more country entries across 6 regions
    // Full source: packages/ds/src/consts/Chart/world-geographic.const.ts (1815 lines)
}`,
    values: [
        { value: 'US', descriptionKey: 'consts.detail.world_geographic_data.us', descriptionFallback: 'United States — contiguous mainland + Alaska + Hawaii multi-polygon.' },
        { value: 'CA', descriptionKey: 'consts.detail.world_geographic_data.ca', descriptionFallback: 'Canada — mainland + island chains.' },
        { value: 'BR', descriptionKey: 'consts.detail.world_geographic_data.br', descriptionFallback: 'Brazil.' },
        { value: 'RU', descriptionKey: 'consts.detail.world_geographic_data.ru', descriptionFallback: 'Russia — simplified single ring due to extreme size.' },
        { value: 'CN', descriptionKey: 'consts.detail.world_geographic_data.cn', descriptionFallback: 'China — mainland polygon.' },
        { value: 'AU', descriptionKey: 'consts.detail.world_geographic_data.au', descriptionFallback: 'Australia — mainland + Tasmania.' },
    ],
    usedBy: [
        { name: 'OrigamWorldMap', slug: 'world-map' },
        { name: 'OrigamChart', slug: 'chart' },
    ],
    sourceFile: 'packages/ds/src/consts/Chart/world-geographic.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.world_geographic_data.example',
            titleFallback: 'Project WGS-84 coordinates onto an SVG canvas',
            code: `import { WORLD_GEOGRAPHIC_DATA } from 'origam'

const rings = WORLD_GEOGRAPHIC_DATA['FR']
// rings: Array<Array<[lng, lat]>>
// Map to pixel space with your projection function`,
            lang: 'typescript',
        },
    ],
}
