/**
 * /components/data-table-rows — full documentation data for OrigamDataTableRows.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DataTable/row.interface.ts  (IDataTableRowsProps)
 *   - packages/ds/src/components/DataTable/OrigamDataTableRows.vue  (template BEM, defineExpose, SCSS)
 *   - packages/ds/tokens/component/data-table.json           (row.*, loading.*, empty.* tokens)
 *
 * PARENT: data-table
 * FAMILY: DataTable/ sub-components
 */
import type {
    IComponentDoc,
    IComponentExposed,
    IComponentA11y,
    IComponentCssVar,
    IComponentTokens
} from '~/interfaces/components-catalog.interface'

export const DATA_TABLE_ROWS_DOC: IComponentDoc = {
    slug: 'data-table-rows',
    name: 'DataTableRows',
    tag: 'origam-data-table-rows',
    icon: 'mdi-table-multiple',
    category: 'Data Display',
    descriptionKey: 'components.catalog.data_table_rows.description',
    descriptionFallback: 'Container that iterates data items and renders DataTableRow, group header rows, skeleton/loading rows, and an empty-state row.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-datatable--design',
    docUrl: 'http://localhost:4000/components/DataTable/OrigamDataTable',

    parentSlug: 'data-table',

    family: [
        {
            slug: 'data-table',
            name: 'DataTable',
            descriptionKey: 'components.catalog.data_table.description',
            descriptionFallback: 'Full-featured data table with sorting, pagination, selection and grouping.'
        },
        {
            slug: 'data-table-row',
            name: 'DataTableRow',
            descriptionKey: 'components.catalog.data_table_row.description',
            descriptionFallback: 'Single data row rendering each column cell.'
        },
        {
            slug: 'data-table-headers',
            name: 'DataTableHeaders',
            descriptionKey: 'components.catalog.data_table_headers.description',
            descriptionFallback: 'Header row container that renders all column header cells and an optional loader.'
        },
        {
            slug: 'data-table-header-cell',
            name: 'DataTableHeaderCell',
            descriptionKey: 'components.catalog.data_table_header_cell.description',
            descriptionFallback: 'Individual th cell in a DataTable header row with sort support.'
        }
    ],

    related: [
        {
            slug: 'skeleton',
            name: 'Skeleton',
            kind: 'component',
            descriptionKey: 'components.catalog.skeleton.description',
            descriptionFallback: 'Skeleton placeholder rendered per cell when loading kind is "skeleton".'
        }
    ],

    props: [
        {
            name: 'items',
            type: { label: 'Array<IDataTableItem | IDataTableGroup>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_rows.props.items.description',
            descriptionFallback: 'Array of internal item or group descriptors to render. Provided by the DataTable parent via useGroupBy / usePagination.'
        },
        {
            name: 'hideNoData',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table_rows.props.hide_no_data.description',
            descriptionFallback: 'Suppresses the empty-state row when there are no items.'
        },
        {
            name: 'noDataText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam.noDataText'",
            descriptionKey: 'components.data_table_rows.props.no_data_text.description',
            descriptionFallback: 'i18n key for the text shown in the empty-state row. Resolved via useLocale.'
        },
        {
            name: 'loading',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table_rows.props.loading.description',
            descriptionFallback: 'When truthy, renders loading rows instead of data. Accepts true (default text row), "skeleton" (OrigamSkeleton per cell), "line" or "circular".'
        },
        {
            name: 'loadingText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam.dataIterator.loadingText'",
            descriptionKey: 'components.data_table_rows.props.loading_text.description',
            descriptionFallback: 'i18n key for the loading state text. Resolved via useLocale.'
        },
        {
            name: 'rowProps',
            type: { label: 'TDataTableRow<any>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_rows.props.row_props.description',
            descriptionFallback: 'Static or callback props merged onto every DataTableRow. A function receives { item, index, internalItem }.'
        },
        {
            name: 'cellProps',
            type: { label: 'TDataTableCell<any>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_rows.props.cell_props.description',
            descriptionFallback: 'Static or callback props forwarded to every DataTableColumnCell in every row.'
        },
        {
            name: 'mobile',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table_rows.props.mobile.description',
            descriptionFallback: 'Forces mobile stacked layout on all rows.'
        },
        {
            name: 'mobileBreakpoint',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_rows.props.mobile_breakpoint.description',
            descriptionFallback: 'Viewport width threshold below which mobile layout is automatically activated on all rows.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'item',
            slotProps: '{ index, item, internalItem, columns, isExpanded, toggleExpand, isSelected, toggleSelect, props }',
            descriptionKey: 'components.data_table_rows.slots.item.description',
            descriptionFallback: 'Overrides the default DataTableRow rendering for a data item. The props field contains all computed row props (key, onClick, cellProps, mobileBreakpoint, aria-rowindex, etc.).'
        },
        {
            slot: 'group-header',
            slotProps: '{ index, item, columns, isExpanded, toggleExpand, isSelected, toggleSelect, toggleGroup, isGroupOpen }',
            descriptionKey: 'components.data_table_rows.slots.group_header.description',
            descriptionFallback: 'Overrides the default DataTableGroupHeaderRow for group items.'
        },
        {
            slot: 'expanded-row',
            slotProps: '{ index, item, internalItem, columns, isExpanded, toggleExpand, isSelected, toggleSelect }',
            descriptionKey: 'components.data_table_rows.slots.expanded_row.description',
            descriptionFallback: 'Content rendered in the expanded row below a data item when isExpanded(item) is true.'
        },
        {
            slot: 'loading',
            slotProps: '—',
            descriptionKey: 'components.data_table_rows.slots.loading.description',
            descriptionFallback: 'Overrides the default loading text inside the loading row (when kind is not "skeleton").'
        },
        {
            slot: 'no-data',
            slotProps: '—',
            descriptionKey: 'components.data_table_rows.slots.no_data.description',
            descriptionFallback: 'Overrides the default empty-state text in the no-data row.'
        }
    ],

    examples: [
        {
            titleKey: 'components.data_table_rows.examples.skeleton.title',
            titleFallback: 'Skeleton loading state',
            lang: 'vue',
            code: `<template>
  <origam-data-table
    loading="skeleton"
    :headers="[{ key: 'name', title: 'Name' }, { key: 'role', title: 'Role' }]"
    :items="[]"
  />
</template>`
        },
        {
            titleKey: 'components.data_table_rows.examples.empty.title',
            titleFallback: 'Custom empty state',
            lang: 'vue',
            code: `<template>
  <origam-data-table :headers="headers" :items="[]">
    <template #no-data>
      <span>No results found. Try a different filter.</span>
    </template>
  </origam-data-table>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-data-table-rows',
        svgViewBox: '0 0 560 160',
        svgTitle: 'Anatomy of OrigamDataTableRows',
        svgDesc: 'Schematic of DataTableRows with 4 internal state variants.',
        svg: `
  <rect x="0" y="0" width="560" height="160" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="16" y="16" width="528" height="36" rx="0" fill="var(--origam-color__surface---default, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="40" y="38" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">origam-data-table-row (data item)</text>
  <rect x="16" y="56" width="528" height="36" rx="0" fill="var(--origam-color__surface---default, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="40" y="78" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">origam-data-table-group-header-row (group)</text>
  <rect x="16" y="96" width="528" height="28" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1.5" stroke-dasharray="5 3"/>
  <text x="280" y="114" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-style="italic" font-family="'JetBrains Mono',monospace">origam-data-table-rows--no-data</text>
  <rect x="16" y="128" width="528" height="16" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="5 3"/>
  <rect x="16" y="128" width="300" height="16" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.18))"/>
  <circle cx="24" cy="24" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="24" y="28" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="24" cy="64" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="24" y="68" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="24" cy="108" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="24" y="112" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="24" cy="136" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="24" y="140" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-data-table-rows&gt;</code> — 4 output variants: data row ①, group header row ②, empty state ③, and skeleton/loading ④.',
        legend: [
            {
                num: 1,
                cls: 'OrigamDataTableRow',
                descriptionKey: 'components.data_table_rows.anatomy.data_row',
                descriptionFallback: 'Standard <code>OrigamDataTableRow</code> rendered for each flat data item. Receives computed <code>itemSlotProps.props</code> including key, onClick, mobileBreakpoint and aria-rowindex.'
            },
            {
                num: 2,
                cls: 'OrigamDataTableGroupHeaderRow',
                descriptionKey: 'components.data_table_rows.anatomy.group_row',
                descriptionFallback: '<code>OrigamDataTableGroupHeaderRow</code> rendered for group items (type === "group"). Receives toggleGroup, isGroupOpen and selection/expand context.'
            },
            {
                num: 3,
                cls: '.origam-data-table-rows--no-data',
                descriptionKey: 'components.data_table_rows.anatomy.no_data',
                descriptionFallback: 'Single full-width row rendered when items is empty and hideNoData=false. Text aligned center via --origam-data-table-empty---text-align.'
            },
            {
                num: 4,
                cls: '.origam-data-table-rows--skeleton / --loading',
                descriptionKey: 'components.data_table_rows.anatomy.skeleton',
                descriptionFallback: 'Loading state rows. Skeleton mode: 5 <code>&lt;tr aria-busy="true"&gt;</code> rows with one <code>OrigamSkeleton</code> per cell. Text mode: single row with localised loading text.'
            }
        ],
        code: `<!-- data items -->
<template v-for="(item, index) in items">
  <!-- group header row -->
  <template v-if="item.type === 'group'">
    <slot name="group-header" v-bind="groupHeaderSlotProps(item, index)">
      <origam-data-table-group-header-row v-bind="groupHeaderSlotProps(item, index)" />
    </slot>
  </template>
  <!-- data row -->
  <template v-else>
    <slot name="item" v-bind="itemSlotProps(item, index)">
      <origam-data-table-row :item="item" v-bind="itemSlotProps(item, index).props" />
    </slot>
    <!-- expanded row -->
    <template v-if="isExpanded(item)">
      <slot name="expanded-row" v-bind="slotProps" />
    </template>
  </template>
</template>

<!-- skeleton loading rows -->
<tr v-for="rowIndex in 5" class="origam-data-table-rows origam-data-table-rows--skeleton" aria-busy="true">
  <td v-for="col in columns" class="origam-data-table-rows__skeleton-cell">
    <origam-skeleton variant="text" :loading="true" />
  </td>
</tr>

<!-- text loading row -->
<tr class="origam-data-table-rows origam-data-table-rows--loading">
  <td :colspan="columns.length"><slot name="loading">{{ loadingText }}</slot></td>
</tr>

<!-- empty state row -->
<tr class="origam-data-table-rows origam-data-table-rows--no-data">
  <td :colspan="columns.length"><slot name="no-data">{{ noDataText }}</slot></td>
</tr>`,
        classes: [
            {
                cls: 'origam-data-table-rows',
                descriptionKey: 'components.data_table_rows.anatomy.root',
                descriptionFallback: 'Applied to the skeleton, loading and no-data tr elements.'
            },
            {
                cls: 'origam-data-table-rows--no-data',
                descriptionKey: 'components.data_table_rows.anatomy.no_data_class',
                descriptionFallback: 'Empty state row. Text colour: --origam-data-table-rows--no-data---color.'
            },
            {
                cls: 'origam-data-table-rows--loading',
                descriptionKey: 'components.data_table_rows.anatomy.loading_class',
                descriptionFallback: 'Text loading row (non-skeleton). Text colour: --origam-data-table-rows--loading---color.'
            },
            {
                cls: 'origam-data-table-rows--skeleton',
                descriptionKey: 'components.data_table_rows.anatomy.skeleton_class',
                descriptionFallback: 'Skeleton loading row (aria-busy="true"). One of 5 placeholder rows.'
            },
            {
                cls: 'origam-data-table-rows__skeleton-cell',
                descriptionKey: 'components.data_table_rows.anatomy.skeleton_cell',
                descriptionFallback: 'Cell inside a skeleton row. Contains OrigamSkeleton variant="text".'
            }
        ]
    },

    cssVars: [
        {
            name: '--origam-data-table-rows--no-data---color',
            defaultValue: 'var(--origam-color__text---secondary)',
            descriptionKey: 'components.data_table_rows.css_vars.no_data_color',
            descriptionFallback: 'Text colour of the empty-state row.'
        },
        {
            name: '--origam-data-table-rows--loading---color',
            defaultValue: 'var(--origam-color__text---secondary)',
            descriptionKey: 'components.data_table_rows.css_vars.loading_color',
            descriptionFallback: 'Text colour of the text loading row.'
        },
        {
            name: '--origam-data-table-empty---text-align',
            defaultValue: 'center',
            descriptionKey: 'components.data_table_rows.css_vars.empty_text_align',
            descriptionFallback: 'Text alignment of the empty-state content.'
        },
        {
            name: '--origam-data-table-rows--skeleton---cell-padding',
            defaultValue: '4px 8px',
            descriptionKey: 'components.data_table_rows.css_vars.skeleton_cell_padding',
            descriptionFallback: 'Padding of each cell in a skeleton loading row.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.data_table_rows.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child row components.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['rowgroup'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.data_table_rows.a11y.key_tab',
                actionFallback: 'Moves focus through interactive elements inside rows (checkboxes, expand buttons, clickable cells).'
            }
        ],
        notes: [
            {
                noteKey: 'components.data_table_rows.a11y.aria_busy',
                noteFallback: 'Skeleton placeholder rows expose <code>aria-busy="true"</code> on each <code>&lt;tr&gt;</code> to signal screen readers that content is loading.'
            },
            {
                noteKey: 'components.data_table_rows.a11y.aria_rowindex',
                noteFallback: '<code>aria-rowindex</code> is set on each data row (startIndex + index + 2) to give screen readers accurate row position information in paginated tables.'
            },
            {
                noteKey: 'components.data_table_rows.a11y.no_data',
                noteFallback: 'The empty-state row uses a <code>&lt;td colspan&gt;</code> spanning all columns, with centred text. Override the no-data slot to provide a more descriptive message for screen reader users.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/data-table.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Row, empty and loading tokens live under data-table.row, data-table.empty and data-table.loading-row namespaces.',
        excerpt: [
            {
                tokenPath: 'data-table.row.background-color',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.data_table_rows.tokens.row_background_color',
                descriptionFallback: 'Default row background.'
            },
            {
                tokenPath: 'data-table.row.striped-background-color',
                value: '{color.surface.sunken}',
                type: 'color',
                descriptionKey: 'components.data_table_rows.tokens.striped_background_color',
                descriptionFallback: 'Alternate (even) row background for striped variant.'
            },
            {
                tokenPath: 'data-table.row.selected-background-color',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.data_table_rows.tokens.selected_background_color',
                descriptionFallback: 'Row background when selected.'
            },
            {
                tokenPath: 'data-table.row.border-bottom-color',
                value: '{color.border.subtle}',
                type: 'color',
                descriptionKey: 'components.data_table_rows.tokens.border_bottom_color',
                descriptionFallback: 'Row separator colour.'
            }
        ]
    } satisfies IComponentTokens
}
