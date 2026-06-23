import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const GRID_AUTO_FLOWS_CONST_DOC: IConstDoc = {
    slug: 'grid-auto-flows',
    name: 'GRID_AUTO_FLOWS',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.grid_auto_flows.description',
    descriptionFallback: 'Closed list of valid `autoFlow` values for OrigamGrid (row, column, row dense, column dense). Maps directly to the CSS `grid-auto-flow` property values.',
    definition: `export const GRID_AUTO_FLOWS: ReadonlyArray<TGridAutoFlow> = [
    'row',
    'column',
    'row dense',
    'column dense'
]`,
    values: [
        { value: "'row'", descriptionKey: 'consts.detail.grid_auto_flows.row', descriptionFallback: 'Auto-places items by filling each row before moving to the next.' },
        { value: "'column'", descriptionKey: 'consts.detail.grid_auto_flows.column', descriptionFallback: 'Auto-places items by filling each column before moving to the next.' },
        { value: "'row dense'", descriptionKey: 'consts.detail.grid_auto_flows.row_dense', descriptionFallback: 'Row placement with dense packing — fills gaps left by larger items.' },
        { value: "'column dense'", descriptionKey: 'consts.detail.grid_auto_flows.column_dense', descriptionFallback: 'Column placement with dense packing.' },
    ],
    usedBy: [
        { name: 'OrigamGrid', slug: 'grid' },
        { name: 'GRID_DEFAULTS' },
    ],
    sourceFile: 'packages/ds/src/consts/Grid/grid.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.grid_auto_flows.example',
            titleFallback: 'Iterating auto-flow options',
            code: `import { GRID_AUTO_FLOWS } from 'origam'

for (const flow of GRID_AUTO_FLOWS) {
  console.log(flow) // 'row', 'column', 'row dense', 'column dense'
}`,
            lang: 'typescript',
        },
    ],
}
