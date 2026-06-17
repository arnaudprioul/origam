import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_DATA_TABLE_EXPAND_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-data-table-expand-key',
    name: 'ORIGAM_DATA_TABLE_EXPAND_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_data_table_expand_key.description',
    descriptionFallback: 'Vue provide/inject symbol that exposes the row-expansion API (expand, isExpanded, toggleExpand, expanded set, expandOnClick flag) from OrigamDataTable to its internal row components.',
    definition: `export const ORIGAM_DATA_TABLE_EXPAND_KEY: InjectionKey<{
    expand: (item: IDataTableItem, value: boolean) => void
    expanded: Ref<Set<string>>
    expandOnClick: Ref<boolean | undefined>
    isExpanded: (item: IDataTableItem) => boolean
    toggleExpand: (item: IDataTableItem) => void
}> = Symbol.for('origam:data-table-expand')`,
    value: "Symbol.for('origam:data-table-expand')",
    usedBy: [
        { name: 'OrigamDataTable', slug: 'data-table' },
        { name: 'OrigamDataTableRow', slug: 'data-table-row' },
    ],
    sourceFile: 'packages/ds/src/consts/DataTable/expand.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_data_table_expand_key.example',
            titleFallback: 'Injecting the expand context in a custom row slot',
            code: `import { inject } from 'vue'
import { ORIGAM_DATA_TABLE_EXPAND_KEY } from 'origam'

const expandCtx = inject(ORIGAM_DATA_TABLE_EXPAND_KEY)

function toggleRow(item) {
  expandCtx?.toggleExpand(item)
}`,
            lang: 'typescript',
        },
    ],
}
