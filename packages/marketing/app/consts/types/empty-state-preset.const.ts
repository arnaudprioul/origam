import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const EMPTY_STATE_PRESET_TYPE_DOC: ITypeDoc = {
    slug: 'empty-state-preset',
    name: 'TEmptyStatePreset',
    kind: 'type',
    category: 'Interaction & State',
    descriptionKey: 'types.catalog.empty_state_preset.description',
    descriptionFallback: 'Visual presets for <OrigamEmptyState>. Each preset bundles a default icon and intent so consumers do not need to wire those by hand for the common cases.',
    definition: `/**
 * Visual presets for \`<OrigamEmptyState>\`. Each preset bundles a
 * default icon + intent mapping so consumers do not need to wire those
 * by hand for the 95% case. The icon and intent can still be
 * overridden via the matching props when a one-off variation is needed.
 *
 * - \`no-data\`     — generic "nothing to show yet" (empty collection).
 * - \`no-results\`  — search or filter returned nothing.
 * - \`error\`       — an operation failed; retry CTA is typical.
 * - \`offline\`     — connectivity issue; offline-mode CTA is typical.
 * - \`locked\`      — feature is gated (auth, plan, permissions).
 */
export type TEmptyStatePreset =
    | 'no-data'
    | 'no-results'
    | 'error'
    | 'offline'
    | 'locked'

// Runtime enum mirror (for iteration in stories / switch blocks):
export enum EMPTY_STATE_PRESET {
    NO_DATA    = 'no-data',
    NO_RESULTS = 'no-results',
    ERROR      = 'error',
    OFFLINE    = 'offline',
    LOCKED     = 'locked',
}`,
    values: [
        {
            value: 'no-data',
            descriptionKey: 'types.detail.empty_state_preset.no_data',
            descriptionFallback: 'Generic "nothing to show yet" placeholder — used when a collection is empty and no search/filter is active.',
        },
        {
            value: 'no-results',
            descriptionKey: 'types.detail.empty_state_preset.no_results',
            descriptionFallback: 'A search or filter returned no matching items. The CTA typically invites the user to clear or adjust filters.',
        },
        {
            value: 'error',
            descriptionKey: 'types.detail.empty_state_preset.error',
            descriptionFallback: 'An operation or data fetch failed. The CTA is typically a retry button.',
        },
        {
            value: 'offline',
            descriptionKey: 'types.detail.empty_state_preset.offline',
            descriptionFallback: 'No network connection detected. The CTA typically offers offline-mode or a reconnect action.',
        },
        {
            value: 'locked',
            descriptionKey: 'types.detail.empty_state_preset.locked',
            descriptionFallback: 'The feature is gated behind authentication, a pricing plan, or permissions. The CTA invites the user to upgrade or sign in.',
        },
    ],
    usedBy: [
        { slug: 'empty-state', name: 'EmptyState', propName: 'preset' },
    ],
    sourceFile: 'packages/ds/src/types/EmptyState/empty-state-preset.type.ts',
    examples: [
        {
            titleKey: 'types.detail.empty_state_preset.example_no_data',
            titleFallback: 'No-data empty state',
            code: `<origam-empty-state
  preset="no-data"
  title="No projects yet"
  description="Create your first project to get started."
>
  <template #actions>
    <origam-btn color="primary">New project</origam-btn>
  </template>
</origam-empty-state>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.empty_state_preset.example_error',
            titleFallback: 'Error empty state with retry',
            code: `<origam-empty-state
  preset="error"
  title="Something went wrong"
  description="We could not load your data. Please try again."
>
  <template #actions>
    <origam-btn color="danger" @click="reload">Retry</origam-btn>
  </template>
</origam-empty-state>`,
            lang: 'html',
        },
    ],
}
