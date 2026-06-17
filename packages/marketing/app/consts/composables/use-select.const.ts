import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_SELECT_DOC: IComposableDoc = {
    slug: 'use-select',
    name: 'useSelection',
    domain: 'DataTable',
    icon: 'mdi-checkbox-multiple-marked-outline',
    descriptionKey: '',
    descriptionFallback: 'Inject accessor for the row-selection context provided by provideSelection inside OrigamDataTable. Returns the reactive selected Set and the select / toggleSelect / selectAll helpers plus status flags (someSelected, allSelected, showSelectAll). Used by checkbox columns and the header select-all control.',
    signature: `function useSelection(): IDataTableProvideSelection`,
    params: [],
    returns: [
        {
            name: 'isSelected',
            type: '(items: IDataTableSelectableItem | IDataTableSelectableItem[]) => boolean',
            descriptionKey: '',
            descriptionFallback: 'Returns true when every item in the argument list is in the selected Set.',
        },
        {
            name: 'isSomeSelected',
            type: '(items: IDataTableSelectableItem | IDataTableSelectableItem[]) => boolean',
            descriptionKey: '',
            descriptionFallback: 'Returns true when at least one item in the argument list is selected.',
        },
        {
            name: 'select',
            type: '(items: IDataTableSelectableItem[], value: boolean) => void',
            descriptionKey: '',
            descriptionFallback: 'Set the selection state of the given items to value. Delegates to the active selectStrategy (single, page, or all).',
        },
        {
            name: 'toggleSelect',
            type: '(item: IDataTableSelectableItem) => void',
            descriptionKey: '',
            descriptionFallback: 'Toggle the selection state of a single item.',
        },
        {
            name: 'selectAll',
            type: '(value: boolean) => void',
            descriptionKey: '',
            descriptionFallback: 'Select or deselect all eligible items according to the active strategy. Strategy page selects only the current page; strategy all selects across all pages.',
        },
        {
            name: 'someSelected',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when the selected Set is non-empty. Used to render the indeterminate state on the select-all checkbox.',
        },
        {
            name: 'allSelected',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when all eligible items (non-disabled) are selected according to the active strategy.',
        },
        {
            name: 'showSelectAll',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Whether the select-all checkbox should be visible. Always false for the single select strategy.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Row checkbox cell using useSelection',
            code: `<script setup lang="ts">
import { useSelection } from 'origam'

const props = defineProps<{ item: IDataTableSelectableItem }>()
const { isSelected, toggleSelect } = useSelection()
</script>

<template>
  <td>
    <origam-checkbox
      :model-value="isSelected(item)"
      @update:model-value="toggleSelect(item)"
    />
  </td>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Select-all header checkbox',
            code: `<script setup lang="ts">
import { useSelection } from 'origam'

const { allSelected, someSelected, showSelectAll, selectAll } = useSelection()
</script>

<template>
  <th v-if="showSelectAll">
    <origam-checkbox
      :model-value="allSelected"
      :indeterminate="someSelected && !allSelected"
      @update:model-value="selectAll"
    />
  </th>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-sort', 'use-group'],
    consumedInterfaces: ['IDataTableProvideSelection', 'IDataTableSelectableItem', 'IDataTableSelectProps'],
    noteFallback: 'useSelection throws when called outside a DataTable context (no inject match for ORIGAM_DATA_TABLE_SELECT_KEY). It must be used inside a component tree where provideSelection() was called by the parent table.',
}
