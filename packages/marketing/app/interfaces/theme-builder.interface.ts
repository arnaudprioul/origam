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
 *   - `defaults` is keyed by the origam component key (`origam-{slug}` or
 *     `global`) → prop name → value. Matches `useDefaults()` resolution.
 *   - `cssVars` is a flat map of overridden CSS custom properties (IOrigamTheme).
 */
export interface IThemeBuilderState {
    name: string
    defaults: Record<string, Record<string, unknown>>
    cssVars: Record<string, string>
}
