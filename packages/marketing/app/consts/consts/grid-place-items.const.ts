import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const GRID_PLACE_ITEMS_CONST_DOC: IConstDoc = {
    slug: 'grid-place-items',
    name: 'GRID_PLACE_ITEMS',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.grid_place_items.description',
    descriptionFallback: 'Closed list of valid alignItems / justifyItems values for OrigamGrid. Also aliased as GRID_PLACE_SELF for the per-item self-axis.',
    definition: `export const GRID_PLACE_ITEMS: ReadonlyArray<TGridPlaceItems> = [
    'start',
    'center',
    'end',
    'stretch'
]`,
    values: [
        { value: "'start'", descriptionKey: 'consts.detail.grid_place_items.start', descriptionFallback: 'Align items to the start of their cell.' },
        { value: "'center'", descriptionKey: 'consts.detail.grid_place_items.center', descriptionFallback: 'Center items within their cell.' },
        { value: "'end'", descriptionKey: 'consts.detail.grid_place_items.end', descriptionFallback: 'Align items to the end of their cell.' },
        { value: "'stretch'", descriptionKey: 'consts.detail.grid_place_items.stretch', descriptionFallback: 'Stretch items to fill their cell (default).' },
    ],
    usedBy: [
        { name: 'OrigamGrid', slug: 'grid' },
        { name: 'GRID_PLACE_SELF' },
    ],
    sourceFile: 'packages/ds/src/consts/Grid/grid.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.grid_place_items.example',
            titleFallback: 'Validating an alignItems value',
            code: `import { GRID_PLACE_ITEMS } from 'origam'

const isValid = (v: string) =>
  (GRID_PLACE_ITEMS as readonly string[]).includes(v)`,
            lang: 'typescript',
        },
    ],
}
