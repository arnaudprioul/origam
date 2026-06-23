import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_MODE_LIGHT_CONST_DOC: IConstDoc = {
    slug: 'origam-mode-light',
    name: 'ORIGAM_MODE_LIGHT',
    category: 'Theme & Mode',
    descriptionKey: 'consts.catalog.origam_mode_light.description',
    descriptionFallback: 'Literal value for the light color mode. Passed to setMode() or written to the data-mode attribute to force light rendering regardless of system preference.',
    definition: `export const ORIGAM_MODE_LIGHT = 'light'`,
    value: `'light'`,
    usedBy: [
        { name: 'useTheme' },
        { name: 'ORIGAM_NUXT_DEFAULT_MODES' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_mode_light.example',
            titleFallback: 'Forcing light mode',
            code: `import { ORIGAM_MODE_LIGHT } from 'origam'
import { useTheme } from 'origam'

const { setMode } = useTheme()
setMode(ORIGAM_MODE_LIGHT)`,
            lang: 'typescript',
        },
    ],
}
