import type { CSSProperties } from 'vue'

import type { IKpi } from '~/interfaces/kpi.interface'

/**
 * OrigamDivider opacity override for the KPI hairlines. The divider bakes a
 * 0.12 fade for its default hairline look; the KPI rules must read the sobre
 * border token at full strength. Since the v2.6 DS fix the opacity is exposed
 * as the overridable `--origam-divider---opacity` custom-prop, so we set it
 * via the divider's public `:style` channel instead of a scoped CSS exception.
 */
export const KPIS_RULE_VARS: CSSProperties = {
    '--origam-divider---opacity': '1'
} as CSSProperties

/**
 * Track template forwarded verbatim to <OrigamGrid columns>.
 *
 * `auto-fit` + `minmax` is CSS-first responsive: the 5 KPI columns collapse
 * to fewer per row on narrow viewports with no media query and no
 * `!important` override of the grid's `--origam-grid---template-columns`.
 */
export const KPIS_GRID_COLUMNS = 'repeat(auto-fit, minmax(140px, 1fr))'

export const KPIS: IKpi[] = [
    {
        valueKey: 'home.kpis.componentsValue',
        valueFallback: '95',
        labelKey: 'home.kpis.componentsLabel',
        labelFallback: 'Components',
    },
    {
        valueKey: 'home.kpis.chartsValue',
        valueFallback: '29',
        labelKey: 'home.kpis.chartsLabel',
        labelFallback: 'Chart primitives',
    },
    {
        valueKey: 'home.kpis.a11yValue',
        valueFallback: '100%',
        labelKey: 'home.kpis.a11yLabel',
        labelFallback: 'WCAG 2.1 AA',
    },
    {
        valueKey: 'home.kpis.sizeValue',
        valueFallback: '<50kb',
        labelKey: 'home.kpis.sizeLabel',
        labelFallback: 'Tree-shakable',
    },
    {
        valueKey: 'home.kpis.licenseValue',
        valueFallback: 'MIT',
        labelKey: 'home.kpis.licenseLabel',
        labelFallback: 'Open source',
    },
]
