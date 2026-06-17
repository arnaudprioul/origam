import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_PAGINATION_DOC: IComposableDoc = {
    slug: 'use-pagination',
    name: 'usePagination',
    domain: 'DataTable',
    icon: 'mdi-book-open-page-variant-outline',
    descriptionKey: '',
    descriptionFallback: 'Suite of three pagination helpers for OrigamDataTable: createPagination initialises page and itemsPerPage refs from props; providePagination computes derived state (startIndex, stopIndex, pageCount) and provides it to children; usePagination injects the provided pagination context. A fourth helper usePaginatedItems slices the items array for the current page.',
    signature: `// Initialise pagination refs from props
function createPagination(props: IDataTablePaginationProps): {
  page: Ref<number>
  itemsPerPage: Ref<number>
}

// Compute + provide derived pagination state
function providePagination(options: {
  page: Ref<number>
  itemsPerPage: Ref<number>
  itemsLength: Ref<number>
}): IDataTableProvidePagination

// Inject pagination context (throws if missing)
function usePagination(): IDataTableProvidePagination

// Slice items for the active page
function usePaginatedItems<T>(options: {
  items: Ref<readonly (T | IDataTableGroup<T>)[]>
  startIndex: Ref<number>
  stopIndex: Ref<number>
  itemsPerPage: Ref<number>
}): { paginatedItems: ComputedRef<readonly (T | IDataTableGroup<T>)[]> }`,
    params: [
        {
            name: 'props',
            type: 'IDataTablePaginationProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props containing page and itemsPerPage (for createPagination).',
        },
        {
            name: 'options.page',
            type: 'Ref<number>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Active page (1-based). Auto-clamped to [1, pageCount] when itemsLength or itemsPerPage changes.',
        },
        {
            name: 'options.itemsPerPage',
            type: 'Ref<number>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Rows per page. -1 = show all.',
        },
        {
            name: 'options.itemsLength',
            type: 'Ref<number>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Total number of items (server-side count or items.length for client-side).',
        },
    ],
    returns: [
        {
            name: 'page',
            type: 'Ref<number>',
            descriptionKey: '',
            descriptionFallback: 'Current page, two-way bound via useVModel.',
        },
        {
            name: 'itemsPerPage',
            type: 'Ref<number>',
            descriptionKey: '',
            descriptionFallback: 'Rows per page, two-way bound.',
        },
        {
            name: 'startIndex',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Inclusive start index in the full items array for the active page.',
        },
        {
            name: 'stopIndex',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Exclusive stop index. slice(startIndex, stopIndex) gives the current page.',
        },
        {
            name: 'pageCount',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Total number of pages. Always at least 1. Equals 1 when itemsPerPage is -1.',
        },
        {
            name: 'nextPage',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Advances to the next page, clamped to pageCount.',
        },
        {
            name: 'prevPage',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Goes back one page, minimum 1.',
        },
        {
            name: 'setPage',
            type: '(value: number) => void',
            descriptionKey: '',
            descriptionFallback: 'Jumps to an arbitrary page, clamped to [1, pageCount].',
        },
        {
            name: 'setItemsPerPage',
            type: '(value: number) => void',
            descriptionKey: '',
            descriptionFallback: 'Changes the page size and resets to page 1.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Client-side paginated table',
            code: `<template>
  <origam-data-table
    :headers="headers"
    :items="items"
    v-model:page="page"
    v-model:items-per-page="perPage"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
const perPage = ref(10)
const items = ref(Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: \`Item \${i + 1}\` })))
</script>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Custom pagination footer',
            code: `<origam-data-table :headers="headers" :items="items">
  <template #bottom="{ pageCount, nextPage, prevPage, page }">
    <div class="custom-footer">
      <origam-btn :disabled="page === 1" @click="prevPage">Prev</origam-btn>
      <span>{{ page }} / {{ pageCount }}</span>
      <origam-btn :disabled="page === pageCount" @click="nextPage">Next</origam-btn>
    </div>
  </template>
</origam-data-table>`,
            lang: 'vue',
        },
    ],
    related: ['use-options', 'use-headers', 'use-filters'],
    consumedInterfaces: ['IDataTablePaginationProps', 'IDataTableProvidePagination', 'IDataTableGroup'],
}
