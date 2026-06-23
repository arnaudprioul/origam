import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const WARN_LEGACY_COLOR_UTIL_DOC: IUtilDoc = {
    slug: 'warn-legacy-color',
    name: 'warnLegacyColor',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.warn_legacy_color.description',
    descriptionFallback: 'Emit a console.warn (once per unique kind+value pair) when a raw CSS color is passed to a color prop that expects a TIntent. Deprecated raw-color support will be removed in v3.0.0.',
    signature: `function warnLegacyColor(
  kind: 'color' | 'bgColor' | 'hoverColor' | 'hoverBgColor' | 'activeColor' | 'activeBgColor',
  value: string
): void`,
    params: [
        {
            name: 'kind',
            type: "'color' | 'bgColor' | 'hoverColor' | 'hoverBgColor' | 'activeColor' | 'activeBgColor'",
            required: true,
            descriptionKey: 'utils.detail.warn_legacy_color.param_kind',
            descriptionFallback: 'The prop name that received the raw color value. Included in the warning message to help consumers locate the offending usage.',
        },
        {
            name: 'value',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.warn_legacy_color.param_value',
            descriptionFallback: 'The raw CSS color string (e.g. "#ff0080", "rgb(255,0,0)") that triggered the warning.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.warn_legacy_color.returns',
        descriptionFallback: 'No return value. Logs to console once per unique kind+value combination.',
    },
    noteKey: 'utils.detail.warn_legacy_color.note',
    noteFallback: 'This function is part of the v2 → v3 migration bridge. Raw color props will be removed in v3.0.0. Replace with a TIntent value or a :style binding for one-off custom colors.',
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.warn_legacy_color.example_basic',
            titleFallback: 'Emit once per unique kind+value',
            code: `import { warnLegacyColor } from 'origam'

// Triggers a console.warn on first call for this pair:
warnLegacyColor('bgColor', '#ff0080')

// Silent on second call — already warned:
warnLegacyColor('bgColor', '#ff0080')`,
            lang: 'typescript',
        },
    ],
    related: ['warn-legacy-color'],
}
