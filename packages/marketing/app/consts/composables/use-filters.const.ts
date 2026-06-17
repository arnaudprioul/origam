import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_FILTERS_DOC: IComposableDoc = {
    slug: 'use-filters',
    name: 'useFilter',
    domain: 'Commons',
    icon: 'mdi-filter-outline',
    descriptionKey: '',
    descriptionFallback: 'Client-side filter engine for item lists. Applies a search query against one or more keys using the configured filter strategy (intersect, union, every, some). Supports custom per-key filter functions and a global custom filter override.',
    signature: `function useFilter<T extends IInternalItem>(
  props: IFiltersProps,
  items: MaybeRef<T[]>,
  query: Ref<string | undefined> | (() => string | undefined),
  options?: {
    transform?: (item: T) => Record<string, unknown>
    customKeyFilter?: MaybeRef<TFilterKeyFunctions | undefined>
  }
): {
  filteredItems: Ref<T[]>
  filteredMatches: Ref<Map<unknown, Record<string, TFilterMatch>>>
  getMatches: (item: T) => Record<string, TFilterMatch> | undefined
}`,
    params: [
        {
            name: 'props',
            type: 'IFiltersProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Filter configuration from the parent component: filterKeys, filterMode, noFilter, customFilter, customKeyFilter.',
        },
        {
            name: 'items',
            type: 'MaybeRef<T[]>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The full item list to filter. Can be a plain array or a reactive ref.',
        },
        {
            name: 'query',
            type: 'Ref<string | undefined> | (() => string | undefined)',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The current search string. Accepts a ref or a getter function. An empty string disables filtering.',
        },
        {
            name: 'options.transform',
            type: '(item: T) => Record<string, unknown>',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional function to derive the plain-object representation of an item before filtering (e.g. to flatten nested keys).',
        },
        {
            name: 'options.customKeyFilter',
            type: 'MaybeRef<TFilterKeyFunctions | undefined>',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Composable-level per-key filter functions, merged on top of props.customKeyFilter. Useful for programmatic overrides independent of the template props.',
        },
    ],
    returns: [
        {
            name: 'filteredItems',
            type: 'Ref<T[]>',
            descriptionKey: '',
            descriptionFallback: 'The subset of items that match the current query, in original order.',
        },
        {
            name: 'filteredMatches',
            type: 'Ref<Map<unknown, Record<string, TFilterMatch>>>',
            descriptionKey: '',
            descriptionFallback: 'Map from item value key to a record of matched ranges per field. Used to highlight matched substrings in the UI.',
        },
        {
            name: 'getMatches',
            type: '(item: T) => Record<string, TFilterMatch> | undefined',
            descriptionKey: '',
            descriptionFallback: 'Helper to retrieve the match record for a single item. Returns undefined when the item is not in filteredMatches.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Search over a name list',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useFilter } from 'origam'
import type { IInternalItem } from 'origam'

interface User extends IInternalItem {
  value: string
  raw: { name: string; email: string }
}

const users = ref<User[]>([
  { value: '1', raw: { name: 'Alice', email: 'alice@example.com' } },
  { value: '2', raw: { name: 'Bob',   email: 'bob@example.com' } },
])
const search = ref('')

const { filteredItems } = useFilter(
  { filterKeys: ['name', 'email'], filterMode: 'intersection', noFilter: false },
  users,
  search
)
</script>

<template>
  <origam-text-field v-model="search" placeholder="Search..." />
  <origam-list>
    <origam-list-item v-for="u in filteredItems" :key="u.value" :title="u.raw.name" />
  </origam-list>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-items', 'use-active'],
    consumedInterfaces: ['IFiltersProps', 'IInternalItem'],
}
