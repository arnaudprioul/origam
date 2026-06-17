import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const EMPTY_NESTED_CONST_DOC: IConstDoc = {
    slug: 'empty-nested',
    name: 'EMPTY_NESTED',
    category: 'Composables & Internals',
    descriptionKey: 'consts.catalog.empty_nested.description',
    descriptionFallback: 'No-op implementation of TNestedProvide injected when a component is used outside a nested context (e.g. OrigamList without a parent OrigamList). Prevents undefined-access errors on the nested tree API.',
    definition: `export const EMPTY_NESTED: TNestedProvide = {
    id: shallowRef(),
    root: {
        register: () => null,
        unregister: () => null,
        parents: ref(new Map()),
        children: ref(new Map()),
        open: () => null,
        openOnSelect: () => null,
        select: () => null,
        opened: ref(new Set()),
        selected: ref(new Map()),
        selectedValues: ref([])
    }
}`,
    usedBy: [
        { name: 'useNested' },
        { name: 'OrigamList', slug: 'list' },
        { name: 'OrigamTreeview', slug: 'treeview' },
        { name: 'ORIGAM_NESTED_KEY' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/nested.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.empty_nested.example',
            titleFallback: 'Injecting the empty nested context',
            code: `import { EMPTY_NESTED, ORIGAM_NESTED_KEY } from 'origam'

// Provide a no-op nested context from a root component
provide(ORIGAM_NESTED_KEY, EMPTY_NESTED)`,
            lang: 'typescript',
        },
    ],
}
