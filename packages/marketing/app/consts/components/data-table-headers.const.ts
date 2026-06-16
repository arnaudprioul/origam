/**
 * /components/data-table-headers — full documentation data for OrigamDataTableHeaders.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DataTable/headers.interface.ts   (IDataTableHeadersProps, IDataTableHeadersSlotProps)
 *   - packages/ds/src/components/DataTable/OrigamDataTableHeaders.vue  (template BEM, defineExpose, SCSS)
 *   - packages/ds/tokens/component/data-table.json                (header.* tokens)
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

export const DATA_TABLE_HEADERS_DOC: IComponentDoc = {
    slug: 'data-table-headers',
    name: 'DataTableHeaders',
    tag: 'origam-data-table-headers',
    icon: 'mdi-table-row',
    category: 'Data Display',
    descriptionKey: 'components.catalog.data_table_headers.description',
    descriptionFallback: 'Header row container that renders all column header cells, an optional progress loader, and switches to mobile layout when the breakpoint is reached.',
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
            slug: 'data-table-header-cell',
            name: 'DataTableHeaderCell',
            descriptionKey: 'components.catalog.data_table_header_cell.description',
            descriptionFallback: 'Individual th cell in a DataTable header row with sort support.'
        },
        {
            slug: 'data-table-row',
            name: 'DataTableRow',
            descriptionKey: 'components.catalog.data_table_row.description',
            descriptionFallback: 'Single data row rendering each column cell.'
        },
        {
            slug: 'data-table-rows',
            name: 'DataTableRows',
            descriptionKey: 'components.catalog.data_table_rows.description',
            descriptionFallback: 'Container that iterates items and renders rows, groups, skeletons and empty/loading states.'
        }
    ],

    props: [
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_headers.props.color.description',
            descriptionFallback: 'Foreground colour passed through to each DataTableHeaderCell and to the progress loader.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_headers.props.bg_color.description',
            descriptionFallback: 'Background colour applied to header cells.'
        },
        {
            name: 'sticky',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table_headers.props.sticky.description',
            descriptionFallback: 'Makes the header sticky. Applies the --sticky BEM modifier and position: sticky to all header cells.'
        },
        {
            name: 'disableSort',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table_headers.props.disable_sort.description',
            descriptionFallback: 'Disables sort toggling on all header cells.'
        },
        {
            name: 'multiSort',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table_headers.props.multi_sort.description',
            descriptionFallback: 'Enables multi-column sorting. Passed through to each DataTableHeaderCell.'
        },
        {
            name: 'sortAscIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_headers.props.sort_asc_icon.description',
            descriptionFallback: 'Custom ascending sort icon forwarded to each header cell.'
        },
        {
            name: 'sortDescIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_headers.props.sort_desc_icon.description',
            descriptionFallback: 'Custom descending sort icon forwarded to each header cell.'
        },
        {
            name: 'loading',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table_headers.props.loading.description',
            descriptionFallback: 'When truthy, renders a progress bar in a dedicated row below the header. Accepts true (default line), "skeleton", "circular" or a percentage number.'
        },
        {
            name: 'mobileBreakpoint',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_headers.props.mobile_breakpoint.description',
            descriptionFallback: 'Viewport width threshold below which the mobile header layout is used.'
        },
        {
            name: 'mobile',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table_headers.props.mobile.description',
            descriptionFallback: 'Forces mobile layout regardless of viewport width.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '{ headers, columns, toggleSort, isSorted, sortBy, someSelected, allSelected, selectAll, getSortIcon }',
            descriptionKey: 'components.data_table_headers.slots.default.description',
            descriptionFallback: 'Overrides the desktop (non-mobile) header cell rendering. Receives full sort and selection context.'
        },
        {
            slot: 'mobile',
            slotProps: '{ headers, columns, toggleSort, isSorted, sortBy, someSelected, allSelected, selectAll, getSortIcon }',
            descriptionKey: 'components.data_table_headers.slots.mobile.description',
            descriptionFallback: 'Overrides the mobile header cell rendering (shown when mobile=true or viewport < mobileBreakpoint).'
        },
        {
            slot: 'loader',
            slotProps: '—',
            descriptionKey: 'components.data_table_headers.slots.loader.description',
            descriptionFallback: 'Replaces the default OrigamProgress bar shown during loading. Rendered in a full-width th below the header.'
        }
    ],

    examples: [
        {
            titleKey: 'components.data_table_headers.examples.sticky.title',
            titleFallback: 'Sticky headers (via DataTable)',
            lang: 'vue',
            code: `<template>
  <origam-data-table
    sticky
    :headers="[
      { key: 'id',   title: 'ID',   sortable: true },
      { key: 'name', title: 'Name', sortable: true }
    ]"
    :items="items"
    style="height: 300px; overflow-y: auto;"
  />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-data-table-headers',
        svgViewBox: '0 0 560 140',
        svgTitle: 'Anatomy of OrigamDataTableHeaders',
        svgDesc: 'Schematic of DataTableHeaders with 3 internal parts.',
        svg: `
  <rect x="0" y="0" width="560" height="140" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="16" y="20" width="528" height="44" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="16" y="64" width="528" height="8" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.15))" stroke="none"/>
  <rect x="16" y="64" width="200" height="8" rx="0" fill="var(--origam-color__feedback--info---bg, rgba(8,145,178,0.5))"/>
  <rect x="30" y="28" width="120" height="28" rx="0" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="90" y="46" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">th cell</text>
  <rect x="158" y="28" width="120" height="28" rx="0" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="218" y="46" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">th cell</text>
  <rect x="286" y="28" width="120" height="28" rx="0" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="346" y="46" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">th cell</text>
  <circle cx="24" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="24" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="32" cy="32" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="32" y="36" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="100" cy="64" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="100" y="68" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <line x1="33" y1="28" x2="300" y2="10" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="304" y="13" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-data-table-headers</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-data-table-headers&gt;</code> — 3 parts: root row container ①, individual header cells ②, and optional loader row ③.',
        legend: [
            {
                num: 1,
                cls: '.origam-data-table-headers',
                descriptionKey: 'components.data_table_headers.anatomy.root',
                descriptionFallback: 'Root element rendered by either <code>OrigamDataTableHeadersCell</code> (desktop) or <code>OrigamDataTableHeadersCellMobile</code> (mobile). Has <code>--sticky</code> BEM modifier.'
            },
            {
                num: 2,
                cls: 'DataTableHeadersCell / DataTableHeadersCellMobile',
                descriptionKey: 'components.data_table_headers.anatomy.cells',
                descriptionFallback: 'Desktop renders multi-row <code>&lt;tr&gt;</code> elements with <code>DataTableHeaderCell</code> per column. Mobile renders a single merged row with sort/filter UI.'
            },
            {
                num: 3,
                cls: '.origam-data-table-headers--progress',
                descriptionKey: 'components.data_table_headers.anatomy.progress',
                descriptionFallback: 'Additional <code>&lt;tr&gt;</code> row rendered conditionally when <code>loading</code> is active and loader kind is not "skeleton". Contains a full-width <code>&lt;th&gt;</code> with <code>OrigamProgress</code>.'
            }
        ],
        code: `<!-- desktop (non-mobile) -->
<origam-data-table-headers-cell class="origam-data-table-headers" :headers="headers" />

<!-- mobile -->
<origam-data-table-headers-cell-mobile class="origam-data-table-headers" :columns="columns" />

<!-- loader row (conditional) -->
<tr class="origam-data-table-headers origam-data-table-headers--progress">
  <th :colspan="columns.length" class="origam-data-table-headers__progress-cell">
    <slot name="loader">
      <origam-progress :color="color" type="linear" :active="true" />
    </slot>
  </th>
</tr>`,
        classes: [
            {
                cls: 'origam-data-table-headers',
                descriptionKey: 'components.data_table_headers.anatomy.root',
                descriptionFallback: 'Root class applied to the header cell component (desktop or mobile).'
            },
            {
                cls: 'origam-data-table-headers--sticky',
                descriptionKey: 'components.data_table_headers.anatomy.sticky',
                descriptionFallback: 'Applied when sticky=true. Each header cell gets position: sticky.'
            },
            {
                cls: 'origam-data-table-headers--progress',
                descriptionKey: 'components.data_table_headers.anatomy.progress',
                descriptionFallback: 'Applied to the loader row rendered below the header when loading is active.'
            },
            {
                cls: 'origam-data-table-headers__progress-cell',
                descriptionKey: 'components.data_table_headers.anatomy.progress_cell',
                descriptionFallback: 'Full-width th inside the loader row. No border, no padding, auto height.'
            }
        ]
    },

    cssVars: [
        {
            name: '--origam-data-table-header-cell---color',
            defaultValue: 'var(--origam-color__text---primary)',
            descriptionKey: 'components.data_table_headers.css_vars.color',
            descriptionFallback: 'Default header cell text colour (inherited from DataTableHeaderCell).'
        },
        {
            name: '--origam-data-table-header-cell---background',
            defaultValue: 'var(--origam-color__surface---raised)',
            descriptionKey: 'components.data_table_headers.css_vars.background',
            descriptionFallback: 'Default header cell background (inherited from DataTableHeaderCell).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.data_table_headers.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child header cell components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.data_table_headers.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.data_table_headers.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.data_table_headers.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.data_table_headers.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.data_table_headers.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['rowgroup'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.data_table_headers.a11y.key_tab',
                actionFallback: 'Moves focus through sortable header cells and the select-all checkbox.'
            }
        ],
        notes: [
            {
                noteKey: 'components.data_table_headers.a11y.aria_sort',
                noteFallback: 'Each sortable header cell exposes <code>aria-sort</code> ("ascending", "descending", or "none") on the <code>&lt;th&gt;</code> element.'
            },
            {
                noteKey: 'components.data_table_headers.a11y.loader_note',
                noteFallback: 'When loading, the progress row is inserted inside a <code>&lt;thead&gt;</code> scope, giving screen readers the context that loading is related to the table header.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/data-table.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Header tokens live under the data-table.header namespace.',
        excerpt: [
            {
                tokenPath: 'data-table.header.background-color',
                value: '{color.surface.raised}',
                type: 'color',
                descriptionKey: 'components.data_table_headers.tokens.background_color',
                descriptionFallback: 'Header row background colour.'
            },
            {
                tokenPath: 'data-table.header.border-bottom-color',
                value: '{color.border.default}',
                type: 'color',
                descriptionKey: 'components.data_table_headers.tokens.border_bottom_color',
                descriptionFallback: 'Bottom border separating header from body rows.'
            },
            {
                tokenPath: 'data-table.header.font-weight',
                value: '{font.weight.medium}',
                type: 'fontWeight',
                descriptionKey: 'components.data_table_headers.tokens.font_weight',
                descriptionFallback: 'Column title font weight.'
            },
            {
                tokenPath: 'data-table.header.padding-block',
                value: '{space.3}',
                type: 'dimension',
                descriptionKey: 'components.data_table_headers.tokens.padding_block',
                descriptionFallback: 'Block (top/bottom) padding for header cells.'
            }
        ]
    } satisfies IComponentTokens
}
