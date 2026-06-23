import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const GRID_GAP_SIZES_CONST_DOC: IConstDoc = {
    slug: 'grid-gap-sizes',
    name: 'GRID_GAP_SIZES',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.grid_gap_sizes.description',
    descriptionFallback: 'Closed list of valid gap token values (xs → xl) accepted by the gap prop of OrigamGrid. Iterate this array to build a HstSelect or a picker without duplicating string literals.',
    definition: `export const GRID_GAP_SIZES: ReadonlyArray<TGridGapSize> = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl'
]`,
    values: [
        { value: "'xs'", descriptionKey: 'consts.detail.grid_gap_sizes.xs', descriptionFallback: 'Extra-small gap — tightest spacing.' },
        { value: "'sm'", descriptionKey: 'consts.detail.grid_gap_sizes.sm', descriptionFallback: 'Small gap.' },
        { value: "'md'", descriptionKey: 'consts.detail.grid_gap_sizes.md', descriptionFallback: 'Medium gap — default value.' },
        { value: "'lg'", descriptionKey: 'consts.detail.grid_gap_sizes.lg', descriptionFallback: 'Large gap.' },
        { value: "'xl'", descriptionKey: 'consts.detail.grid_gap_sizes.xl', descriptionFallback: 'Extra-large gap — widest spacing.' },
    ],
    usedBy: [
        { name: 'OrigamGrid', slug: 'grid' },
        { name: 'GRID_GAP_SIZE_VAR' },
    ],
    sourceFile: 'packages/ds/src/consts/Grid/grid.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.grid_gap_sizes.example',
            titleFallback: 'Iterating over valid gap sizes',
            code: `import { GRID_GAP_SIZES } from 'origam'

for (const gap of GRID_GAP_SIZES) {
  console.log(gap) // 'xs', 'sm', 'md', 'lg', 'xl'
}`,
            lang: 'typescript',
        },
    ],
}
