import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_EXPAND_DOC: IComposableDoc = {
    slug: 'use-expand',
    name: 'useExpanded',
    domain: 'DataTable',
    icon: 'mdi-table-row-plus-after',
    descriptionKey: '',
    descriptionFallback: 'Injects the expand context provided by provideExpanded() inside OrigamDataTable. Gives child components access to the expanded rows Set, expand/collapse handlers, and the expandOnClick flag — without prop-drilling.',
    signature: `function useExpanded(): IDataTableProvideExpanded

// Provider (used internally by OrigamDataTable)
function provideExpanded(props: IDataTableExpandProps): IDataTableProvideExpanded`,
    params: [],
    returns: [
        {
            name: 'expanded',
            type: 'TVModel<IDataTableExpandProps, "expanded", Set<string>>',
            descriptionKey: '',
            descriptionFallback: 'Reactive Set of expanded row keys. Bound to the parent v-model:expanded.',
        },
        {
            name: 'expandOnClick',
            type: 'Ref<boolean | undefined>',
            descriptionKey: '',
            descriptionFallback: 'When true, clicking a row expands it without needing an explicit expand button.',
        },
        {
            name: 'expand',
            type: '(item: IDataTableItem, value: boolean) => void',
            descriptionKey: '',
            descriptionFallback: 'Explicitly expand or collapse a row by its item reference and a boolean flag.',
        },
        {
            name: 'isExpanded',
            type: '(item: IDataTableItem) => boolean',
            descriptionKey: '',
            descriptionFallback: 'Returns true if the given item\'s value key is present in the expanded Set.',
        },
        {
            name: 'toggleExpand',
            type: '(item: IDataTableItem) => void',
            descriptionKey: '',
            descriptionFallback: 'Toggles the expanded state of a row — expands it if collapsed, collapses it if expanded.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Custom expand cell using useExpanded',
            code: `<script setup lang="ts">
import { useExpanded } from 'origam'
import type { IDataTableItem } from 'origam'

const { isExpanded, toggleExpand } = useExpanded()

defineProps<{ item: IDataTableItem }>()
</script>

<template>
  <origam-btn
    :icon="isExpanded(item) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
    @click="toggleExpand(item)"
  />
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'DataTable with expandable rows',
            code: `<template>
  <origam-data-table
    :items="rows"
    v-model:expanded="expandedKeys"
    expand-on-click
    show-expand
  >
    <template #expanded-row="{ item }">
      <origam-card>{{ item.detail }}</origam-card>
    </template>
  </origam-data-table>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-active', 'use-group'],
    consumedInterfaces: ['IDataTableExpandProps', 'IDataTableProvideExpanded', 'IDataTableItem'],
    noteFallback: 'useExpanded() throws if called outside a component tree where provideExpanded() has run. It is safe to call inside any custom cell/row slot of OrigamDataTable.',
}
