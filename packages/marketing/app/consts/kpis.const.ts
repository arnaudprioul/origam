import type { IKpi } from '~/interfaces/kpi.interface'

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
