/**
 * THEME_BUILDER_GROUPS — taxonomy + classifiers for the /theming builder.
 *
 * Two derivations are driven from here:
 *
 *  1. NAV CATEGORIES — the component nav (left column) groups every DS
 *     component by its catalog `category` (see COMPONENTS_CATALOG). The
 *     order + icon of each category section come from `THEME_BUILDER_CATEGORY_META`.
 *
 *  2. PROP GROUPS — inside the controls panel (right column) every themable
 *     prop of the active component is bucketed into a typed group (Couleur,
 *     Taille & densité, Forme, Bordure, …). The bucket is decided by
 *     `classifyPropGroup(propName)`, anchored on the real DS Commons prop
 *     interfaces (IColorProps, ISizeProps, IBorderProps, …). Nothing is
 *     invented — every prop name below maps to an actual Commons surface or a
 *     well-known component prop.
 *
 * Both the group ids and the prop-name → group map are SCREAMING_SNAKE-free
 * runtime data; the group ids themselves are kebab-case so they can be reused
 * as DOM ids / data-cy suffixes.
 */
import type {
    IThemeBuilderCategoryMeta,
    IThemeBuilderPropGroupMeta,
    TThemeBuilderGroupId
} from '~/interfaces/theme-builder.interface'

/**
 * Prop-group display order + i18n labels + MDI icons. The builder renders the
 * groups a component actually exposes, in THIS order.
 */
export const THEME_BUILDER_PROP_GROUPS: IThemeBuilderPropGroupMeta[] = [
    { id: 'color', labelKey: 'theming.group.color', labelFallback: 'Color', icon: 'mdi-palette-outline' },
    { id: 'size', labelKey: 'theming.group.size', labelFallback: 'Size & density', icon: 'mdi-ruler' },
    { id: 'shape', labelKey: 'theming.group.shape', labelFallback: 'Shape', icon: 'mdi-rounded-corner' },
    { id: 'border', labelKey: 'theming.group.border', labelFallback: 'Border', icon: 'mdi-border-all-variant' },
    { id: 'elevation', labelKey: 'theming.group.elevation', labelFallback: 'Elevation', icon: 'mdi-box-shadow' },
    { id: 'dimension', labelKey: 'theming.group.dimension', labelFallback: 'Dimensions', icon: 'mdi-arrow-expand-all' },
    { id: 'spacing', labelKey: 'theming.group.spacing', labelFallback: 'Spacing', icon: 'mdi-arrow-split-vertical' },
    { id: 'state', labelKey: 'theming.group.state', labelFallback: 'States', icon: 'mdi-toggle-switch-outline' },
    { id: 'icon', labelKey: 'theming.group.icon', labelFallback: 'Icons', icon: 'mdi-star-outline' },
    { id: 'link', labelKey: 'theming.group.link', labelFallback: 'Link & tag', icon: 'mdi-link-variant' },
    { id: 'layout', labelKey: 'theming.group.layout', labelFallback: 'Alignment & position', icon: 'mdi-arrow-all' },
    { id: 'content', labelKey: 'theming.group.content', labelFallback: 'Content', icon: 'mdi-text' },
    { id: 'other', labelKey: 'theming.group.other', labelFallback: 'Other', icon: 'mdi-dots-horizontal' }
]

/**
 * Category section order + i18n labels + icons for the component nav. Mirrors
 * COMPONENTS_CATEGORIES; the builder falls back to a generic meta for any
 * category not listed (so a new DS category never disappears from the nav).
 */
export const THEME_BUILDER_CATEGORY_META: IThemeBuilderCategoryMeta[] = [
    { id: 'Layout & Structure', labelKey: 'theming.category.layout', labelFallback: 'Layout & Structure', icon: 'mdi-page-layout-body' },
    { id: 'Navigation', labelKey: 'theming.category.navigation', labelFallback: 'Navigation', icon: 'mdi-navigation-outline' },
    { id: 'Form & Input', labelKey: 'theming.category.form', labelFallback: 'Form & Input', icon: 'mdi-form-select' },
    { id: 'Data Display', labelKey: 'theming.category.data', labelFallback: 'Data Display', icon: 'mdi-table' },
    { id: 'Feedback & Status', labelKey: 'theming.category.feedback', labelFallback: 'Feedback & Status', icon: 'mdi-message-alert-outline' },
    { id: 'Overlay & Surface', labelKey: 'theming.category.overlay', labelFallback: 'Overlay & Surface', icon: 'mdi-layers-outline' },
    { id: 'Media', labelKey: 'theming.category.media', labelFallback: 'Media', icon: 'mdi-image-outline' },
    { id: 'Utilities & Providers', labelKey: 'theming.category.utilities', labelFallback: 'Utilities & Providers', icon: 'mdi-tools' }
]

/**
 * Exact prop-name → group map. Anchored on the DS Commons prop interfaces:
 *  - IColorProps        → color
 *  - ISizeProps / IDensityProps → size
 *  - IRoundedProps      → shape
 *  - IBorderProps       → border
 *  - IElevationProps    → elevation
 *  - IDimensionProps    → dimension
 *  - IMarginProps / IPaddingProps → spacing
 *  - IAlignProps / IJustifyProps / ILocationProps / IPositionProps → layout
 *  - ILoaderProps / IActiveProps / control state → state
 *  - ILinkProps         → link
 * Plus a handful of universal component props (variant, status, icons, text).
 */
