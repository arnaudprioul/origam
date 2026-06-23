/**
 * /components/data-table — full documentation data for OrigamDataTable.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DataTable/data-table.interface.ts  (props)
 *   - packages/ds/src/components/DataTable/OrigamDataTable.vue      (template BEM, slots, defineExpose)
 *   - packages/ds/tokens/component/data-table.json                  (CSS tokens)
 *
 * FAMILY (10 sub-components):
 *   OrigamDataTableColumnCell, OrigamDataTableFooter, OrigamDataTableGroupHeaderRow,
 *   OrigamDataTableHeaderCell, OrigamDataTableHeaders, OrigamDataTableHeadersCell,
 *   OrigamDataTableHeadersCellMobile, OrigamDataTableRow, OrigamDataTableRows
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const DATA_TABLE_DOC: IComponentDoc = {
    slug: 'data-table',
    name: 'DataTable',
    tag: 'origam-data-table',
    icon: 'mdi-table',
    category: 'Data Display',
    descriptionKey: 'components.catalog.data_table.description',
    descriptionFallback: 'Feature-rich data table with sorting, multi-sort, grouping, row selection, column pinning, virtual pagination and full slot customisation.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-datatable--design',
    docUrl: 'http://localhost:4000/components/DataTable/OrigamDataTable',

    family: [
        {
            slug: 'data-table-column-cell',
            name: 'DataTableColumnCell',
            descriptionKey: 'components.catalog.data_table_column_cell.description',
            descriptionFallback: 'Body cell (<td>) element with fixed-column support.'
        },
        {
            slug: 'data-table-footer',
            name: 'DataTableFooter',
            descriptionKey: 'components.catalog.data_table_footer.description',
            descriptionFallback: 'Pagination and items-per-page footer bar.'
        },
        {
            slug: 'data-table-group-header-row',
            name: 'DataTableGroupHeaderRow',
            descriptionKey: 'components.catalog.data_table_group_header_row.description',
            descriptionFallback: 'Group header row rendered between groups when groupBy is active.'
        },
        {
            slug: 'data-table-header-cell',
            name: 'DataTableHeaderCell',
            descriptionKey: 'components.catalog.data_table_header_cell.description',
            descriptionFallback: 'Single column header cell (<th>) with sort icon and sort badge.'
        },
        {
            slug: 'data-table-headers',
            name: 'DataTableHeaders',
            descriptionKey: 'components.catalog.data_table_headers.description',
            descriptionFallback: 'Header row renderer — iterates over column definitions to produce <th> cells.'
        },
        {
            slug: 'data-table-row',
            name: 'DataTableRow',
            descriptionKey: 'components.catalog.data_table_row.description',
            descriptionFallback: 'Body row (<tr>) with hover, selected and striped state support.'
        },
        {
            slug: 'data-table-rows',
            name: 'DataTableRows',
            descriptionKey: 'components.catalog.data_table_rows.description',
            descriptionFallback: 'Rows container — renders loading, empty, group and data rows.'
        }
    ],

    related: [
        {
            slug: 'data-list',
            name: 'DataList',
            kind: 'component',
            descriptionKey: 'components.catalog.data_list.description',
            descriptionFallback: 'Semantic description list. Use for key/value or avatar layouts, not tabular data.'
        },
        {
            slug: 'table',
            name: 'Table',
            kind: 'component',
            descriptionKey: 'components.catalog.table.description',
            descriptionFallback: 'Plain semantic <table> without built-in sorting or pagination.'
        },
        {
            slug: 'pagination',
            name: 'Pagination',
            kind: 'component',
            descriptionKey: 'components.catalog.pagination.description',
            descriptionFallback: 'Standalone pagination control also used inside DataTable footer.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'hideDefaultBody',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table.props.hide_default_body.description',
            descriptionFallback: 'Suppresses the built-in tbody. Use when you want to render rows manually via the #body slot.'
        },
        {
            name: 'hideDefaultFooter',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table.props.hide_default_footer.description',
            descriptionFallback: 'Suppresses the built-in pagination footer.'
        },
        {
            name: 'hideDefaultHeader',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table.props.hide_default_header.description',
            descriptionFallback: 'Suppresses the built-in header row. Use when you need a fully custom header via the #header slot.'
        },
        {
            name: 'search',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table.props.search.description',
            descriptionFallback: 'Client-side search string. Filters rows based on cell values. Use @query + server-side filtering for large datasets.'
        },
        // ── IDataTableItemsProps ───────────────────────────────────────
        {
            name: 'items',
            type: { label: 'Array<IDataTableItem>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.data_table.props.items.description',
            descriptionFallback: 'Data source. Each element should be a plain object. Pass returnObject=true to receive the original object in emits.'
        },
        {
            name: 'itemValue',
            type: { label: 'TSelectItemKey', slug: '', kind: 'primitive' },
            defaultValue: "'id'",
            descriptionKey: 'components.data_table.props.item_value.description',
            descriptionFallback: 'Key path used to derive the unique identifier for each row (for selection and expansion state).'
        },
        {
            name: 'returnObject',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table.props.return_object.description',
            descriptionFallback: 'When true, selection emits return the original objects rather than the itemValue keys.'
        },
        {
            name: 'rowProps',
            type: { label: 'TDataTableRow', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table.props.row_props.description',
            descriptionFallback: 'Props or prop factory applied to every data row element.'
        },
        {
            name: 'cellProps',
            type: { label: 'TDataTableCell', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table.props.cell_props.description',
            descriptionFallback: 'Props or prop factory applied to every body cell element.'
        },
        // ── IDataTableHeadersProps ─────────────────────────────────────
        {
            name: 'headers',
            type: { label: 'Array<IInternalDataTableHeader[]>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table.props.headers.description',
            descriptionFallback: 'Column definitions. Each object: { key, title, sortable, align, width, fixed, … }.'
        },
        // ── IDataTableSortProps ────────────────────────────────────────
        {
            name: 'sortBy',
            type: { label: 'Array<IDataTableSortItem>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.data_table.props.sort_by.description',
            descriptionFallback: 'Active sort columns. Each entry: { key: string, order: "asc" | "desc" }.'
        },
        {
            name: 'multiSort',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table.props.multi_sort.description',
            descriptionFallback: 'Enables sorting by multiple columns simultaneously. Sort priority shown via badge on header cells.'
        },
        {
            name: 'mustSort',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table.props.must_sort.description',
            descriptionFallback: 'When true, the last active sort column cannot be unsorted — cycling is asc → desc → asc.'
        },
        {
            name: 'customKeySort',
            type: { label: 'TDataTableCompareFunction', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table.props.custom_key_sort.description',
            descriptionFallback: 'Custom compare function for key-based sorting.'
        },
        // ── IDataTableSelectProps ──────────────────────────────────────
        {
            name: 'showSelect',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table.props.show_select.description',
            descriptionFallback: 'Prepends a checkbox column for row selection.'
        },
        {
            name: 'modelValue',
            type: { label: 'Array<any>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.data_table.props.model_value.description',
            descriptionFallback: 'v-model for selected row keys (or objects if returnObject=true).'
        },
        {
            name: 'selectStrategy',
            type: { label: "TDataTableSelectStrategy", slug: '', kind: 'primitive' },
            defaultValue: "'page'",
            descriptionKey: 'components.data_table.props.select_strategy.description',
            descriptionFallback: "Selection scope when clicking 'select all': 'page' selects only visible page rows; 'all' selects every row."
        },
        // ── IDataTableExpandProps ──────────────────────────────────────
        {
            name: 'expandOnClick',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table.props.expand_on_click.description',
            descriptionFallback: 'Clicking a row toggles its expansion state.'
        },
        {
            name: 'expanded',
            type: { label: 'ReadonlySet<unknown>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table.props.expanded.description',
            descriptionFallback: 'Set of row keys that are currently expanded.'
        },
        // ── IDataTableGroupProps ───────────────────────────────────────
        {
            name: 'groupBy',
            type: { label: 'Array<IDataTableSortItem>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.data_table.props.group_by.description',
            descriptionFallback: 'Column keys to group rows by. Groups are collapsible.'
        },
        // ── IDataTablePaginationProps ──────────────────────────────────
        {
            name: 'page',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '1',
            descriptionKey: 'components.data_table.props.page.description',
            descriptionFallback: 'Current page index (1-based).'
        },
        {
            name: 'itemsPerPage',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '10',
            descriptionKey: 'components.data_table.props.items_per_page.description',
            descriptionFallback: 'Number of rows per page.'
        },
        // ── ITableProps / visual ───────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.data_table.props.density.description',
            descriptionFallback: 'Vertical padding density of header and body cells.'
        },
        {
            name: 'hover',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table.props.hover.description',
            descriptionFallback: 'Enables hover highlight on rows.'
        },
        {
            name: 'fixedHeader',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table.props.fixed_header.description',
            descriptionFallback: 'Sticks the header row to the top when the table container is scrolled.'
        },
        {
            name: 'fixedFooter',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table.props.fixed_footer.description',
            descriptionFallback: 'Sticks the footer to the bottom of the scrollable container.'
        },
        {
            name: 'loading',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table.props.loading.description',
            descriptionFallback: 'Shows a loading overlay on the table. Dims existing data rows to 50% opacity.'
        },
        {
            name: 'noDataText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'No data available'",
            descriptionKey: 'components.data_table.props.no_data_text.description',
            descriptionFallback: 'Text shown in the empty state row when items is empty.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table.props.height.description',
            descriptionFallback: 'Fixed table container height. Enables vertical scrolling when set.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table.props.color.description',
            descriptionFallback: 'Intent or custom colour applied to selected rows and interactive states.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'Array<any>', slug: '', kind: 'primitive' },
            descriptionKey: 'components.data_table.emits.update_model_value.description',
            descriptionFallback: 'Fired when the selection changes.'
        },
        {
            event: 'update:page',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.data_table.emits.update_page.description',
            descriptionFallback: 'Fired when the current page changes.'
        },
        {
            event: 'update:itemsPerPage',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.data_table.emits.update_items_per_page.description',
            descriptionFallback: 'Fired when the items-per-page setting changes.'
        },
        {
            event: 'update:sortBy',
            payload: { label: 'Array<IDataTableSortItem>', slug: '', kind: 'primitive' },
            descriptionKey: 'components.data_table.emits.update_sort_by.description',
            descriptionFallback: 'Fired when the sort configuration changes. Use for server-side sorting.'
        },
        {
            event: 'update:groupBy',
            payload: { label: 'Array<IDataTableSortItem>', slug: '', kind: 'primitive' },
            descriptionKey: 'components.data_table.emits.update_group_by.description',
            descriptionFallback: 'Fired when the group-by configuration changes.'
        },
        {
            event: 'update:expanded',
            payload: { label: 'ReadonlySet<unknown>', slug: '', kind: 'primitive' },
            descriptionKey: 'components.data_table.emits.update_expanded.description',
            descriptionFallback: 'Fired when expanded rows change.'
        },
        {
            event: 'update:options',
            payload: { label: 'Record<string, unknown>', slug: '', kind: 'primitive' },
            descriptionKey: 'components.data_table.emits.update_options.description',
            descriptionFallback: 'Fired after any pagination, sort or group-by change. Bundles all current options in one payload.'
        },
        {
            event: 'update:currentItems',
            payload: { label: 'Array<IDataTableItem>', slug: '', kind: 'primitive' },
            descriptionKey: 'components.data_table.emits.update_current_items.description',
            descriptionFallback: 'Fired after filtering/pagination. Use to count total server-side items.'
        }
    ],

    slots: [
        {
            slot: 'top',
            slotProps: '—',
            descriptionKey: 'components.data_table.slots.top.description',
            descriptionFallback: 'Rendered above the table element. Use for search bars, toolbar, etc.'
        },
        {
            slot: 'default',
            slotProps: 'IDataTableSlotProps<T>',
            descriptionKey: 'components.data_table.slots.default.description',
            descriptionFallback: 'Full override of the table element content. Receives the full slot props bag.'
        },
        {
            slot: 'colgroup',
            slotProps: 'IDataTableSlotProps<T>',
            descriptionKey: 'components.data_table.slots.colgroup.description',
            descriptionFallback: 'Inject a <colgroup> before the header for custom column widths.'
        },
        {
            slot: 'header',
            slotProps: '{ columns: IInternalDataTableHeader[] }',
            descriptionKey: 'components.data_table.slots.header.description',
            descriptionFallback: 'Custom header row renderer. Replaces all auto-generated <th> cells.'
        },
        {
            slot: 'header.mobile',
            slotProps: '{ columns: IInternalDataTableHeader[] }',
            descriptionKey: 'components.data_table.slots.header_mobile.description',
            descriptionFallback: 'Custom header for mobile (stacked) layout.'
        },
        {
            slot: 'header.loader',
            slotProps: '—',
            descriptionKey: 'components.data_table.slots.header_loader.description',
            descriptionFallback: 'Custom loading progress bar inside the header.'
        },
        {
            slot: 'prepend',
            slotProps: 'IDataTableSlotProps<T>',
            descriptionKey: 'components.data_table.slots.prepend.description',
            descriptionFallback: 'Rows inserted before the data rows (inside <tbody>).'
        },
        {
            slot: 'body',
            slotProps: 'IDataTableSlotProps<T>',
            descriptionKey: 'components.data_table.slots.body.description',
            descriptionFallback: 'Full body override. Replaces the OrigamDataTableRows renderer.'
        },
        {
            slot: 'append',
            slotProps: 'IDataTableSlotProps<T>',
            descriptionKey: 'components.data_table.slots.append.description',
            descriptionFallback: 'Rows inserted after the data rows (inside <tbody>).'
        },
        {
            slot: 'bottom',
            slotProps: 'IDataTableSlotProps<T>',
            descriptionKey: 'components.data_table.slots.bottom.description',
            descriptionFallback: 'Rendered below the table element. Defaults to OrigamDataTableFooter (pagination). Override to customise pagination.'
        }
    ],

    examples: [
        {
            titleKey: 'components.data_table.examples.basic.title',
            titleFallback: 'Basic data table',
            lang: 'vue',
            code: `<template>
  <origam-data-table :headers="headers" :items="users" item-value="id" />
</template>

<script setup lang="ts">
  const headers = [
    { key: 'name',  title: 'Name',  sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { key: 'role',  title: 'Role'  }
  ]
  const users = [
    { id: 1, name: 'Alice',   email: 'alice@example.com',   role: 'Admin' },
    { id: 2, name: 'Bob',     email: 'bob@example.com',     role: 'User' }
  ]
</script>`
        },
        {
            titleKey: 'components.data_table.examples.selection.title',
            titleFallback: 'Row selection',
            lang: 'vue',
            code: `<template>
  <origam-data-table
    v-model="selected"
    :headers="headers"
    :items="items"
    show-select
    item-value="id"
  />
  <p>Selected: {{ selected }}</p>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const selected = ref([])
</script>`
        },
        {
            titleKey: 'components.data_table.examples.server.title',
            titleFallback: 'Server-side sorting & pagination',
            lang: 'vue',
            code: `<template>
  <origam-data-table
    :headers="headers"
    :items="serverItems"
    :loading="loading"
    :items-per-page="pageSize"
    :page="currentPage"
    @update:options="onOptionsChange"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const serverItems = ref([])
  const loading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)

  async function onOptionsChange(opts) {
    loading.value = true
    serverItems.value = await fetchPage(opts)
    loading.value = false
  }
</script>`
        }
    ],

    /* previewVariants intentionally absent — DataTable requires headers + items
       to not throw during SSR (useDataTableHeaders crashes on empty headers[0]).
       The playground section provides the live demo. */

    anatomy: {
        rootClass: 'origam-data-table',
        svgViewBox: '0 0 700 300',
        svgTitle: 'Anatomy of OrigamDataTable',
        svgDesc: 'Schematic of the DataTable component with numbered internal regions.',
        svg: `
  <rect x="0" y="0" width="700" height="300" fill="var(--origam-color__surface---sunken, #f9fafb)" rx="4"/>
  <rect x="20" y="20" width="660" height="260" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.1))" stroke-width="1.5"/>
  <circle cx="36" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <rect x="20" y="38" width="660" height="38" rx="0" fill="var(--origam-color__surface---raised, #1e1e2e)" stroke="none"/>
  <circle cx="36" cy="57" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="36" y="61.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <text x="80" y="61" font-size="10" fill="#fff" font-family="system-ui" font-weight="600">Name</text>
  <text x="260" y="61" font-size="10" fill="#fff" font-family="system-ui" font-weight="600">Email</text>
  <text x="500" y="61" font-size="10" fill="#fff" font-family="system-ui" font-weight="600">Role</text>
  <rect x="20" y="76" width="660" height="44" rx="0" fill="var(--origam-color__surface---raised, #f0f0f0)"/>
  <circle cx="36" cy="98" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="102.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <text x="80" y="102" font-size="10" fill="var(--origam-color__text---primary, #222)" font-family="system-ui">Alice Martin</text>
  <text x="260" y="102" font-size="10" fill="var(--origam-color__text---primary, #222)" font-family="system-ui">alice@example.com</text>
  <text x="500" y="102" font-size="10" fill="var(--origam-color__text---primary, #222)" font-family="system-ui">Admin</text>
  <rect x="20" y="120" width="660" height="44" rx="0" fill="none"/>
  <circle cx="36" cy="142" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="146.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <text x="80" y="146" font-size="10" fill="var(--origam-color__text---primary, #222)" font-family="system-ui">Bob Smith</text>
  <line x1="20" y1="164" x2="680" y2="164" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.08))" stroke-width="1"/>
  <rect x="20" y="248" width="660" height="32" rx="0" fill="var(--origam-color__surface---default, #fafafa)" stroke="none"/>
  <line x1="20" y1="248" x2="680" y2="248" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.1))" stroke-width="1"/>
  <circle cx="36" cy="264" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="36" y="268.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <text x="580" y="268" font-size="10" fill="var(--origam-color__text---secondary, #555)" font-family="system-ui">1-10 of 52  &lt; 1 2 3 &gt;</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-data-table&gt;</code> — 4 main regions: root wrapper ①, header row ②, body rows ③ and pagination footer ④. Sub-components handle each region independently.`,
        legend: [
            {
                num: 1,
                cls: '.origam-data-table',
                descriptionKey: 'components.data_table.anatomy.root',
                descriptionFallback: 'Root wrapper. Provides background, border-collapse, width=100%. Contains OrigamTable as the semantic <table>.'
            },
            {
                num: 2,
                cls: '.origam-data-table-header-cell (<th>)',
                descriptionKey: 'components.data_table.anatomy.header_cell',
                descriptionFallback: 'Column header cell (OrigamDataTableHeaderCell). Dark background from header.background-color token. Sortable headers show a sort icon (opacity-based reveal on hover/active).'
            },
            {
                num: 3,
                cls: '.origam-data-table-row (<tr>)',
                descriptionKey: 'components.data_table.anatomy.row',
                descriptionFallback: 'Body row (OrigamDataTableRow). Alternating background for striped variant. Hover background from row.hover-background-color token. Selected rows use row.selected-background-color.'
            },
            {
                num: 4,
                cls: '.origam-data-table-footer',
                descriptionKey: 'components.data_table.anatomy.footer',
                descriptionFallback: 'Footer bar (OrigamDataTableFooter). Hosts items-per-page select, "x-y of z" info and pagination control. Fixed or inline depending on fixedFooter prop.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-data-table">
  <!-- slot: #top -->
  <table class="origam-data-table__table">
    <thead>
      <!-- OrigamDataTableHeaders -->
      <tr>
        <th class="origam-data-table-header-cell origam-data-table-header-cell--sortable">
          Name
          <span class="origam-data-table-header-cell__sort-icon" />
        </th>
        <!-- … more <th> … -->
      </tr>
    </thead>
    <tbody>
      <!-- OrigamDataTableRows → OrigamDataTableRow → OrigamDataTableColumnCell -->
      <tr class="origam-data-table-row">
        <td class="origam-data-table-cell">Alice Martin</td>
        <!-- … more <td> … -->
      </tr>
    </tbody>
  </table>
  <!-- slot: #bottom → OrigamDataTableFooter -->
  <div class="origam-data-table-footer">…</div>
</div>`,
        classes: [
            { cls: 'origam-data-table', descriptionKey: 'components.data_table.anatomy.root', descriptionFallback: 'Root wrapper.' },
            { cls: 'origam-data-table--show-select', descriptionKey: 'components.data_table.anatomy.show_select', descriptionFallback: 'Applied when showSelect=true. Adds checkbox column.' },
            { cls: 'origam-data-table--loading', descriptionKey: 'components.data_table.anatomy.loading', descriptionFallback: 'Applied when loading=true. Dims data cells to 50% opacity.' },
            { cls: 'origam-data-table-header-cell', descriptionKey: 'components.data_table.anatomy.header_cell', descriptionFallback: 'Column <th> element.' },
            { cls: 'origam-data-table-header-cell--sortable', descriptionKey: 'components.data_table.anatomy.header_cell_sortable', descriptionFallback: 'Applied to sortable column headers (cursor: pointer).' },
            { cls: 'origam-data-table-row', descriptionKey: 'components.data_table.anatomy.row', descriptionFallback: 'Body <tr> element.' },
            { cls: 'origam-data-table-cell', descriptionKey: 'components.data_table.anatomy.cell', descriptionFallback: 'Body <td> element.' },
            { cls: 'origam-data-table-cell--fixed', descriptionKey: 'components.data_table.anatomy.cell_fixed', descriptionFallback: 'Applied to sticky-column cells (position: sticky).' },
            { cls: 'origam-data-table-footer', descriptionKey: 'components.data_table.anatomy.footer', descriptionFallback: 'Pagination footer element.' },
            { cls: 'origam-data-table-group-header-row', descriptionKey: 'components.data_table.anatomy.group_header', descriptionFallback: 'Group header <tr> rendered between groups.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-data-table---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.data_table.css_vars.background_color',
            descriptionFallback: 'Table root background colour.'
        },
        {
            name: '--origam-data-table---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.data_table.css_vars.color',
            descriptionFallback: 'Table root foreground colour.'
        },
        {
            name: '--origam-data-table---font-size',
            defaultValue: '{font.size.md}',
            descriptionKey: 'components.data_table.css_vars.font_size',
            descriptionFallback: 'Base font size for body cells.'
        },
        {
            name: '--origam-data-table__header---background-color',
            defaultValue: '{color.surface.raised}',
            descriptionKey: 'components.data_table.css_vars.header_background_color',
            descriptionFallback: 'Header row background colour.'
        },
        {
            name: '--origam-data-table__header---color',
            defaultValue: '{color.text.inverse}',
            descriptionKey: 'components.data_table.css_vars.header_color',
            descriptionFallback: 'Header row text colour.'
        },
        {
            name: '--origam-data-table__row---hover-background-color',
            defaultValue: '{color.surface.overlay}',
            descriptionKey: 'components.data_table.css_vars.row_hover_background_color',
            descriptionFallback: 'Row background on hover.'
        },
        {
            name: '--origam-data-table__row---selected-background-color',
            defaultValue: '{color.surface.overlay}',
            descriptionKey: 'components.data_table.css_vars.row_selected_background_color',
            descriptionFallback: 'Row background when selected.'
        },
        {
            name: '--origam-data-table__row---border-bottom-color',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.data_table.css_vars.row_border_bottom_color',
            descriptionFallback: 'Bottom border colour separating rows.'
        },
        {
            name: '--origam-data-table--loading---opacity',
            defaultValue: '{opacity.50}',
            descriptionKey: 'components.data_table.css_vars.loading_opacity',
            descriptionFallback: 'Data cells opacity while loading=true.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.data_table.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.data_table.exposed.css',
            descriptionFallback: 'Reactive CSS string for the injected style sheet.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.data_table.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.data_table.exposed.load',
            descriptionFallback: 'Injects the style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.data_table.exposed.unload',
            descriptionFallback: 'Removes the style sheet from the document.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.data_table.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['table', 'rowheader', 'columnheader', 'row', 'cell'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.data_table.a11y.key_tab',
                actionFallback: 'Move focus between header sort buttons, checkboxes and pagination controls.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.data_table.a11y.key_sort',
                actionFallback: 'Activate a sortable column header to sort ascending, then descending.'
            }
        ],
        notes: [
            {
                noteKey: 'components.data_table.a11y.table_note',
                noteFallback: 'The table renders as a semantic <table> with proper <thead>, <tbody>, <tr>, <th> (scope="col") and <td>. Screen readers can announce the table structure natively.'
            },
            {
                noteKey: 'components.data_table.a11y.sort_note',
                noteFallback: 'Sortable header cells use aria-sort="ascending" | "descending" | "none". Sort direction changes are announced by screen readers without additional ARIA live regions.'
            },
            {
                noteKey: 'components.data_table.a11y.select_note',
                noteFallback: 'Row checkboxes have aria-label describing the row (e.g. "Select row Alice Martin"). The select-all checkbox uses aria-label="Select all".'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/data-table.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'data-table.background-color',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.data_table.tokens.background_color',
                descriptionFallback: 'Table root background.'
            },
            {
                tokenPath: 'data-table.header.background-color',
                value: '{color.surface.raised}',
                type: 'color',
                descriptionKey: 'components.data_table.tokens.header_background_color',
                descriptionFallback: 'Header row background.'
            },
            {
                tokenPath: 'data-table.row.hover-background-color',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.data_table.tokens.row_hover_background_color',
                descriptionFallback: 'Row hover background.'
            },
            {
                tokenPath: 'data-table.row.striped-background-color',
                value: '{color.surface.sunken}',
                type: 'color',
                descriptionKey: 'components.data_table.tokens.row_striped_background_color',
                descriptionFallback: 'Even row background in striped variant.'
            },
            {
                tokenPath: 'data-table.loading.opacity',
                value: '{opacity.50}',
                type: 'number',
                descriptionKey: 'components.data_table.tokens.loading_opacity',
                descriptionFallback: 'Opacity of data cells while loading.'
            },
            {
                tokenPath: 'data-table.header.sort-icon.opacity',
                value: '{opacity.0}',
                type: 'number',
                descriptionKey: 'components.data_table.tokens.sort_icon_opacity',
                descriptionFallback: 'Sort icon default opacity (hidden at rest, revealed on hover/active).'
            }
        ]
    } satisfies IComponentTokens,

    /* playground intentionally absent — DataTable requires non-trivial headers + items
       to render without a SSR crash (useDataTableHeaders reads headers[0] during setup).
       The examples section demonstrates the full API instead. */
}
