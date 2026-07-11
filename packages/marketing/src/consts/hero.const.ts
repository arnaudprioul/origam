import type { CSSProperties } from 'vue'

/*
 * Hero badge (OrigamChip) instance overrides. OrigamChip has NO `variant`
 * prop (verified against chip.interface.ts) — the maquette's transparent
 * outlined pill is built from: color="primary" (violet ink), a `border`,
 * and a transparent surface via the chip's own background-color token.
 */
export const HERO_BADGE_VARS: CSSProperties = {
    '--origam-chip---background-color': 'transparent'
} as CSSProperties
