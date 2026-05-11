export type TColor = string | false | null | undefined

export type TXYZ = [number, number, number]
export type TLAB = [number, number, number]
export type THSVA = { h: number, s: number, v: number, a?: number }
export type TRGBA = { r: number, g: number, b: number, a?: number }
export type THSLA = { h: number, s: number, l: number, a?: number }
export type THex = string & { __hexBrand: never }

export type TColorType = string | number | THSVA | TRGBA | THSLA

/**
 * Interaction role for state-aware color resolution.
 *
 * Used by `useColorEffect` (and its helpers) to pick the right token
 * rung / math-derivation for a given visual state:
 *
 *   • `default`  → resting bgColor (no transformation)
 *   • `hover`    → cascading `var(bgHover, color-mix(bg, black 20%))`
 *   • `active`   → cascading `var(bgActive, color-mix(bg, black 30%))`
 *   • `disabled` → resting `bgDisabled` token (per-intent)
 */
export type TBgFgRole = 'default' | 'hover' | 'active' | 'disabled'