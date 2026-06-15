import type { CSSProperties } from 'vue'
import type { IStrength, IComparison, IUseCase, IWeakness } from '~/interfaces/why-origam.interface'

/**
 * Hero section: gradient badge, same styling as HomeHero badge.
 */
export const WHY_HERO_BADGE_VARS: CSSProperties = {
    '--origam-chip---background-color': 'transparent'
} as CSSProperties

/**
 * Comparison table: alternating row tint.
 */
export const WHY_TABLE_ACCENT_VARS: CSSProperties = {
    '--origam-card---background': 'var(--origam-color__surface---raised, #fafafa)'
} as CSSProperties

/**
 * Strength icon tile background — same pattern as HomeFeatures.
 */
export const WHY_STRENGTH_ICON_TILE_VARS: CSSProperties = {
    '--origam-sheet---background': 'var(--origam-color__action--primary---bgSubtle, rgba(124, 58, 237, 0.1))'
} as CSSProperties

export const WHY_STRENGTH_ICON_TILE_RADIUS = 'var(--origam-radius---card, 10px)'

export const WHY_STRENGTH_ICON_VARS: CSSProperties = {
    '--origam-icon---color': 'var(--origam-color__action--primary---fgSubtle, #6d28d9)'
} as CSSProperties

/**
 * Weakness icon tile — amber/warning tint.
 */
export const WHY_WEAKNESS_ICON_TILE_VARS: CSSProperties = {
    '--origam-sheet---background': 'var(--origam-color__feedback--warning---bgSubtle, rgba(245, 158, 11, 0.1))'
} as CSSProperties

export const WHY_WEAKNESS_ICON_VARS: CSSProperties = {
    '--origam-icon---color': 'var(--origam-color__feedback--warning---fg, #b45309)'
} as CSSProperties

/**
 * Strengths list (S2).
 */
export const WHY_STRENGTHS: IStrength[] = [
    {
        icon: 'mdi-vuejs',
        titleKey: 'whyOrigam.strengths.vue3.title',
        descriptionKey: 'whyOrigam.strengths.vue3.description'
    },
    {
        icon: 'mdi-palette-outline',
        titleKey: 'whyOrigam.strengths.tokens.title',
        descriptionKey: 'whyOrigam.strengths.tokens.description'
    },
    {
        icon: 'mdi-chart-line',
        titleKey: 'whyOrigam.strengths.charts.title',
        descriptionKey: 'whyOrigam.strengths.charts.description'
    },
    {
        icon: 'mdi-human',
        titleKey: 'whyOrigam.strengths.a11y.title',
        descriptionKey: 'whyOrigam.strengths.a11y.description'
    },
    {
        icon: 'mdi-language-css3',
        titleKey: 'whyOrigam.strengths.css.title',
        descriptionKey: 'whyOrigam.strengths.css.description'
    },
    {
        icon: 'mdi-package-variant-closed',
        titleKey: 'whyOrigam.strengths.treeshake.title',
        descriptionKey: 'whyOrigam.strengths.treeshake.description'
    },
    {
        icon: 'mdi-puzzle-outline',
        titleKey: 'whyOrigam.strengths.composables.title',
        descriptionKey: 'whyOrigam.strengths.composables.description'
    },
    {
        icon: 'mdi-scale-balance',
        titleKey: 'whyOrigam.strengths.mit.title',
        descriptionKey: 'whyOrigam.strengths.mit.description'
    }
]

/**
 * Comparison data (S3). Facts only — no invented metrics on competitors.
 * "Vue native" means the lib is built for Vue 3 (Composition API, script setup).
 * "Design tokens" means DTCG-compliant token system.
 * "A11y tested" means the lib ships automated a11y tests per component.
 * "CSS-first" means the lib documents CSS-modern techniques as primary approach.
 * "Tree-shakable" = the lib publishes an ESM build; all listed libs do.
 * "Charts included" = charting primitives shipped in the same package.
 */
