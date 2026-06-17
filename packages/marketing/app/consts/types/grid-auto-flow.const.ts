import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const GRID_AUTO_FLOW_TYPE_DOC: ITypeDoc = {
    slug: 'grid-auto-flow',
    name: 'TGridAutoFlow',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.grid_auto_flow.description',
    descriptionFallback: 'Closed list of CSS grid-auto-flow values surfaced by OrigamGrid — controls how implicit tracks are filled when items overflow the explicit template.',
    definition: `export type TGridAutoFlow =
    | 'row'
    | 'column'
    | 'row dense'
    | 'column dense'`,
    values: [
        { value: 'row', descriptionKey: 'types.detail.grid_auto_flow.row', descriptionFallback: 'Items fill each row in turn, adding new rows as needed (default browser behaviour).' },
        { value: 'column', descriptionKey: 'types.detail.grid_auto_flow.column', descriptionFallback: 'Items fill each column in turn, adding new columns as needed.' },
        { value: 'row dense', descriptionKey: 'types.detail.grid_auto_flow.row_dense', descriptionFallback: 'Row-first flow with a backfill pass — smaller items are placed in earlier gaps, improving visual density at the cost of DOM order.' },
        { value: 'column dense', descriptionKey: 'types.detail.grid_auto_flow.column_dense', descriptionFallback: 'Column-first flow with a backfill pass — same density algorithm applied to column layout.' },
    ],
    usedBy: [
        { slug: 'grid', name: 'Grid', propName: 'autoFlow' },
    ],
    sourceFile: 'packages/ds/src/types/Grid/grid-flow.type.ts',
    examples: [
        {
            titleKey: 'types.detail.grid_auto_flow.example',
            titleFallback: 'Dense column packing to eliminate gaps',
            code: `<origam-grid cols="3" auto-flow="column dense">
  <origam-grid-item col-span="2">Wide</origam-grid-item>
  <origam-grid-item>Narrow</origam-grid-item>
  <origam-grid-item>Narrow</origam-grid-item>
</origam-grid>`,
            lang: 'html',
        },
    ],
}
