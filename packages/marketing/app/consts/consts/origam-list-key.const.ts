import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_LIST_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-list-key',
    name: 'ORIGAM_LIST_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_list_key.description',
    descriptionFallback: 'Vue provide/inject symbol that carries the OrigamList slot-coordination context (hasPrepend, updateHasPrepend, hasAppend, updateHasAppend) to its child OrigamListItem components, so item-level icons/actions align correctly with the list gutter.',
    definition: `export const ORIGAM_LIST_KEY: InjectionKey<{
    hasPrepend: Ref<boolean>
    updateHasPrepend: (value: ComputedRef<boolean>) => void
    hasAppend: Ref<boolean>
    updateHasAppend: (value: ComputedRef<boolean>) => void
}> = Symbol.for('origam:list')`,
    value: "Symbol.for('origam:list')",
    usedBy: [
        { name: 'OrigamList', slug: 'list' },
        { name: 'OrigamListItem', slug: 'list-item' },
    ],
    sourceFile: 'packages/ds/src/consts/List/list.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_list_key.example',
            titleFallback: 'Aligning prepend icons across list items',
            code: `<origam-list>
  <origam-list-item prepend-icon="mdi-home">Home</origam-list-item>
  <origam-list-item prepend-icon="mdi-cog">Settings</origam-list-item>
</origam-list>`,
            lang: 'html',
        },
    ],
}
