import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const EMPTY_STATE_ALIGN_TYPE_DOC: ITypeDoc = {
    slug: 'empty-state-align',
    name: 'TEmptyStateAlign',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.empty_state_align.description',
    descriptionFallback: 'Horizontal alignment of the icon, title, description and actions stack inside <OrigamEmptyState>.',
    definition: `/**
 * Horizontal alignment of the icon / title / description / actions
 * stack inside \`<OrigamEmptyState>\`.
 *
 * - \`center\` — default. Centred stack, content also \`text-align: center\`.
 *              Best for full-page or full-section placeholders.
 * - \`left\`   — left-aligned stack. Best for narrow side panels or list
 *              empty zones where the surrounding content is left-aligned.
 */
export type TEmptyStateAlign = 'center' | 'left'`,
    values: [
        {
            value: 'center',
            descriptionKey: 'types.detail.empty_state_align.center',
            descriptionFallback: 'Default. Centred stack — icon, title, description and actions are all horizontally centred. Best for full-page or full-section placeholders.',
        },
        {
            value: 'left',
            descriptionKey: 'types.detail.empty_state_align.left',
            descriptionFallback: 'Left-aligned stack. Best for narrow side panels or list empty zones where the surrounding content is left-aligned.',
        },
    ],
    usedBy: [
        { slug: 'empty-state', name: 'EmptyState', propName: 'align' },
    ],
    sourceFile: 'packages/ds/src/types/EmptyState/empty-state-align.type.ts',
    examples: [
        {
            titleKey: 'types.detail.empty_state_align.example_center',
            titleFallback: 'Centred empty state (default)',
            code: `<origam-empty-state
  preset="no-data"
  title="No items yet"
  description="Create your first item to get started."
  align="center"
/>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.empty_state_align.example_left',
            titleFallback: 'Left-aligned empty state for side panels',
            code: `<origam-empty-state
  preset="no-results"
  title="No results"
  description="Try adjusting your filters."
  align="left"
/>`,
            lang: 'html',
        },
    ],
}
