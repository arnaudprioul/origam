import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_MODE_AUTO_CONST_DOC: IConstDoc = {
    slug: 'origam-mode-auto',
    name: 'ORIGAM_MODE_AUTO',
    category: 'Theme & Mode',
    descriptionKey: 'consts.catalog.origam_mode_auto.description',
    descriptionFallback: 'The sentinel string for the automatic color-mode: the DS defers to prefers-color-scheme and does not force light or dark.',
    definition: `export const ORIGAM_MODE_AUTO = 'auto'`,
    value: `'auto'`,
    usedBy: [
        { name: 'useTheme' },
        { name: 'ORIGAM_NUXT_DEFAULT_MODE' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_mode_auto.example',
            titleFallback: 'Resetting the mode to automatic',
            code: `import { ORIGAM_MODE_AUTO } from 'origam'
import { useTheme } from 'origam'

const { setMode } = useTheme()
setMode(ORIGAM_MODE_AUTO) // follows prefers-color-scheme`,
            lang: 'typescript',
        },
    ],
}
