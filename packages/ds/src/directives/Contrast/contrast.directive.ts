import type { Directive, DirectiveBinding } from 'vue'

import type { IContrastOptions } from '../../interfaces'
import { getContrast, getForeground } from '../../utils'

/**
 * Module-level contrast config, set once by `createOrigam({ contrast })`.
 * The directive reads it synchronously (directives run outside `setup`, so
 * they can't `inject`). Defaults to enabled at the WCAG AA 4.5:1 ratio.
 */
let config: Required<IContrastOptions> = {
    enabled: true,
    threshold: 4.5
}

export function setContrastConfig (value: boolean | IContrastOptions | undefined): void {
    if (value === undefined) return
    if (typeof value === 'boolean') {
        config = { enabled: value, threshold: config.threshold }
        return
    }
    config = {
        enabled: value.enabled ?? true,
        threshold: value.threshold ?? 4.5
    }
}

let normCtx: CanvasRenderingContext2D | null | undefined

/**
 * Convert the modern `color(srgb r g b [/ a])` function (0–1 channels) to a
 * legacy `rgb()/rgba()` string. Chromium keeps `color(srgb …)` verbatim even
 * through a canvas round-trip, and `getContrast`/`parseColor` can't read it —
 * design tokens resolve to exactly this form in several themes.
 */
function srgbToRgb (color: string): string | null {
    const m = color.match(/color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i)
    if (!m) return null
    const ch = (v: string) => Math.round(Math.min(1, Math.max(0, parseFloat(v))) * 255)
    const r = ch(m[1]), g = ch(m[2]), b = ch(m[3])
    const a = m[4] !== undefined ? parseFloat(m[4]) : 1
    return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`
}

/**
 * Normalise any CSS colour string — `color(srgb …)`, `color-mix(…)`, named
 * colours, hsl(), etc. — to a plain `rgb()/#hex` the WCAG maths can parse.
 */
function toRgb (color: string | null | undefined): string | null {
    if (!color) return null

    const direct = srgbToRgb(color)
    if (direct) return direct

    if (typeof document === 'undefined') return color
    if (normCtx === undefined) normCtx = document.createElement('canvas').getContext('2d')
    if (!normCtx) return color

    // Canvas resolves named / hsl / color-mix; it may still emit color(srgb …)
    // for wide-gamut inputs, so feed the result back through srgbToRgb.
    normCtx.fillStyle = '#000'
    normCtx.fillStyle = color
    const onBlack = normCtx.fillStyle
    normCtx.fillStyle = '#fff'
    normCtx.fillStyle = color
    const onWhite = normCtx.fillStyle

    if (onBlack !== onWhite) return null
    return srgbToRgb(onBlack) ?? onBlack
}

function isTransparent (rgb: string | null): boolean {
    if (!rgb) return true
    const alpha = rgb.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/)
    return alpha ? Number(alpha[1]) === 0 : false
}

/**
 * Walk up to the nearest ancestor that actually paints a background, so a
 * text element with a transparent background is checked against the surface
 * it visually sits on. Returns a normalised rgb string.
 */
function resolvePaintedBackground (el: HTMLElement): string | null {
    let node: HTMLElement | null = el
    while (node) {
        const bg = toRgb(getComputedStyle(node).backgroundColor)
        if (bg && !isTransparent(bg)) return bg
        node = node.parentElement
    }
    return null
}

function enforceContrast (el: HTMLElement, enabled: boolean): void {
    // The directive's own per-binding override flag prevents the `updated`
    // hook from re-processing the colour we just forced.
    delete el.dataset.origamContrastFixed

    if (!enabled || typeof window === 'undefined') return

    // The consumer EXPLICITLY chose a foreground colour (`color="danger"`,
    // etc.) — respect it. Auto-contrast must never override an intentional
    // colour, only fix legibility when no colour was asked for. Components
    // with a controllable `color` prop set `data-origam-color-locked` when it
    // is provided.
    if (el.dataset.origamColorLocked === 'true') return

    // NOTE: we do NOT clear our previous override here. Vue re-applies the
    // consumer's colour via `el.style.color = …` on every patch (which strips
    // our `!important`), so by the time this runs in rAF the element already
    // reflects the real, current colour — we just re-measure and re-fix.

    const bg = resolvePaintedBackground(el)
    if (!bg) return

    const fg = toRgb(getComputedStyle(el).color)
    if (!fg) return

    let ratio: number
    try {
        ratio = getContrast(fg, bg)
    } catch {
        return
    }
    if (ratio >= config.threshold) return

    const better = getForeground(bg)
    el.style.setProperty('color', better, 'important')
    el.dataset.origamContrastFixed = 'true'

     
    console.warn(
        `[origam] Low text contrast (${ratio.toFixed(2)}:1 < ${config.threshold}:1): ` +
        `text ${fg} on background ${bg}. Overriding text colour to ${better} for legibility. ` +
        `Disable with createOrigam({ contrast: false }).`,
        el
    )
}

/**
 * `v-contrast` — guards an element's text legibility at runtime.
 *
 * After the browser has resolved the design-token CSS variables, it measures
 * the element's text colour against its painted background. When the WCAG
 * ratio falls below the configured threshold it forces the better of
 * black / white text and logs a one-line warning explaining the swap. Toggle
 * globally via `createOrigam({ contrast: false })`, or per-element with
 * `v-contrast="false"`.
 */
const vContrast: Directive<HTMLElement, boolean | undefined> = {
    mounted (el: HTMLElement, binding: DirectiveBinding<boolean | undefined>) {
        const enabled = config.enabled && binding.value !== false
        requestAnimationFrame(() => enforceContrast(el, enabled))
    },
    updated (el: HTMLElement, binding: DirectiveBinding<boolean | undefined>) {
        const enabled = config.enabled && binding.value !== false
        requestAnimationFrame(() => enforceContrast(el, enabled))
    }
}

export default vContrast
