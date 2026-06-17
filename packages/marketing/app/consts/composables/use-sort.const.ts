import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_SORT_DOC: IComposableDoc = {
    slug: 'use-sort',
    name: 'useSort',
    domain: 'DataTable',
    icon: 'mdi-sort',
    descriptionKey: '',
    descriptionFallback: 'Inject accessor for the sort context provided by provideSort inside OrigamDataTable. Returns the reactive sortBy array and the toggleSort / isSorted helpers. Used by header cells to read and update the active sort columns. The companion useSortedItems applies the sort order to a reactive item list.',
    signature: `function useSort(): IDataTableProvideSort

function useSortedItems<T extends IInternalItem>(
  props: { customKeySort: TDataTableCompareFunction | undefined },
  items: Ref<T[]>,
  sortBy: Ref<Array<IDataTableSortItem>>,
  options?: {
    transform?: (item: T) => Record<string, unknown>
    sortFunctions?: Ref<Record<string, TDataTableCompareFunction> | undefined>
    sortRawFunctions?: Ref<Record<string, TDataTableCompareFunction> | undefined>
  }
): { sortedItems: ComputedRef<T[]> }`,
    params: [],
    returns: [
        {
            name: 'sortBy',
            type: 'Ref<Array<IDataTableSortItem>>',
            descriptionKey: '',
            descriptionFallback: 'Reactive array of active sort descriptors, each with a key (column key) and an order (asc | desc). Driven by useVModel against the host table props.',
        },
        {
            name: 'toggleSort',
            type: '(column: IInternalDataTableHeader) => void',
            descriptionKey: '',
            descriptionFallback: 'Cycle the sort state for a column: none → asc → desc → none (or asc when mustSort=true). Respects multiSort — when false, replaces the entire sortBy array with a single entry.',
        },
        {
            name: 'isSorted',
            type: '(column: IInternalDataTableHeader) => boolean',
            descriptionKey: '',
            descriptionFallback: 'Returns true when the column has an active sort entry in sortBy. Used by header cells to show the sort icon.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Sortable data table header cell',
            code: `<script setup lang="ts">
import { useSort } from 'origam'

const props = defineProps<{ column: IInternalDataTableHeader }>()
const { toggleSort, isSorted } = useSort()
</script>

<template>
  <th @click="toggleSort(column)">
    {{ column.title }}
    <origam-icon v-if="isSorted(column)" icon="mdi-arrow-up" />
  </th>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Sorted items computed ref',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useSortedItems } from 'origam'

const items = ref([
  { id: 1, name: 'Beta' },
  { id: 2, name: 'Alpha' },
])
const sortBy = ref([{ key: 'name', order: 'asc' }])
const { sortedItems } = useSortedItems({ customKeySort: undefined }, items, sortBy)
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-headers', 'use-group'],
    consumedInterfaces: ['IDataTableProvideSort', 'IDataTableSortItem', 'IDataTableSortProps', 'IInternalDataTableHeader'],
    noteFallback: 'useSort throws when called outside a DataTable context (no inject match). It must be used inside a component tree that has provideSort() called by the parent table.',
}
