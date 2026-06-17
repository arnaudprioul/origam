import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const EMPTY_STATE_ALIGNS_CONST_DOC: IConstDoc = {
    slug: 'empty-state-aligns',
    name: 'EMPTY_STATE_ALIGNS',
    category: 'Feedback & Status',
    descriptionKey: 'consts.catalog.empty_state_aligns.description',
    descriptionFallback: 'Closed list of valid `align` values for OrigamEmptyState. Exposed so stories and consumers can iterate the full alignment matrix without duplicating string literals.',
    definition: `export const EMPTY_STATE_ALIGNS: ReadonlyArray<TEmptyStateAlign> = [
    'center',
    'left'
]`,
    values: [
        { value: "'center'", descriptionKey: 'consts.detail.empty_state_aligns.center', descriptionFallback: 'Centers the empty state content horizontally.' },
        { value: "'left'", descriptionKey: 'consts.detail.empty_state_aligns.left', descriptionFallback: 'Aligns the empty state content to the left.' },
    ],
    usedBy: [
        { name: 'OrigamEmptyState', slug: 'empty-state' },
        { name: 'useEmptyState' },
    ],
    sourceFile: 'packages/ds/src/consts/EmptyState/empty-state.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.empty_state_aligns.example',
            titleFallback: 'Iterating the alignment options',
            code: `import { EMPTY_STATE_ALIGNS } from 'origam'

for (const align of EMPTY_STATE_ALIGNS) {
  console.log(align) // 'center', 'left'
}`,
            lang: 'typescript',
        },
    ],
}
