import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const EMPTY_STATE_PRESET_ENUM_DOC: IEnumDoc = {
    slug: 'empty-state-preset',
    name: 'EMPTY_STATE_PRESET',
    category: 'Data Display',
    descriptionKey: 'enums.catalog.empty_state_preset.description',
    descriptionFallback: 'Closed set of semantic preset values for OrigamEmptyState. Each preset provides a predefined icon, title and description.',
    definition: `export enum EMPTY_STATE_PRESET {
    NO_DATA    = 'no-data',
    NO_RESULTS = 'no-results',
    ERROR      = 'error',
    OFFLINE    = 'offline',
    LOCKED     = 'locked',
}`,
    values: [
        {
            value: 'EMPTY_STATE_PRESET.NO_DATA',
            descriptionKey: 'enums.detail.empty_state_preset.no_data',
            descriptionFallback: 'No items exist yet — prompts the user to create the first one.',
        },
        {
            value: 'EMPTY_STATE_PRESET.NO_RESULTS',
            descriptionKey: 'enums.detail.empty_state_preset.no_results',
            descriptionFallback: 'A search or filter returned zero matches.',
        },
        {
            value: 'EMPTY_STATE_PRESET.ERROR',
            descriptionKey: 'enums.detail.empty_state_preset.error',
            descriptionFallback: 'Data loading failed — shows an error state with a retry affordance.',
        },
        {
            value: 'EMPTY_STATE_PRESET.OFFLINE',
            descriptionKey: 'enums.detail.empty_state_preset.offline',
            descriptionFallback: 'No network connection — asks the user to check their connection.',
        },
        {
            value: 'EMPTY_STATE_PRESET.LOCKED',
            descriptionKey: 'enums.detail.empty_state_preset.locked',
            descriptionFallback: 'Content is gated behind a plan or permission.',
        },
    ],
    usedBy: [
        { slug: 'empty-state', name: 'EmptyState', propName: 'preset' },
    ],
    sourceFile: 'packages/ds/src/enums/EmptyState/empty-state-preset.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.empty_state_preset.example',
            titleFallback: 'Showing an empty search result',
            code: `<origam-empty-state :preset="EMPTY_STATE_PRESET.NO_RESULTS" />`,
            lang: 'vue',
        },
    ],
}
