import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_WINDOW_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-window-key',
    name: 'ORIGAM_WINDOW_KEY',
    category: 'Navigation',
    descriptionKey: 'consts.catalog.origam_window_key.description',
    descriptionFallback: 'Vue injection key (Symbol) shared by OrigamWindow (provider) and its item children so they can register themselves, query the active index, and respond to swipe / transition events.',
    definition: `export const ORIGAM_WINDOW_KEY: InjectionKey<IWindowProvide> = Symbol.for('origam:window')`,
    value: "Symbol.for('origam:window')",
    usedBy: [
        { name: 'OrigamWindow', slug: 'origam-window' },
        { name: 'OrigamWindowItem', slug: 'origam-window-item' },
    ],
    sourceFile: 'packages/ds/src/consts/Window/window.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_window_key.example',
            titleFallback: 'Injecting the window context in a custom window item',
            code: `import { inject } from 'vue'
import { ORIGAM_WINDOW_KEY } from 'origam'

const window = inject(ORIGAM_WINDOW_KEY)`,
            lang: 'typescript',
        },
    ],
}
