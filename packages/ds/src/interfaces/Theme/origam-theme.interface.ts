import type { ITokenTree, TThemeVars } from '../../types'
import type { TMode } from '../../types/Theme/theme.type'
import type { IDefault } from '../DefaultProvider/default-provider.interface'

/**
 * Runtime theme object ingested by `createOrigam({ theme })`. At install time
 * the DS resolves it to a block of `--origam-*` CSS variables injected into
 * `<head>`, scoped to `:root` (or to `[data-theme="<name>"]` when `name` is
 * set, optionally narrowed by `[data-mode]` when `mode` is set).
 *
 * Either `vars` (a pre-resolved CSS-var map) or `tokens` (a DTCG-shaped tree
 * the DS walks via the shared naming util) — or both — may be supplied. When
 * both are present, `vars` wins on key collisions (explicit override).
 *
 * The Theme Builder's richer `ITheme` (anchors + derived ramps, see ADR-002)
 * reduces to this shape at export time; the DS stays agnostic of the ramp
 * derivation math.
 */
export interface IOrigamTheme {
    /**
     * Brand name. When set, the injected variables are scoped to
     * `[data-theme="<name>"]` instead of `:root`, so the theme activates only
     * when `data-theme` matches (set it via `useTheme().setTheme(name)`).
     */
    name?: string

    /**
     * Color mode this variable block applies to. When set alongside `name`,
     * the selector becomes `[data-theme="<name>"][data-mode="<mode>"]`. When
     * set without `name`, it becomes `[data-mode="<mode>"]`.
     */
    mode?: TMode

    /**
     * Human-readable brand label for UI (e.g. a theme switcher). Falls back to
     * `name` when absent. Surfaced through `useInstalledThemes()`.
     */
    label?: string

    /**
     * Short brand description for UI (e.g. a switcher subtitle). Surfaced
     * through `useInstalledThemes()`.
     */
    description?: string

    /**
     * CSS background value for a brand swatch preview (a solid color or a
     * `linear-gradient(...)`). Surfaced through `useInstalledThemes()` so a
     * switcher can render a preview without a hard-coded metadata map.
     */
    swatch?: string

    /**
     * Pre-resolved CSS custom-property map. Keys with or without the leading
     * `--` are accepted. Wins over `tokens` on collision.
     */
    vars?: TThemeVars

    /**
     * DTCG-shaped token tree. The DS walks it and derives each variable name
     * from the leaf path through the shared `tokenPathToCssVar` util, so the
     * emitted names match the published token sheets.
     */
    tokens?: ITokenTree

    /**
     * Treat `tokens` as component-layer tokens (changes the naming grammar —
     * see `tokenPathToCssVar`). Defaults to `false` (primitive / semantic).
     *
     * This flag ONLY routes the `tokens` tree to the component-layer naming
     * grammar — it has nothing to do with default props (see `component`).
     */
    componentTokens?: boolean

    /**
     * Per-component DEFAULT PROPS layer. Keyed by `global` (applies to every
     * component) or by a component's kebab-case instance name (e.g.
     * `'origam-btn'`, `'origam-card'`), exactly like `<OrigamDefaultsProvider>`.
     *
     * `createOrigam` collapses the `component` maps of the ACTIVE brand×mode
     * themes into a single `IDefault` and provides it under
     * `ORIGAM_DEFAULTS_KEY`, so a component rendered with no explicit prop
     * inherits the theme's default. This is the "look comes from the theme,
     * not from hard-coded `withDefaults`" mechanism.
     *
     * @example
     * component: {
     *   global:        { density: 'comfortable' },
     *   'origam-btn':  { color: 'primary', rounded: 0 },
     *   'origam-card': { rounded: 'lg', elevation: 2 }
     * }
     */
    component?: IDefault
}
