import type { ComputedRef, Ref } from 'vue'
import { computed, isRef, ref } from 'vue'
import type { IBgColorProps, IColorProps } from "../../interfaces"
import type { TColor, TIntent } from '../../types'
import { getForeground, isCssColor, isParsableColor, parseColor } from '../../utils'

// ────────────────────────────────────────────────────────────────────────────
// Intent detection (Lot 1)
// ────────────────────────────────────────────────────────────────────────────
// `useColorEffect` accepts both raw CSS colors (legacy) and semantic intents.
// When an intent is provided, we emit references to design tokens so the
// theme switches automatically (light/dark/brand-x). When a raw color is
// provided, we keep the legacy JS-side behaviour and warn once per key —
// hex/rgb support will be removed in v3.0.0.

const INTENTS: ReadonlySet<string> = new Set([
    'neutral', 'primary', 'secondary', 'ghost',
    'success', 'warning', 'danger', 'info'
])

/**
 * Subset of `TIntent` for which a global utility class exists in
 * `src/assets/css/tokens/origam-utilities.css` (Phase 1 manifest).
 *
 * `ghost` is intentionally excluded — the design system does not ship
 * `.origam--bg-ghost` because the intent is meant to be a transparent
 * surface that adopts the parent's color, which can't be expressed by
 * a single utility class. Falls back to the inline-style path.
 */
const UTILITY_INTENTS: ReadonlySet<string> = new Set([
    'neutral', 'primary', 'secondary',
    'success', 'warning', 'danger', 'info'
])

function isUtilityIntent (v: TColor | TIntent | null | undefined): v is TIntent {
    return typeof v === 'string' && UTILITY_INTENTS.has(v)
}

const _warnedKeys = new Set<string>()
function warnLegacyColor (kind: 'color' | 'bgColor' | 'hoverColor' | 'hoverBgColor' | 'activeColor' | 'activeBgColor', value: string) {
    if (typeof console === 'undefined') return
    const key = `${kind}::${value}`
    if (_warnedKeys.has(key)) return
    _warnedKeys.add(key)
    // eslint-disable-next-line no-console
    console.warn(
        `[origam] useColorEffect received a raw color for prop "${kind}" (value: ${value}). ` +
        `Pass a TIntent ('primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' | 'ghost' | 'neutral') ` +
        `or use a :style binding for one-off custom colors. Raw color support is deprecated and will be removed in v3.0.0.`
    )
}

function isIntent (v: TColor | TIntent | null | undefined): v is TIntent {
    return typeof v === 'string' && INTENTS.has(v)
}

// ── State derivation rule (cross-component) ─────────────────────────────────
//
// Cross-component color logic (per user spec):
//
//     normal  →  bgColor
//     hover   →  bgColor + 20 % darker
//     active  →  bgColor + 30 % darker
//
// Implementation strategy: cascading CSS var with `color-mix` fallback.
//
//     var(--bgHover, color-mix(in srgb, bg, black 20%))
//
// • If the designer defined a `bgHover` / `bgActive` token, it wins
//   (designer keeps theme-aware artistic control).
// • Otherwise the browser falls back to the math derivation — uniform
//   -20 % / -30 % for every intent that omits the rung, and the same
//   formula applies cleanly to raw CSS colors and `transparent`.
//
// Note: the design system currently ships `bgHover` for every intent
// (designer-tuned) but does NOT ship `bgActive`. Active state therefore
// resolves to the math fallback for now; designers can override per
// intent later by adding `--origam-color-{tokenBase}-bgActive`.

const HOVER_MIX_PCT = 20
const ACTIVE_MIX_PCT = 30

function intentTokenBase (intent: TIntent): string {
    if (intent === 'neutral') return 'action-secondary'
    if (intent === 'success' || intent === 'warning' || intent === 'danger' || intent === 'info') {
        return `feedback-${intent}`
    }
    // primary / secondary / ghost
    return `action-${intent}`
}

