/**
 * /components/data-table-header-cell — full documentation data for OrigamDataTableHeaderCell.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DataTable/headers.interface.ts   (IDataTableHeaderCellProps)
 *   - packages/ds/src/components/DataTable/OrigamDataTableHeaderCell.vue  (template BEM, defineExpose, SCSS)
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

export const DATA_TABLE_HEADER_CELL_DOC: IComponentDoc = {
    slug: 'data-table-header-cell',
    name: 'DataTableHeaderCell',
    tag: 'origam-data-table-header-cell',
    icon: 'mdi-table-column',
    category: 'Data Display',
    descriptionKey: 'components.catalog.data_table_header_cell.description',
    descriptionFallback: 'Individual <th> cell in a DataTable header row. Handles sort toggling, multi-sort badge, fixed column positioning and select-all checkbox.',
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
            slug: 'data-table-headers',
            name: 'DataTableHeaders',
            descriptionKey: 'components.catalog.data_table_headers.description',
            descriptionFallback: 'Header row container that renders all header cells and an optional loader.'
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

    related: [
        {
            slug: 'data-table-column-cell',
            name: 'DataTableColumnCell',
            kind: 'component',
            descriptionKey: 'components.catalog.data_table_column_cell.description',
            descriptionFallback: 'Generic cell wrapper used internally by DataTableHeaderCell.'
        },
        {
            slug: 'checkbox-btn',
            name: 'CheckboxBtn',
            kind: 'component',
            descriptionKey: 'components.catalog.checkbox_btn.description',
            descriptionFallback: 'Select-all checkbox rendered inside the header cell for the data-table-select column.'
        }
    ],

    props: [
        {
            name: 'column',
            type: { label: 'IInternalDataTableHeader', slug: '', kind: 'primitive' },
            defaultValue: 'required',
            required: true,
            descriptionKey: 'components.data_table_header_cell.props.column.description',
            descriptionFallback: 'The internal header descriptor for this column. Contains key, title, sortable, fixed, width, minWidth, maxWidth, align, colspan, rowspan and more.'
        },
        {
            name: 'x',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'required',
            required: true,
            descriptionKey: 'components.data_table_header_cell.props.x.description',
            descriptionFallback: 'Column index (zero-based). Used internally by the header rendering logic.'
        },
        {
            name: 'y',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'required',
            required: true,
            descriptionKey: 'components.data_table_header_cell.props.y.description',
            descriptionFallback: 'Row index (zero-based). Used to compute sticky top offset: calc(--origam-table-header-height * y).'
        },
        {
            name: 'disableSort',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table_header_cell.props.disable_sort.description',
            descriptionFallback: 'Disables sort toggling on all header cells. Overrides column.sortable.'
        },
        {
            name: 'multiSort',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table_header_cell.props.multi_sort.description',
            descriptionFallback: 'Enables multi-column sorting. When active, a numbered badge is shown next to the sort icon indicating sort priority.'
        },
        {
            name: 'sticky',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table_header_cell.props.sticky.description',
            descriptionFallback: 'Makes the header sticky (position: sticky; top: calc(--origam-table-header-height * y)).'
        },
        {
            name: 'sortAscIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_header_cell.props.sort_asc_icon.description',
            descriptionFallback: 'Icon displayed when the column is sorted ascending.'
        },
        {
            name: 'sortDescIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_header_cell.props.sort_desc_icon.description',
            descriptionFallback: 'Icon displayed when the column is sorted descending.'
        },
        {
            name: 'headerProps',
            type: { label: 'object', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_header_cell.props.header_props.description',
            descriptionFallback: 'Additional attributes merged onto the underlying DataTableColumnCell element.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_header_cell.props.color.description',
            descriptionFallback: 'Foreground (text + icon) colour applied to the header cell via useBothColor.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_header_cell.props.bg_color.description',
            descriptionFallback: 'Background colour applied to the header cell surface.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'header.{key}',
            slotProps: '{ column, selectAll, isSorted, toggleSort, sortBy, someSelected, allSelected, getSortIcon }',
            descriptionKey: 'components.data_table_header_cell.slots.header_key.description',
            descriptionFallback: 'Per-column header slot. The slot name is dynamic: header.{column.key}. Overrides the default title + sort icon rendering.'
        }
    ],

    examples: [
        {
            titleKey: 'components.data_table_header_cell.examples.sortable.title',
            titleFallback: 'Sortable header cell (via DataTable)',
            lang: 'vue',
            code: `<template>
  <origam-data-table
    :headers="[
      { key: 'name', title: 'Name', sortable: true },
      { key: 'age',  title: 'Age',  sortable: true }
    ]"
    :items="[{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }]"
  />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-data-table-header-cell',
        svgViewBox: '0 0 560 140',
        svgTitle: 'Anatomy of OrigamDataTableHeaderCell',
        svgDesc: 'Schematic of DataTableHeaderCell with 4 internal parts.',
        svg: `
  <rect x="0" y="0" width="560" height="140" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="16" y="28" width="528" height="84" rx="0" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="16" y="28" width="528" height="84" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.05))"/>
  <rect x="28" y="44" width="300" height="36" rx="2" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="80" y="67" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">Column Title</text>
  <rect x="196" y="52" width="20" height="20" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))"/>
  <text x="206" y="65" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">↑</text>
  <rect x="220" y="52" width="20" height="20" rx="10" fill="var(--origam-color__border---default, rgba(168,85,247,0.20))"/>
  <text x="230" y="65" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">1</text>
  <rect x="16" y="100" width="528" height="4" fill="var(--origam-color__border---default, rgba(168,85,247,0.25))"/>
  <circle cx="24" cy="36" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="24" y="40" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="34" cy="62" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="34" y="66" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="200" cy="52" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="200" y="56" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="224" cy="52" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="224" y="56" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <line x1="33" y1="36" x2="320" y2="14" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="324" y="17" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-data-table-header-cell</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-data-table-header-cell&gt;</code> — 4 parts: th root ①, content wrapper ②, sort icon ③, multi-sort badge ④.',
        legend: [
            {
                num: 1,
                cls: '.origam-data-table-header-cell',
                descriptionKey: 'components.data_table_header_cell.anatomy.root',
                descriptionFallback: 'Root <code>&lt;th&gt;</code> element rendered via <code>OrigamDataTableColumnCell tag="th"</code>. Has <code>--sortable</code> and <code>--sorted</code> BEM modifiers and <code>--fixed</code> when the column is pinned.'
            },
            {
                num: 2,
                cls: '.origam-data-table-header-cell__content',
                descriptionKey: 'components.data_table_header_cell.anatomy.content',
                descriptionFallback: 'Flex row containing the column title span, sort icon and optional multi-sort badge.'
            },
            {
                num: 3,
                cls: '.origam-data-table-header-cell__sort-icon',
                descriptionKey: 'components.data_table_header_cell.anatomy.sort_icon',
                descriptionFallback: '<code>OrigamIcon</code> shown when <code>column.sortable && !disableSort</code>. Opacity 0 at rest, 0.5 on hover, 1 when sorted. Has <code>--active</code> modifier.'
            },
            {
                num: 4,
                cls: '.origam-data-table-header-cell__sort-badge',
                descriptionKey: 'components.data_table_header_cell.anatomy.sort_badge',
                descriptionFallback: 'Pill badge showing the sort priority index when <code>multiSort=true</code> and the column is sorted.'
            }
        ],
        code: `<origam-data-table-column-cell tag="th" class="origam-data-table-header-cell">
  <slot :name="\`header.\${column.key}\`" v-bind="slotProps">
    <!-- select-all checkbox (data-table-select column only) -->
    <origam-checkbox-btn v-if="hasColumn('data-table-select')" />
    <!-- regular title + sort icon -->
    <div v-else class="origam-data-table-header-cell__content">
      <span>{{ column.title }}</span>
      <origam-icon class="origam-data-table-header-cell__sort-icon" />
      <!-- multi-sort badge -->
      <div class="origam-data-table-header-cell__sort-badge">{{ sortIndex }}</div>
    </div>
  </slot>
</origam-data-table-column-cell>`,
        classes: [
            {
                cls: 'origam-data-table-header-cell',
                descriptionKey: 'components.data_table_header_cell.anatomy.root',
                descriptionFallback: 'Root th element.'
            },
            {
                cls: 'origam-data-table-header-cell--sortable',
                descriptionKey: 'components.data_table_header_cell.anatomy.sortable',
                descriptionFallback: 'Applied when column.sortable=true and disableSort=false. Sets cursor: pointer.'
            },
            {
                cls: 'origam-data-table-header-cell--sorted',
                descriptionKey: 'components.data_table_header_cell.anatomy.sorted',
                descriptionFallback: 'Applied when the column is actively used in the sort. Sets sort icon opacity to 1.'
            },
            {
                cls: 'origam-data-table-header-cell--fixed',
                descriptionKey: 'components.data_table_header_cell.anatomy.fixed',
                descriptionFallback: 'Applied when column.fixed=true. Column is sticky-positioned at fixedOffset.'
            },
            {
                cls: 'origam-data-table-header-cell__content',
                descriptionKey: 'components.data_table_header_cell.anatomy.content',
                descriptionFallback: 'Flex row — title, sort icon, and badge.'
            },
            {
                cls: 'origam-data-table-header-cell__sort-icon',
                descriptionKey: 'components.data_table_header_cell.anatomy.sort_icon',
                descriptionFallback: 'Sort direction icon. Opacity controlled by hover/sorted state.'
            },
            {
                cls: 'origam-data-table-header-cell__sort-icon--active',
                descriptionKey: 'components.data_table_header_cell.anatomy.sort_icon_active',
                descriptionFallback: 'Modifier applied when the column is actively sorted.'
            },
            {
                cls: 'origam-data-table-header-cell__sort-badge',
                descriptionKey: 'components.data_table_header_cell.anatomy.sort_badge',
                descriptionFallback: 'Multi-sort priority badge (20x20px pill).'
            }
        ]
    },

    cssVars: [
        {
            name: '--origam-data-table-header-cell---color',
            defaultValue: 'var(--origam-color__text---primary)',
            descriptionKey: 'components.data_table_header_cell.css_vars.color',
            descriptionFallback: 'Header cell text colour.'
        },
        {
            name: '--origam-data-table-header-cell---background',
            defaultValue: 'var(--origam-color__surface---raised)',
            descriptionKey: 'components.data_table_header_cell.css_vars.background',
            descriptionFallback: 'Header cell background applied via the inner :deep(.origam-data-table-cell) rule.'
        },
        {
            name: '--origam-data-table-header-cell__sort-icon---opacity',
            defaultValue: '0',
            descriptionKey: 'components.data_table_header_cell.css_vars.sort_icon_opacity',
            descriptionFallback: 'Sort icon opacity at rest (hidden).'
        },
        {
            name: '--origam-data-table-header-cell__sort-icon---opacity-hover',
            defaultValue: '0.5',
            descriptionKey: 'components.data_table_header_cell.css_vars.sort_icon_opacity_hover',
            descriptionFallback: 'Sort icon opacity on column hover.'
        },
        {
            name: '--origam-data-table-header-cell__sort-icon---opacity-active',
            defaultValue: '1',
            descriptionKey: 'components.data_table_header_cell.css_vars.sort_icon_opacity_active',
            descriptionFallback: 'Sort icon opacity when the column is actively sorted.'
        },
        {
            name: '--origam-data-table-header-cell__sort-icon---color',
            defaultValue: 'var(--origam-color__text---primary)',
            descriptionKey: 'components.data_table_header_cell.css_vars.sort_icon_color',
            descriptionFallback: 'Sort icon colour at rest.'
        },
        {
            name: '--origam-data-table-header-cell__sort-badge---background',
            defaultValue: 'var(--origam-color__border---default)',
            descriptionKey: 'components.data_table_header_cell.css_vars.sort_badge_background',
            descriptionFallback: 'Sort priority badge background.'
        },
        {
            name: '--origam-data-table-header-cell__sort-badge---font-size',
            defaultValue: '0.875rem',
            descriptionKey: 'components.data_table_header_cell.css_vars.sort_badge_font_size',
            descriptionFallback: 'Sort badge font size.'
        },
        {
            name: '--origam-data-table-header-cell__content---gap',
            defaultValue: '4px',
            descriptionKey: 'components.data_table_header_cell.css_vars.content_gap',
            descriptionFallback: 'Gap between title, sort icon and badge in the content row.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.data_table_header_cell.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.data_table_header_cell.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.data_table_header_cell.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.data_table_header_cell.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.data_table_header_cell.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.data_table_header_cell.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Click / Enter',
                actionKey: 'components.data_table_header_cell.a11y.key_sort',
                actionFallback: 'Toggles the sort direction on sortable columns.'
            }
        ],
        notes: [
            {
                noteKey: 'components.data_table_header_cell.a11y.aria_sort',
                noteFallback: 'Sortable columns expose <code>aria-sort="ascending"</code>, <code>aria-sort="descending"</code> or <code>aria-sort="none"</code> on the <code>&lt;th&gt;</code> element via the <code>:aria-sort</code> binding.'
            },
            {
                noteKey: 'components.data_table_header_cell.a11y.select_all',
                noteFallback: 'When <code>column.key === "data-table-select"</code>, an <code>OrigamCheckboxBtn</code> with indeterminate state is rendered for accessible select-all interaction.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/data-table.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Header cell tokens live under the data-table.header namespace.',
        excerpt: [
            {
                tokenPath: 'data-table.header.background-color',
                value: '{color.surface.raised}',
                type: 'color',
                descriptionKey: 'components.data_table_header_cell.tokens.background_color',
                descriptionFallback: 'Header cell background — neutral.0 light / neutral.900 dark.'
            },
            {
                tokenPath: 'data-table.header.color',
                value: '{color.text.inverse}',
                type: 'color',
                descriptionKey: 'components.data_table_header_cell.tokens.color',
                descriptionFallback: 'Header cell text colour.'
            },
            {
                tokenPath: 'data-table.header.font-weight',
                value: '{font.weight.medium}',
                type: 'fontWeight',
                descriptionKey: 'components.data_table_header_cell.tokens.font_weight',
                descriptionFallback: 'Column title font weight.'
            },
            {
                tokenPath: 'data-table.header.font-size',
                value: '{font.size.sm}',
                type: 'dimension',
                descriptionKey: 'components.data_table_header_cell.tokens.font_size',
                descriptionFallback: 'Header cell font size (smaller than body cells).'
            },
            {
                tokenPath: 'data-table.header.sort-icon.opacity',
                value: '{opacity.0}',
                type: 'number',
                descriptionKey: 'components.data_table_header_cell.tokens.sort_icon_opacity',
                descriptionFallback: 'Sort icon opacity at rest (hidden).'
            },
            {
                tokenPath: 'data-table.header.sort-badge.border-radius',
                value: '{radius.full}',
                type: 'dimension',
                descriptionKey: 'components.data_table_header_cell.tokens.sort_badge_border_radius',
                descriptionFallback: 'Sort badge border-radius (pill shape).'
            }
        ]
    } satisfies IComponentTokens
}
