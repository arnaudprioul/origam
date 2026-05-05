import type { ComputedRef, Ref } from 'vue'
import { computed, isRef, ref } from 'vue'
import type { IColorProps } from "../../interfaces"
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

/**
 * Build the CSS-vars override map for an intent (foreground + background).
 *
 * `bgKey` controls which `action.{intent}.bgXxx` slot is read (`bg`,
 * `bgHover`, `bgDisabled`). `feedbackBg` is `bg` or `bgSubtle`.
 */
function tokenStylesForIntent (intent: TIntent, role: 'default' | 'hover' | 'disabled' = 'default'): Record<string, string> {
    const styles: Record<string, string> = {}
    if (intent === 'neutral') {
        styles['background-color'] = `var(--origam-color-action-secondary-${bgSlot(role)})`
        styles.color = `var(--origam-color-action-secondary-${fgSlot(role)})`
        return styles
    }
    if (intent === 'success' || intent === 'warning' || intent === 'danger' || intent === 'info') {
        styles['background-color'] = `var(--origam-color-feedback-${intent}-bg)`
        styles.color = `var(--origam-color-feedback-${intent}-fg)`
        return styles
    }
    // primary / secondary / ghost
    styles['background-color'] = `var(--origam-color-action-${intent}-${bgSlot(role)})`
    styles.color = `var(--origam-color-action-${intent}-${fgSlot(role)})`
    return styles
}

function bgSlot (role: 'default' | 'hover' | 'disabled'): string {
    if (role === 'hover') return 'bgHover'
    if (role === 'disabled') return 'bgDisabled'
    return 'bg'
}

function fgSlot (role: 'default' | 'hover' | 'disabled'): string {
    if (role === 'disabled') return 'fgDisabled'
    return 'fg'
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

export function useColor (colors: ComputedRef<{ background?: TColor, text?: TColor }>) {
    const colorStyles = computed(() => {
        const styles: string[] = []

        // Track the intent's matching foreground when the background is an
        // intent — lets `bgColor="primary"` alone auto-pair the right text
        // colour without forcing the consumer to specify both.
        let bgIntentFg: string | null = null
        let bgDecl: string | null = null

        // ─── Background resolution ───────────────────────────────────────
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

        // ─── Foreground resolution ───────────────────────────────────────
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
                fgDecl = `color: ${tokenForegroundForIntent(colors.value.text)}`
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

    return {colorStyles}
}

export function useBothColor<T extends Record<K, TColor>, K extends string> (bgColorProps: T | Ref<TColor> | ComputedRef<TColor>, colorProps: T | Ref<TColor> | ComputedRef<TColor>, name?: K) {
    const bothColors = computed(() => {
        return {
            text: isRef(colorProps) ? colorProps.value : (name ? colorProps[name] : null),
            background: isRef(bgColorProps) ? bgColorProps.value : (name ? bgColorProps[name] : null)
        }
    })

    return useColor(bothColors)
}

export function useTextColor<T extends Record<K, TColor>, K extends string> (
    props: T | Ref<TColor>,
    name?: K
) {
    const colors = computed(() => ({
        text: isRef(props) ? props.value : (name ? props[name] : null)
    }))

    const {colorStyles: textColorStyles} = useColor(colors)

    return {textColorStyles}
}

export function useBackgroundColor<T extends Record<K, TColor>, K extends string> (
    props: T | Ref<TColor>,
    name?: K
) {
    const colors = computed(() => ({
        background: isRef(props) ? props.value : (name ? props[name] : null)
    }))

    const {colorStyles: backgroundColorStyles} = useColor(colors)

    return {backgroundColorStyles}
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

export function useColorEffect (
    props: IColorProps,
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
        // Disabled wins over hover / active — when the host component
        // is disabled, both axes resolve to the intent's `bgDisabled` /
        // `fgDisabled` slot (which is by design a LIGHTER version of
        // the resting bg, e.g. `--origam-color-action-primary-bgDisabled`
        // = #e6e6e6 vs the resting `bg` = a saturated primary). User
        // request: "le disable s'il a un bgColor doit être plus clair
        // que ce dernier".
        const bgRole: 'default' | 'hover' | 'disabled' =
            isDisabled.value ? 'disabled' :
            isHover.value && !props.hoverBgColor ? 'hover' :
            isActive.value && !props.activeBgColor ? 'hover' :
            'default'
        const fgRole: 'default' | 'hover' | 'disabled' =
            isDisabled.value ? 'disabled' :
            isHover.value && !props.hoverColor ? 'hover' :
            isActive.value && !props.activeColor ? 'hover' :
            'default'

        let bgDecl: string | null = null
        let fgDecl: string | null = null
        // When bg comes from an intent, we know the matching fg token —
        // remember it so a missing `color` falls back to that pair (auto-
        // contrast inside the design-system without `getForeground`).
        let bgIntentFg: string | null = null

        // ─── Background resolution ───────────────────────────────────────
        if (bgColor.value && isIntent(bgColor.value)) {
            const m = tokenStylesForIntent(bgColor.value, bgRole)
            bgDecl = `background-color: ${m['background-color']}`
            bgIntentFg = m.color
        } else if (bgColor.value === 'transparent') {
            bgDecl = `background-color: ${bgColor.value}`
        } else if (bgColor.value && typeof bgColor.value === 'string' && isCssColor(bgColor.value)) {
            warnLegacyColor('bgColor', bgColor.value)
            // Legacy raw-color path — when disabled, lighten via
            // `color-mix` so the surface still reads as "disabled
            // version of bgColor" without us having to bake a per-color
            // disabled token. Same intent as the token path's
            // `bgDisabled` slot.
            bgDecl = isDisabled.value
                ? `background-color: color-mix(in srgb, ${bgColor.value} 35%, white)`
                : `background-color: ${bgColor.value}`
        }

        // ─── Foreground resolution ───────────────────────────────────────
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
            // `tokenForegroundForIntent` returns the intent's *foreground*
            // token (e.g. `var(--origam-color-action-primary-fgSubtle)`),
            // designed to be legible on a neutral surface — exactly the
            // semantics consumers want from `color` alone.
            fgDecl = `color: ${tokenForegroundForIntent(color.value)}`
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

    return {colorStyles, color, bgColor}
}
