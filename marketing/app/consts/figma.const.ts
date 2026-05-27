import type { IFigmaFeature, IFigmaRequirement, IFigmaDownloadAsset } from '~/interfaces/figma.interface'

/**
 * Origam DS Sync — Figma plugin.
 * Source: figma-plugin/ in the origam monorepo.
 */
export const FIGMA_PLUGIN_NAME = 'Origam DS Sync'
export const FIGMA_PLUGIN_ID = 'origam-ds-sync'
export const FIGMA_PLUGIN_VERSION = '0.1.0'
export const FIGMA_PLUGIN_REPO_PATH = '/figma-plugin'

export const FIGMA_FEATURES: ReadonlyArray<IFigmaFeature> = [
    {
        id: 'component-sets',
        icon: 'mdi:shape-outline',
        titleKey: 'figma.features.componentSets.title',
        titleFallback: '14 component sets',
        bodyKey: 'figma.features.componentSets.body',
        bodyFallback: 'The most-used origam components rendered as native Figma COMPONENT_SETs — variants, states, sizes ready to drop in a frame.'
    },
    {
        id: 'tokens-studio-export',
        icon: 'mdi:palette-outline',
        titleKey: 'figma.features.tokensStudio.title',
        titleFallback: 'Tokens Studio round-trip',
        bodyKey: 'figma.features.tokensStudio.body',
        bodyFallback: 'Export your design changes back to the repo as Tokens Studio JSON. No manual copy/paste, no token drift.'
    },
    {
        id: 'scss-export',
        icon: 'mdi:language-css3',
        titleKey: 'figma.features.scssExport.title',
        titleFallback: 'SCSS export',
        bodyKey: 'figma.features.scssExport.body',
        bodyFallback: 'Generate origam-compatible SCSS variables from your Figma file — same naming convention as the runtime tokens.'
    },
    {
        id: 'figma-variables',
        icon: 'mdi:swap-horizontal',
        titleKey: 'figma.features.variables.title',
        titleFallback: 'Figma Variables aware',
        bodyKey: 'figma.features.variables.body',
        bodyFallback: 'Consumes Tokens Studio variables already imported in your file — does not duplicate or override them.'
    }
] as const

export const FIGMA_REQUIREMENTS: ReadonlyArray<IFigmaRequirement> = [
    {
        id: 'figma-desktop',
        labelKey: 'figma.requirements.desktop',
        labelFallback: 'Figma desktop app (web client cannot load local plugins)'
    },
    {
        id: 'tokens-studio',
        labelKey: 'figma.requirements.tokensStudio',
        labelFallback: 'Tokens Studio for Figma plugin (free)',
        url: 'https://docs.tokens.studio/'
    },
    {
        id: 'node-22',
        labelKey: 'figma.requirements.node',
        labelFallback: 'Node 22+ for building the plugin from source'
    }
] as const

export const FIGMA_DOWNLOAD_ASSETS: ReadonlyArray<IFigmaDownloadAsset> = [
    {
        id: 'github-source',
        labelKey: 'figma.download.source',
        labelFallback: 'Source on GitHub',
        url: 'https://github.com/arnaudprioul/origam/tree/develop/figma-plugin',
        icon: 'mdi:github'
    },
    {
        id: 'readme',
        labelKey: 'figma.download.readme',
        labelFallback: 'Installation guide',
        url: 'https://github.com/arnaudprioul/origam/blob/develop/figma-plugin/README.md',
        icon: 'mdi:book-open-outline'
    },
    {
        id: 'changelog',
        labelKey: 'figma.download.changelog',
        labelFallback: 'Plugin changelog',
        url: 'https://github.com/arnaudprioul/origam/blob/develop/figma-plugin/CHANGELOG.md',
        icon: 'mdi:history'
    }
] as const
