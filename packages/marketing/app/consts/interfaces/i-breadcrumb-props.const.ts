import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BREADCRUMB_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-breadcrumb-props',
    name: 'IBreadcrumbProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_breadcrumb_props.description',
    descriptionFallback: 'Props for <OrigamBreadcrumb> — the navigation trail container. Supports declarative items array, custom divider, disabled state, and the full cross-cutting surface (color, bgColor, border, elevation, density, rounded, padding, margin).',
    definition: `export interface IBreadcrumbProps extends IColorProps, IBgColorProps, ITagProps, ICommonsComponentProps, IDensityProps, IRoundedProps, IPaddingProps, IMarginProps, IBorderProps, IElevationProps {
    activeClass?: string
    disabled?: boolean
    divider?: string | TIcon
    items?: Array<TBreadcrumbItem>
}`,
    extends: [
        'IColorProps',
        'IBgColorProps',
        'ITagProps',
        'ICommonsComponentProps',
        'IDensityProps',
        'IRoundedProps',
        'IPaddingProps',
        'IMarginProps',
        'IBorderProps',
        'IElevationProps',
    ],
    props: [
        { name: 'activeClass', type: 'string', optional: true, descriptionFallback: 'CSS class applied to the currently active breadcrumb item.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disables all breadcrumb items.' },
        { name: 'divider', type: 'string | TIcon', optional: true, descriptionFallback: 'Custom separator between items — a string character or an MDI icon name.' },
        { name: 'items', type: 'Array<TBreadcrumbItem>', optional: true, descriptionFallback: 'Declarative item list — renders items without explicit slot children.' },
    ],
    usedBy: [
        { slug: 'breadcrumb', name: 'Breadcrumb', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Breadcrumb/breadcrumb.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_breadcrumb_props.example',
            titleFallback: 'Declarative breadcrumb with custom divider',
            code: `<OrigamBreadcrumb
  :items="[
    { title: 'Home', href: '/' },
    { title: 'Products', href: '/products' },
    { title: 'Detail' },
  ]"
  divider="mdi-chevron-right"
  color="primary"
/>`,
            lang: 'html',
        },
    ],
}
