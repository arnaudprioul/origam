import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_TREEVIEW_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-treeview-key',
    name: 'ORIGAM_TREEVIEW_KEY',
    category: 'Data Display',
    descriptionKey: 'consts.catalog.origam_treeview_key.description',
    descriptionFallback: 'Vue injection key (Symbol) shared by OrigamTreeview (root provider) and nested OrigamTreeviewItem components to propagate selection mode, expand state, and item registration across arbitrary nesting depth.',
    definition: `export const ORIGAM_TREEVIEW_KEY: InjectionKey<ITreeviewProvide> = Symbol.for('origam:treeview')`,
    value: "Symbol.for('origam:treeview')",
    usedBy: [
        { name: 'OrigamTreeview', slug: 'origam-treeview' },
        { name: 'OrigamTreeviewItem', slug: 'origam-treeview-item' },
    ],
    sourceFile: 'packages/ds/src/consts/Treeview/treeview.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_treeview_key.example',
            titleFallback: 'Injecting the treeview context in a custom item',
            code: `import { inject } from 'vue'
import { ORIGAM_TREEVIEW_KEY } from 'origam'

const treeview = inject(ORIGAM_TREEVIEW_KEY)`,
            lang: 'typescript',
        },
    ],
}
