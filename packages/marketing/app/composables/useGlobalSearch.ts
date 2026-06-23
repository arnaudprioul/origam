/**
 * useGlobalSearch — index global pour la command palette du header.
 *
 * Construit un tableau ICommand depuis les catalogues référentiels :
 *   - composants     → /components/{slug}
 *   - composables    → /composables/{slug}
 *   - directives     → /directives/{slug}
 *   - types/enums    → /types/{slug}
 *   - interfaces     → /interfaces/{slug}
 *   - pages statiques (installation, changelog, roadmap, wireframe, theming, figma-plugin)
 *
 * Le tableau est statique (computed une seule fois au montage) : pas de
 * requête réseau, tout vit déjà dans les const files.
 */
import { computed } from 'vue'
import type { ICommand } from 'origam/interfaces'

import { COMPONENTS_CATALOG } from '~/consts/components-catalog.const'
import { COMPOSABLES_CATALOG } from '~/consts/composables-catalog.const'
import { DIRECTIVES_CATALOG } from '~/consts/directives-catalog.const'
import { TYPES_CATALOG } from '~/consts/types-catalog.const'

const STATIC_PAGES: ICommand[] = [
    {
        id: 'page-installation',
        label: 'Installation',
        description: 'Getting started — install origam in your project',
        icon: 'mdi-download-outline',
        group: 'Pages',
        keywords: ['install', 'setup', 'npm', 'pnpm', 'yarn', 'getting-started'],
        perform: () => undefined
    },
    {
        id: 'page-changelog',
        label: 'Changelog',
        description: 'Release history and migration notes',
        icon: 'mdi-history',
        group: 'Pages',
        keywords: ['release', 'version', 'update', 'migration', 'changes'],
        perform: () => undefined
    },
    {
        id: 'page-roadmap',
        label: 'Roadmap',
        description: 'Upcoming features and milestones',
        icon: 'mdi-map-marker-path',
        group: 'Pages',
        keywords: ['future', 'plan', 'upcoming', 'milestone', 'feature'],
        perform: () => undefined
    },
    {
        id: 'page-wireframe',
        label: 'Wireframe',
        description: 'Design wireframe & component previews',
        icon: 'mdi-vector-square',
        group: 'Pages',
        keywords: ['design', 'preview', 'mockup', 'layout'],
        perform: () => undefined
    },
    {
        id: 'page-theming',
        label: 'Theming',
        description: 'Visual theme builder — customise design tokens',
        icon: 'mdi-palette-outline',
        group: 'Pages',
        keywords: ['theme', 'token', 'color', 'brand', 'customize'],
        perform: () => undefined
    },
    {
        id: 'page-figma-plugin',
        label: 'Figma plugin',
        description: 'Sync design tokens between Figma and origam',
        icon: 'mdi-vector-bezier',
        group: 'Pages',
        keywords: ['figma', 'design', 'plugin', 'sync', 'tokens'],
        perform: () => undefined
    },
    {
        id: 'page-why-origam',
        label: 'Why origam?',
        description: 'Design decisions and philosophy',
        icon: 'mdi-help-circle-outline',
        group: 'Pages',
        keywords: ['why', 'philosophy', 'decision', 'compare'],
        perform: () => undefined
    }
]

const STATIC_PAGE_HREFS: Record<string, string> = {
    'page-installation': '/installation',
    'page-changelog': '/changelog',
    'page-roadmap': '/roadmap',
    'page-wireframe': '/wireframe',
    'page-theming': '/theming',
    'page-figma-plugin': '/figma-plugin',
    'page-why-origam': '/why-origam'
}

export function useGlobalSearch () {
    const commands = computed<ICommand[]>(() => {
        const list: ICommand[] = []

        for (const entry of COMPONENTS_CATALOG) {
            if (entry.parentSlug) continue

            list.push({
                id: `component-${entry.slug}`,
                label: entry.name,
                description: entry.descriptionFallback,
                icon: entry.icon ?? 'mdi-puzzle-outline',
                group: 'Components',
                keywords: [entry.slug, entry.category?.toLowerCase() ?? '', 'component', 'origam'],
                perform: () => undefined
            })
        }

        for (const entry of COMPOSABLES_CATALOG) {
            list.push({
                id: `composable-${entry.slug}`,
                label: entry.name,
                description: entry.descriptionFallback,
                icon: entry.icon ?? 'mdi-function-variant',
                group: 'Composables',
                keywords: [entry.slug, entry.domain?.toLowerCase() ?? '', 'composable', 'hook'],
                perform: () => undefined
            })
        }

        for (const entry of DIRECTIVES_CATALOG) {
            list.push({
                id: `directive-${entry.slug}`,
                label: entry.name,
                description: entry.descriptionFallback,
                icon: entry.icon ?? 'mdi-code-tags',
                group: 'Directives',
                keywords: [entry.slug, 'directive', 'v-'],
                perform: () => undefined
            })
        }

        for (const entry of TYPES_CATALOG) {
            list.push({
                id: `type-${entry.slug}`,
                label: entry.name,
                description: entry.descriptionFallback,
                icon: entry.icon ?? 'mdi-alpha-t-box-outline',
                group: entry.kind === 'enum' ? 'Enums' : 'Types',
                keywords: [entry.slug, entry.category?.toLowerCase() ?? '', 'type', 'typescript'],
                perform: () => undefined
            })
        }

        for (const page of STATIC_PAGES) {
            list.push(page)
        }

        return list
    })

    function getHref (commandId: string): string {
        if (commandId.startsWith('component-')) {
            return `/components/${commandId.replace('component-', '')}`
        }

        if (commandId.startsWith('composable-')) {
            return `/composables/${commandId.replace('composable-', '')}`
        }

        if (commandId.startsWith('directive-')) {
            return `/directives/${commandId.replace('directive-', '')}`
        }

        if (commandId.startsWith('type-')) {
            return `/types/${commandId.replace('type-', '')}`
        }

        return STATIC_PAGE_HREFS[commandId] ?? '/'
    }

    return {
        commands,
        getHref
    }
}
