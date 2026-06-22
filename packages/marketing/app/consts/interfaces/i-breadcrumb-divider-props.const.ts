import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BREADCRUMB_DIVIDER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-breadcrumb-divider-props',
    name: 'IBreadcrumbDividerProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_breadcrumb_divider_props.description',
    descriptionFallback: 'Props for <OrigamBreadcrumbDivider> — the separator rendered between breadcrumb items. Accepts a string character or an icon name, with full color, size, density, padding and margin surface.',
    definition: `export interface IBreadcrumbDividerProps extends ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IDensityProps, IColorProps, ISizeProps {
    divider: string | TIcon
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IPaddingProps', 'IMarginProps', 'IDensityProps', 'IColorProps', 'ISizeProps'],
    props: [
        { name: 'divider', type: 'string | TIcon', optional: false, descriptionFallback: 'The separator — a plain string character (e.g. "/") or an MDI icon name.' },
    ],
    usedBy: [
        { slug: 'breadcrumb', name: 'Breadcrumb', kind: 'component' },
        { slug: 'breadcrumb-divider', name: 'BreadcrumbDivider', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Breadcrumb/breadcrumb-divider.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_breadcrumb_divider_props.example',
            titleFallback: 'Custom icon divider',
            code: `<OrigamBreadcrumbDivider
  divider="mdi-chevron-right"
  color="neutral"
  size="sm"
/>`,
            lang: 'html',
        },
    ],
}
