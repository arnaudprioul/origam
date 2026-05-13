import type { IOptions } from '@origam/interfaces'

/**
 * Choices for the `border` prop. The composable accepts a single
 * value that may encode width / style / color / direction:
 *
 *   • boolean `true`           → utility `thin`
 *   • utility keywords         → `'none' | 'thin' | 'thick'`
 *   • directional keywords     → `'top' | 'right' | 'bottom' | 'left' | 'block' | 'inline'`
 *   • free-form CSS string     → `'4px dashed red'`, `'2px solid var(--origam-color-action-primary-bg)'`, …
 *   • raw number (px width)    → `2`
 *
 * Everything (width, style, color, position) is therefore routed
 * through this one prop — no separate `borderStyle` / `borderColor`
 * controls. The free-form strings below showcase the variety of inputs
 * the composable supports.
 */
export const borderList: Array<IOptions<boolean | number | string | undefined>> = [
    // ── Off / boolean ───────────────────────────────────────────
    { label: 'No Border', value: false },
    { label: 'Border (legacy boolean → thin)', value: true },

    // ── Utility widths ──────────────────────────────────────────
    { label: 'Width — thin (utility, 1px)', value: 'thin' },
    { label: 'Width — thick (utility, 3px)', value: 'thick' },

    // ── Numeric widths ──────────────────────────────────────────
    { label: 'Width — 4px', value: 4 },
    { label: 'Width — 8px', value: 8 },

    // ── Style variants (free-form CSS) ──────────────────────────
    { label: 'Style — 2px dashed', value: '2px dashed' },
    { label: 'Style — 2px dotted', value: '2px dotted' },
    { label: 'Style — 3px double', value: '3px double' },
    { label: 'Style — 4px groove', value: '4px groove' },

    // ── Color variants (free-form CSS) ──────────────────────────
    { label: 'Color — 2px solid primary', value: '2px solid var(--origam-color-action-primary-bg)' },
    { label: 'Color — 2px solid success', value: '2px solid var(--origam-color-feedback-success-bg)' },
    { label: 'Color — 2px solid danger',  value: '2px solid var(--origam-color-feedback-danger-bg)' },
    { label: 'Color — 3px dashed orange', value: '3px dashed #ff8a00' },

    // ── Position keywords ───────────────────────────────────────
    { label: 'Position — top',    value: 'top' },
    { label: 'Position — right',  value: 'right' },
    { label: 'Position — bottom', value: 'bottom' },
    { label: 'Position — left',   value: 'left' },
    { label: 'Position — block (top + bottom)',  value: 'block' },
    { label: 'Position — inline (left + right)', value: 'inline' },
]