const PROP_GROUP_EXACT: Record<string, TThemeBuilderGroupId> = {
    // Color
    color: 'color',
    bgColor: 'color',
    backgroundColor: 'color',
    variant: 'color',
    // Size & density
    size: 'size',
    density: 'size',
    // Shape (rounded)
    rounded: 'shape',
    roundedTopRight: 'shape',
    roundedTopLeft: 'shape',
    roundedBottomLeft: 'shape',
    roundedBottomRight: 'shape',
    tile: 'shape',
    // Border
    border: 'border',
    borderTop: 'border',
    borderLeft: 'border',
    borderBottom: 'border',
    borderRight: 'border',
    borderBlock: 'border',
    borderInline: 'border',
    borderColor: 'border',
    borderStyle: 'border',
    // Elevation
    elevation: 'elevation',
    flat: 'elevation',
    // Dimension
    height: 'dimension',
    maxHeight: 'dimension',
    maxWidth: 'dimension',
    minHeight: 'dimension',
    minWidth: 'dimension',
    width: 'dimension',
    aspectRatio: 'dimension',
    // Spacing
    margin: 'spacing',
    marginTop: 'spacing',
    marginLeft: 'spacing',
    marginBottom: 'spacing',
    marginRight: 'spacing',
    marginBlock: 'spacing',
    marginInline: 'spacing',
    padding: 'spacing',
    paddingTop: 'spacing',
    paddingLeft: 'spacing',
    paddingBottom: 'spacing',
    paddingRight: 'spacing',
    paddingBlock: 'spacing',
    paddingInline: 'spacing',
    // States
    disabled: 'state',
    readonly: 'state',
    loading: 'state',
    active: 'state',
    selected: 'state',
    indeterminate: 'state',
    error: 'state',
    block: 'state',
    slim: 'state',
    stacked: 'state',
    ripple: 'state',
    // Icons
    icon: 'icon',
    prependIcon: 'icon',
    appendIcon: 'icon',
    prependInnerIcon: 'icon',
    appendInnerIcon: 'icon',
    closeIcon: 'icon',
    statusIcon: 'icon',
    statusIconPosition: 'icon',
    // Link & tag
    tag: 'link',
    href: 'link',
    to: 'link',
    target: 'link',
    // Alignment / position
    align: 'layout',
    justify: 'layout',
    position: 'layout',
    location: 'layout',
    origin: 'layout',
    direction: 'layout',
    // Status
    status: 'color',
    type: 'color'
}

/**
 * Prefix-based fallbacks for prop families not enumerated above (responsive
 * align/justify variants, margin/padding logical props, rounded* corners…).
 */
const PROP_GROUP_PREFIX: Array<{ prefix: string; group: TThemeBuilderGroupId }> = [
    { prefix: 'rounded', group: 'shape' },
    { prefix: 'border', group: 'border' },
    { prefix: 'margin', group: 'spacing' },
    { prefix: 'padding', group: 'spacing' },
    { prefix: 'align', group: 'layout' },
    { prefix: 'justify', group: 'layout' },
    { prefix: 'min', group: 'dimension' },
    { prefix: 'max', group: 'dimension' }
]

/**
 * Map a prop name to its themable group id. Falls back to 'other' so a prop is
 * never silently dropped — it just lands in the catch-all group.
 */
export function classifyPropGroup (propName: string): TThemeBuilderGroupId {
    const exact = PROP_GROUP_EXACT[propName]
    if (exact) return exact
    for (const { prefix, group } of PROP_GROUP_PREFIX) {
        if (propName.startsWith(prefix)) return group
    }
    return 'other'
}

/**
 * Type-label fragments that mean "this is a colour value" → render a swatch.
 * Anything else with a scalar type renders a select / text / number / switch.
 */
export const THEME_BUILDER_COLOR_TYPE_HINTS = ['TColor', 'TIntent'] as const

/**
 * Type labels that are NON-themable (data, callbacks, complex objects). A prop
 * whose type label contains any of these fragments is skipped entirely — it is
 * not a visual default a theme can override. This keeps the panel scalar-only,
 * matching the validated UI.
 */
export const THEME_BUILDER_SKIP_TYPE_HINTS = [
    'Array',
    '[]',
    '=>',
    'Record<',
    'Promise',
    'HTMLElement',
    'Element',
    'Event',
    'Date',
    'Function',
    'Component',
    'VNode',
    'I', // interface refs like IBtnProps, IChartSeries — object payloads
    'Map<',
    'Set<'
] as const

/**
 * Prop names that are functionally non-themable regardless of type (data
 * binding, model, identifiers). Skipped from the controls panel.
 */
export const THEME_BUILDER_SKIP_PROPS = [
    'modelValue',
    'value',
    'items',
    'data',
    'id',
    'name',
    'key',
    'ref',
    'rules',
    'modelModifiers'
] as const
