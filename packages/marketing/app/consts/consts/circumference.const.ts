import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const CIRCUMFERENCE_CONST_DOC: IConstDoc = {
    slug: 'circumference',
    name: 'CIRCUMFERENCE',
    category: 'Components',
    descriptionKey: 'consts.catalog.circumference.description',
    descriptionFallback: 'SVG circle circumference (2π × MAGIC_RADIUS) used by OrigamProgress circular mode to compute stroke-dasharray and stroke-dashoffset for the progress arc.',
    definition: `export const MAGIC_RADIUS = 20
export const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS`,
    value: String(2 * Math.PI * 20),
    usedBy: [
        { name: 'OrigamProgress', slug: 'progress' },
        { name: 'useProgress' },
    ],
    sourceFile: 'packages/ds/src/consts/Progress/progress.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.circumference.example',
            titleFallback: 'Computing stroke-dashoffset from a percentage',
            code: `import { CIRCUMFERENCE } from 'origam'

// 75% progress → dashoffset
const pct = 75
const dashoffset = CIRCUMFERENCE * (1 - pct / 100)`,
            lang: 'typescript',
        },
    ],
}
