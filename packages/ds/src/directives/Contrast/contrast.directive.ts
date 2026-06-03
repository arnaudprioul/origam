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

const TRANSPARENT = new Set(['transparent', 'rgba(0, 0, 0, 0)', ''])

/**
 * Walk up to the nearest ancestor that actually paints a background, so a
 * text element with a transparent background is checked against the surface
 * it visually sits on.
 */
function resolvePaintedBackground (el: HTMLElement): string | null {
    let node: HTMLElement | null = el
    while (node) {
        const bg = getComputedStyle(node).backgroundColor
        if (bg && !TRANSPARENT.has(bg)) return bg
        node = node.parentElement
    }
    return null
}

function enforceContrast (el: HTMLElement, enabled: boolean): void {
    // The directive's own per-binding override flag prevents the `updated`
    // hook from re-processing the colour we just forced.
    delete el.dataset.origamContrastFixed

    if (!enabled || typeof window === 'undefined') return

    // Always clear a previous override first so a fresh Vue patch (e.g. the
    // user changing colours via controls) is evaluated on its real value.
    el.style.removeProperty('color')

    const bg = resolvePaintedBackground(el)
    if (!bg) return

    const fg = getComputedStyle(el).color
    if (!fg) return

    const ratio = getContrast(fg, bg)
    if (ratio >= config.threshold) return

    const better = getForeground(bg)
    el.style.setProperty('color', better, 'important')
    el.dataset.origamContrastFixed = 'true'

    // eslint-disable-next-line no-console
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
