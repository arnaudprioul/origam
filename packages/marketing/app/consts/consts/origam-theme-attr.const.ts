import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_THEME_ATTR_CONST_DOC: IConstDoc = {
    slug: 'origam-theme-attr',
    name: 'ORIGAM_THEME_ATTR',
    category: 'Theme',
    descriptionKey: 'consts.catalog.origam_theme_attr.description',
    descriptionFallback: 'HTML attribute name written on the root element to activate a named theme. Setting data-theme="dark" on <html> switches the active token set.',
    definition: `export const ORIGAM_THEME_ATTR = 'data-theme'`,
    value: "'data-theme'",
    usedBy: [
        { name: 'useTheme' },
        { name: 'OrigamThemeProvider' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_theme_attr.example',
            titleFallback: 'Applying a theme attribute to the document root',
            code: `import { ORIGAM_THEME_ATTR } from 'origam'

document.documentElement.setAttribute(ORIGAM_THEME_ATTR, 'dark')`,
            lang: 'typescript',
        },
    ],
}