/**
 * Emit a state-aware bg expression for an intent:
 *
 *   • `default`  → `var(--…-bg)`
 *   • `hover`    → `var(--…-bgHover, color-mix(in srgb, var(--…-bg), black 20%))`
 *   • `active`   → `var(--…-bgActive, color-mix(in srgb, var(--…-bg), black 30%))`
 *   • `disabled` → `var(--…-bgDisabled)`
 */
function intentBgExpr (intent: TIntent, role: BgFgRole): string {
    const base = intentTokenBase(intent)
    const baseVar = `var(--origam-color-${base}-bg)`
    if (role === 'default') return baseVar
    if (role === 'disabled') return `var(--origam-color-${base}-bgDisabled)`
    const pct = role === 'hover' ? HOVER_MIX_PCT : ACTIVE_MIX_PCT
    const slot = role === 'hover' ? 'bgHover' : 'bgActive'
    return `var(--origam-color-${base}-${slot}, color-mix(in srgb, ${baseVar}, black ${pct}%))`
}

/**
 * Foreground in hover/active stays the same as default by design —
 * we darken the surface around the text, the text itself keeps the
 * WCAG-paired contrast token.
 */
function intentFgExpr (intent: TIntent, role: BgFgRole): string {
    const base = intentTokenBase(intent)
    const slot = role === 'disabled' ? 'fgDisabled' : 'fg'
    return `var(--origam-color-${base}-${slot})`
}

type BgFgRole = 'default' | 'hover' | 'active' | 'disabled'

/**
 * Build the CSS-vars override map for an intent (foreground + background)
 * for a given interaction state.
 */
function tokenStylesForIntent (intent: TIntent, role: BgFgRole = 'default'): Record<string, string> {
    return {
        'background-color': intentBgExpr(intent, role),
        color: intentFgExpr(intent, role),
    }
}

/**
 * Derive a state-aware bg from a raw CSS color value (hex/rgb/etc.) via
 * `color-mix`. Used in the legacy raw-color path so consumers passing
 * `bgColor="#abcdef"` still get a hover/active darken (matches the
 * intent path's behaviour, just without the token cascade).
 */
function rawBgExprWithState (raw: string, role: BgFgRole): string {
    if (role === 'default') return raw
    if (role === 'disabled') return raw // veil/opacity handles disabled
    const pct = role === 'hover' ? HOVER_MIX_PCT : ACTIVE_MIX_PCT
    return `color-mix(in srgb, ${raw}, black ${pct}%)`
}

/**
 * Resolve the **foreground-only** colour for an intent — the token used
 * when the consumer says `color="primary"` and expects the *text itself*
 * to be primary-coloured (no surface implied).
 *
 * This is NOT the same as `tokenStylesForIntent(...).color`:
 *   - That one returns the WCAG-contrasted text colour to put ON TOP of
 *     the matching `bg` token (typically white on a dark surface).
 *   - This helper returns the `fgSubtle` rung — a darker shade of the
 *     intent itself, designed for "coloured text on a light surface".
 *
 * Falls back gracefully on intents without a `fgSubtle` rung
 * (`secondary`, `ghost`, `neutral`).
 */
function tokenForegroundForIntent (intent: TIntent): string {
    if (intent === 'neutral' || intent === 'secondary') {
        // No fgSubtle — `fg` is already a dark neutral text colour.
        return 'var(--origam-color-action-secondary-fg)'
    }
    if (intent === 'ghost') {
        // ghost.fg is already primary.600 — the intent's own colour.
        return 'var(--origam-color-action-ghost-fg)'
    }
    if (intent === 'success' || intent === 'warning' || intent === 'danger' || intent === 'info') {
        return `var(--origam-color-feedback-${intent}-fgSubtle)`
    }
    // primary → action.primary.fgSubtle (color.primary.700)
    return `var(--origam-color-action-${intent}-fgSubtle)`
}

// ────────────────────────────────────────────────────────────────────────────
// Legacy `useColor` API (kept for backward compat — used by ~49 components)
// ────────────────────────────────────────────────────────────────────────────

/*********************************************************
 * useColor
 ********************************************************/
