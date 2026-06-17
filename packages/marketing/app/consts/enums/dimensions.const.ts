import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const DIMENSIONS_ENUM_DOC: IEnumDoc = {
    slug: 'dimensions',
    name: 'DIMENSIONS',
    category: 'Layout & Sizing',
    descriptionKey: 'enums.catalog.dimensions.description',
    descriptionFallback: 'Enumeration of the six dimension prop keys supported by IDimensionProps and consumed by useDimension().',
    definition: `export enum DIMENSIONS {
    HEIGHT     = 'height',
    MAX_HEIGHT = 'maxHeight',
    MAX_WIDTH  = 'maxWidth',
    MIN_HEIGHT = 'minHeight',
    MIN_WIDTH  = 'minWidth',
    WIDTH      = 'width',
}`,
    values: [
        { value: 'DIMENSIONS.HEIGHT', descriptionKey: 'enums.detail.dimensions.height', descriptionFallback: 'Maps to the height CSS property.' },
        { value: 'DIMENSIONS.MAX_HEIGHT', descriptionKey: 'enums.detail.dimensions.max_height', descriptionFallback: 'Maps to max-height.' },
        { value: 'DIMENSIONS.MAX_WIDTH', descriptionKey: 'enums.detail.dimensions.max_width', descriptionFallback: 'Maps to max-width.' },
        { value: 'DIMENSIONS.MIN_HEIGHT', descriptionKey: 'enums.detail.dimensions.min_height', descriptionFallback: 'Maps to min-height.' },
        { value: 'DIMENSIONS.MIN_WIDTH', descriptionKey: 'enums.detail.dimensions.min_width', descriptionFallback: 'Maps to min-width.' },
        { value: 'DIMENSIONS.WIDTH', descriptionKey: 'enums.detail.dimensions.width', descriptionFallback: 'Maps to the width CSS property.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Commons/dimension.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.dimensions.example',
            titleFallback: 'Iterating over dimension keys in a composable',
            code: `import { DIMENSIONS } from 'origam'

const dimensionKeys = Object.values(DIMENSIONS)
// ['height', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'width']`,
            lang: 'typescript',
        },
    ],
}
