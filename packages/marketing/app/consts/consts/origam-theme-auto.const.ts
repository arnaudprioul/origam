import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_THEME_AUTO_CONST_DOC: IConstDoc = {
    slug: 'origam-theme-auto',
    name: 'ORIGAM_THEME_AUTO',
    category: 'Theme',
    descriptionKey: 'consts.catalog.origam_theme_auto.description',
    descriptionFallback: 'Sentinel value for the automatic theme mode. When the active theme is set to "auto", Origam follows the OS prefers-color-scheme preference instead of an explicit theme name.',
    definition: `export const ORIGAM_THEME_AUTO = 'auto'`,
    value: "'auto'",
    usedBy: [
        { name: 'useTheme' },
        { name: 'OrigamThemeProvider' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_theme_auto.example',
            titleFallback: 'Resetting to auto OS-preference mode',
            code: `import { ORIGAM_THEME_AUTO } from 'origam'
import { useTheme } from 'origam'

const { setTheme } = useTheme()
setTheme(ORIGAM_THEME_AUTO) // follows prefers-color-scheme`,
            lang: 'typescript',
        },
    ],
}
