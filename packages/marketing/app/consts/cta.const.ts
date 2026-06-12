import type { CSSProperties } from 'vue'

/**
 * Constants for the HomeCta section (T7).
 */
export const CTA_START_HREF = '/docs/getting-started'

export const CTA_DOCS_HREF = '/docs'

/*
 * Per-instance OrigamBtn token overrides for the CTA "Get started" button.
 *
 * Maquette: surface raised, white bg, ink text, ~10px radius, 57.5px tall,
 * light card-like shadow. Uses variant="elevated" to get the surface+shadow
 * chrome, then overrides the shadow via the marketing card-elevated token
 * and the bg/color via surface tokens. No raw hex.
 */
export const CTA_BTN_START_VARS: CSSProperties = {
    '--origam-btn---height': '52px',
    '--origam-btn---density': '0px',
    '--origam-btn---density-padding-x': 'var(--origam-space---6, 1.5rem)',
    '--origam-btn---font-size': '1rem',
    '--origam-btn---font-weight': '400',
    '--origam-btn---border-radius': 'var(--origam-radius---btn, 10px)'
} as CSSProperties

/*
 * Per-instance OrigamBtn token overrides for the CTA "Read docs" button.
 *
 * Maquette: ghost/text, no background, secondary text color, icon prepend.
 * Uses variant="text" which ships with the correct chrome, just needs
 * consistent sizing to align with the start button.
 */
export const CTA_BTN_DOCS_VARS: CSSProperties = {
    '--origam-btn---height': '52px',
    '--origam-btn---density': '0px',
    '--origam-btn---density-padding-x': 'var(--origam-space---4, 1rem)',
    '--origam-btn---font-size': '1rem',
    '--origam-btn---font-weight': '400',
    '--origam-btn---border-radius': 'var(--origam-radius---btn, 10px)'
} as CSSProperties
