import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_HEADERS_DOC: IComposableDoc = {
    slug: 'use-headers',
    name: 'useHeaders',
    domain: 'DataTable',
    icon: 'mdi-table-column',
    descriptionKey: '',
    descriptionFallback: 'Injects the DataTable header context created by createHeaders. Exposes the parsed multi-row header matrix, the flat column list, and the sort/filter function maps derived from the column definitions.',
    signature: `function useHeaders(): {
  headers: Ref<IInternalDataTableHeader[][]>
  columns: Ref<IInternalDataTableHeader[]>
  sortFunctions: Ref<Record<string, TDataTableCompareFunction>>
  sortRawFunctions: Ref<Record<string, TDataTableCompareFunction>>
  filterFunctions: Ref<TFilterKeyFunctions>
}

function createHeaders(
  props: IDataTableHeaderProps,
  options?: {
    groupBy?: Ref<IDataTableSortItem[]>
    showSelect?: Ref<boolean>
    showExpand?: Ref<boolean>
  }
): {
  headers: Ref<IInternalDataTableHeader[][]>
  columns: Ref<IInternalDataTableHeader[]>
  sortFunctions: Ref<Record<string, TDataTableCompareFunction>>
  sortRawFunctions: Ref<Record<string, TDataTableCompareFunction>>
  filterFunctions: Ref<TFilterKeyFunctions>
}`,
    params: [
        {
            name: 'props',
            type: 'IDataTableHeaderProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'createHeaders only — DataTable props including headers definition and items (used to auto-generate columns when headers is omitted).',
        },
        {
            name: 'options.groupBy',
            type: 'Ref<IDataTableSortItem[]>',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'createHeaders only — when set, prepends a data-table-group column to support row grouping.',
        },
        {
            name: 'options.showSelect',
            type: 'Ref<boolean>',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'createHeaders only — when true, prepends a data-table-select column for row checkboxes.',
        },
        {
            name: 'options.showExpand',
            type: 'Ref<boolean>',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'createHeaders only — when true, appends a data-table-expand column for row expansion toggles.',
        },
    ],
    returns: [
        {
            name: 'headers',
            type: 'Ref<IInternalDataTableHeader[][]>',
            descriptionKey: '',
            descriptionFallback: 'A 2D array representing the header rows. Multi-level headers produce multiple rows; simple tables produce a single row.',
        },
        {
            name: 'columns',
            type: 'Ref<IInternalDataTableHeader[]>',
            descriptionKey: '',
            descriptionFallback: 'Flat list of leaf columns (those that represent actual data cells). Used to drive the tbody cell rendering.',
        },
        {
            name: 'sortFunctions',
            type: 'Ref<Record<string, TDataTableCompareFunction>>',
            descriptionKey: '',
            descriptionFallback: 'Per-column custom sort comparators extracted from the header definitions.',
        },
        {
            name: 'sortRawFunctions',
            type: 'Ref<Record<string, TDataTableCompareFunction>>',
            descriptionKey: '',
            descriptionFallback: 'Per-column raw sort comparators (operating on unformatted values) extracted from the header definitions.',
        },
        {
            name: 'filterFunctions',
            type: 'Ref<TFilterKeyFunctions>',
            descriptionKey: '',
            descriptionFallback: 'Per-column filter functions extracted from the header definitions, keyed by column key.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Creating headers in a DataTable parent',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { createHeaders } from 'origam'
import type { IDataTableHeaderProps } from 'origam'

const props = defineProps<IDataTableHeaderProps>()
const groupBy = ref([])
const showSelect = ref(false)

const { headers, columns } = createHeaders(props, {
  groupBy,
  showSelect,
})
</script>`,
            lang: 'ts',
        },
        {
            titleKey: '',
            titleFallback: 'Consuming headers in a child component',
            code: `<script setup lang="ts">
import { useHeaders } from 'origam'

const { columns, sortFunctions } = useHeaders()
</script>

<template>
  <tr>
    <th v-for="col in columns" :key="col.key">
      {{ col.title }}
    </th>
  </tr>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-sort', 'use-items'],
    consumedInterfaces: ['IDataTableHeaderProps', 'IDataTableHeader', 'IInternalDataTableHeader'],
    noteFallback: 'useHeaders throws if called outside a component that has createHeaders in its ancestor chain. It relies on Vue provide/inject with ORIGAM_DATA_TABLE_HEADERS_KEY.',
}
