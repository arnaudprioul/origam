import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const EMPTY_STATE_SIZE_TYPE_DOC: ITypeDoc = {
    slug: 'empty-state-size',
    name: 'TEmptyStateSize',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.empty_state_size.description',
    descriptionFallback: 'Vertical density of <OrigamEmptyState>. Drives icon size, title/description font sizes, gap and padding via per-size token overrides.',
    definition: `/**
 * Vertical density of \`<OrigamEmptyState>\`. Drives icon size + title /
 * description font sizes + gap + padding via per-size token overrides.
 *
 * - \`sm\` — compact (inline empty zones inside dense containers).
 * - \`md\` — default (full-page-section empty states).
 * - \`lg\` — generous (hero empty pages, marketing-style placeholders).
 */
export type TEmptyStateSize = 'sm' | 'md' | 'lg'`,
    values: [
        {
            value: 'sm',
            descriptionKey: 'types.detail.empty_state_size.sm',
            descriptionFallback: 'Compact — smaller icon, reduced font sizes, tighter padding. Suitable for inline empty zones inside dense containers such as sidebars or data tables.',
        },
        {
            value: 'md',
            descriptionKey: 'types.detail.empty_state_size.md',
            descriptionFallback: 'Default — balanced icon size, standard font sizes. Suitable for full-page section empty states.',
        },
        {
            value: 'lg',
            descriptionKey: 'types.detail.empty_state_size.lg',
            descriptionFallback: 'Generous — larger icon, bigger font sizes, more padding. Suitable for hero empty pages or marketing-style placeholders.',
        },
    ],
    usedBy: [
        { slug: 'empty-state', name: 'EmptyState', propName: 'size' },
    ],
    sourceFile: 'packages/ds/src/types/EmptyState/empty-state-size.type.ts',
    examples: [
        {
            titleKey: 'types.detail.empty_state_size.example_sm',
            titleFallback: 'Compact empty state for a data table',
            code: `<origam-empty-state
  preset="no-results"
  title="No results"
  size="sm"
/>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.empty_state_size.example_lg',
            titleFallback: 'Hero empty page',
            code: `<origam-empty-state
  preset="no-data"
  title="Welcome aboard"
  description="Nothing here yet — create your first workspace."
  size="lg"
>
  <template #actions>
    <origam-btn color="primary" size="large">Get started</origam-btn>
  </template>
</origam-empty-state>`,
            lang: 'html',
        },
    ],
}
