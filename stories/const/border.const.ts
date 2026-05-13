import type { IOptions } from '@origam/interfaces'

/**
 * Choices for the `border` prop. Mirrors the layered API of `rounded`:
 *
 *   • Off (`false` / `undefined`)
 *   • Legacy boolean opt-in (`true`) — equivalent to the utility `thin`.
 *   • Token-driven utility widths (`'none' | 'thin' | 'thick'`) — drive
 *     `.origam--border-{rung}` from `origam-utilities.css`.
 *   • Directional keywords (top / right / bottom / left / block / inline)
 *     — drive each component's `&--border-{direction}` SCSS rule, which
 *     forces a single edge to `thin`.
 *   • Free-form CSS escape hatches (`'4px dashed currentColor'`, etc.).
 *
 * Use in stories alongside `borderStyleList` and `borderColorList` (the
 * `intentList` is enough for the colour swatches).
 */
export const borderList: Array<IOptions<boolean | string | undefined>> = [
    // ── Off / boolean ───────────────────────────────────────────
    { label: 'No Border', value: false },
    { label: 'Border (legacy boolean → thin)', value: true },

    // ── Utility widths (token-driven, theme-aware) ──────────────
    { label: 'thin (1px)', value: 'thin' },
    { label: 'thick (3px)', value: 'thick' },
    { label: 'none (0)', value: 'none' },

    // ── Directional keywords ────────────────────────────────────
    { label: 'top', value: 'top' },
    { label: 'right', value: 'right' },
    { label: 'bottom', value: 'bottom' },
    { label: 'left', value: 'left' },
    { label: 'block (top + bottom)', value: 'block' },
    { label: 'inline (left + right)', value: 'inline' },

    // ── Free-form CSS escape hatches ────────────────────────────
    { label: '2px solid currentColor', value: '2px solid currentColor' },
    { label: '4px dashed', value: '4px dashed' },
    { label: '2px dotted', value: '2px dotted' },
]

export const borderStyleList: Array<IOptions<string>> = [
    { label: 'solid', value: 'solid' },
    { label: 'dashed', value: 'dashed' },
    { label: 'dotted', value: 'dotted' },
    { label: 'double', value: 'double' },
    { label: 'groove', value: 'groove' },
    { label: 'ridge', value: 'ridge' },
    { label: 'inset', value: 'inset' },
    { label: 'outset', value: 'outset' },
]

export const borderWidthList: Array<IOptions<number | string>> = [
    { label: 'thin (1px)', value: 'thin' },
    { label: 'medium (3px)', value: 'medium' },
    { label: 'thick (5px)', value: 'thick' },
    { label: '0', value: 0 },
    { label: '1px', value: 1 },
    { label: '2px', value: 2 },
    { label: '4px', value: 4 },
    { label: '8px', value: 8 },
]
