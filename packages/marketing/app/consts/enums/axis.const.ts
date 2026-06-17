import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const AXIS_ENUM_DOC: IEnumDoc = {
    slug: 'axis',
    name: 'AXIS',
    category: 'Layout & Positioning',
    descriptionKey: 'enums.catalog.axis.description',
    descriptionFallback: 'TypeScript enum for the drag or scroll axis constraint (both, x, y).',
    definition: `export enum AXIS {
    BOTH = 'both',
    X    = 'x',
    Y    = 'y',
}`,
    values: [
        { value: 'AXIS.BOTH', descriptionKey: 'enums.detail.axis.both', descriptionFallback: 'Unconstrained — movement allowed on both X and Y axes.' },
        { value: 'AXIS.X', descriptionKey: 'enums.detail.axis.x', descriptionFallback: 'Constrained to the horizontal axis only.' },
        { value: 'AXIS.Y', descriptionKey: 'enums.detail.axis.y', descriptionFallback: 'Constrained to the vertical axis only.' },
    ],
    usedBy: [
        { slug: 'textarea-field', name: 'TextareaField', propName: 'axis' },
        { slug: 'chart-cartesian', name: 'ChartCartesian', propName: 'axis' },
        { slug: 'code', name: 'Code', propName: 'axis' },
        { slug: 'parallax-element', name: 'ParallaxElement', propName: 'axis' },
        { slug: 'window', name: 'Window', propName: 'axis' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/drag.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.axis.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { AXIS } from 'origam'

const dragAxis: AXIS = AXIS.X`,
            lang: 'typescript',
        },
    ],
}
