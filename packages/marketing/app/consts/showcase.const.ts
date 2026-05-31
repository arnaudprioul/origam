import type { IShowcaseChipItem, IShowcaseTableRow } from '~/interfaces/showcase.interface'

export const SHOWCASE_TABLE_ROWS: IShowcaseTableRow[] = [
    {
        nameKey: 'home.showcase.dataTable.row1Name',
        nameFallback: 'Aurora release',
        ownerKey: 'home.showcase.dataTable.row1Owner',
        ownerFallback: 'Arnaud',
        statusKey: 'home.showcase.dataTable.row1Status',
        statusFallback: 'Shipped',
    },
    {
        nameKey: 'home.showcase.dataTable.row2Name',
        nameFallback: 'Tokens v2',
        ownerKey: 'home.showcase.dataTable.row2Owner',
        ownerFallback: 'Léa',
        statusKey: 'home.showcase.dataTable.row2Status',
        statusFallback: 'In review',
    },
    {
        nameKey: 'home.showcase.dataTable.row3Name',
        nameFallback: 'A11y audit',
        ownerKey: 'home.showcase.dataTable.row3Owner',
        ownerFallback: 'Jade',
        statusKey: 'home.showcase.dataTable.row3Status',
        statusFallback: 'In progress',
    },
    {
        nameKey: 'home.showcase.dataTable.row4Name',
        nameFallback: 'Chart engine',
        ownerKey: 'home.showcase.dataTable.row4Owner',
        ownerFallback: 'Marc',
        statusKey: 'home.showcase.dataTable.row4Status',
        statusFallback: 'Draft',
    },
    {
        nameKey: 'home.showcase.dataTable.row5Name',
        nameFallback: 'New theme',
        ownerKey: 'home.showcase.dataTable.row5Owner',
        ownerFallback: 'Romi',
        statusKey: 'home.showcase.dataTable.row5Status',
        statusFallback: 'Draft',
    },
]

export const SHOWCASE_SPARKLINE_DATA = [6, 8, 7, 10, 9, 11, 12, 10, 13, 14, 12, 15]

export const SHOWCASE_CHIP_ITEMS: IShowcaseChipItem[] = [
    {
        intent: 'primary',
        labelKey: 'home.showcase.chips.primary',
        labelFallback: 'Primary',
    },
    {
        intent: 'neutral',
        labelKey: 'home.showcase.chips.neutral',
        labelFallback: 'Neutral',
    },
    {
        intent: 'success',
        labelKey: 'home.showcase.chips.success',
        labelFallback: 'Success',
    },
    {
        intent: 'warning',
        labelKey: 'home.showcase.chips.warning',
        labelFallback: 'Warning',
    },
    {
        intent: 'danger',
        labelKey: 'home.showcase.chips.danger',
        labelFallback: 'Danger',
    },
    {
        intent: 'info',
        labelKey: 'home.showcase.chips.info',
        labelFallback: 'Info',
    },
]

export const SHOWCASE_AVATAR_ITEMS = [
    { text: 'AR', bgColor: 'primary' },
    { text: 'LB', bgColor: 'success' },
    { text: 'JD', bgColor: 'warning' },
    { text: 'MC', bgColor: 'danger' },
]
