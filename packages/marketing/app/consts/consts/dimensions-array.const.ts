import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const DIMENSIONS_ARRAY_CONST_DOC: IConstDoc = {
    slug: 'dimensions-array',
    name: 'DIMENSIONS_ARRAY',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.dimensions_array.description',
    descriptionFallback: 'Ordered array of all six dimension prop names (height, maxHeight, maxWidth, minHeight, minWidth, width) consumed by useDimension to iterate the full surface.',
    definition: `export const DIMENSIONS_ARRAY: Array<TDimensions> = [
    DIMENSIONS.HEIGHT,
    DIMENSIONS.MAX_HEIGHT,
    DIMENSIONS.MAX_WIDTH,
    DIMENSIONS.MIN_HEIGHT,
    DIMENSIONS.MIN_WIDTH,
    DIMENSIONS.WIDTH
]`,
    values: [
        { value: 'DIMENSIONS.HEIGHT', descriptionKey: 'consts.detail.dimensions_array.height', descriptionFallback: 'The height dimension prop name.' },
        { value: 'DIMENSIONS.MAX_HEIGHT', descriptionKey: 'consts.detail.dimensions_array.max_height', descriptionFallback: 'The maxHeight dimension prop name.' },
        { value: 'DIMENSIONS.MAX_WIDTH', descriptionKey: 'consts.detail.dimensions_array.max_width', descriptionFallback: 'The maxWidth dimension prop name.' },
        { value: 'DIMENSIONS.MIN_HEIGHT', descriptionKey: 'consts.detail.dimensions_array.min_height', descriptionFallback: 'The minHeight dimension prop name.' },
        { value: 'DIMENSIONS.MIN_WIDTH', descriptionKey: 'consts.detail.dimensions_array.min_width', descriptionFallback: 'The minWidth dimension prop name.' },
        { value: 'DIMENSIONS.WIDTH', descriptionKey: 'consts.detail.dimensions_array.width', descriptionFallback: 'The width dimension prop name.' },
    ],
    usedBy: [
        { name: 'useDimension' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/dimension.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.dimensions_array.example',
            titleFallback: 'Iterating the dimension names',
            code: `import { DIMENSIONS_ARRAY } from 'origam'

for (const dim of DIMENSIONS_ARRAY) {
  console.log(dim) // 'height', 'maxHeight', 'maxWidth', ...
}`,
            lang: 'typescript',
        },
    ],
}
