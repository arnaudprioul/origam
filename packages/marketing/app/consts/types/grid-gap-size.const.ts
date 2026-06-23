import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const GRID_GAP_SIZE_TYPE_DOC: ITypeDoc = {
    slug: 'grid-gap-size',
    name: 'TGridGapSize',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.grid_gap_size.description',
    descriptionFallback: 'Named gap size tokens for OrigamGrid: xs, sm, md, lg, xl.',
    definition: `export type TGridGapSize =
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'`,
    values: [
        { value: 'xs', descriptionKey: 'types.detail.grid_gap_size.xs', descriptionFallback: 'Extra small gap — resolves to var(--origam-grid---gap-xs).' },
        { value: 'sm', descriptionKey: 'types.detail.grid_gap_size.sm', descriptionFallback: 'Small gap — resolves to var(--origam-grid---gap-sm).' },
        { value: 'md', descriptionKey: 'types.detail.grid_gap_size.md', descriptionFallback: 'Medium gap — default for most grid layouts.' },
        { value: 'lg', descriptionKey: 'types.detail.grid_gap_size.lg', descriptionFallback: 'Large gap — resolves to var(--origam-grid---gap-lg).' },
        { value: 'xl', descriptionKey: 'types.detail.grid_gap_size.xl', descriptionFallback: 'Extra large gap — resolves to var(--origam-grid---gap-xl).' },
    ],
    usedBy: [
        { slug: 'grid', name: 'Grid', propName: 'gap' },
        { slug: 'masonry', name: 'Masonry', propName: 'gap' },
    ],
    sourceFile: 'packages/ds/src/types/Grid/grid-align.type.ts',
    examples: [
        {
            titleKey: 'types.detail.grid_gap_size.example',
            titleFallback: 'Grid with named gap token',
            code: `<origam-grid columns="repeat(3, 1fr)" gap="md">
  <origam-grid-item>A</origam-grid-item>
  <origam-grid-item>B</origam-grid-item>
  <origam-grid-item>C</origam-grid-item>
</origam-grid>`,
            lang: 'html',
        },
    ],
}
