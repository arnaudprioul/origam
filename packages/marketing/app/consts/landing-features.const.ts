import type { IFeature } from '~/interfaces/landing.interface'

export const LANDING_FEATURES: ReadonlyArray<IFeature> = [
    {
        id: 'charts',
        i18nKey: 'features.charts.title',
        fallback: '29 chart primitives',
        descKey: 'features.charts.desc',
        descFallback: 'Highcharts-tier coverage in your bundle.',
        iconName: 'mdi:chart-bar',
        intent: 'primary'
    },
    {
        id: 'a11y',
        i18nKey: 'features.a11y.title',
        fallback: 'WCAG 2.1 AA',
        descKey: 'features.a11y.desc',
        descFallback: 'Automated axe-core tests on every component.',
        iconName: 'mdi:shield-check',
        intent: 'success'
    },
    {
        id: 'tokens',
        i18nKey: 'features.tokens.title',
        fallback: 'Design tokens',
        descKey: 'features.tokens.desc',
        descFallback: 'Multi-theme (light/dark/brand) via Tokens Studio.',
        iconName: 'mdi:palette',
        intent: 'secondary'
    },
    {
        id: 'typescript',
        i18nKey: 'features.typescript.title',
        fallback: 'TypeScript first',
        descKey: 'features.typescript.desc',
        descFallback: 'Strict mode, complete types, ergonomic APIs.',
        iconName: 'mdi:code-brackets',
        intent: 'info'
    },
    {
        id: 'css',
        i18nKey: 'features.css.title',
        fallback: 'CSS-first',
        descKey: 'features.css.desc',
        descFallback: ':has(), container queries, color-mix, prefers-reduced-motion.',
        iconName: 'mdi:feather',
        intent: 'warning'
    },
    {
        id: 'vue',
        i18nKey: 'features.vue.title',
        fallback: 'Vue 3 native',
        descKey: 'features.vue.desc',
        descFallback: 'Composition API, <script setup>, SFC, no jank.',
        iconName: 'mdi:vuejs',
        intent: 'danger'
    },
    {
        id: 'figma',
        i18nKey: 'features.figma.title',
        fallback: 'Figma plugin',
        descKey: 'features.figma.desc',
        descFallback: 'Sync tokens & components both ways via Origam DS Sync.',
        iconName: 'mdi:vector-polyline',
        intent: 'info'
    }
] as const
