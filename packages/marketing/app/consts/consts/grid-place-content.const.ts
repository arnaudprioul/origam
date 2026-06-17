import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const GRID_PLACE_CONTENT_CONST_DOC: IConstDoc = {
    slug: 'grid-place-content',
    name: 'GRID_PLACE_CONTENT',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.grid_place_content.description',
    descriptionFallback: 'Closed list of valid alignContent / justifyContent values for OrigamGrid. Extends GRID_PLACE_ITEMS with distribution keywords (space-between, space-around, space-evenly).',
    definition: `export const GRID_PLACE_CONTENT: ReadonlyArray<TGridPlaceContent> = [
    'start',
    'center',
    'end',
    'stretch',
    'space-between',
    'space-around',
    'space-evenly'
]`,
    values: [
        { value: "'start'", descriptionKey: 'consts.detail.grid_place_content.start', descriptionFallback: 'Pack content toward the start of the axis.' },
        { value: "'center'", descriptionKey: 'consts.detail.grid_place_content.center', descriptionFallback: 'Center content along the axis.' },
        { value: "'end'", descriptionKey: 'consts.detail.grid_place_content.end', descriptionFallback: 'Pack content toward the end of the axis.' },
        { value: "'stretch'", descriptionKey: 'consts.detail.grid_place_content.stretch', descriptionFallback: 'Stretch content to fill the grid container.' },
        { value: "'space-between'", descriptionKey: 'consts.detail.grid_place_content.space_between', descriptionFallback: 'Even gaps between tracks; no leading/trailing gap.' },
        { value: "'space-around'", descriptionKey: 'consts.detail.grid_place_content.space_around', descriptionFallback: 'Equal space around each track.' },
        { value: "'space-evenly'", descriptionKey: 'consts.detail.grid_place_content.space_evenly', descriptionFallback: 'Equal space between tracks and at edges.' },
    ],
    usedBy: [
        { name: 'OrigamGrid', slug: 'grid' },
    ],
    sourceFile: 'packages/ds/src/consts/Grid/grid.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.grid_place_content.example',
            titleFallback: 'Populating a select with valid content-placement values',
            code: `import { GRID_PLACE_CONTENT } from 'origam'

const options = GRID_PLACE_CONTENT.map(v => ({ label: v, value: v }))`,
            lang: 'typescript',
        },
    ],
}
