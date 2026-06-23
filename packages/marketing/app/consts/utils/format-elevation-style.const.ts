import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FORMAT_ELEVATION_STYLE_UTIL_DOC: IUtilDoc = {
    slug: 'format-elevation-style',
    name: 'formatElevationStyle',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.format_elevation_style.description',
    descriptionFallback: 'Compute a CSS box-shadow declaration from a numeric elevation level and an optional background color. Deprecated since v0.4 — prefer the --origam-shadow-{xs|sm|md|lg|xl} design tokens emitted by useElevation.',
    signature: `function formatElevationStyle(elevation?: number, bgColor?: TColor): string`,
    params: [
        {
            name: 'elevation',
            type: 'number',
            required: false,
            defaultValue: '0',
            descriptionKey: 'utils.detail.format_elevation_style.param_elevation',
            descriptionFallback: 'Elevation level (0–n). Higher values produce larger shadows. Defaults to 0 (no shadow).',
        },
        {
            name: 'bgColor',
            type: 'TColor',
            required: false,
            descriptionKey: 'utils.detail.format_elevation_style.param_bg_color',
            descriptionFallback: 'Optional background color used to tint the shadow hue. Accepts any parseable CSS color string.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.format_elevation_style.returns',
        descriptionFallback: 'A CSS box-shadow declaration string ready to be set as an inline style.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/elevation.util.ts',
    noteKey: 'utils.detail.format_elevation_style.note',
    noteFallback: 'Deprecated since v0.4. Migrate to the --origam-shadow-{xs|sm|md|lg|xl} tokens via the useElevation composable. Will be removed in v3.0.0.',
    examples: [
        {
            titleKey: 'utils.detail.format_elevation_style.example_basic',
            titleFallback: 'Legacy usage (deprecated)',
            code: `import { formatElevationStyle } from 'origam'

// Deprecated — prefer useElevation() composable instead
const style = formatElevationStyle(4, '#ffffff')
// → 'box-shadow: 0.3px 0.3px 0.3px hsl(0deg 0% 0% / 0.46)'`,
            lang: 'typescript',
        },
    ],
    related: ['format-border-styles-var'],
}
