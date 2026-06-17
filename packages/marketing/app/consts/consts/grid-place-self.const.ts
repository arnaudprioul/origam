import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const GRID_PLACE_SELF_CONST_DOC: IConstDoc = {
    slug: 'grid-place-self',
    name: 'GRID_PLACE_SELF',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.grid_place_self.description',
    descriptionFallback: 'Alias of GRID_PLACE_ITEMS for the per-item self-axis (alignSelf / justifySelf). Shares the same four values: start, center, end, stretch.',
    definition: `export const GRID_PLACE_SELF: ReadonlyArray<TGridPlaceSelf> = GRID_PLACE_ITEMS`,
    values: [
        { value: "'start'", descriptionKey: 'consts.detail.grid_place_self.start', descriptionFallback: 'Align the item to the start of its cell on the self-axis.' },
        { value: "'center'", descriptionKey: 'consts.detail.grid_place_self.center', descriptionFallback: 'Center the item within its cell on the self-axis.' },
        { value: "'end'", descriptionKey: 'consts.detail.grid_place_self.end', descriptionFallback: 'Align the item to the end of its cell on the self-axis.' },
        { value: "'stretch'", descriptionKey: 'consts.detail.grid_place_self.stretch', descriptionFallback: 'Stretch the item to fill its cell on the self-axis.' },
    ],
    usedBy: [
        { name: 'OrigamGridItem', slug: 'grid' },
        { name: 'GRID_PLACE_ITEMS' },
    ],
    sourceFile: 'packages/ds/src/consts/Grid/grid.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.grid_place_self.example',
            titleFallback: 'Using GRID_PLACE_SELF to populate a picker',
            code: `import { GRID_PLACE_SELF } from 'origam'

const selfOptions = GRID_PLACE_SELF.map(v => ({ label: v, value: v }))`,
            lang: 'typescript',
        },
    ],
}
