/**
 * TYPES_CATALOG — source de vérité du catalogue /types.
 *
 * RÈGLES :
 * - slug = nom du type/enum sans préfixe T, en kebab-case.
 *   Ex: TColor → 'color', VARIANT → 'variant'.
 * - kind = 'type' pour les TS types (T prefix), 'enum' pour les TS enums.
 * - Le fichier de doc associé est consts/types/{slug}.const.ts.
 * - descriptionKey en snake_case (conformes au skill i18n-keys).
 */
import type { ITypeEntry } from '~/interfaces/types-catalog.interface'

export const TYPES_CATEGORIES = [
    'Color & Intent',
    'Layout & Sizing',
    'Shape & Appearance',
    'Interaction & State',
    'Navigation & Routing',
    'Data & Selection',
    'Time & Calendar',
    'Animation & Transition'
] as const

export type TTypeCategory = typeof TYPES_CATEGORIES[number]

export const TYPES_CATALOG: ITypeEntry[] = [
    // ─────────────────────────────────────────────
    // Color & Intent
    // ─────────────────────────────────────────────
    {
        slug: 'color',
        name: 'TColor',
        icon: 'mdi-palette-outline',
        kind: 'type',
        category: 'Color & Intent',
        descriptionKey: 'types.catalog.color.description',
        descriptionFallback: 'Accepted value for color/bgColor/textColor props — intent name, raw CSS color, gradient string or structured gradient object.',
    },
    {
        slug: 'intent',
        name: 'TIntent',
        icon: 'mdi-circle-outline',
        kind: 'type',
        category: 'Color & Intent',
        descriptionKey: 'types.catalog.intent.description',
        descriptionFallback: 'Semantic intent values: neutral, primary, secondary, ghost, success, warning, danger, info.',
    },

    // ─────────────────────────────────────────────
    // Shape & Appearance
    // ─────────────────────────────────────────────
    {
        slug: 'rounded',
        name: 'TRounded',
        icon: 'mdi-rounded-corner',
        kind: 'type',
        category: 'Shape & Appearance',
        descriptionKey: 'types.catalog.rounded.description',
        descriptionFallback: 'Corner-radius variant tokens — x-small through x-large plus shaped and shaped-invert.',
    },
    {
        slug: 'variant',
        name: 'TVariant',
        icon: 'mdi-shape-outline',
        kind: 'type',
        category: 'Shape & Appearance',
        descriptionKey: 'types.catalog.variant.description',
        descriptionFallback: 'Visual surface variant for elevation-driven components: text, flat, elevated, tonal, outlined, plain, ghost.',
    },

    // ─────────────────────────────────────────────
    // Layout & Sizing
    // ─────────────────────────────────────────────
    {
        slug: 'density',
        name: 'TDensity',
        icon: 'mdi-arrow-collapse-vertical',
        kind: 'type',
        category: 'Layout & Sizing',
        descriptionKey: 'types.catalog.density.description',
        descriptionFallback: 'Vertical spacing density: default, compact, comfortable.',
    },
    {
        slug: 'size',
        name: 'TSize',
        icon: 'mdi-resize',
        kind: 'type',
        category: 'Layout & Sizing',
        descriptionKey: 'types.catalog.size.description',
        descriptionFallback: 'Component size scale: x-small, small, default, large, x-large.',
    },
    {
        slug: 'direction',
        name: 'TDirection',
        icon: 'mdi-arrow-expand-horizontal',
        kind: 'type',
        category: 'Layout & Sizing',
        descriptionKey: 'types.catalog.direction.description',
        descriptionFallback: 'Axis direction: horizontal or vertical.',
    },
    {
        slug: 'grid-gap-size',
        name: 'TGridGapSize',
        icon: 'mdi-view-grid-outline',
        kind: 'type',
        category: 'Layout & Sizing',
        descriptionKey: 'types.catalog.grid_gap_size.description',
        descriptionFallback: 'Named gap size tokens for OrigamGrid: xs, sm, md, lg, xl.',
    },

    // ─────────────────────────────────────────────
    // Interaction & State
    // ─────────────────────────────────────────────
    {
        slug: 'status',
        name: 'TStatus',
        icon: 'mdi-information-outline',
        kind: 'type',
        category: 'Interaction & State',
        descriptionKey: 'types.catalog.status.description',
        descriptionFallback: 'Feedback status values: success, info, warning, error.',
    },
    {
        slug: 'loading-value',
        name: 'TLoadingValue',
        icon: 'mdi-loading',
        kind: 'type',
        category: 'Interaction & State',
        descriptionKey: 'types.catalog.loading_value.description',
        descriptionFallback: 'Loading prop value — boolean (on/off), number (percentage), or structured loader config object.',
    },
    {
        slug: 'mode',
        name: 'TMode',
        icon: 'mdi-toggle-switch-outline',
        kind: 'type',
        category: 'Interaction & State',
        descriptionKey: 'types.catalog.mode.description',
        descriptionFallback: 'Display mode for BottomNav: horizontal, vertical, or shift.',
    },
    {
        slug: 'select-item-key',
        name: 'TSelectItemKey',
        icon: 'mdi-key-outline',
        kind: 'type',
        category: 'Data & Selection',
        descriptionKey: 'types.catalog.select_item_key.description',
        descriptionFallback: 'Flexible item-key resolver for list/select components — boolean, string, array path or function.',
    },

    // ─────────────────────────────────────────────
    // Navigation & Routing
    // ─────────────────────────────────────────────
    {
        slug: 'location',
        name: 'TLocationStrategy',
        icon: 'mdi-map-marker-outline',
        kind: 'type',
        category: 'Navigation & Routing',
        descriptionKey: 'types.catalog.location.description',
        descriptionFallback: 'Overlay positioning strategy: static or connected.',
    },
    {
        slug: 'route-location-raw',
        name: 'RouteLocationRaw',
        icon: 'mdi-routes',
        kind: 'type',
        category: 'Navigation & Routing',
        descriptionKey: 'types.catalog.route_location_raw.description',
        descriptionFallback: 'Vue Router route destination — string path, location object or named route descriptor.',
    },

    // ─────────────────────────────────────────────
    // Time & Calendar
    // ─────────────────────────────────────────────
    {
        slug: 'calendar-view',
        name: 'TCalendarView',
        icon: 'mdi-calendar-month-outline',
        kind: 'type',
        category: 'Time & Calendar',
        descriptionKey: 'types.catalog.calendar_view.description',
        descriptionFallback: 'Calendar display mode: month, week, day, or agenda.',
    },
    {
        slug: 'date-mode',
        name: 'TDateMode',
        icon: 'mdi-calendar-edit-outline',
        kind: 'type',
        category: 'Time & Calendar',
        descriptionKey: 'types.catalog.date_mode.description',
        descriptionFallback: 'DatePicker view mode: month (day grid), months (month selector), or years (year list).',
    },

    // ─────────────────────────────────────────────
    // Animation & Transition
    // ─────────────────────────────────────────────
    {
        slug: 'transition-mode',
        name: 'TTransitionMode',
        icon: 'mdi-motion-play-outline',
        kind: 'type',
        category: 'Animation & Transition',
        descriptionKey: 'types.catalog.transition_mode.description',
        descriptionFallback: 'Vue transition mode: in-out, out-in, or default (simultaneous).',
    },

    // ─────────────────────────────────────────────
    // Media
    // ─────────────────────────────────────────────
    {
        slug: 'audio-controls',
        name: 'TAudioControls',
        icon: 'mdi-play-circle-outline',
        kind: 'type',
        category: 'Media',
        descriptionKey: 'types.catalog.audio_controls.description',
        descriptionFallback: 'Controls rendering strategy for OrigamAudio — custom Origam UI or native browser controls.',
    },
    {
        slug: 'audio-loop-mode',
        name: 'TAudioLoopMode',
        icon: 'mdi-repeat',
        kind: 'type',
        category: 'Media',
        descriptionKey: 'types.catalog.audio_loop_mode.description',
        descriptionFallback: 'Tri-state loop strategy for OrigamAudio when a playlist is active.',
    },
    {
        slug: 'audio-variant',
        name: 'TAudioVariant',
        icon: 'mdi-music-box-outline',
        kind: 'type',
        category: 'Media',
        descriptionKey: 'types.catalog.audio_variant.description',
        descriptionFallback: 'Visual variant of OrigamAudio — expanded studio strip or compact transport dock.',
    },

    // ─────────────────────────────────────────────
    // Layout
    // ─────────────────────────────────────────────
    {
        slug: 'block',
        name: 'block',
        icon: 'mdi-arrow-expand-horizontal',
        kind: 'type',
        category: 'Layout',
        descriptionKey: 'types.catalog.block.description',
        descriptionFallback: 'Boolean prop on OrigamBtn that makes the button stretch to fill 100% of its container width.',
    },
    {
        slug: 'blockquote-align',
        name: 'TBlockquoteAlign',
        icon: 'mdi-format-align-left',
        kind: 'type',
        category: 'Layout',
        descriptionKey: 'types.catalog.blockquote_align.description',
        descriptionFallback: 'Horizontal alignment of the citation body in OrigamBlockquote.',
    },

    // ─────────────────────────────────────────────
    // Misc
    // ─────────────────────────────────────────────
    {
        slug: 'always',
        name: 'TAlways',
        icon: 'mdi-infinity',
        kind: 'type',
        category: 'Misc',
        descriptionKey: 'types.catalog.always.description',
        descriptionFallback: 'Tri-state boolean prop pattern — forces a value always on, always off, or defers to the component default.',
    },
    {
        slug: 'blockquote-lang',
        name: 'TBlockquoteLang',
        icon: 'mdi-translate',
        kind: 'type',
        category: 'Misc',
        descriptionKey: 'types.catalog.blockquote_lang.description',
        descriptionFallback: 'Locale hint for OrigamBlockquote decorative quote marks — only active for variant="quoted".',
    },

    // ─────────────────────────────────────────────
    // Shape & Appearance (suite)
    // ─────────────────────────────────────────────
    {
        slug: 'blockquote-variant',
        name: 'TBlockquoteVariant',
        icon: 'mdi-format-quote-open',
        kind: 'type',
        category: 'Shape & Appearance',
        descriptionKey: 'types.catalog.blockquote_variant.description',
        descriptionFallback: 'Visual typographic variants for OrigamBlockquote — five self-contained treatments from neutral to editorial.',
    },
]