export function useColor (colors: ComputedRef<{ background?: TColor, text?: TColor }>) {
    // Classes-first companion: when bg/text values resolve to a utility
    // intent, expose the matching `.origam--bg-*` / `.origam--color-*`
    // class so consumers can opt into the global utility layer in their
    // `:class` binding. The matching `*Styles` stays populated during
    // the Phase 2 → Phase 3 transition to guarantee zero visual
    // regression for components that haven't migrated yet.
    const colorClasses = computed<string[]>(() => {
        const classes: string[] = []
        if (colors.value.background && isUtilityIntent(colors.value.background)) {
            classes.push(`origam--bg-${colors.value.background}`)
        }
        if (colors.value.text && isUtilityIntent(colors.value.text)) {
            classes.push(`origam--color-${colors.value.text}`)
        }
        return classes
    })

    const colorStyles = computed(() => {
        const styles: string[] = []

        // Track the intent's matching foreground when the background is an
        // intent — lets `bgColor="primary"` alone auto-pair the right text
        // colour without forcing the consumer to specify both.
        let bgIntentFg: string | null = null
        let bgDecl: string | null = null

        /*********************************************************
         * Background resolution
         ********************************************************/
        if (colors.value.background) {
            if (isIntent(colors.value.background)) {
                const m = tokenStylesForIntent(colors.value.background, 'default')
                bgDecl = `background-color: ${m['background-color']}`
                bgIntentFg = m.color
            } else if (colors.value.background === 'transparent') {
                bgDecl = `background-color: ${colors.value.background}`
            } else if (isCssColor(colors.value.background)) {
                bgDecl = `background-color: ${colors.value.background}`
            }
        }

        /*********************************************************
         * Foreground resolution
         ********************************************************/
        // `color` is foreground-only by design: setting `color="primary"`
        // changes the text colour, NOT the surface. The text resolves to
        // the intent's *own* colour (via `fgSubtle` — designed for coloured
        // text on a light surface), NOT the white-on-bg pair returned by
        // `tokenStylesForIntent`. Surface ownership lives on `bgColor`
        // (auto-contrast pairs the matching white-fg below).
        // For intent-aware surfaces (Btn), use `useColorEffect`, not this
        // legacy composable — that's where the bg auto-pair-on-fg lives.
        let fgDecl: string | null = null
        if (colors.value.text) {
            if (isIntent(colors.value.text)) {
                // ── Color-clash auto-contrast (cross-component rule) ────
                // When `text` and `background` resolve to the SAME intent
                // (e.g. `color="primary" bgColor="primary"`), painting the
                // fg with `tokenForegroundForIntent` returns a same-hue
                // shade (primary.fgSubtle = primary.700) — that's hue-on-
                // hue, unreadable. Swap to the bg's paired contrast token
                // (white on a saturated brand surface, dark on a soft
                // surface) so the text is always legible without forcing
                // the consumer to spell out both values.
                if (
                    bgIntentFg &&
                    isIntent(colors.value.background) &&
                    colors.value.text === colors.value.background
                ) {
                    fgDecl = `color: ${bgIntentFg}`
                } else {
                    fgDecl = `color: ${tokenForegroundForIntent(colors.value.text)}`
                }
            } else if (isCssColor(colors.value.text)) {
                fgDecl = `color: ${colors.value.text}`
            }
        } else if (bgIntentFg) {
            // bg was an intent and consumer didn't provide an explicit text
            // colour → pair the intent's matching fg token (theme-aware
            // auto-contrast, no `getForeground` heuristic needed).
            fgDecl = `color: ${bgIntentFg}`
        } else if (bgDecl && colors.value.background && typeof colors.value.background === 'string'
                   && colors.value.background !== 'transparent'
                   && isParsableColor(colors.value.background)) {
            // Legacy auto-contrast for raw CSS colors (WCAG-aware
            // foreground from `getForeground`). Skipped for translucent
            // bgs since contrast can't be reliably computed.
            const parsed = parseColor(colors.value.background)
            if (parsed.a == null || parsed.a === 1) {
                fgDecl = `color: ${getForeground(parsed)}`
            }
        }

        if (bgDecl) styles.push(bgDecl)
        if (fgDecl) styles.push(fgDecl)
        return styles
    })

    return {colorClasses, colorStyles}
}

