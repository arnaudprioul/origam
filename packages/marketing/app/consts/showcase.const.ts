import type { CSSProperties } from 'vue'

import type { IShowcaseChipItem, IShowcaseTableRow } from '~/interfaces/showcase.interface'

/**
 * Asymmetric showcase grid: 624 | 312 | 312 maquette tracks → 2fr 1fr 1fr in
 * the 1248px-max container (same ratio, responsive). Forwarded verbatim to
 * <OrigamGrid columns>.
 */
export const SHOWCASE_GRID_COLUMNS = '2fr 1fr 1fr'

/**
 * Per-instance OrigamCard token overrides for a showcase widget card.
 *
 * Radius now rides the typed `rounded="var(--origam-radius---md)"` prop
 * (useRounded accepts custom-property refs since the v2.6 DS fix). `bgColor`
 * still rejects `var(--origam-…)` (it expects a TIntent), so the non-intent
 * `surface---raised` token is painted on the card's public bg custom-prop —
 * the documented color-policy hatch (same as FEATURE_CARD_VARS). The padding
 * tokens stay on the per-instance custom-props (the `padding` prop's regex
 * rejects `var(...)`).
 *
 *   bg     #fafafa → --origam-color__surface---raised (sobre)
 *   shadow         → --origam-shadow---card-elevated (marketing display token)
 *   padding 24px   → --origam-space---6
 */
export const SHOWCASE_WIDGET_RADIUS = 'var(--origam-radius---md, 10px)'

export const SHOWCASE_WIDGET_VARS: CSSProperties = {
    '--origam-card---background': 'var(--origam-color__surface---raised, #fafafa)',
    '--origam-card---box-shadow': 'var(--origam-shadow---card-elevated)',
    '--origam-card---padding-block-start': 'var(--origam-space---6, 1.5rem)',
    '--origam-card---padding-block-end': 'var(--origam-space---6, 1.5rem)',
    '--origam-card---padding-inline-start': 'var(--origam-space---6, 1.5rem)',
    '--origam-card---padding-inline-end': 'var(--origam-space---6, 1.5rem)'
} as CSSProperties

export const SHOWCASE_TABLE_ROWS: IShowcaseTableRow[] = [
    {
        nameKey: 'home.showcase.dataTable.row1Name',
        nameFallback: 'Aurora release',
        ownerKey: 'home.showcase.dataTable.row1Owner',
        ownerFallback: 'Arnaud',
        statusKey: 'home.showcase.dataTable.row1Status',
        statusFallback: 'Shipped',
        statusIntent: 'success',
    },
    {
        nameKey: 'home.showcase.dataTable.row2Name',
        nameFallback: 'Tokens v2',
        ownerKey: 'home.showcase.dataTable.row2Owner',
        ownerFallback: 'Léa',
        statusKey: 'home.showcase.dataTable.row2Status',
        statusFallback: 'In review',
        statusIntent: 'warning',
    },
    {
        nameKey: 'home.showcase.dataTable.row3Name',
        nameFallback: 'A11y audit',
        ownerKey: 'home.showcase.dataTable.row3Owner',
        ownerFallback: 'Jade',
        statusKey: 'home.showcase.dataTable.row3Status',
        statusFallback: 'Shipped',
        statusIntent: 'success',
    },
    {
        nameKey: 'home.showcase.dataTable.row4Name',
        nameFallback: 'Chart engine',
        ownerKey: 'home.showcase.dataTable.row4Owner',
        ownerFallback: 'Marc',
        statusKey: 'home.showcase.dataTable.row4Status',
        statusFallback: 'Draft',
        statusIntent: 'neutral',
    },
    {
        nameKey: 'home.showcase.dataTable.row5Name',
        nameFallback: 'New theme',
        ownerKey: 'home.showcase.dataTable.row5Owner',
        ownerFallback: 'Romi',
        statusKey: 'home.showcase.dataTable.row5Status',
        statusFallback: 'In review',
        statusIntent: 'warning',
    },
]

export const SHOWCASE_SPARKLINE_DATA = [6, 8, 7, 10, 9, 11, 12, 10, 13, 14, 12, 15]

/**
 * 3 chips shown inline in the Showcase card (matches the maquette).
 * Primary = outline violet, Neutral = outline grey, Success = tinted green.
 * We avoid OrigamChipGroup (slides/scroll) and render them directly in a flex
 * container so they never overflow.
 */
export const SHOWCASE_CHIP_ITEMS: IShowcaseChipItem[] = [
    {
        intent: 'primary',
        labelKey: 'home.showcase.chips.primary',
        labelFallback: 'Primary',
    },
    {
        intent: 'neutral',
        labelKey: 'home.showcase.chips.neutral',
        labelFallback: 'Neutral',
    },
    {
        intent: 'success',
        labelKey: 'home.showcase.chips.success',
        labelFallback: 'Success',
    },
]

export const SHOWCASE_AVATAR_ITEMS = [
    { text: 'AR', bgColor: 'primary' },
    { text: 'LB', bgColor: 'info'    },
    { text: 'JD', bgColor: 'warning' },
    { text: 'MC', bgColor: 'danger'  },
]
