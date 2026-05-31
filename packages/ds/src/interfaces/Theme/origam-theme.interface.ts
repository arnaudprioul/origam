import type { ISemanticTree, IThemeVars, ITokenTree, TThemeVars } from '../../types'
import type { TMode } from '../../types/Theme/theme.type'
import type { IDefault } from '../DefaultProvider/default-provider.interface'

/**
 * Runtime theme object ingested by `createOrigam({ theme })`. At install time
 * the DS resolves it to a block of `--origam-*` CSS variables injected into
 * `<head>`, scoped to `:root` (or to `[data-theme="<name>"]` when `name` is
 * set, optionally narrowed by `[data-mode]` when `mode` is set).
 *
 * ## Authoring a theme (the normal way — ADR-004)
 *
 * Write plain, nested JSON keyed by INTENTION — `colors` for the color surface
 * and the sibling scales `radius` / `typography` / `shadow` / `spacing` /
 * `animation`. No `--origam-*` prefixes, no DTCG `$value` ceremony: the DS walks
 * each tree and derives the CSS-variable name from the leaf path via the shared
 * naming grammar, so a hand-written theme resolves to the EXACT same
 * `--origam-*` names as the published token sheets.
 *
 *   { name: 'sobre', mode: 'light',
 *     colors: {
 *       primary:   '#7c3aed',                       // → --origam-color---primary
 *       surface:   { default: '#ffffff', sunken: '#fafafa' },
 *       text:      { primary: '#171717', secondary: '#737373' },
 *       action:    { primary: { bg: '#7c3aed', fg: '#ffffff' } },
 *       feedback:  { success: { bg: '#4caf50', fg: '#ffffff' } }
 *     },
 *     radius:     { md: '0.5rem' },
 *     spacing:    { 4: '1rem' },
 *     typography: { size: { md: '1rem' }, weight: { bold: 700 } },
 *     shadow:     { md: '0 2px 8px rgba(0,0,0,.12)' },
 *     animation:  { duration: { fast: '100ms' }, easing: { standard: 'cubic-bezier(.4,0,.2,1)' } }
 *   }
 *
 * A COLOR slot accepts any CSS color OR a gradient — a gradient is just an
 * ordinary color value (`surface: { default: 'linear-gradient(135deg,#a,#b)' }`).
 * There is intentionally NO dedicated `gradient` group.
 *
 * Everything is plain JSON (serialisable) so a Theme Builder export round-trips
 * without loss. `vars` / `tokens` remain ONLY as advanced escape hatches (see
 * their docs) — they are NOT the normal authoring path.
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
     * Color surface, authored as a nested JSON tree keyed by intention. Each
     * leaf path resolves to `--origam-color-<path>` via the shared naming
     * grammar:
     *   - `primary`               → `--origam-color---primary`
     *   - `surface.default`       → `--origam-color__surface---default`
     *   - `text.secondary`        → `--origam-color__text---secondary`
     *   - `action.primary.bg`     → `--origam-color__action--primary---bg`
     *   - `feedback.success.bg`   → `--origam-color__feedback--success---bg`
     *
     * A leaf value is any CSS color OR a gradient (a gradient is an ordinary
     * color value — no dedicated gradient group).
     */
    colors?: ISemanticTree

    /**
     * Border-radius scale. Each leaf path resolves to `--origam-radius-<path>`:
     *   - `md`  → `--origam-radius---md`
     *   - `lg`  → `--origam-radius---lg`
     * Values are CSS lengths (`'0.5rem'`, `'8px'`, `0`).
     */
    radius?: ISemanticTree

    /**
     * Typography scale → `--origam-font-<path>`:
     *   - `size.md`         → `--origam-font__size---md`
     *   - `weight.bold`     → `--origam-font__weight---bold`
     *   - `family.sans`     → `--origam-font__family---sans`
     *   - `lineHeight.normal` → `--origam-font__lineHeight---normal`
     *   - `letterSpacing.wide` → `--origam-font__letterSpacing---wide`
     */
    typography?: ISemanticTree

    /**
     * Elevation / box-shadow scale → `--origam-shadow-<path>`:
     *   - `md` → `--origam-shadow---md`
     * Values are full CSS `box-shadow` strings.
     */
    shadow?: ISemanticTree

    /**
     * Spacing scale → `--origam-space-<path>`:
     *   - `4`  → `--origam-space---4`
     *   - `12` → `--origam-space---12`
     * Values are CSS lengths.
     */
    spacing?: ISemanticTree

    /**
     * Motion scale → `--origam-motion-<path>`. Two sub-groups:
     *   - `duration.fast`     → `--origam-motion__duration---fast`
     *   - `easing.standard`   → `--origam-motion__easing---standard`
     * Values are CSS `<time>` / `<easing-function>` strings.
     */
    animation?: ISemanticTree

    /**
     * THE token-configuration bucket — the normal way to author a theme's
     * global design tokens. A structured JSON keyed by token GROUP
     * (`color` / `rounded` / `border` / `typo` / `shadow` / `spacing` /
     * `motion`); each group's nested tree resolves to the matching
     * `--origam-*` namespace via the shared naming grammar (see `IThemeVars`).
     *
     *   vars: {
     *     color:   { surface: { default: '#fff' }, text: { primary: '#171717' } },
     *     rounded: { md: '10px', lg: '14px' },
     *     typo:    { family: { sans: 'Inter, sans-serif' } },
     *     shadow:  { md: '0 2px 8px rgba(0,0,0,.12)' }
     *   }
     */
    vars?: IThemeVars

    /**
     * ESCAPE HATCH (advanced) — pre-resolved CSS custom-property map. Keys with
     * or without the leading `--` are accepted. Use ONLY for a raw `--origam-*`
     * that has no group slot in `vars`. Wins over every other field on
     * key collision.
     *
     *   cssVars: { '--origam-some-unmapped-var': '...' }
     */
    cssVars?: TThemeVars

    /**
     * ESCAPE HATCH (advanced) — raw DTCG-shaped token tree (supports `$value`
     * leaves). The DS walks it through `tokenPathToCssVar`. Prefer the semantic
     * fields above; this exists for machine-generated trees that already carry
     * full token paths from the root (e.g. a Tokens Studio export).
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
