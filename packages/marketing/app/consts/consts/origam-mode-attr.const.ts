import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_MODE_ATTR_CONST_DOC: IConstDoc = {
    slug: 'origam-mode-attr',
    name: 'ORIGAM_MODE_ATTR',
    category: 'Theme & Mode',
    descriptionKey: 'consts.catalog.origam_mode_attr.description',
    descriptionFallback: 'HTML attribute name set on the <html> element to reflect the active color mode. Consumers should read and write this attribute to synchronise mode state.',
    definition: `export const ORIGAM_MODE_ATTR = 'data-mode'`,
    value: `'data-mode'`,
    usedBy: [
        { name: 'useTheme' },
        { name: 'plugin.server (Nuxt)' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_mode_attr.example',
            titleFallback: 'Reading the active mode from the DOM',
            code: `import { ORIGAM_MODE_ATTR } from 'origam'

const mode = document.documentElement.getAttribute(ORIGAM_MODE_ATTR) // 'light' | 'dark'`,
            lang: 'typescript',
        },
    ],
}
