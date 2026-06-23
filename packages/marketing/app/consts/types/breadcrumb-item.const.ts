import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const BREADCRUMB_ITEM_TYPE_DOC: ITypeDoc = {
    slug: 'breadcrumb-item',
    name: 'TBreadcrumbItem',
    kind: 'type',
    category: 'Navigation',
    descriptionKey: 'types.catalog.breadcrumb_item.description',
    descriptionFallback: 'Shape of an item in the Breadcrumb items array — either a plain string label or a partial props object for full control.',
    definition: `export type TBreadcrumbItem = string | Partial<IBreadcrumbItemProps>

// Where IBreadcrumbItemProps contains:
// title: string          — display label (required when using object form)
// disabled?: boolean     — greys out and disables the link
// href?: string          — navigates to an external URL
// to?: RouteLocationRaw  — navigates via vue-router
// (+ all Commons props: color, bgColor, border, padding, margin, rounded, density…)`,
    values: [],
    usedBy: [
        { slug: 'breadcrumb', name: 'Breadcrumb', propName: 'items' },
    ],
    sourceFile: 'packages/ds/src/types/Breadcrumb/breadcrumb.type.ts',
    examples: [
        {
            titleKey: 'types.detail.breadcrumb_item.example_string',
            titleFallback: 'String items (simplest form)',
            code: `<origam-breadcrumb :items="['Home', 'Products', 'Shoes']" />`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.breadcrumb_item.example_object',
            titleFallback: 'Object items with links and disabled state',
            code: `<origam-breadcrumb
  :items="[
    { title: 'Home',     to: '/' },
    { title: 'Products', to: '/products' },
    { title: 'Shoes',    disabled: true },
  ]"
/>`,
            lang: 'html',
        },
    ],
}
