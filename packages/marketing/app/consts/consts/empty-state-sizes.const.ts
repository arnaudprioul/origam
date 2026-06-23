import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const EMPTY_STATE_SIZES_CONST_DOC: IConstDoc = {
    slug: 'empty-state-sizes',
    name: 'EMPTY_STATE_SIZES',
    category: 'Feedback & Status',
    descriptionKey: 'consts.catalog.empty_state_sizes.description',
    descriptionFallback: 'Closed list of valid `size` values for OrigamEmptyState (sm, md, lg). Controls icon and text scale to fit different container contexts.',
    definition: `export const EMPTY_STATE_SIZES: ReadonlyArray<TEmptyStateSize> = [
    'sm',
    'md',
    'lg'
]`,
    values: [
        { value: "'sm'", descriptionKey: 'consts.detail.empty_state_sizes.sm', descriptionFallback: 'Small size — compact icon and text, suitable for list cells or drawers.' },
        { value: "'md'", descriptionKey: 'consts.detail.empty_state_sizes.md', descriptionFallback: 'Medium size — the default balanced presentation.' },
        { value: "'lg'", descriptionKey: 'consts.detail.empty_state_sizes.lg', descriptionFallback: 'Large size — prominent icon and heading, suitable for full-page states.' },
    ],
    usedBy: [
        { name: 'OrigamEmptyState', slug: 'empty-state' },
    ],
    sourceFile: 'packages/ds/src/consts/EmptyState/empty-state.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.empty_state_sizes.example',
            titleFallback: 'Iterating the size options',
            code: `import { EMPTY_STATE_SIZES } from 'origam'

for (const size of EMPTY_STATE_SIZES) {
  console.log(size) // 'sm', 'md', 'lg'
}`,
            lang: 'typescript',
        },
    ],
}
