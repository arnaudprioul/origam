import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_THEME_DARK_CONST_DOC: IConstDoc = {
    slug: 'origam-theme-dark',
    name: 'ORIGAM_THEME_DARK',
    category: 'Theme',
    descriptionKey: 'consts.catalog.origam_theme_dark.description',
    descriptionFallback: 'Name of the built-in dark theme. Pass this value to useTheme().setTheme() or to the data-theme attribute to switch the entire app to dark mode.',
    definition: `export const ORIGAM_THEME_DARK = 'dark'`,
    value: "'dark'",
    usedBy: [
        { name: 'useTheme' },
        { name: 'OrigamThemeProvider' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_theme_dark.example',
            titleFallback: 'Switching the app to dark theme',
            code: `import { ORIGAM_THEME_DARK } from 'origam'
import { useTheme } from 'origam'

const { setTheme } = useTheme()
setTheme(ORIGAM_THEME_DARK)`,
            lang: 'typescript',
        },
    ],
}
