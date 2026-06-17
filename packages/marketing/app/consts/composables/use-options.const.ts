import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_OPTIONS_DOC: IComposableDoc = {
    slug: 'use-options',
    name: 'useOptions',
    domain: 'DataTable',
    icon: 'mdi-table-cog',
    descriptionKey: '',
    descriptionFallback: 'Aggregates DataTable state (page, itemsPerPage, sortBy, groupBy, search) into a single reactive options object and emits update:options whenever any of those refs change. Also resets the page to 1 automatically when the search term changes. Used internally by OrigamDataTable.',
    signature: `function useOptions(options: {
  page: Ref<number>
  itemsPerPage: Ref<number>
  sortBy: Ref<Array<IDataTableSortItem>>
  groupBy: Ref<Array<IDataTableSortItem>>
  search: Ref<string | undefined>
}): void`,
    params: [
        {
            name: 'page',
            type: 'Ref<number>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Current page index (1-based). Automatically reset to 1 when the search term changes.',
        },
        {
            name: 'itemsPerPage',
            type: 'Ref<number>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Number of rows per page. -1 disables pagination (all rows visible).',
        },
        {
            name: 'sortBy',
            type: 'Ref<Array<IDataTableSortItem>>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Active sort descriptors: array of { key, order } objects.',
        },
        {
            name: 'groupBy',
            type: 'Ref<Array<IDataTableSortItem>>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Active group-by descriptors. Empty array = no grouping.',
        },
        {
            name: 'search',
            type: 'Ref<string | undefined>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Current search string. Changing this value triggers a page reset and an immediate update:options emit.',
        },
    ],
    returns: [],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Listen to DataTable option changes',
            code: `<template>
  <origam-data-table
    :headers="headers"
    :items="items"
    @update:options="onOptionsChange"
  />
</template>

<script setup lang="ts">
function onOptionsChange(options: {
  page: number
  itemsPerPage: number
  sortBy: { key: string; order: 'asc' | 'desc' }[]
  groupBy: { key: string; order: 'asc' | 'desc' }[]
  search: string | undefined
}) {
  console.log('DataTable options changed', options)
}
</script>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Server-side data with reactive options',
            code: `<script setup lang="ts">
import { ref, watch } from 'vue'

const options = ref({ page: 1, itemsPerPage: 10, sortBy: [], groupBy: [], search: undefined })
const items = ref([])

watch(options, async (o) => {
  const { data } = await fetch(\`/api/items?page=\${o.page}&limit=\${o.itemsPerPage}\`)
    .then(r => r.json())
  items.value = data
}, { deep: true, immediate: true })
</script>

<template>
  <origam-data-table
    :headers="headers"
    :items="items"
    v-model:options="options"
  />
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-pagination', 'use-headers', 'use-filters'],
    consumedInterfaces: ['IDataTableSortItem'],
}
