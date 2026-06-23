/**
 * /components/pagination — full documentation data for OrigamPagination.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/Pagination/pagination.interface.ts
 * cross-checked against packages/ds/src/components/Pagination/OrigamPagination.vue.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const PAGINATION_DOC: IComponentDoc = {
    slug: 'pagination',
    name: 'Pagination',
    tag: 'origam-pagination',
    icon: 'mdi-page-layout-footer',
    category: 'Navigation',
    descriptionKey: 'components.catalog.pagination.description',
    descriptionFallback: 'Page navigation control with first, previous, next and last buttons.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-pagination--design',
    docUrl: 'http://localhost:4000/components/Pagination/OrigamPagination',

    family: [],

    props: [
        {
            name: 'modelValue',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '1',
            descriptionKey: 'components.pagination.props.model_value.description',
            descriptionFallback: 'Current page number (v-model).'
        },
        {
            name: 'length',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '1',
            descriptionKey: 'components.pagination.props.length.description',
            descriptionFallback: 'Total number of pages.'
        },
        {
            name: 'start',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '1',
            descriptionKey: 'components.pagination.props.start.description',
            descriptionFallback: 'Starting page number (1-based by default).'
        },
        {
            name: 'totalVisible',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.pagination.props.total_visible.description',
            descriptionFallback: 'Maximum number of page buttons visible at once (excess replaced with ellipsis).'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.pagination.props.disabled.description',
            descriptionFallback: 'Disables all navigation buttons.'
        },
        {
            name: 'showFirstLastPage',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.pagination.props.show_first_last_page.description',
            descriptionFallback: 'Show buttons to jump to the first and last page.'
        },
        {
            name: 'compact',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.pagination.props.compact.description',
            descriptionFallback: 'Compact mode replaces the page list with an editable page number input.'
        },
        {
            name: 'ellipsis',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'…'",
            descriptionKey: 'components.pagination.props.ellipsis.description',
            descriptionFallback: 'Character or string shown in place of hidden page buttons.'
        },
        {
            name: 'firstIcon',
            type: { label: 'TIcon', slug: '', kind: 'primitive' },
            defaultValue: "'mdi-page-first'",
            descriptionKey: 'components.pagination.props.first_icon.description',
            descriptionFallback: 'Icon for the "first page" button.'
        },
        {
            name: 'prevIcon',
            type: { label: 'TIcon', slug: '', kind: 'primitive' },
            defaultValue: "'mdi-chevron-left'",
            descriptionKey: 'components.pagination.props.prev_icon.description',
            descriptionFallback: 'Icon for the "previous page" button.'
        },
        {
            name: 'nextIcon',
            type: { label: 'TIcon', slug: '', kind: 'primitive' },
            defaultValue: "'mdi-chevron-right'",
            descriptionKey: 'components.pagination.props.next_icon.description',
            descriptionFallback: 'Icon for the "next page" button.'
        },
        {
            name: 'lastIcon',
            type: { label: 'TIcon', slug: '', kind: 'primitive' },
            defaultValue: "'mdi-page-last'",
            descriptionKey: 'components.pagination.props.last_icon.description',
            descriptionFallback: 'Icon for the "last page" button.'
        },
        {
            name: 'withInfo',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.pagination.props.with_info.description',
            descriptionFallback: 'Renders a left-side "Showing X-Y of Z" range label. Requires total prop.'
        },
        {
            name: 'total',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.pagination.props.total.description',
            descriptionFallback: 'Total number of items (not pages). Drives the withInfo label.'
        },
        {
            name: 'perPage',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '10',
            descriptionKey: 'components.pagination.props.per_page.description',
            descriptionFallback: 'Items per page used for the withInfo range calculation.'
        },
        {
            name: 'color',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.pagination.props.color.description',
            descriptionFallback: 'Intent color applied to the active page button.'
        },
        {
            name: 'size',
            type: { label: "'x-small' | 'small' | 'default' | 'large' | 'x-large' | number", slug: '', kind: 'primitive' },
            defaultValue: "'default'",
            descriptionKey: 'components.pagination.props.size.description',
            descriptionFallback: 'Size of pagination buttons.'
        },
        {
            name: 'density',
            type: { label: "'default' | 'compact' | 'comfortable'", slug: '', kind: 'primitive' },
            defaultValue: "'default'",
            descriptionKey: 'components.pagination.props.density.description',
            descriptionFallback: 'Padding density of the pagination buttons.'
        },
        {
            name: 'ariaLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'Pagination Navigation'",
            descriptionKey: 'components.pagination.props.aria_label.description',
            descriptionFallback: 'aria-label for the navigation element.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.pagination.props.tag.description',
            descriptionFallback: 'Root HTML element tag.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.pagination.emits.update_model_value.description',
            descriptionFallback: 'Fired when the current page changes.'
        },
        {
            event: 'first',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.pagination.emits.first.description',
            descriptionFallback: 'Fired when the user navigates to the first page.'
        },
        {
            event: 'prev',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.pagination.emits.prev.description',
            descriptionFallback: 'Fired when the user navigates to the previous page.'
        },
        {
            event: 'next',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.pagination.emits.next.description',
            descriptionFallback: 'Fired when the user navigates to the next page.'
        },
        {
            event: 'last',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.pagination.emits.last.description',
            descriptionFallback: 'Fired when the user navigates to the last page.'
        }
    ],

    slots: [
        {
            slot: 'item',
            slotProps: '{ page, isActive, key }',
            descriptionKey: 'components.pagination.slots.item.description',
            descriptionFallback: 'Custom render for each page button. Receives page number, active state and key.'
        }
    ],

    examples: [
        {
            titleKey: 'components.pagination.examples.basic.title',
            titleFallback: 'Basic pagination',
            lang: 'vue',
            code: `<template>
  <origam-pagination v-model="page" :length="10" />
</template>

<script setup>
const page = ref(1)
</script>`
        },
        {
            titleKey: 'components.pagination.examples.with_info.title',
            titleFallback: 'With item count info',
            lang: 'vue',
            code: `<template>
  <origam-pagination
    v-model="page"
    :length="20"
    :total="200"
    :per-page="10"
    with-info
    show-first-last-page
  />
</template>`
        },
        {
            titleKey: 'components.pagination.examples.compact.title',
            titleFallback: 'Compact mode',
            lang: 'vue',
            code: `<template>
  <origam-pagination
    v-model="page"
    :length="50"
    :total-visible="3"
    compact
    color="primary"
  />
</template>`
        }
    ]
}