export const WHY_COMPARISONS: IComparison[] = [
    {
        nameKey: 'whyOrigam.comparison.origam',
        vueNative: true,
        designTokens: true,
        a11yTested: true,
        cssFist: true,
        treeShakable: true,
        chartsIncluded: true
    },
    {
        nameKey: 'whyOrigam.comparison.vuetify',
        vueNative: true,
        designTokens: false,
        a11yTested: true,
        cssFist: false,
        treeShakable: true,
        chartsIncluded: false,
        noteKey: 'whyOrigam.comparison.vuetifyNote'
    },
    {
        nameKey: 'whyOrigam.comparison.primeVue',
        vueNative: true,
        designTokens: true,
        a11yTested: true,
        cssFist: false,
        treeShakable: true,
        chartsIncluded: false,
        noteKey: 'whyOrigam.comparison.primeVueNote'
    },
    {
        nameKey: 'whyOrigam.comparison.quasar',
        vueNative: true,
        designTokens: false,
        a11yTested: false,
        cssFist: false,
        treeShakable: false,
        chartsIncluded: false,
        noteKey: 'whyOrigam.comparison.quasarNote'
    },
    {
        nameKey: 'whyOrigam.comparison.elementPlus',
        vueNative: true,
        designTokens: false,
        a11yTested: false,
        cssFist: false,
        treeShakable: true,
        chartsIncluded: false,
        noteKey: 'whyOrigam.comparison.elementPlusNote'
    },
    {
        nameKey: 'whyOrigam.comparison.naiveUi',
        vueNative: true,
        designTokens: false,
        a11yTested: false,
        cssFist: false,
        treeShakable: true,
        chartsIncluded: false,
        noteKey: 'whyOrigam.comparison.naiveUiNote'
    }
]

/**
 * Weaknesses / honesty section (S4).
 */
export const WHY_WEAKNESSES: IWeakness[] = [
    {
        icon: 'mdi-account-group-outline',
        titleKey: 'whyOrigam.weaknesses.community.title',
        descriptionKey: 'whyOrigam.weaknesses.community.description'
    },
    {
        icon: 'mdi-book-open-outline',
        titleKey: 'whyOrigam.weaknesses.templates.title',
        descriptionKey: 'whyOrigam.weaknesses.templates.description'
    },
    {
        icon: 'mdi-server-network',
        titleKey: 'whyOrigam.weaknesses.scale.title',
        descriptionKey: 'whyOrigam.weaknesses.scale.description'
    }
]

/**
 * Use-cases (S5): when to pick origam and when not.
 */
export const WHY_USE_CASES: IUseCase[] = [
    {
        icon: 'mdi-check-circle-outline',
        titleKey: 'whyOrigam.useCases.greenfield.title',
        descriptionKey: 'whyOrigam.useCases.greenfield.description',
        fits: true
    },
    {
        icon: 'mdi-check-circle-outline',
        titleKey: 'whyOrigam.useCases.tokenTeam.title',
        descriptionKey: 'whyOrigam.useCases.tokenTeam.description',
        fits: true
    },
    {
        icon: 'mdi-check-circle-outline',
        titleKey: 'whyOrigam.useCases.saasProduct.title',
        descriptionKey: 'whyOrigam.useCases.saasProduct.description',
        fits: true
    },
    {
        icon: 'mdi-check-circle-outline',
        titleKey: 'whyOrigam.useCases.dataviz.title',
        descriptionKey: 'whyOrigam.useCases.dataviz.description',
        fits: true
    },
    {
        icon: 'mdi-close-circle-outline',
        titleKey: 'whyOrigam.useCases.migration.title',
        descriptionKey: 'whyOrigam.useCases.migration.description',
        fits: false
    },
    {
        icon: 'mdi-close-circle-outline',
        titleKey: 'whyOrigam.useCases.ecosystem.title',
        descriptionKey: 'whyOrigam.useCases.ecosystem.description',
        fits: false
    }
]

/**
 * Comparison table columns definition (for i18n header keys only).
 */
export const WHY_COMPARISON_COLUMNS: string[] = [
    'whyOrigam.comparison.colVueNative',
    'whyOrigam.comparison.colDesignTokens',
    'whyOrigam.comparison.colA11yTested',
    'whyOrigam.comparison.colCssFirst',
    'whyOrigam.comparison.colTreeShakable',
    'whyOrigam.comparison.colCharts'
]
