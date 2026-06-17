import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_CELL_DOC: IComposableDoc = {
    slug: 'use-cell',
    name: 'useCell',
    domain: 'DataTable',
    icon: 'mdi-table-column',
    descriptionKey: '',
    descriptionFallback: 'Resolve the padding for a DataTable cell based on the column definition. Special columns (data-table-select and data-table-expand) receive a fixed narrow padding; user-defined columns honour the column\'s own padding setting; all others receive the default undefined (letting CSS tokens drive the spacing).',
    signature: `function useCell(): {
  getPadding: (column: IInternalDataTableHeader) => string | undefined
}`,
    params: [],
    returns: [
        {
            name: 'getPadding',
            type: '(column: IInternalDataTableHeader) => string | undefined',
            descriptionKey: '',
            descriptionFallback: 'Returns a padding shorthand string for the given column. Returns "0 8" for the built-in select/expand columns, the column\'s own padding value when defined, or undefined to fall back to CSS token-driven spacing.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Using getPadding in a custom cell renderer',
            code: `<script setup lang="ts">
import { useCell } from 'origam'
import type { IInternalDataTableHeader } from 'origam'

defineProps<{ column: IInternalDataTableHeader }>()

const { getPadding } = useCell()
</script>

<template>
  <td :style="{ padding: getPadding(column) }">
    <slot />
  </td>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-headers', 'use-items', 'use-sort'],
    consumedInterfaces: ['IInternalDataTableHeader'],
}
