import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_LIST_DOC: IComposableDoc = {
    slug: 'use-list',
    name: 'useList',
    domain: 'List',
    icon: 'mdi-view-list-outline',
    descriptionKey: '',
    descriptionFallback: 'Provides access to the nearest OrigamList context. Returns the hasPrepend / hasAppend reactive flags that list items use to coordinate their icon gutter alignment. Returns null when called outside an OrigamList provider — safe to call in standalone items.',
    signature: `function useList(): {
  hasPrepend: ShallowRef<boolean>
  hasAppend: ShallowRef<boolean>
  updateHasPrepend: (value: ComputedRef<boolean>) => void
  updateHasAppend: (value: ComputedRef<boolean>) => void
} | null`,
    params: [],
    returns: [
        {
            name: 'hasPrepend',
            type: 'ShallowRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when at least one sibling list item has a prepend slot or icon. Used to align text in items that have no prepend.',
        },
        {
            name: 'hasAppend',
            type: 'ShallowRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when at least one sibling list item has an append slot or icon.',
        },
        {
            name: 'updateHasPrepend',
            type: '(value: ComputedRef<boolean>) => void',
            descriptionKey: '',
            descriptionFallback: 'Called by each list item to register whether it contributes a prepend element. The parent list aggregates this into hasPrepend.',
        },
        {
            name: 'updateHasAppend',
            type: '(value: ComputedRef<boolean>) => void',
            descriptionKey: '',
            descriptionFallback: 'Called by each list item to register whether it contributes an append element.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Read list context in a custom item',
            code: `<script setup lang="ts">
import { useList } from 'origam'

const list = useList()
// null when used outside OrigamList
const hasPrepend = list?.hasPrepend ?? false
</script>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Create a list context (useCreateList)',
            code: `<script setup lang="ts">
import { useCreateList } from 'origam'

// Call in the list root component to create the context
// and receive the PARENT context (for nested lists)
const parentList = useCreateList()
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-items', 'use-group'],
    consumedInterfaces: [],
    noteFallback: 'useList returns null when called outside an OrigamList — always null-check the result before accessing its members. To create a list context use useCreateList() which both provides the new context and returns the parent one.',
}
