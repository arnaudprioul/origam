import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const GRID_PLACE_CONTENT_TYPE_DOC: ITypeDoc = {
    slug: 'grid-place-content',
    name: 'TGridPlaceContent',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.grid_place_content.description',
    descriptionFallback: 'Shorthand alignment for the full grid track set inside its container (align-content + justify-content) — mirrors the CSS Box Alignment matrix used by OrigamGrid.',
    definition: `export type TGridPlaceContent =
    | 'start'
    | 'center'
    | 'end'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'`,
    values: [
        { value: 'start', descriptionKey: 'types.detail.grid_place_content.start', descriptionFallback: 'Packs all tracks against the start edge of the container.' },
        { value: 'center', descriptionKey: 'types.detail.grid_place_content.center', descriptionFallback: 'Centers the track bundle in the available space.' },
        { value: 'end', descriptionKey: 'types.detail.grid_place_content.end', descriptionFallback: 'Packs all tracks against the end edge of the container.' },
        { value: 'stretch', descriptionKey: 'types.detail.grid_place_content.stretch', descriptionFallback: 'Stretches tracks to fill the container (default when tracks have auto sizing).' },
        { value: 'space-between', descriptionKey: 'types.detail.grid_place_content.space_between', descriptionFallback: 'Equal space between tracks; no space at the edges.' },
        { value: 'space-around', descriptionKey: 'types.detail.grid_place_content.space_around', descriptionFallback: 'Equal space around each track; half that space at the edges.' },
        { value: 'space-evenly', descriptionKey: 'types.detail.grid_place_content.space_evenly', descriptionFallback: 'Equal space between every track and both edges.' },
    ],
    usedBy: [
        { slug: 'grid', name: 'Grid', propName: 'alignContent' },
        { slug: 'grid', name: 'Grid', propName: 'justifyContent' },
    ],
    sourceFile: 'packages/ds/src/types/Grid/grid-align.type.ts',
    examples: [
        {
            titleKey: 'types.detail.grid_place_content.example',
            titleFallback: 'Center the entire grid vertically and horizontally',
            code: `<origam-grid
  cols="2"
  align-content="center"
  justify-content="center"
  style="height: 400px"
>
  <origam-grid-item>A</origam-grid-item>
  <origam-grid-item>B</origam-grid-item>
</origam-grid>`,
            lang: 'html',
        },
    ],
}
