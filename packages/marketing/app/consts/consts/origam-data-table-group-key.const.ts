import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_DATA_TABLE_GROUP_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-data-table-group-key',
    name: 'ORIGAM_DATA_TABLE_GROUP_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_data_table_group_key.description',
    descriptionFallback: 'Vue provide/inject symbol that exposes the row-grouping API (opened set, toggleGroup, isGroupOpen, sortByWithGroups, groupBy, extractRows) from OrigamDataTable to its group-header subcomponents.',
    definition: `export const ORIGAM_DATA_TABLE_GROUP_KEY: InjectionKey<{
    opened: Ref<Set<string>>
    toggleGroup: (group: IDataTableGroup) => void
    isGroupOpen: (group: IDataTableGroup) => boolean
    sortByWithGroups: Ref<Array<IDataTableSortItem>>
    groupBy: Ref<Array<IDataTableSortItem>>
    extractRows: (items: Array<IDataTableItem | IDataTableGroup<IDataTableItem>>) => Array<IDataTableItem>
}> = Symbol.for('origam:data-table-group')`,
    value: "Symbol.for('origam:data-table-group')",
    usedBy: [
        { name: 'OrigamDataTable', slug: 'data-table' },
        { name: 'OrigamDataTableGroupHeaderRow', slug: 'data-table' },
    ],
    sourceFile: 'packages/ds/src/consts/DataTable/group.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_data_table_group_key.example',
            titleFallback: 'Injecting the group context in a custom group-header slot',
            code: `import { inject } from 'vue'
import { ORIGAM_DATA_TABLE_GROUP_KEY } from 'origam'

const groupCtx = inject(ORIGAM_DATA_TABLE_GROUP_KEY)

function toggle(group) {
  groupCtx?.toggleGroup(group)
}`,
            lang: 'typescript',
        },
    ],
}
