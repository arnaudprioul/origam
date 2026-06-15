import type { CSSProperties } from 'vue'
import type {
    IRoadmapStatusItem,
    IRoadmapWave,
    IRoadmapPhase,
    IRoadmapFutureComponent
} from '~/interfaces/roadmap.interface'

/**
 * Hero badge CSS vars — same pattern as why-origam.
 */
export const ROADMAP_HERO_BADGE_VARS: CSSProperties = {
    '--origam-chip---background-color': 'transparent'
} as CSSProperties

/**
 * Current status items — sourced from ROADMAP.md § "Où on en est (post-2.2.1)".
 */
export const ROADMAP_STATUS_ITEMS: IRoadmapStatusItem[] = [
    { labelKey: 'roadmap.status.npmPublished', done: true },
    { labelKey: 'roadmap.status.preDelivery', done: true },
    { labelKey: 'roadmap.status.readmeChangelog', done: true },
    { labelKey: 'roadmap.status.monorepo', done: true },
    { labelKey: 'roadmap.status.docOnline', done: false },
    { labelKey: 'roadmap.status.ci', done: false },
    { labelKey: 'roadmap.status.playwrightCoverage', done: false },
    { labelKey: 'roadmap.status.bundleMonitoring', done: false }
]

/**
 * Delivered waves — sourced from ROADMAP.md § Waves 1/2/3.
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
    }
]

/**
 * Roadmap phases — sourced from ROADMAP.md §2.1 / §2.2 / §2.3.
 * Only technical-public items: no KPI thresholds, no bus-factor mentions,
 * no marketing tactics (dev.to, Show HN, newsletters, personas).
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
                titleKey: 'roadmap.phases.midTerm.nuxtModule.title',
                descriptionKey: 'roadmap.phases.midTerm.nuxtModule.description',
                icon: 'mdi-nuxt',
                effortKey: 'roadmap.effort.large'
            },
            {
                titleKey: 'roadmap.phases.midTerm.ssrCssSupport.title',
                descriptionKey: 'roadmap.phases.midTerm.ssrCssSupport.description',
                icon: 'mdi-server-outline',
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
 * Wave 4 — future components. Sourced from ROADMAP.md §2.2 Wave 4.
 */
export const ROADMAP_FUTURE_COMPONENTS: IRoadmapFutureComponent[] = [
    { nameKey: 'roadmap.wave4.grid.name', noteKey: 'roadmap.wave4.grid.note', effortKey: 'roadmap.effort.small', icon: 'mdi-grid' },
    { nameKey: 'roadmap.wave4.masonry.name', noteKey: 'roadmap.wave4.masonry.note', effortKey: 'roadmap.effort.medium', icon: 'mdi-view-quilt-outline' },
    { nameKey: 'roadmap.wave4.blockquote.name', noteKey: 'roadmap.wave4.blockquote.note', effortKey: 'roadmap.effort.small', icon: 'mdi-format-quote-close' },
    { nameKey: 'roadmap.wave4.emptyState.name', noteKey: 'roadmap.wave4.emptyState.note', effortKey: 'roadmap.effort.small', icon: 'mdi-inbox-outline' },
    { nameKey: 'roadmap.wave4.clipboard.name', noteKey: 'roadmap.wave4.clipboard.note', effortKey: 'roadmap.effort.small', icon: 'mdi-clipboard-outline' },
    { nameKey: 'roadmap.wave4.inlineEdit.name', noteKey: 'roadmap.wave4.inlineEdit.note', effortKey: 'roadmap.effort.medium', icon: 'mdi-pencil-outline' },
    { nameKey: 'roadmap.wave4.numberFormat.name', noteKey: 'roadmap.wave4.numberFormat.note', effortKey: 'roadmap.effort.small', icon: 'mdi-numeric' },
    { nameKey: 'roadmap.wave4.qrCode.name', noteKey: 'roadmap.wave4.qrCode.note', effortKey: 'roadmap.effort.medium', icon: 'mdi-qrcode' },
    { nameKey: 'roadmap.wave4.watermark.name', noteKey: 'roadmap.wave4.watermark.note', effortKey: 'roadmap.effort.small', icon: 'mdi-watermark' },
    { nameKey: 'roadmap.wave4.video.name', noteKey: 'roadmap.wave4.video.note', effortKey: 'roadmap.effort.medium', icon: 'mdi-play-circle-outline' },
    { nameKey: 'roadmap.wave4.sound.name', noteKey: 'roadmap.wave4.sound.note', effortKey: 'roadmap.effort.medium', icon: 'mdi-volume-high' },
    { nameKey: 'roadmap.wave4.calendar.name', noteKey: 'roadmap.wave4.calendar.note', effortKey: 'roadmap.effort.xlarge', icon: 'mdi-calendar-outline' },
    { nameKey: 'roadmap.wave4.chart.name', noteKey: 'roadmap.wave4.chart.note', effortKey: 'roadmap.effort.xlarge', icon: 'mdi-chart-line' }
]
