import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const EMPTY_STATE_PRESET_CONFIG_CONST_DOC: IConstDoc = {
    slug: 'empty-state-preset-config',
    name: 'EMPTY_STATE_PRESET_CONFIG',
    category: 'Feedback & Status',
    descriptionKey: 'consts.catalog.empty_state_preset_config.description',
    descriptionFallback: 'Per-preset bundle mapping each TEmptyStatePreset to its default icon (MDI) and semantic intent. Consumers can override icon and iconColor at the prop level without leaving the preset system.',
    definition: `export const EMPTY_STATE_PRESET_CONFIG: Record<TEmptyStatePreset, IEmptyStatePresetConfig> = {
    'no-data':    { icon: MDI_ICONS.DATABASE_OFF_OUTLINE, intent: 'neutral' },
    'no-results': { icon: MDI_ICONS.MAGNIFY_CLOSE,        intent: 'neutral' },
    'error':      { icon: MDI_ICONS.ALERT_CIRCLE_OUTLINE, intent: 'danger' },
    'offline':    { icon: MDI_ICONS.WIFI_OFF,             intent: 'warning' },
    'locked':     { icon: MDI_ICONS.LOCK_OUTLINE,         intent: 'secondary' }
}`,
    values: [
        { value: "no-data: { icon: DATABASE_OFF_OUTLINE, intent: 'neutral' }", descriptionKey: 'consts.detail.empty_state_preset_config.no_data', descriptionFallback: 'Default config for the no-data preset.' },
        { value: "no-results: { icon: MAGNIFY_CLOSE, intent: 'neutral' }", descriptionKey: 'consts.detail.empty_state_preset_config.no_results', descriptionFallback: 'Default config for the no-results preset.' },
        { value: "error: { icon: ALERT_CIRCLE_OUTLINE, intent: 'danger' }", descriptionKey: 'consts.detail.empty_state_preset_config.error', descriptionFallback: 'Default config for the error preset.' },
        { value: "offline: { icon: WIFI_OFF, intent: 'warning' }", descriptionKey: 'consts.detail.empty_state_preset_config.offline', descriptionFallback: 'Default config for the offline preset.' },
        { value: "locked: { icon: LOCK_OUTLINE, intent: 'secondary' }", descriptionKey: 'consts.detail.empty_state_preset_config.locked', descriptionFallback: 'Default config for the locked preset.' },
    ],
    usedBy: [
        { name: 'OrigamEmptyState', slug: 'empty-state' },
        { name: 'EMPTY_STATE_PRESETS' },
    ],
    sourceFile: 'packages/ds/src/consts/EmptyState/empty-state.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.empty_state_preset_config.example',
            titleFallback: 'Reading the default icon for a preset',
            code: `import { EMPTY_STATE_PRESET_CONFIG } from 'origam'

const { icon, intent } = EMPTY_STATE_PRESET_CONFIG['no-data']
// icon === 'mdi-database-off-outline', intent === 'neutral'`,
            lang: 'typescript',
        },
    ],
}
