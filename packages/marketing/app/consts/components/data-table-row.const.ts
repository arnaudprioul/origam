/**
 * /components/data-table-row — full documentation data for OrigamDataTableRow.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DataTable/row.interface.ts  (IDataTableRowProps, IDataTableRowEmits)
 *   - packages/ds/src/components/DataTable/OrigamDataTableRow.vue  (template BEM, defineExpose, SCSS)
 *   - packages/ds/tokens/component/data-table.json           (row.* tokens)
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

export const DATA_TABLE_ROW_DOC: IComponentDoc = {
    slug: 'data-table-row',
    name: 'DataTableRow',
    tag: 'origam-data-table-row',
    icon: 'mdi-table-row',
    category: 'Data Display',
    descriptionKey: 'components.catalog.data_table_row.description',
    descriptionFallback: 'Single data row (<tr>) in a DataTable. Renders each column cell, handles row selection, expand toggle, and switches to mobile stacked layout below the breakpoint.',
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
            slug: 'data-table-rows',
            name: 'DataTableRows',
            descriptionKey: 'components.catalog.data_table_rows.description',
            descriptionFallback: 'Container that iterates items and renders rows, groups, skeletons and empty/loading states.'
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
            slug: 'data-table-column-cell',
            name: 'DataTableColumnCell',
            kind: 'component',
            descriptionKey: 'components.catalog.data_table_column_cell.description',
            descriptionFallback: 'Generic cell wrapper used for each column in the row.'
        },
        {
            slug: 'checkbox-btn',
            name: 'CheckboxBtn',
            kind: 'component',
            descriptionKey: 'components.catalog.checkbox_btn.description',
            descriptionFallback: 'Selection checkbox rendered in the data-table-select column.'
        }
    ],

    props: [
        {
            name: 'item',
            type: { label: 'IDataTableItem', slug: '', kind: 'primitive' },
            defaultValue: 'required',
            required: true,
            descriptionKey: 'components.data_table_row.props.item.description',
            descriptionFallback: 'The internal item descriptor. Contains raw data, processed column values, type, key, and index.'
        },
        {
            name: 'cellProps',
            type: { label: 'TDataTableCell<any>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_row.props.cell_props.description',
            descriptionFallback: 'Static or callback props forwarded to every DataTableColumnCell inside the row. A function receives { index, item, internalItem, value, column }.'
        },
        {
            name: 'mobile',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_table_row.props.mobile.description',
            descriptionFallback: 'Forces mobile stacked layout. When true, each cell shows a column title label and a value in a two-column grid.'
        },
        {
            name: 'mobileBreakpoint',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_row.props.mobile_breakpoint.description',
            descriptionFallback: 'Viewport width threshold below which mobile layout is automatically activated.'
        }
    ],

    emits: [
        {
            event: 'expand',
            payload: { label: '{ item: IDataTableItem, value: boolean }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.data_table_row.emits.expand.description',
            descriptionFallback: 'Fired when the expand toggle button is clicked inside the data-table-expand column.'
        },
        {
            event: 'select',
            payload: { label: '{ item: IDataTableItem, value: boolean }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.data_table_row.emits.select.description',
            descriptionFallback: 'Fired when the selection checkbox is toggled in the data-table-select column.'
        }
    ],

    slots: [
        {
            slot: 'item.data-table-select',
            slotProps: '{ index, item, internalItem, value, column, isSelected, toggleSelect, isExpanded, toggleExpand }',
            descriptionKey: 'components.data_table_row.slots.item_select.description',
            descriptionFallback: 'Overrides the default CheckboxBtn in the selection column.'
        },
        {
            slot: 'item.data-table-expand',
            slotProps: '{ index, item, internalItem, value, column, isSelected, toggleSelect, isExpanded, toggleExpand }',
            descriptionKey: 'components.data_table_row.slots.item_expand.description',
            descriptionFallback: 'Overrides the default expand/collapse button in the expand column.'
        },
        {
            slot: 'item.{key}',
            slotProps: '{ index, item, internalItem, value, column, isSelected, toggleSelect, isExpanded, toggleExpand }',
            descriptionKey: 'components.data_table_row.slots.item_key.description',
            descriptionFallback: 'Per-column data slot. The slot name is dynamic: item.{column.key}. Overrides the default value display for the matching column.'
        },
        {
            slot: 'header.{key}',
            slotProps: '{ column, selectAll, isSorted, toggleSort, sortBy, someSelected, allSelected, getSortIcon }',
            descriptionKey: 'components.data_table_row.slots.header_key.description',
            descriptionFallback: 'In mobile layout, each cell shows a column title that can be overridden via this header slot.'
        }
    ],

    examples: [
        {
            titleKey: 'components.data_table_row.examples.custom_cell.title',
            titleFallback: 'Custom cell slot',
            lang: 'vue',
            code: `<template>
  <origam-data-table
    :headers="[
      { key: 'name',   title: 'Name' },
      { key: 'status', title: 'Status' }
    ]"
    :items="[
      { name: 'Alice', status: 'active' },
      { name: 'Bob',   status: 'inactive' }
    ]"
  >
    <template #item.status="{ value }">
      <origam-badge :color="value === 'active' ? 'success' : 'danger'" :text="value" />
    </template>
  </origam-data-table>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-data-table-row',
        svgViewBox: '0 0 560 120',
        svgTitle: 'Anatomy of OrigamDataTableRow',
        svgDesc: 'Schematic of DataTableRow with 4 internal parts.',
        svg: `
  <rect x="0" y="0" width="560" height="120" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="16" y="24" width="528" height="48" rx="0" fill="var(--origam-color__surface---default, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="16" y="72" width="528" height="1" fill="var(--origam-color__border---subtle, rgba(168,85,247,0.2))"/>
  <rect x="28" y="32" width="32" height="32" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="44" y="52" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">☑</text>
  <rect x="70" y="32" width="160" height="32" rx="2" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="150" y="52" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">column value</text>
  <rect x="238" y="32" width="160" height="32" rx="2" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="318" y="52" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">column value</text>
  <rect x="406" y="32" width="32" height="32" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="422" y="52" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">⌄</text>
  <circle cx="24" cy="32" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="24" y="36" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="30" cy="38" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="30" y="42" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="76" cy="38" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="76" y="42" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="412" cy="38" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="412" y="42" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <line x1="33" y1="32" x2="300" y2="10" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="304" y="13" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-data-table-row</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-data-table-row&gt;</code> — 4 parts: tr root ①, select column (CheckboxBtn) ②, data column cell ③, expand column (Btn) ④.',
        legend: [
            {
                num: 1,
                cls: '.origam-data-table-row',
                descriptionKey: 'components.data_table_row.anatomy.root',
                descriptionFallback: 'Root <code>&lt;tr&gt;</code> element. Has <code>--clickable</code> BEM modifier when onClick/onContextmenu/onDblclick listeners are attached. Has <code>--mobile</code> modifier when in mobile layout.'
            },
            {
                num: 2,
                cls: '.origam-data-table-row__column--select-row',
                descriptionKey: 'components.data_table_row.anatomy.select_column',
                descriptionFallback: 'Column cell modifier for the data-table-select column. Renders an <code>OrigamCheckboxBtn</code>. In mobile layout uses <code>grid-template-columns: 0; justify-content: end</code>.'
            },
            {
                num: 3,
                cls: '.origam-data-table-row__column',
                descriptionKey: 'components.data_table_row.anatomy.column',
                descriptionFallback: 'Generic column cell class applied to each <code>OrigamDataTableColumnCell</code>. In mobile mode wraps title and value in a 2-column grid.'
            },
            {
                num: 4,
                cls: '.origam-data-table-row__column--expanded-row',
                descriptionKey: 'components.data_table_row.anatomy.expand_column',
                descriptionFallback: 'Column cell modifier for the data-table-expand column. Renders an expand/collapse <code>OrigamBtn</code> with aria-expanded. In mobile layout uses <code>grid-template-columns: 0; justify-content: center</code>.'
            }
        ],
        code: `<tr class="origam-data-table-row" :aria-selected="isSelected([item]) || undefined">
  <!-- select column -->
  <origam-data-table-column-cell class="origam-data-table-row__column origam-data-table-row__column--select-row">
    <origam-checkbox-btn :model-value="isSelected([item])" @click="toggleSelect(item)" />
  </origam-data-table-column-cell>
  <!-- data columns -->
  <origam-data-table-column-cell v-for="column in columns" class="origam-data-table-row__column">
    <!-- mobile: show column title + value -->
    <div class="origam-data-table-row__column-title">{{ column.title }}</div>
    <div class="origam-data-table-row__column-value">
      <slot :name="\`item.\${column.key}\`">{{ displayValue }}</slot>
    </div>
  </origam-data-table-column-cell>
  <!-- expand column -->
  <origam-data-table-column-cell class="origam-data-table-row__column origam-data-table-row__column--expanded-row">
    <origam-btn :icon="isExpanded(item) ? MDI_ICONS.CHEVRON_UP : MDI_ICONS.CHEVRON_DOWN" @click="toggleExpand(item)" />
  </origam-data-table-column-cell>
</tr>`,
        classes: [
            {
                cls: 'origam-data-table-row',
                descriptionKey: 'components.data_table_row.anatomy.root',
                descriptionFallback: 'Root tr element.'
            },
            {
                cls: 'origam-data-table-row--clickable',
                descriptionKey: 'components.data_table_row.anatomy.clickable',
                descriptionFallback: 'Applied when the tr has click/contextmenu/dblclick listeners. Sets cursor: pointer.'
            },
            {
                cls: 'origam-data-table-row--mobile',
                descriptionKey: 'components.data_table_row.anatomy.mobile',
                descriptionFallback: 'Applied in mobile layout. Switches cells to a 2-column grid (title left, value right).'
            },
            {
                cls: 'origam-data-table-row__column',
                descriptionKey: 'components.data_table_row.anatomy.column',
                descriptionFallback: 'Applied to each column cell td.'
            },
            {
                cls: 'origam-data-table-row__column--select-row',
                descriptionKey: 'components.data_table_row.anatomy.select_row',
                descriptionFallback: 'Modifier for the selection checkbox column.'
            },
            {
                cls: 'origam-data-table-row__column--expanded-row',
                descriptionKey: 'components.data_table_row.anatomy.expanded_row',
                descriptionFallback: 'Modifier for the expand toggle column.'
            },
            {
                cls: 'origam-data-table-row__column-title',
                descriptionKey: 'components.data_table_row.anatomy.column_title',
                descriptionFallback: 'Column label shown in mobile layout (left cell). Font-weight: medium.'
            },
            {
                cls: 'origam-data-table-row__column-value',
                descriptionKey: 'components.data_table_row.anatomy.column_value',
                descriptionFallback: 'Column value shown in mobile layout (right cell, text-align: right).'
            }
        ]
    },

    cssVars: [
        {
            name: '--origam-data-table-row---background-color',
            defaultValue: 'var(--origam-color__surface---default)',
            descriptionKey: 'components.data_table_row.css_vars.background_color',
            descriptionFallback: 'Default row background colour.'
        },
        {
            name: '--origam-data-table-row---color',
            defaultValue: 'var(--origam-color__text---primary)',
            descriptionKey: 'components.data_table_row.css_vars.color',
            descriptionFallback: 'Default row text colour.'
        },
        {
            name: '--origam-data-table-row--hover---background-color',
            defaultValue: 'var(--origam-color__surface---overlay)',
            descriptionKey: 'components.data_table_row.css_vars.hover_background_color',
            descriptionFallback: 'Row background colour on hover.'
        },
        {
            name: '--origam-data-table-row---transition-duration',
            defaultValue: '100ms',
            descriptionKey: 'components.data_table_row.css_vars.transition_duration',
            descriptionFallback: 'Duration of the background-colour transition on hover/select.'
        },
        {
            name: '--origam-data-table-row---transition-easing',
            defaultValue: 'cubic-bezier(0.4, 0, 0.2, 1)',
            descriptionKey: 'components.data_table_row.css_vars.transition_easing',
            descriptionFallback: 'Easing function for the row background transition.'
        },
        {
            name: '--origam-data-table-row__column-title---font-weight',
            defaultValue: '500',
            descriptionKey: 'components.data_table_row.css_vars.column_title_font_weight',
            descriptionFallback: 'Font weight of the column title label in mobile stacked layout.'
        },
        {
            name: '--origam-data-table-row--mobile__column-min-height',
            defaultValue: '52px',
            descriptionKey: 'components.data_table_row.css_vars.mobile_column_min_height',
            descriptionFallback: 'Minimum height of each stacked cell in mobile layout.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.data_table_row.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.data_table_row.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.data_table_row.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.data_table_row.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.data_table_row.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.data_table_row.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['row'],
        keyboard: [
            {
                key: 'Space',
                actionKey: 'components.data_table_row.a11y.key_select',
                actionFallback: 'Toggles row selection via the CheckboxBtn (when the selection column is present).'
            },
            {
                key: 'Enter',
                actionKey: 'components.data_table_row.a11y.key_expand',
                actionFallback: 'Toggles row expansion via the expand Btn (when the expand column is present).'
            }
        ],
        notes: [
            {
                noteKey: 'components.data_table_row.a11y.aria_selected',
                noteFallback: '<code>aria-selected</code> is set on the <code>&lt;tr&gt;</code> when the selection column is present. It is omitted (undefined) for non-selectable rows.'
            },
            {
                noteKey: 'components.data_table_row.a11y.aria_rowindex',
                noteFallback: '<code>aria-rowindex</code> is set by the parent DataTableRows component on each row (startIndex + index + 2, 1-based, accounting for the header row).'
            },
            {
                noteKey: 'components.data_table_row.a11y.expand_button',
                noteFallback: 'The expand button exposes <code>aria-expanded</code> (true/false) and a localised <code>aria-label</code> via the DS i18n provider (keys: origam.dataTableRow.collapseRow / expandRow).'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/data-table.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Row tokens live under the data-table.row namespace.',
        excerpt: [
            {
                tokenPath: 'data-table.row.background-color',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.data_table_row.tokens.background_color',
                descriptionFallback: 'Default row background.'
            },
            {
                tokenPath: 'data-table.row.hover-background-color',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.data_table_row.tokens.hover_background_color',
                descriptionFallback: 'Row background on hover.'
            },
            {
                tokenPath: 'data-table.row.transition-duration',
                value: '{motion.duration.fast}',
                type: 'duration',
                descriptionKey: 'components.data_table_row.tokens.transition_duration',
                descriptionFallback: 'Row background transition duration.'
            },
            {
                tokenPath: 'data-table.row.border-bottom-color',
                value: '{color.border.subtle}',
                type: 'color',
                descriptionKey: 'components.data_table_row.tokens.border_bottom_color',
                descriptionFallback: 'Row separator bottom border colour.'
            },
            {
                tokenPath: 'data-table.row.column-title.font-weight',
                value: '{font.weight.medium}',
                type: 'fontWeight',
                descriptionKey: 'components.data_table_row.tokens.column_title_font_weight',
                descriptionFallback: 'Column label weight in mobile stacked layout.'
            },
            {
                tokenPath: 'data-table.row.mobile.column-min-height',
                value: '52px',
                type: 'dimension',
                descriptionKey: 'components.data_table_row.tokens.mobile_column_min_height',
                descriptionFallback: 'Minimum cell height in mobile stacked layout.'
            }
        ]
    } satisfies IComponentTokens
}
