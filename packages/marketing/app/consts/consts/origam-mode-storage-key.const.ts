import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_MODE_STORAGE_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-mode-storage-key',
    name: 'ORIGAM_MODE_STORAGE_KEY',
    category: 'Theme & Mode',
    descriptionKey: 'consts.catalog.origam_mode_storage_key.description',
    descriptionFallback: 'localStorage / cookie key under which the user-selected color mode is persisted across page loads.',
    definition: `export const ORIGAM_MODE_STORAGE_KEY = 'origam-mode'`,
    value: `'origam-mode'`,
    usedBy: [
        { name: 'useTheme' },
        { name: 'ORIGAM_NUXT_DEFAULT_MODE_COOKIE_NAME' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_mode_storage_key.example',
            titleFallback: 'Reading the persisted mode manually',
            code: `import { ORIGAM_MODE_STORAGE_KEY } from 'origam'

const savedMode = localStorage.getItem(ORIGAM_MODE_STORAGE_KEY) // 'light' | 'dark' | null`,
            lang: 'typescript',
        },
    ],
}
