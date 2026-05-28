import type { INavLink } from '~/interfaces/nav.interface'

/*
 * Top-level marketing nav, structured like a typical design-system
 * site (Vuetify, Tailwind UI, daisyUI). Each entry is either a plain
 * link (`href` only) or a dropdown header (`children`). A dropdown
 * header MAY still have an `href` so that clicking the label itself
 * navigates to the index, while the chevron opens the children panel.
 */

export const NAV_LINKS: ReadonlyArray<INavLink> = [
    {
        id: 'docs',
        labelKey: 'nav.docs',
        labelFallback: 'Docs',
        href: '/docs',
        icon: 'mdi:book-open-variant-outline',
        children: [
            {
                id: 'docs-getting-started',
                labelKey: 'nav.docsItems.gettingStarted',
                labelFallback: 'Getting started',
                descKey: 'nav.docsItems.gettingStartedDesc',
                descFallback: 'Install origam in a Vue 3 app in 30 seconds.',
                href: '/docs/getting-started',
                icon: 'mdi:rocket-launch-outline'
            },
            {
                id: 'docs-why',
                labelKey: 'nav.docsItems.why',
                labelFallback: 'Why origam',
                descKey: 'nav.docsItems.whyDesc',
                descFallback: '95 components, 29 charts, full a11y, CSS-first.',
                href: '/docs/why',
                icon: 'mdi:sparkles'
            },
            {
                id: 'docs-installation',
                labelKey: 'nav.docsItems.installation',
                labelFallback: 'Installation',
                descKey: 'nav.docsItems.installationDesc',
                descFallback: 'npm, pnpm, yarn, Nuxt module.',
                href: '/docs/installation',
                icon: 'mdi:package-variant-closed'
            },
            {
                id: 'docs-theming',
                labelKey: 'nav.docsItems.theming',
                labelFallback: 'Theming',
                descKey: 'nav.docsItems.themingDesc',
                descFallback: 'Design tokens, multi-theme, brand variants.',
                href: '/docs/theming',
                icon: 'mdi:palette-outline'
            },
            {
                id: 'docs-migration',
                labelKey: 'nav.docsItems.migration',
                labelFallback: 'Migration',
                descKey: 'nav.docsItems.migrationDesc',
                descFallback: 'Upgrade from v1 to v2.',
                href: '/docs/migration',
                icon: 'mdi:arrow-up-bold-circle-outline'
            }
        ]
    },
    {
        id: 'components',
        labelKey: 'nav.components',
        labelFallback: 'Components',
        href: '/components',
        icon: 'mdi:view-grid-outline',
        children: [
            {
                id: 'components-browse',
                labelKey: 'nav.componentsItems.browse',
                labelFallback: 'Browse all',
                descKey: 'nav.componentsItems.browseDesc',
                descFallback: '95 components, filterable by category.',
                href: '/components',
                icon: 'mdi:view-grid-outline'
            },
            {
                id: 'components-stories',
                labelKey: 'nav.componentsItems.stories',
                labelFallback: 'Stories',
                descKey: 'nav.componentsItems.storiesDesc',
                descFallback: 'Histoire interactive playgrounds for every component.',
                href: '/stories',
                icon: 'mdi:flask-outline'
            },
            {
                id: 'components-charts',
                labelKey: 'nav.componentsItems.charts',
                labelFallback: 'Chart primitives',
                descKey: 'nav.componentsItems.chartsDesc',
                descFallback: '29 chart types — line, area, bar, donut, …',
                href: '/components?category=charts',
                icon: 'mdi:chart-line'
            },
            {
                id: 'components-figma',
                labelKey: 'nav.componentsItems.figma',
                labelFallback: 'Figma plugin',
                descKey: 'nav.componentsItems.figmaDesc',
                descFallback: 'Sync tokens & components both ways.',
                href: '/integrations/figma',
                icon: 'mdi:vector-square'
            }
        ]
    },
    {
        id: 'playground',
        labelKey: 'nav.playground',
        labelFallback: 'Playground',
        href: '/playground',
        icon: 'mdi:play-circle-outline'
    },
    {
        id: 'changelog',
        labelKey: 'nav.changelog',
        labelFallback: 'Changelog',
        href: '/changelog',
        icon: 'mdi:history'
    },
    {
        id: 'blog',
        labelKey: 'nav.blog',
        labelFallback: 'Blog',
        href: '/blog',
        icon: 'mdi:post-outline'
    }
] as const
