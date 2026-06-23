import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_THEME_LIGHT_CONST_DOC: IConstDoc = {
    slug: 'origam-theme-light',
    name: 'ORIGAM_THEME_LIGHT',
    category: 'Theme',
    descriptionKey: 'consts.catalog.origam_theme_light.description',
    descriptionFallback: 'Name of the built-in light theme. Pass this value to useTheme().setTheme() or to the data-theme attribute to force the app into light mode regardless of OS preference.',
    definition: `export const ORIGAM_THEME_LIGHT = 'light'`,
    value: "'light'",
    usedBy: [
        { name: 'useTheme' },
        { name: 'OrigamThemeProvider' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_theme_light.example',
            titleFallback: 'Switching the app to light theme',
            code: `import { ORIGAM_THEME_LIGHT } from 'origam'
import { useTheme } from 'origam'

const { setTheme } = useTheme()
setTheme(ORIGAM_THEME_LIGHT)`,
            lang: 'typescript',
        },
    ],
}
