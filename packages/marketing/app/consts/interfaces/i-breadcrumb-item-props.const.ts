import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BREADCRUMB_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-breadcrumb-item-props',
    name: 'IBreadcrumbItemProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_breadcrumb_item_props.description',
    descriptionFallback: 'Props for <OrigamBreadcrumbItem> — a single item in the breadcrumb trail. Supports link navigation, adjacent icons (prepend/append), hover, active and disabled states, and the full cross-cutting surface.',
    definition: `export interface IBreadcrumbItemProps extends ICommonsComponentProps, ITagProps, IBorderProps, IPaddingProps, IMarginProps, IRoundedProps, ILinkProps, IColorProps, IBgColorProps, IDensityProps, IAdjacentProps, IHoverProps, IActiveProps {
    title: string
    disabled?: boolean
}`,
    extends: [
        'ICommonsComponentProps',
        'ITagProps',
        'IBorderProps',
        'IPaddingProps',
        'IMarginProps',
        'IRoundedProps',
        'ILinkProps',
        'IColorProps',
        'IBgColorProps',
        'IDensityProps',
        'IAdjacentProps',
        'IHoverProps',
        'IActiveProps',
    ],
    props: [
        { name: 'title', type: 'string', optional: false, descriptionFallback: 'The display text of the breadcrumb item.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disables the item — removes link behavior and applies a muted style.' },
    ],
    usedBy: [
        { slug: 'breadcrumb-item', name: 'BreadcrumbItem', kind: 'component' },
        { slug: 'breadcrumb', name: 'Breadcrumb', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Breadcrumb/breadcrumb-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_breadcrumb_item_props.example',
            titleFallback: 'Breadcrumb item with prepend icon and link',
            code: `<OrigamBreadcrumbItem
  title="Products"
  href="/products"
  prepend-icon="mdi-folder"
  color="primary"
/>`,
            lang: 'html',
        },
    ],
}
