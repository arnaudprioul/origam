import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const GRID_PLACE_ITEMS_TYPE_DOC: ITypeDoc = {
    slug: 'grid-place-items',
    name: 'TGridPlaceItems',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.grid_place_items.description',
    descriptionFallback: 'Shorthand alignment applied to every item within its grid cell (align-items + justify-items). baseline is excluded because it has no meaningful semantics when items span rows or columns.',
    definition: `export type TGridPlaceItems =
    | 'start'
    | 'center'
    | 'end'
    | 'stretch'`,
    values: [
        { value: 'start', descriptionKey: 'types.detail.grid_place_items.start', descriptionFallback: 'Aligns each item to the start edge of its cell.' },
        { value: 'center', descriptionKey: 'types.detail.grid_place_items.center', descriptionFallback: 'Centers each item within its cell on both axes.' },
        { value: 'end', descriptionKey: 'types.detail.grid_place_items.end', descriptionFallback: 'Aligns each item to the end edge of its cell.' },
        { value: 'stretch', descriptionKey: 'types.detail.grid_place_items.stretch', descriptionFallback: 'Stretches each item to fill its entire cell (default grid behaviour).' },
    ],
    usedBy: [
        { slug: 'grid', name: 'Grid', propName: 'alignItems' },
        { slug: 'grid', name: 'Grid', propName: 'justifyItems' },
    ],
    sourceFile: 'packages/ds/src/types/Grid/grid-align.type.ts',
    examples: [
        {
            titleKey: 'types.detail.grid_place_items.example',
            titleFallback: 'Center all items in their cells',
            code: `<origam-grid cols="3" align-items="center" justify-items="center">
  <origam-grid-item>A</origam-grid-item>
  <origam-grid-item>B</origam-grid-item>
  <origam-grid-item>C</origam-grid-item>
</origam-grid>`,
            lang: 'html',
        },
    ],
}
