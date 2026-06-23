import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const INSTALLED_THEMES_FROM_LIST_UTIL_DOC: IUtilDoc = {
    slug: 'installed-themes-from-list',
    name: 'installedThemesFromList',
    category: 'Theme',
    icon: 'mdi-palette-swatch-outline',
    descriptionKey: 'utils.catalog.installed_themes_from_list.description',
    descriptionFallback: 'Derives the TInstalledThemes summary from the raw IOrigamTheme[] array passed to createOrigam(). Groups themes by name, collects available modes (light/dark), and extracts UI metadata (label, description, swatch). Pure — safe to call server-side.',
    signature: 'function installedThemesFromList(themes: IOrigamTheme[]): TInstalledThemes',
    params: [
        {
            name: 'themes',
            type: 'IOrigamTheme[]',
            required: true,
            descriptionKey: 'utils.detail.installed_themes_from_list.param_themes',
            descriptionFallback: 'The full list of theme objects registered with createOrigam(). Each entry is a semantic variant of a named brand. Entries without a name (root-scoped themes) are ignored.',
        },
    ],
    returns: {
        type: 'TInstalledThemes',
        descriptionKey: 'utils.detail.installed_themes_from_list.returns',
        descriptionFallback: 'An ordered array of TInstalledTheme objects — one per unique brand name — each carrying the available modes and aggregated UI metadata.',
    },
    sourceFile: 'packages/ds/src/utils/Theme/apply-theme.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.installed_themes_from_list.example_basic',
            titleFallback: 'Collect installed brand themes',
            code: `import { installedThemesFromList } from 'origam'

const themes = installedThemesFromList(myOrigamInstance.themes)
// → [{ name: 'brand-x', modes: ['light', 'dark'], label: 'Brand X', … }]`,
            lang: 'typescript',
        },
    ],
    related: ['apply-theme', 'apply-themes'],
}
