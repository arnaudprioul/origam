import type { CSSProperties } from 'vue'

/*
 * Per-instance OrigamBtn token overrides for the hero CTAs.
 *
 * The maquette CTA is "transparent background + 10px radius + tall padded
 * pill + 16px regular weight". No DS variant ships that exact chrome, so we
 * drive the SIZING through the btn's PUBLIC instance-level CSS custom
 * properties (the documented escape hatch) — these flow through the btn's
 * `btnStyles` → useStyle rule and win cleanly. No raw colour here; every
 * value is a marketing display token or a literal dimension.
 *
 * height 57.5px        → --origam-btn---height (+ density zeroed so the
 *                        comfortable-density delta doesn't inflate it)
 * padding-inline 40px  → 16px base + 24px density-padding-x
 * font-size 16px       → --origam-btn---font-size
 * radius 10px          → --origam-radius---btn
 *
 * The violet glow is NOT here: `variant="text"` forces `box-shadow: none`
 * in the DS SCSS at equal specificity, so a token override can't win. The
 * glow is applied via a 0,2,0 scoped class in HomeHero (`__btn--primary`),
 * documented there as a DS gap (no DS variant = transparent-bg + shadow).
 */
export const HERO_BTN_VARS: CSSProperties = {
    '--origam-btn---height': '57.5px',
    '--origam-btn---density': '0px',
    '--origam-btn---density-padding-x': 'var(--origam-space---6, 1.5rem)',
    '--origam-btn---font-size': '1rem',
    '--origam-btn---font-weight': '400',
    '--origam-btn---border-radius': 'var(--origam-radius---btn, 10px)'
} as CSSProperties

/*
 * Hero badge (OrigamChip) instance overrides. OrigamChip has NO `variant`
 * prop (verified against chip.interface.ts) — the maquette's transparent
 * outlined pill is built from: color="primary" (violet ink), a `border`,
 * and a transparent surface via the chip's own background-color token.
 */
export const HERO_BADGE_VARS: CSSProperties = {
    '--origam-chip---background-color': 'transparent'
} as CSSProperties
