/**
 * /components/data-table-footer — full documentation data for OrigamDataTableFooter.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DataTable/footer.interface.ts          (props)
 *   - packages/ds/src/components/DataTable/OrigamDataTableFooter.vue    (template BEM, defineExpose)
 *   - packages/ds/tokens/component/data-table.json                      (CSS tokens)
 *
 * PARENT: data-table
 * FAMILY: data-table-* sub-components (same DataTable/ folder)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const DATA_TABLE_FOOTER_DOC: IComponentDoc = {
    slug: 'data-table-footer',
    name: 'DataTableFooter',
    tag: 'origam-data-table-footer',
    icon: 'mdi-table-row',
    category: 'Data Display',
    descriptionKey: 'components.catalog.data_table_footer.description',
    descriptionFallback: 'Pagination and items-per-page footer bar rendered below the DataTable body.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-datatable--design',
    docUrl: 'http://localhost:4000/components/DataTable/OrigamDataTable',

    parentSlug: 'data-table',

    family: [
        {
            slug: 'data-table-header-cell',
            name: 'DataTableHeaderCell',
            descriptionKey: 'components.catalog.data_table_header_cell.description',
            descriptionFallback: 'Single column header cell with sort icon and sort badge.'
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
            slug: 'data-table',
            name: 'DataTable',
            kind: 'component',
            descriptionKey: 'components.catalog.data_table.description',
            descriptionFallback: 'Feature-rich data table. DataTableFooter is always rendered inside it.'
        },
        {
            slug: 'pagination',
            name: 'Pagination',
            kind: 'component',
            descriptionKey: 'components.catalog.pagination.description',
            descriptionFallback: 'Standalone pagination bar — embedded by DataTableFooter.'
        }
    ],

    props: [
        {
            name: 'itemsPerPageText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam.dataFooter.itemsPerPageText'",
            descriptionKey: 'components.data_table_footer.props.items_per_page_text.description',
            descriptionFallback: 'Label text displayed before the items-per-page select. Resolved via useLocale().'
        },
        {
            name: 'pageText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam.dataFooter.pageText'",
            descriptionKey: 'components.data_table_footer.props.page_text.description',
            descriptionFallback: 'Template string for the current page range info (e.g. "1-10 of 50"). Resolved via useLocale().'
        },
        {
            name: 'firstPageLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam.dataFooter.firstPage'",
            descriptionKey: 'components.data_table_footer.props.first_page_label.description',
            descriptionFallback: 'Aria-label for the first-page pagination button.'
        },
        {
            name: 'prevPageLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam.dataFooter.prevPage'",
            descriptionKey: 'components.data_table_footer.props.prev_page_label.description',
            descriptionFallback: 'Aria-label for the previous-page pagination button.'
        },
        {
            name: 'nextPageLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam.dataFooter.nextPage'",
            descriptionKey: 'components.data_table_footer.props.next_page_label.description',
            descriptionFallback: 'Aria-label for the next-page pagination button.'
        },
        {
            name: 'lastPageLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam.dataFooter.lastPage'",
            descriptionKey: 'components.data_table_footer.props.last_page_label.description',
            descriptionFallback: 'Aria-label for the last-page pagination button.'
        },
        {
            name: 'itemsPerPageOptions',
            type: { label: 'Array<number | { title: string, value: number }>', slug: '', kind: 'primitive' },
            defaultValue: '[10, 25, 50, 100, { value: -1, title: "All" }]',
            descriptionKey: 'components.data_table_footer.props.items_per_page_options.description',
            descriptionFallback: 'List of selectable page sizes. Pass -1 as value to show all items.'
        },
        {
            name: 'showCurrentPage',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.data_table_footer.props.show_current_page.description',
            descriptionFallback: 'When true, the current page number is shown in the pagination. When false, only prev/next arrows are rendered.'
        },
        {
            name: 'prevIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_footer.props.prev_icon.description',
            descriptionFallback: 'Icon for the previous-page button forwarded to the embedded OrigamPagination.'
        },
        {
            name: 'nextIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_footer.props.next_icon.description',
            descriptionFallback: 'Icon for the next-page button forwarded to the embedded OrigamPagination.'
        },
        {
            name: 'firstIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_footer.props.first_icon.description',
            descriptionFallback: 'Icon for the first-page button forwarded to the embedded OrigamPagination.'
        },
        {
            name: 'lastIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_table_footer.props.last_icon.description',
            descriptionFallback: 'Icon for the last-page button forwarded to the embedded OrigamPagination.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.data_table_footer.slots.prepend.description',
            descriptionFallback: 'Content inserted before the items-per-page selector inside the row.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.data_table_footer.slots.append.description',
            descriptionFallback: 'Content inserted after the pagination control at the end of the row.'
        }
    ],

    examples: [
        {
            titleKey: 'components.data_table_footer.examples.basic.title',
            titleFallback: 'Usage inside DataTable',
            lang: 'vue',
            code: `<template>
  <!-- DataTableFooter is auto-rendered by DataTable.
       To customise it, pass footer props on the parent: -->
  <origam-data-table
    :headers="headers"
    :items="items"
    :items-per-page-options="[5, 10, 25]"
    :show-current-page="true"
  />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-data-table-footer',
        svgViewBox: '0 0 700 120',
        svgTitle: 'Anatomy of OrigamDataTableFooter',
        svgDesc: 'Schematic of the footer bar with items-per-page select, page info and pagination.',
        svg: `
  <rect x="0" y="0" width="700" height="120" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="10" y="20" width="680" height="80" rx="4" fill="var(--origam-color__surface---default, #fff)" stroke="var(--origam-color__border---default, #e5d9f9)" stroke-width="1.5"/>
  <rect x="30" y="40" width="160" height="40" rx="3" fill="var(--origam-color__surface---raised, #f5f0ff)" stroke="var(--origam-color__border---default, #c4b0f0)" stroke-width="1"/>
  <text x="110" y="64" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Items per page</text>
  <rect x="220" y="40" width="160" height="40" rx="3" fill="var(--origam-color__surface---raised, #f5f0ff)" stroke="var(--origam-color__border---default, #c4b0f0)" stroke-width="1"/>
  <text x="300" y="64" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Page info</text>
  <rect x="420" y="40" width="240" height="40" rx="3" fill="var(--origam-color__surface---raised, #f5f0ff)" stroke="var(--origam-color__border---default, #c4b0f0)" stroke-width="1"/>
  <text x="540" y="64" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Pagination</text>
  <circle cx="20" cy="28" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="20" y="32" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="220" cy="28" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="220" y="32" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="420" cy="28" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="420" y="32" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-data-table-footer&gt;</code> — 3 internal parts: items-per-page, page info label and pagination.',
        legend: [
            {
                num: 1,
                cls: '.origam-data-table-footer__items-per-page',
                descriptionKey: 'components.data_table_footer.anatomy.items_per_page',
                descriptionFallback: 'Items-per-page label + OrigamSelect dropdown. Fires setItemsPerPage() on change.'
            },
            {
                num: 2,
                cls: '.origam-data-table-footer__info',
                descriptionKey: 'components.data_table_footer.anatomy.info',
                descriptionFallback: 'Localised page range label: "start–stop of total". Driven by usePagination().'
            },
            {
                num: 3,
                cls: '.origam-data-table-footer__pagination',
                descriptionKey: 'components.data_table_footer.anatomy.pagination',
                descriptionFallback: 'OrigamPagination with density="compact", showFirstLastPage and rounded. Syncs currentPage with the shared pagination context.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-data-table-footer">
  <origam-row>
    <!-- #prepend slot -->
    <div class="origam-data-table-footer__items-per-page">
      <span>Items per page</span>
      <origam-select :items="itemsPerPageOptions" />
    </div>
    <div class="origam-data-table-footer__info">
      <span>1–10 of 50</span>
    </div>
    <div class="origam-data-table-footer__pagination">
      <origam-pagination show-first-last-page rounded />
    </div>
    <!-- #append slot -->
  </origam-row>
</div>`,
        classes: [
            {
                cls: 'origam-data-table-footer',
                descriptionKey: 'components.data_table_footer.anatomy.root',
                descriptionFallback: 'Root element — flex row, justify-content: flex-end.'
            },
            {
                cls: 'origam-data-table-footer__items-per-page',
                descriptionKey: 'components.data_table_footer.anatomy.items_per_page',
                descriptionFallback: 'Container for the items-per-page label and select control.'
            },
            {
                cls: 'origam-data-table-footer__info',
                descriptionKey: 'components.data_table_footer.anatomy.info',
                descriptionFallback: 'Page range information label (e.g. "1–10 of 50").'
            },
            {
                cls: 'origam-data-table-footer__pagination',
                descriptionKey: 'components.data_table_footer.anatomy.pagination',
                descriptionFallback: 'Wrapper for the embedded OrigamPagination control.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-data-table-footer---align-items',
            defaultValue: 'center',
            descriptionKey: 'components.data_table_footer.css_vars.align_items',
            descriptionFallback: 'Vertical alignment of footer row items.'
        },
        {
            name: '--origam-data-table-footer---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.data_table_footer.css_vars.background_color',
            descriptionFallback: 'Footer background color.'
        },
        {
            name: '--origam-data-table-footer---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.data_table_footer.css_vars.color',
            descriptionFallback: 'Footer text color.'
        },
        {
            name: '--origam-data-table-footer---padding-block',
            defaultValue: '8px',
            descriptionKey: 'components.data_table_footer.css_vars.padding_block',
            descriptionFallback: 'Top and bottom padding of the footer.'
        },
        {
            name: '--origam-data-table-footer---padding-inline',
            defaultValue: '4px',
            descriptionKey: 'components.data_table_footer.css_vars.padding_inline',
            descriptionFallback: 'Left and right padding of the footer.'
        },
        {
            name: '--origam-data-table-footer__info---min-width',
            defaultValue: '116px',
            descriptionKey: 'components.data_table_footer.css_vars.info_min_width',
            descriptionFallback: 'Minimum width of the page info label area.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.data_table_footer.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.data_table_footer.exposed.css',
            descriptionFallback: 'Reactive CSS string from useStyle, injected as a scoped style sheet.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.data_table_footer.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.data_table_footer.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.data_table_footer.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.data_table_footer.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['contentinfo'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.data_table_footer.a11y.key_tab',
                actionFallback: 'Moves focus through the items-per-page select and pagination buttons.'
            }
        ],
        notes: [
            {
                noteKey: 'components.data_table_footer.a11y.pagination_note',
                noteFallback: 'The embedded OrigamPagination provides aria-label attributes on first/prev/next/last buttons via firstPageLabel, prevPageLabel, nextPageLabel and lastPageLabel props.'
            }
        ]
    } satisfies IComponentA11y
}
