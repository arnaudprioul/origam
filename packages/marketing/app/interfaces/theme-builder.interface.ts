/**
 * Theme builder (/theming) — data shapes for the visual theme editor.
 *
 * The editor is DATA-DRIVEN: prop controls are derived from each component's
 * existing `playground.controls` block (consts/components/{slug}.const.ts) and
 * the editable CSS tokens are derived from the live origam theme `cssVars`
 * (filtered by the `--origam-{slug}---` block prefix). Nothing here is
 * hardcoded per component — the only per-slug data is the optional preview
 * adapter below, used for components that render nothing on their own.
 */
import type { TMode } from 'origam/types'

/** The two concrete edit modes (never 'auto'). */
export type TEditMode = 'light' | 'dark'

/**
 * A single editable CSS token row surfaced for a component, derived from the
 * origam theme `cssVars`. `kind` drives which input renders (color picker vs
 * plain text for lengths / shadows / misc).
 */
export interface IThemeBuilderToken {
    /** Full CSS custom property, e.g. `--origam-btn---border-radius`. */
    cssVar: string
    /** Short label (the segment after the `---` block separator). */
    label: string
    /** Default value pulled from the origam light theme. */
    defaultValue: string
    /** Editor control to use. */
    kind: 'color' | 'text'
}

/**
 * Per-slug preview adapter. Optional — only needed for components that don't
 * render a visible surface from props alone (need slot content or child demo
 * markup). When absent, the preview falls back to `playground.defaultSlotContent`.
 */
export interface IThemeBuilderPreviewAdapter {
    /** Static props merged under the user-edited props for the preview only. */
    previewProps?: Record<string, unknown>
    /** Plain-text slot content rendered inside the component. */
    slotText?: string
    /** Whether the component needs the `demo` named recipe (rendered in page). */
    demo?: 'tabs' | 'select' | 'badge' | 'card' | 'avatar'
}

/**
 * The serialisable theme-builder state. Only values the user ACTUALLY changed
 * are stored, so the exported file stays a clean diff against the DS defaults.
 *
 *   - `name` / `label` map to `IOrigamTheme.name` / `IOrigamTheme.label`.
 *   - `mode` is kept for meta (global mode hint on the theme, e.g. 'light').
 *   - `activeMode` is the mode currently being edited in the UI (never persisted,
 *     reset to 'light' on load).
 *   - `defaults` is keyed by the origam component key (`origam-{slug}` or
 *     `global`) → prop name → value. Maps to `IOrigamTheme.component`.
 *     Defaults are GLOBAL (mode-independent).
 *   - `cssVars` is split by mode: each sub-map holds the overridden CSS vars for
 *     that mode only. Maps to `IOrigamTheme.cssVars` per exported entry.
 */
export interface IThemeBuilderState {
    name: string
    label: string
    mode: TMode
    activeMode: TEditMode
    defaults: Record<string, Record<string, unknown>>
    cssVars: Record<TEditMode, Record<string, string>>
}

/**
 * A reusable theme seed surfaced in the preset picker.
 * Carries both light AND dark token maps so seeding applies the full theme
 * at once — the user picks a theme identity (e.g. "Cartoon"), not a mode.
 * `light` / `dark` are each a SUBSET of the DS theme cssVars exposed by the
 * builder (see THEME_BUILDER_TOKENS) so seeding never bundles the full theme.
 */
export interface IThemeBuilderPreset {
    key: string
    labelKey: string
    labelFallback: string
    light: Record<string, string>
    dark: Record<string, string>
}

/**
 * The id of a themable prop group (Color, Size & density, Shape, …). Drives the
 * group sections in the controls panel. kebab-friendly so it doubles as a DOM
 * id / data-cy suffix.
 */
export type TThemeBuilderGroupId =
    | 'color'
    | 'size'
    | 'shape'
    | 'border'
    | 'elevation'
    | 'dimension'
    | 'spacing'
    | 'state'
    | 'icon'
    | 'link'
    | 'layout'
    | 'content'
    | 'other'

/** Display metadata for one prop group section (order, label, icon). */
export interface IThemeBuilderPropGroupMeta {
    id: TThemeBuilderGroupId
    labelKey: string
    labelFallback: string
    icon: string
}

/** Display metadata for one nav category section (order, label, icon). */
export interface IThemeBuilderCategoryMeta {
    id: string
    labelKey: string
    labelFallback: string
    icon: string
}

/**
 * A single themable prop control derived from a component's `_DOC.props` row.
 * `kind` drives which input renders. Options are resolved from the playground
 * block when available, otherwise parsed from the prop type's union literals.
 */
export interface IThemeBuilderPropControl {
    /** Prop name (camelCase) as the consumer writes it. */
    prop: string
    /** Input kind. `color` renders a swatch + hex; the rest are self-explanatory. */
    kind: 'select' | 'switch' | 'number' | 'text' | 'color'
    /** Group this control belongs to. */
    group: TThemeBuilderGroupId
    /** Human label (the prop name is shown as code; this is the long-form label). */
    label: string
    /** Select options (only for kind === 'select'). */
    options?: Array<{ label: string; value: string | number | boolean }>
    /** DS default value (used to compute the diff and seed the control). */
    defaultValue: string | number | boolean
}

/** A prop group section: meta + the controls that fell into it. */
export interface IThemeBuilderPropGroup {
    meta: IThemeBuilderPropGroupMeta
    controls: IThemeBuilderPropControl[]
}

/** A token group section: meta + the editable CSS tokens that fell into it. */
export interface IThemeBuilderTokenGroup {
    meta: IThemeBuilderPropGroupMeta
    tokens: IThemeBuilderToken[]
}

/**
 * One component surfaced in the builder — its identity, the origam defaults key,
 * its grouped prop controls, its grouped CSS tokens, and an optional preview
 * adapter. Built at runtime from the catalog + each component's `_DOC`.
 */
export interface IThemeBuilderComponentEntry {
    slug: string
    /** Origam defaults key, e.g. `origam-btn`. */
    componentKey: string
    /** Global component tag for `<component :is>`, e.g. `origam-btn`. */
    componentTag: string
    name: string
    icon: string
    category: string
    propGroups: IThemeBuilderPropGroup[]
    tokenGroups: IThemeBuilderTokenGroup[]
    /** Flat control list (all groups) — convenience for counts + diff lookups. */
    controls: IThemeBuilderPropControl[]
    /** Flat token list (all groups). */
    tokens: IThemeBuilderToken[]
    previewAdapter: IThemeBuilderPreviewAdapter
    /** True when the component can render a visible preview from props alone. */
    previewable: boolean
}

/** A nav category section: meta + the components that belong to it. */
export interface IThemeBuilderNavCategory {
    meta: IThemeBuilderCategoryMeta
    components: IThemeBuilderComponentEntry[]
}
