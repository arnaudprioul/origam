import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const GRID_PLACE_SELF_TYPE_DOC: ITypeDoc = {
    slug: 'grid-place-self',
    name: 'TGridPlaceSelf',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.grid_place_self.description',
    descriptionFallback: 'Per-item override of cell alignment (align-self + justify-self) on a GridItem — same value set as TGridPlaceItems but applied to a single item rather than the entire grid.',
    definition: `export type TGridPlaceSelf =
    | 'start'
    | 'center'
    | 'end'
    | 'stretch'`,
    values: [
        { value: 'start', descriptionKey: 'types.detail.grid_place_self.start', descriptionFallback: 'Aligns this item to the start edge of its cell, overriding the grid-level alignItems.' },
        { value: 'center', descriptionKey: 'types.detail.grid_place_self.center', descriptionFallback: 'Centers this item within its cell on both axes.' },
        { value: 'end', descriptionKey: 'types.detail.grid_place_self.end', descriptionFallback: 'Aligns this item to the end edge of its cell.' },
        { value: 'stretch', descriptionKey: 'types.detail.grid_place_self.stretch', descriptionFallback: 'Stretches this item to fill the full cell dimensions.' },
    ],
    usedBy: [
        { slug: 'grid-item', name: 'GridItem', propName: 'alignSelf' },
        { slug: 'grid-item', name: 'GridItem', propName: 'justifySelf' },
    ],
    sourceFile: 'packages/ds/src/types/Grid/grid-align.type.ts',
    examples: [
        {
            titleKey: 'types.detail.grid_place_self.example',
            titleFallback: 'Override alignment on a single item',
            code: `<origam-grid cols="3" align-items="stretch">
  <origam-grid-item>Stretched (default)</origam-grid-item>
  <origam-grid-item align-self="center">Centred</origam-grid-item>
  <origam-grid-item align-self="end">Bottom-pinned</origam-grid-item>
</origam-grid>`,
            lang: 'html',
        },
    ],
}
