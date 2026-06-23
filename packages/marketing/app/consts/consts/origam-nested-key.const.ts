import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_NESTED_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-nested-key',
    name: 'ORIGAM_NESTED_KEY',
    category: 'Provide / Inject',
    descriptionKey: 'consts.catalog.origam_nested_key.description',
    descriptionFallback: 'Vue injection key (InjectionKey<TNestedProvide>) that carries the parent–child nesting context (open/select strategies) for tree-structured components like List, Treeview and ExpansionPanel.',
    definition: `export const ORIGAM_NESTED_KEY: InjectionKey<TNestedProvide> = Symbol.for('origam:nested')`,
    value: `Symbol.for('origam:nested')`,
    usedBy: [
        { name: 'useNested' },
        { name: 'OrigamList', slug: 'list' },
        { name: 'OrigamTreeview', slug: 'treeview' },
        { name: 'OrigamExpansionPanel', slug: 'expansion-panel' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/nested.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_nested_key.example',
            titleFallback: 'Injecting nested context in a custom tree node',
            code: `import { inject } from 'vue'
import { ORIGAM_NESTED_KEY } from 'origam'

const nested = inject(ORIGAM_NESTED_KEY)
nested?.root.open(myId, true)`,
            lang: 'typescript',
        },
    ],
}
