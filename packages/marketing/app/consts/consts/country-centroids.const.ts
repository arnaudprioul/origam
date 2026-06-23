import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const COUNTRY_CENTROIDS_CONST_DOC: IConstDoc = {
    slug: 'country-centroids',
    name: 'COUNTRY_CENTROIDS',
    category: 'Charts & Data Viz',
    descriptionKey: 'consts.catalog.country_centroids.description',
    descriptionFallback: 'Visual centroid [x, y] coordinates for each country on the 1000 × 500 Mercator canvas used by WORLD_MAP_PATHS. Values are approximate geographic centres of each country shape and serve as endpoints for Bezier flight-route curves.',
    definition: `export const COUNTRY_CENTROIDS: Record<string, [number, number]> = {
    US: [122, 130], CA: [120, 66], MX: [124, 178],
    BR: [258, 252], AR: [245, 345],
    // … 40+ entries total (truncated)
}`,
    values: [
        { value: 'US: [122, 130]', descriptionKey: 'consts.detail.country_centroids.us', descriptionFallback: 'United States centroid on the 1000×500 canvas.' },
        { value: 'CA: [120, 66]', descriptionKey: 'consts.detail.country_centroids.ca', descriptionFallback: 'Canada centroid on the 1000×500 canvas.' },
        { value: 'BR: [258, 252]', descriptionKey: 'consts.detail.country_centroids.br', descriptionFallback: 'Brazil centroid on the 1000×500 canvas.' },
        { value: 'GB: [452, 96]', descriptionKey: 'consts.detail.country_centroids.gb', descriptionFallback: 'United Kingdom centroid on the 1000×500 canvas.' },
        { value: 'DE: [504, 112]', descriptionKey: 'consts.detail.country_centroids.de', descriptionFallback: 'Germany centroid on the 1000×500 canvas.' },
        { value: 'CN: [726, 150]', descriptionKey: 'consts.detail.country_centroids.cn', descriptionFallback: 'China centroid on the 1000×500 canvas.' },
        { value: 'JP: [820, 148]', descriptionKey: 'consts.detail.country_centroids.jp', descriptionFallback: 'Japan centroid on the 1000×500 canvas.' },
        { value: 'AU: [820, 340]', descriptionKey: 'consts.detail.country_centroids.au', descriptionFallback: 'Australia centroid on the 1000×500 canvas.' },
    ],
    usedBy: [
        { name: 'OrigamWorldMap', slug: 'world-map' },
    ],
    sourceFile: 'packages/ds/src/consts/Chart/country-centroids.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.country_centroids.example',
            titleFallback: 'Drawing a flight arc between two countries',
            code: `import { COUNTRY_CENTROIDS } from 'origam'

const [x1, y1] = COUNTRY_CENTROIDS['US']
const [x2, y2] = COUNTRY_CENTROIDS['FR']
const mx = (x1 + x2) / 2
const my = Math.min(y1, y2) - 40
const path = \`M\${x1},\${y1} Q\${mx},\${my} \${x2},\${y2}\``,
            lang: 'typescript',
        },
    ],
}
