import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const EMPTY_STATE_PRESETS_CONST_DOC: IConstDoc = {
    slug: 'empty-state-presets',
    name: 'EMPTY_STATE_PRESETS',
    category: 'Feedback & Status',
    descriptionKey: 'consts.catalog.empty_state_presets.description',
    descriptionFallback: 'Closed list of valid `preset` values for OrigamEmptyState (no-data, no-results, error, offline, locked). Each preset maps to a default icon and semantic intent via EMPTY_STATE_PRESET_CONFIG.',
    definition: `export const EMPTY_STATE_PRESETS: ReadonlyArray<TEmptyStatePreset> = [
    'no-data',
    'no-results',
    'error',
    'offline',
    'locked'
]`,
    values: [
        { value: "'no-data'", descriptionKey: 'consts.detail.empty_state_presets.no_data', descriptionFallback: 'No data available — neutral intent, database-off icon.' },
        { value: "'no-results'", descriptionKey: 'consts.detail.empty_state_presets.no_results', descriptionFallback: 'No search results — neutral intent, magnify-close icon.' },
        { value: "'error'", descriptionKey: 'consts.detail.empty_state_presets.error', descriptionFallback: 'An error occurred — danger intent, alert-circle icon.' },
        { value: "'offline'", descriptionKey: 'consts.detail.empty_state_presets.offline', descriptionFallback: 'Device or service is offline — warning intent, wifi-off icon.' },
        { value: "'locked'", descriptionKey: 'consts.detail.empty_state_presets.locked', descriptionFallback: 'Content is locked or access denied — secondary intent, lock icon.' },
    ],
    usedBy: [
        { name: 'OrigamEmptyState', slug: 'empty-state' },
        { name: 'EMPTY_STATE_PRESET_CONFIG' },
    ],
    sourceFile: 'packages/ds/src/consts/EmptyState/empty-state.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.empty_state_presets.example',
            titleFallback: 'Iterating the presets for a select control',
            code: `import { EMPTY_STATE_PRESETS } from 'origam'

// Build HstSelect options from the preset list
const options = EMPTY_STATE_PRESETS.map(p => ({ label: p, value: p }))`,
            lang: 'typescript',
        },
    ],
}
