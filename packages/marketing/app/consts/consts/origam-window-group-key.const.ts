import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_WINDOW_GROUP_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-window-group-key',
    name: 'ORIGAM_WINDOW_GROUP_KEY',
    category: 'Navigation',
    descriptionKey: 'consts.catalog.origam_window_group_key.description',
    descriptionFallback: 'Vue injection key (Symbol) used by OrigamWindow to expose its IGroupItemProvide context to group-aware children (e.g. indicator dots or external navigation controls) so they can read the active item state.',
    definition: `export const ORIGAM_WINDOW_GROUP_KEY: InjectionKey<IGroupItemProvide> = Symbol.for('origam:window-group')`,
    value: "Symbol.for('origam:window-group')",
    usedBy: [
        { name: 'OrigamWindow', slug: 'origam-window' },
    ],
    sourceFile: 'packages/ds/src/consts/Window/window.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_window_group_key.example',
            titleFallback: 'Injecting the window group context in a custom indicator',
            code: `import { inject } from 'vue'
import { ORIGAM_WINDOW_GROUP_KEY } from 'origam'

const group = inject(ORIGAM_WINDOW_GROUP_KEY)`,
            lang: 'typescript',
        },
    ],
}