/*********************************************************
 * useBothColor
 ********************************************************/
export function useBothColor<T extends Record<K, TColor>, K extends string> (bgColorProps: T | Ref<TColor> | ComputedRef<TColor>, colorProps: T | Ref<TColor> | ComputedRef<TColor>, name?: K) {
    const bothColors = computed(() => {
        return {
            text: isRef(colorProps) ? colorProps.value : (name ? colorProps[name] : null),
            background: isRef(bgColorProps) ? bgColorProps.value : (name ? bgColorProps[name] : null)
        }
    })

    return useColor(bothColors)
}

/*********************************************************
 * useTextColor
 ********************************************************/
export function useTextColor<T extends Record<K, TColor>, K extends string> (
    props: T | Ref<TColor>,
    name?: K
) {
    const colors = computed(() => ({
        text: isRef(props) ? props.value : (name ? props[name] : null)
    }))

    const {colorClasses: textColorClasses, colorStyles: textColorStyles} = useColor(colors)

    return {textColorClasses, textColorStyles}
}

/*********************************************************
 * useBackgroundColor
 ********************************************************/
export function useBackgroundColor<T extends Record<K, TColor>, K extends string> (
    props: T | Ref<TColor>,
    name?: K
) {
    const colors = computed(() => ({
        background: isRef(props) ? props.value : (name ? props[name] : null)
    }))

    const {colorClasses: backgroundColorClasses, colorStyles: backgroundColorStyles} = useColor(colors)

    return {backgroundColorClasses, backgroundColorStyles}
}

// ────────────────────────────────────────────────────────────────────────────
// `useColorEffect` — refactored for design-tokens / intent support (Lot 1)
// ────────────────────────────────────────────────────────────────────────────
//
// Returns the same shape as before — `{ colorStyles, color, bgColor }` — so
// existing callers (OrigamBtn, etc.) keep working without changes.
//
// `colorStyles` is an array of CSS declarations like `'background-color: …'`,
// either pointing to a token (`var(--origam-color-action-primary-bg)`) when
// `props.color` is an intent, or to a raw value when it's a hex/rgb (legacy).
//
// State resolution:
//   - `isHover.value` and `isActive.value` swap to `hoverColor` / `activeColor`
//     when those are explicitly set on props.
//   - When in hover state with no `hoverColor` override, intent values use
//     the `bgHover`/`fgHover` slot of the same intent's action set.

/*********************************************************
 * useColorEffect
 ********************************************************/
