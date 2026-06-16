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
    'Animation & Transition',
    'Enums'
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
    // Enums
    // ─────────────────────────────────────────────
    {
        slug: 'enum-variant',
        name: 'VARIANT',
        icon: 'mdi-shape-outline',
        kind: 'enum',
        category: 'Enums',
        descriptionKey: 'types.catalog.enum_variant.description',
        descriptionFallback: 'TypeScript enum for component visual variants (text, flat, elevated, tonal, outlined, plain, ghost).',
    },
    {
        slug: 'enum-density',
        name: 'DENSITY',
        icon: 'mdi-arrow-collapse-vertical',
        kind: 'enum',
        category: 'Enums',
        descriptionKey: 'types.catalog.enum_density.description',
        descriptionFallback: 'TypeScript enum for vertical spacing density (default, compact, comfortable).',
    },
    {
        slug: 'enum-sizes',
        name: 'SIZES',
        icon: 'mdi-resize',
        kind: 'enum',
        category: 'Enums',
        descriptionKey: 'types.catalog.enum_sizes.description',
        descriptionFallback: 'TypeScript enum for component size scale (x-small, small, default, large, x-large).',
    },
    {
        slug: 'enum-rounded',
        name: 'ROUNDED',
        icon: 'mdi-rounded-corner',
        kind: 'enum',
        category: 'Enums',
        descriptionKey: 'types.catalog.enum_rounded.description',
        descriptionFallback: 'TypeScript enum for corner radius tokens (x-small through x-large, shaped, shaped-invert).',
    },
]
