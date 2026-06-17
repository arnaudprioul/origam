import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_DATA_TABLE_SELECT_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-data-table-select-key',
    name: 'ORIGAM_DATA_TABLE_SELECT_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_data_table_select_key.description',
    descriptionFallback: 'Vue provide/inject symbol that exposes the full selection context returned by provideSelection() (selected set, toggleSelect, selectAll, isSelected, …) from OrigamDataTable to rows and the select-all checkbox header.',
    definition: `export const ORIGAM_DATA_TABLE_SELECT_KEY: InjectionKey<ReturnType<typeof provideSelection>> = Symbol.for('origam:data-table-selection')`,
    value: "Symbol.for('origam:data-table-selection')",
    usedBy: [
        { name: 'OrigamDataTable', slug: 'data-table' },
        { name: 'OrigamDataTableRow', slug: 'data-table-row' },
        { name: 'OrigamDataTableHeaders', slug: 'data-table' },
    ],
    sourceFile: 'packages/ds/src/consts/DataTable/select.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_data_table_select_key.example',
            titleFallback: 'Checking selection state inside a custom row slot',
            code: `import { inject } from 'vue'
import { ORIGAM_DATA_TABLE_SELECT_KEY } from 'origam'

const selectCtx = inject(ORIGAM_DATA_TABLE_SELECT_KEY)
const isSelected = selectCtx?.isSelected(item)`,
            lang: 'typescript',
        },
    ],
}
