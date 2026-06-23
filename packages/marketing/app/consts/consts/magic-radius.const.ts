import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const MAGIC_RADIUS_CONST_DOC: IConstDoc = {
    slug: 'magic-radius',
    name: 'MAGIC_RADIUS',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.magic_radius.description',
    descriptionFallback: 'Radius (in SVG user units) of the circle path used by OrigamProgress circular mode. The value 20 is chosen so that CIRCUMFERENCE = 2π×20 ≈ 125.66, which maps cleanly to a 0–100 stroke-dashoffset range.',
    definition: `export const MAGIC_RADIUS = 20`,
    value: '20',
    usedBy: [
        { name: 'OrigamProgress', slug: 'progress' },
    ],
    sourceFile: 'packages/ds/src/consts/Progress/progress.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.magic_radius.example',
            titleFallback: 'Computing the SVG circle circumference',
            code: `import { MAGIC_RADIUS } from 'origam'

// CIRCUMFERENCE is exported alongside MAGIC_RADIUS
const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS // ≈ 125.66

// strokeDashoffset drives the progress arc
const offset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE`,
            lang: 'typescript',
        },
    ],
}
