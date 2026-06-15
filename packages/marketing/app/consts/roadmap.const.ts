import type { CSSProperties } from 'vue'
import type {
    IRoadmapStatusItem,
    IRoadmapWave,
    IRoadmapPhase,
    IRoadmapWave4Component
} from '~/interfaces/roadmap.interface'

/**
 * Hero badge CSS vars — same pattern as why-origam.
 */
export const ROADMAP_HERO_BADGE_VARS: CSSProperties = {
    '--origam-chip---background-color': 'transparent'
} as CSSProperties

/**
 * Current status items — sourced from CHANGELOG.md (post-2.6.0 state).
 */
export const ROADMAP_STATUS_ITEMS: IRoadmapStatusItem[] = [
    { labelKey: 'roadmap.status.npmPublished', done: true },
    { labelKey: 'roadmap.status.preDelivery', done: true },
    { labelKey: 'roadmap.status.readmeChangelog', done: true },
    { labelKey: 'roadmap.status.monorepo', done: true },
    { labelKey: 'roadmap.status.wave4Shipped', done: true },
    { labelKey: 'roadmap.status.docOnline', done: false },
    { labelKey: 'roadmap.status.ci', done: false },
    { labelKey: 'roadmap.status.playwrightCoverage', done: false },
    { labelKey: 'roadmap.status.bundleMonitoring', done: false }
]

/**
 * Delivered waves — sourced from CHANGELOG.md Waves 1/2/3/4.
 */
export const ROADMAP_WAVES: IRoadmapWave[] = [
    {
        titleKey: 'roadmap.waves.wave1.title',
        items: [
            { nameKey: 'roadmap.waves.wave1.tabs', done: true },
            { nameKey: 'roadmap.waves.wave1.commandPalette', done: true },
            { nameKey: 'roadmap.waves.wave1.snackbarStack', done: true },
            { nameKey: 'roadmap.waves.wave1.bracket', done: true }
        ]
    },
    {
        titleKey: 'roadmap.waves.wave2.title',
        items: [
            { nameKey: 'roadmap.waves.wave2.parallax', done: true },
            { nameKey: 'roadmap.waves.wave2.code', done: true },
            { nameKey: 'roadmap.waves.wave2.textareaRichtext', done: true },
            { nameKey: 'roadmap.waves.wave2.textFieldMask', done: true }
        ]
    },
    {
        titleKey: 'roadmap.waves.wave3.title',
        items: [
            { nameKey: 'roadmap.waves.wave3.nuxtModule', done: true },
            { nameKey: 'roadmap.waves.wave3.ssrSafety', done: true },
            { nameKey: 'roadmap.waves.wave3.monorepo', done: true }
        ]
    },
    {
        titleKey: 'roadmap.waves.wave4.title',
        items: [
            { nameKey: 'roadmap.waves.wave4.grid', done: true },
            { nameKey: 'roadmap.waves.wave4.masonry', done: true },
            { nameKey: 'roadmap.waves.wave4.blockquote', done: true },
            { nameKey: 'roadmap.waves.wave4.emptyState', done: true },
            { nameKey: 'roadmap.waves.wave4.clipboard', done: true },
            { nameKey: 'roadmap.waves.wave4.inlineEdit', done: true },
            { nameKey: 'roadmap.waves.wave4.numberFormat', done: true },
            { nameKey: 'roadmap.waves.wave4.qrCode', done: true },
            { nameKey: 'roadmap.waves.wave4.watermark', done: true },
            { nameKey: 'roadmap.waves.wave4.video', done: true },
            { nameKey: 'roadmap.waves.wave4.sound', done: true },
            { nameKey: 'roadmap.waves.wave4.calendar', done: true },
            { nameKey: 'roadmap.waves.wave4.chart', done: true },
            { nameKey: 'roadmap.waves.wave4.gradient', done: true },
            { nameKey: 'roadmap.waves.wave4.textMask', done: true }
        ]
    }
]

/**
 * Roadmap phases — sourced from CHANGELOG.md.
 * Items already delivered (Nuxt module v2.3.0, SSR useCssSupportClient v2.3.0)
 * have been removed from mid-term — they now live in Wave 3 above.
 * Only technical-public items remain: no KPI thresholds, no marketing tactics.
 */
