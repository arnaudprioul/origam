import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_THEME_STORAGE_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-theme-storage-key',
    name: 'ORIGAM_THEME_STORAGE_KEY',
    category: 'Theme',
    descriptionKey: 'consts.catalog.origam_theme_storage_key.description',
    descriptionFallback: 'localStorage key under which the user\'s chosen theme name is persisted across page reloads. useTheme() reads and writes this key automatically.',
    definition: `export const ORIGAM_THEME_STORAGE_KEY = 'origam-theme'`,
    value: "'origam-theme'",
    usedBy: [
        { name: 'useTheme' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_theme_storage_key.example',
            titleFallback: 'Reading the persisted theme directly from localStorage',
            code: `import { ORIGAM_THEME_STORAGE_KEY } from 'origam'

const savedTheme = localStorage.getItem(ORIGAM_THEME_STORAGE_KEY) // 'dark' | 'light' | null`,
            lang: 'typescript',
        },
    ],
}
