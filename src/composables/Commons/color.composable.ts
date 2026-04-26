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

// ────────────────────────────────────────────────────────────────────────────
// Legacy `useColor` API (kept for backward compat — used by ~49 components)
// ────────────────────────────────────────────────────────────────────────────

export function useColor (colors: ComputedRef<{ background?: TColor, text?: TColor }>) {
    const colorStyles = computed(() => {
        const styles = []

        if (colors.value.background) {
            if (colors.value.background === 'transparent') {
                styles.push(`background-color: ${colors.value.background}`)
            }

            if (isCssColor(colors.value.background)) {
                styles.push(`background-color: ${colors.value.background}`)

                if (!colors.value.text && isParsableColor(colors.value.background)) {
                    const backgroundColor = parseColor(colors.value.background)

                    if (backgroundColor.a == null || backgroundColor.a === 1) {
                        styles.push(`color: ${getForeground(backgroundColor)}`)
                    }
                }
            }
        }

        if (colors.value.text) {
            if (isCssColor(colors.value.text)) {
                styles.push(`color: ${colors.value.text}`)
            }
        }

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
    isActive: Ref<boolean> | ComputedRef<boolean> = ref(false)
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
        const bgRole: 'default' | 'hover' =
            isHover.value && !props.hoverBgColor ? 'hover' :
            isActive.value && !props.activeBgColor ? 'hover' :
            'default'
        const fgRole: 'default' | 'hover' =
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
            bgDecl = `background-color: ${bgColor.value}`
        }

        // ─── Foreground resolution ───────────────────────────────────────
        if (color.value && isIntent(color.value)) {
            const m = tokenStylesForIntent(color.value, fgRole)
            // No bg has been picked yet → use the intent's own bg pair so
            // `color="primary"` alone still renders a primary surface.
            if (!bgDecl) {
                bgDecl = `background-color: ${m['background-color']}`
            }
            fgDecl = `color: ${m.color}`
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
