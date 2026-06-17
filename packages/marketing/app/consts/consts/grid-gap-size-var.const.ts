import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const GRID_GAP_SIZE_VAR_CONST_DOC: IConstDoc = {
    slug: 'grid-gap-size-var',
    name: 'GRID_GAP_SIZE_VAR',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.grid_gap_size_var.description',
    descriptionFallback: 'Maps every gap-size token to its corresponding CSS custom property emitted by Style Dictionary from tokens/component/grid.json. Provides a single source of truth so a token rename propagates automatically.',
    definition: `export const GRID_GAP_SIZE_VAR: Readonly<Record<TGridGapSize, string>> = {
    xs: 'var(--origam-grid---gap-xs)',
    sm: 'var(--origam-grid---gap-sm)',
    md: 'var(--origam-grid---gap-md)',
    lg: 'var(--origam-grid---gap-lg)',
    xl: 'var(--origam-grid---gap-xl)'
}`,
    values: [
        { value: "xs: 'var(--origam-grid---gap-xs)'", descriptionKey: 'consts.detail.grid_gap_size_var.xs', descriptionFallback: 'CSS variable for the xs gap token.' },
        { value: "sm: 'var(--origam-grid---gap-sm)'", descriptionKey: 'consts.detail.grid_gap_size_var.sm', descriptionFallback: 'CSS variable for the sm gap token.' },
        { value: "md: 'var(--origam-grid---gap-md)'", descriptionKey: 'consts.detail.grid_gap_size_var.md', descriptionFallback: 'CSS variable for the md gap token.' },
        { value: "lg: 'var(--origam-grid---gap-lg)'", descriptionKey: 'consts.detail.grid_gap_size_var.lg', descriptionFallback: 'CSS variable for the lg gap token.' },
        { value: "xl: 'var(--origam-grid---gap-xl)'", descriptionKey: 'consts.detail.grid_gap_size_var.xl', descriptionFallback: 'CSS variable for the xl gap token.' },
    ],
    usedBy: [
        { name: 'OrigamGrid', slug: 'grid' },
    ],
    sourceFile: 'packages/ds/src/consts/Grid/grid.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.grid_gap_size_var.example',
            titleFallback: 'Resolving a gap token to its CSS variable',
            code: `import { GRID_GAP_SIZE_VAR } from 'origam'

const cssVar = GRID_GAP_SIZE_VAR['md']
// → 'var(--origam-grid---gap-md)'`,
            lang: 'typescript',
        },
    ],
}
