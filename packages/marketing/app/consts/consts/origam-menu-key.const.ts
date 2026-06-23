import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_MENU_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-menu-key',
    name: 'ORIGAM_MENU_KEY',
    category: 'Provide / Inject',
    descriptionKey: 'consts.catalog.origam_menu_key.description',
    descriptionFallback: 'Vue injection key (InjectionKey<IMenuProvide>) used by OrigamMenu to provide its context to descendant activators.',
    definition: `export const ORIGAM_MENU_KEY: InjectionKey<IMenuProvide> = Symbol.for('origam:menu')`,
    value: `Symbol.for('origam:menu')`,
    usedBy: [
        { name: 'OrigamMenu', slug: 'menu' },
        { name: 'useActivator' },
    ],
    sourceFile: 'packages/ds/src/consts/Menu/menu.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_menu_key.example',
            titleFallback: 'Injecting the menu context in a custom activator',
            code: `import { inject } from 'vue'
import { ORIGAM_MENU_KEY } from 'origam'

const menu = inject(ORIGAM_MENU_KEY)
menu?.open()`,
            lang: 'typescript',
        },
    ],
}