export const ROADMAP_PHASES: IRoadmapPhase[] = [
    {
        id: 'short-term',
        eyebrowKey: 'roadmap.phases.shortTerm.eyebrow',
        titleKey: 'roadmap.phases.shortTerm.title',
        intent: 'primary',
        icon: 'mdi-rocket-launch-outline',
        items: [
            {
                titleKey: 'roadmap.phases.shortTerm.ci.title',
                descriptionKey: 'roadmap.phases.shortTerm.ci.description',
                icon: 'mdi-github',
                effortKey: 'roadmap.effort.large'
            },
            {
                titleKey: 'roadmap.phases.shortTerm.deployment.title',
                descriptionKey: 'roadmap.phases.shortTerm.deployment.description',
                icon: 'mdi-cloud-upload-outline',
                effortKey: 'roadmap.effort.medium'
            },
            {
                titleKey: 'roadmap.phases.shortTerm.playwright.title',
                descriptionKey: 'roadmap.phases.shortTerm.playwright.description',
                icon: 'mdi-test-tube',
                effortKey: 'roadmap.effort.xlarge'
            },
            {
                titleKey: 'roadmap.phases.shortTerm.a11yAudit.title',
                descriptionKey: 'roadmap.phases.shortTerm.a11yAudit.description',
                icon: 'mdi-human-wheelchair',
                effortKey: 'roadmap.effort.medium'
            },
            {
                titleKey: 'roadmap.phases.shortTerm.bundleSize.title',
                descriptionKey: 'roadmap.phases.shortTerm.bundleSize.description',
                icon: 'mdi-package-variant-closed',
                effortKey: 'roadmap.effort.small'
            }
        ]
    },
    {
        id: 'mid-term',
        eyebrowKey: 'roadmap.phases.midTerm.eyebrow',
        titleKey: 'roadmap.phases.midTerm.title',
        intent: 'warning',
        icon: 'mdi-layers-outline',
        items: [
            {
                titleKey: 'roadmap.phases.midTerm.v3.title',
                descriptionKey: 'roadmap.phases.midTerm.v3.description',
                icon: 'mdi-lightning-bolt-outline',
                effortKey: 'roadmap.effort.xlarge'
            },
            {
                titleKey: 'roadmap.phases.midTerm.accentColor.title',
                descriptionKey: 'roadmap.phases.midTerm.accentColor.description',
                icon: 'mdi-palette-outline',
                effortKey: 'roadmap.effort.medium'
            },
            {
                titleKey: 'roadmap.phases.midTerm.motionTokens.title',
                descriptionKey: 'roadmap.phases.midTerm.motionTokens.description',
                icon: 'mdi-animation-play-outline',
                effortKey: 'roadmap.effort.medium'
            },
            {
                titleKey: 'roadmap.phases.midTerm.vrt.title',
                descriptionKey: 'roadmap.phases.midTerm.vrt.description',
                icon: 'mdi-image-compare',
                effortKey: 'roadmap.effort.medium'
            },
            {
                titleKey: 'roadmap.phases.midTerm.turborepo.title',
                descriptionKey: 'roadmap.phases.midTerm.turborepo.description',
                icon: 'mdi-rocket-outline',
                effortKey: 'roadmap.effort.small'
            }
        ]
    },
    {
        id: 'long-term',
        eyebrowKey: 'roadmap.phases.longTerm.eyebrow',
        titleKey: 'roadmap.phases.longTerm.title',
        intent: 'info',
        icon: 'mdi-telescope',
        items: [
            {
                titleKey: 'roadmap.phases.longTerm.vapor.title',
                descriptionKey: 'roadmap.phases.longTerm.vapor.description',
                icon: 'mdi-speedometer',
                effortKey: 'roadmap.effort.xlarge'
            },
            {
                titleKey: 'roadmap.phases.longTerm.webComponents.title',
                descriptionKey: 'roadmap.phases.longTerm.webComponents.description',
                icon: 'mdi-web',
                effortKey: 'roadmap.effort.large'
            },
            {
                titleKey: 'roadmap.phases.longTerm.themeBuilder.title',
                descriptionKey: 'roadmap.phases.longTerm.themeBuilder.description',
                icon: 'mdi-palette-swatch-outline',
                effortKey: 'roadmap.effort.xlarge'
            }
        ]
    }
]

/**
 * Wave 4 — recently shipped components. Sourced from CHANGELOG.md [Unreleased].
 * All 13 components + gradient support + OrigamTextMask are delivered.
 */
export const ROADMAP_WAVE4_COMPONENTS: IRoadmapWave4Component[] = [
    { nameKey: 'roadmap.wave4Grid.grid.name', noteKey: 'roadmap.wave4Grid.grid.note', icon: 'mdi-grid' },
    { nameKey: 'roadmap.wave4Grid.masonry.name', noteKey: 'roadmap.wave4Grid.masonry.note', icon: 'mdi-view-quilt-outline' },
    { nameKey: 'roadmap.wave4Grid.blockquote.name', noteKey: 'roadmap.wave4Grid.blockquote.note', icon: 'mdi-format-quote-close' },
    { nameKey: 'roadmap.wave4Grid.emptyState.name', noteKey: 'roadmap.wave4Grid.emptyState.note', icon: 'mdi-inbox-outline' },
    { nameKey: 'roadmap.wave4Grid.clipboard.name', noteKey: 'roadmap.wave4Grid.clipboard.note', icon: 'mdi-clipboard-outline' },
    { nameKey: 'roadmap.wave4Grid.inlineEdit.name', noteKey: 'roadmap.wave4Grid.inlineEdit.note', icon: 'mdi-pencil-outline' },
    { nameKey: 'roadmap.wave4Grid.numberFormat.name', noteKey: 'roadmap.wave4Grid.numberFormat.note', icon: 'mdi-numeric' },
    { nameKey: 'roadmap.wave4Grid.qrCode.name', noteKey: 'roadmap.wave4Grid.qrCode.note', icon: 'mdi-qrcode' },
    { nameKey: 'roadmap.wave4Grid.watermark.name', noteKey: 'roadmap.wave4Grid.watermark.note', icon: 'mdi-watermark' },
    { nameKey: 'roadmap.wave4Grid.video.name', noteKey: 'roadmap.wave4Grid.video.note', icon: 'mdi-play-circle-outline' },
    { nameKey: 'roadmap.wave4Grid.sound.name', noteKey: 'roadmap.wave4Grid.sound.note', icon: 'mdi-volume-high' },
    { nameKey: 'roadmap.wave4Grid.calendar.name', noteKey: 'roadmap.wave4Grid.calendar.note', icon: 'mdi-calendar-outline' },
    { nameKey: 'roadmap.wave4Grid.chart.name', noteKey: 'roadmap.wave4Grid.chart.note', icon: 'mdi-chart-line' },
    { nameKey: 'roadmap.wave4Grid.gradient.name', noteKey: 'roadmap.wave4Grid.gradient.note', icon: 'mdi-gradient-horizontal' },
    { nameKey: 'roadmap.wave4Grid.textMask.name', noteKey: 'roadmap.wave4Grid.textMask.note', icon: 'mdi-text-box-outline' }
]
