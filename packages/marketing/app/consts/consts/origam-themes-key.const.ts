import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_THEMES_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-themes-key',
    name: 'ORIGAM_THEMES_KEY',
    category: 'Theme',
    descriptionKey: 'consts.catalog.origam_themes_key.description',
    descriptionFallback: 'Vue injection key (Symbol) that carries the list of brand themes installed via createOrigam({ themes }). Components read the installed theme registry through useInstalledThemes() which resolves this key.',
    definition: `export const ORIGAM_THEMES_KEY: InjectionKey<TInstalledThemes> = Symbol.for('origam:themes')`,
    value: "Symbol.for('origam:themes')",
    usedBy: [
        { name: 'createOrigam' },
        { name: 'useInstalledThemes' },
        { name: 'useTheme' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_themes_key.example',
            titleFallback: 'Injecting the installed themes registry in a custom component',
            code: `import { inject } from 'vue'
import { ORIGAM_THEMES_KEY } from 'origam'

const themes = inject(ORIGAM_THEMES_KEY)
// Prefer useInstalledThemes() for day-to-day use`,
            lang: 'typescript',
        },
    ],
}