export function useColorEffect (
    props: IColorProps & IBgColorProps,
    isHover: Ref<boolean> | ComputedRef<boolean> = ref(false),
    isActive: Ref<boolean> | ComputedRef<boolean> = ref(false),
    isDisabled: Ref<boolean> | ComputedRef<boolean> = ref(false)
) {
    const activeColor = computed(() => props.activeColor ? props.activeColor : props.color)
    const hoverColor = computed(() => props.hoverColor ? props.hoverColor : props.color)
    const color = computed(() => {
        return isHover.value ? hoverColor.value : isActive.value ? activeColor.value : props.color
    })
    const activeBgColor = computed(() => props.activeBgColor ? props.activeBgColor : props.bgColor)
    const hoverBgColor = computed(() => props.hoverBgColor ? props.hoverBgColor : props.bgColor)
    const bgColor = computed(() => {
        return isHover.value ? hoverBgColor.value : isActive.value ? activeBgColor.value : props.bgColor
    })

    // Utility classes for the resting state ONLY. When the component is
    // in hover / active state, slot resolution kicks the bg/fg to their
    // `bgHover` / `fgHover` token rungs — there is no matching utility
    // class for those slots, so we emit nothing and let the inline
    // styles win. Same goes for legacy raw colors (hex/rgb).
    const colorClasses = computed<string[]>(() => {
        // Bypass the utility layer in hover/active/disabled because the
        // resolved token is not the resting `--origam-color-action-*-bg`
        // referenced by the utility class.
        if (isHover.value || isActive.value || isDisabled.value) return []

        const classes: string[] = []
        const bgVal = bgColor.value
        const fgVal = color.value

        if (bgVal && isUtilityIntent(bgVal)) {
            classes.push(`origam--bg-${bgVal}`)
        }
        if (fgVal && isUtilityIntent(fgVal)) {
            classes.push(`origam--color-${fgVal}`)
        } else if (!fgVal && bgVal && isUtilityIntent(bgVal)) {
            // Auto-contrast: a bg-only intent pairs the matching fg
            // token. We don't emit a `.origam--color-*` class here
            // because the utility uses the intent's `*-fg` token while
            // the inline style emits the WCAG-paired surface foreground
            // (handled below). The component's SCSS picks up the
            // inline style during the transition.
        }
        return classes
    })

    const colorStyles = computed<string[]>(() => {
        // ─────────────────────────────────────────────────────────────────
        // Resolve bg and fg INDEPENDENTLY so that overriding only one of
        // them (e.g. `hoverBgColor` while keeping `color="primary"` for
        // the foreground) actually works. The previous "path A wins" logic
        // short-circuited as soon as `color` was an intent and silently
        // dropped any bgColor / hoverBgColor / activeBgColor overrides.
        //
        // Slot selection ("default" vs "hover") is per-axis: a missing
        // hoverBgColor lets the bg auto-bump to the intent's `bgHover`
        // slot, and likewise for fg. When the consumer DID pass an explicit
        // hover override we use the value as-is on the "default" slot of
        // that intent (the consumer chose the value, they don't want us
        // re-bumping it to a hover variant of itself).
        // ─────────────────────────────────────────────────────────────────
        // `isDisabled` is accepted here for API symmetry with `isHover`
        // / `isActive`, but does NOT switch the bg/fg to `bgDisabled` /
        // `fgDisabled` tokens — design contract is that disabled is a
        // VEIL/opacity overlay on the resting color, not a token swap.
        // The host component (e.g. `<origam-btn>`) applies its own
        // `--disabled` rule (opacity reduction) so the user sees a
        // lighter version of WHATEVER bgColor was picked, regardless
        // of intent. This keeps every btn in a row (e.g. pagination)
        // visually consistent — same color family, just dimmed.
        // We still read `isDisabled.value` to keep the param wired —
        // in case a future iteration wants per-intent disabled tokens.
        void isDisabled.value
        // ── State role per axis ──────────────────────────────────────────
        // hover and active resolve to DIFFERENT roles so the cross-
        // component spec ("hover -20 %, active -30 %") holds. The
        // previous code collapsed isActive into the 'hover' slot, which
        // was wrong: the two states landed on the same darkening rung
        // (designer-tuned bgHover) and were visually indistinguishable.
        //
        // Per-axis selection is preserved: an explicit hover/activeBgColor
        // takes precedence over the role bump for THAT axis only.
        const bgRole: BgFgRole =
            isHover.value && !props.hoverBgColor ? 'hover' :
            isActive.value && !props.activeBgColor ? 'active' :
            'default'
        const fgRole: BgFgRole =
            isHover.value && !props.hoverColor ? 'hover' :
            isActive.value && !props.activeColor ? 'active' :
            'default'

        let bgDecl: string | null = null
        let fgDecl: string | null = null
        // When bg comes from an intent, we know the matching fg token —
        // remember it so a missing `color` falls back to that pair (auto-
        // contrast inside the design-system without `getForeground`).
        let bgIntentFg: string | null = null

        /*********************************************************
         * Background resolution
         ********************************************************/
        if (bgColor.value && isIntent(bgColor.value)) {
            const m = tokenStylesForIntent(bgColor.value, bgRole)
            bgDecl = `background-color: ${m['background-color']}`
            // The intent's contrast fg is fixed across roles — pull from
            // the default slot regardless of bgRole so hover/active text
            // never darkens with the bg.
            bgIntentFg = tokenStylesForIntent(bgColor.value, 'default').color
        } else if (bgColor.value === 'transparent') {
            // Default mode (transparent base): math derivation gives a
            // subtle gray on hover, a stronger gray on active — matches
            // the pagination-style "neutral progression" expectation.
            bgDecl = `background-color: ${rawBgExprWithState('transparent', bgRole)}`
        } else if (bgColor.value && typeof bgColor.value === 'string' && isCssColor(bgColor.value)) {
            warnLegacyColor('bgColor', bgColor.value)
            // Raw color path: apply the same -20 % / -30 % derivation
            // for hover / active. Default mode keeps the raw value
            // untouched (no transformation at rest).
            bgDecl = `background-color: ${rawBgExprWithState(bgColor.value, bgRole)}`
        }

        /*********************************************************
         * Foreground resolution
         ********************************************************/
        // Universal design-system contract (matches `useColor`):
        //   • `color` is FOREGROUND-ONLY — it never paints the surface.
        //   • `bgColor` owns the surface; if the consumer wants both
        //     coloured, both props must be set.
        // The previous version of this block auto-paired the bg from the
        // intent when only `color` was passed — that meant
        // `<OrigamBtnGroup color="primary">` flooded every child button
        // with primary backgrounds instead of just colouring the text,
        // breaking the rest of the design system's expectations.
        // For "filled primary button" use `bgColor="primary"` (which
        // auto-contrasts the text to the intent's fg pair below) or set
        // both explicitly.
        if (color.value && isIntent(color.value)) {
            // ── Color-clash auto-contrast (cross-component rule) ────────
            // When the consumer passes the SAME intent on both axes
            // (e.g. `color="primary" bgColor="primary"`), painting the
            // fg with `tokenForegroundForIntent` returns the intent's
            // own hue (fgSubtle = primary.700) ON TOP of the bg's intent
            // surface — hue-on-hue, unreadable ("violet on violet"). Swap
            // to the bg's paired contrast token instead (white on a
            // saturated brand surface, dark on a soft surface) so the
            // text is always legible without forcing the consumer to
            // spell out both values explicitly.
            if (
                bgIntentFg &&
                bgColor.value &&
                isIntent(bgColor.value) &&
                color.value === bgColor.value
            ) {
                fgDecl = `color: ${bgIntentFg}`
            } else {
                // `tokenForegroundForIntent` returns the intent's *foreground*
                // token (e.g. `var(--origam-color-action-primary-fgSubtle)`),
                // designed to be legible on a neutral surface — exactly the
                // semantics consumers want from `color` alone.
                fgDecl = `color: ${tokenForegroundForIntent(color.value)}`
            }
        } else if (color.value && typeof color.value === 'string' && isCssColor(color.value)) {
            if (color.value !== 'transparent') warnLegacyColor('color', color.value)
            fgDecl = `color: ${color.value}`
        } else if (!color.value && bgIntentFg) {
            // Auto-contrast (token path): bg comes from an intent, no
            // explicit color → pair the intent's matching `fg` token so
            // the text is always legible without the consumer specifying
            // both. Reads the same hover/disabled slot via `bgRole`.
            fgDecl = `color: ${bgIntentFg}`
        } else if (!color.value && bgColor.value && typeof bgColor.value === 'string'
                   && bgColor.value !== 'transparent' && isParsableColor(bgColor.value)) {
            // Auto-contrast (legacy raw CSS): WCAG-aware foreground from
            // the existing `getForeground` helper. Skipped for translucent
            // bgs (alpha < 1) since contrast can't be reliably computed.
            const parsed = parseColor(bgColor.value)
            if (parsed.a == null || parsed.a === 1) {
                fgDecl = `color: ${getForeground(parsed)}`
            }
        }

        const styles: string[] = []
        if (bgDecl) styles.push(bgDecl)
        if (fgDecl) styles.push(fgDecl)
        return styles
    })

    return {colorClasses, colorStyles, color, bgColor}
}
