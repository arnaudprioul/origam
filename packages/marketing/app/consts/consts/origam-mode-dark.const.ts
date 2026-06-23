import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_MODE_DARK_CONST_DOC: IConstDoc = {
    slug: 'origam-mode-dark',
    name: 'ORIGAM_MODE_DARK',
    category: 'Theme & Mode',
    descriptionKey: 'consts.catalog.origam_mode_dark.description',
    descriptionFallback: 'Literal value for the dark color mode. Passed to setMode() or written to the data-mode attribute to force dark rendering regardless of system preference.',
    definition: `export const ORIGAM_MODE_DARK = 'dark'`,
    value: `'dark'`,
    usedBy: [
        { name: 'useTheme' },
        { name: 'ORIGAM_NUXT_DEFAULT_MODES' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_mode_dark.example',
            titleFallback: 'Forcing dark mode',
            code: `import { ORIGAM_MODE_DARK } from 'origam'
import { useTheme } from 'origam'

const { setMode } = useTheme()
setMode(ORIGAM_MODE_DARK)`,
            lang: 'typescript',
        },
    ],
}
