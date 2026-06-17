import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LAYOUT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-layout-props',
    name: 'ILayoutProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_layout_props.description',
    descriptionFallback: 'Full prop surface for OrigamLayout — combines common, dimension, spacing, shape, color and border contracts with layout-specific config.',
    definition: `export interface ILayoutProps
    extends ICommonsComponentProps,
            IDimensionProps,
            IMarginProps,
            IPaddingProps,
            IRoundedProps,
            IElevationProps,
            IBgColorProps,
            IColorProps,
            IBorderProps {
    overlaps?: Array<string>
    fullHeight?: boolean
}`,
    extends: [
        'ICommonsComponentProps',
        'IDimensionProps',
        'IMarginProps',
        'IPaddingProps',
        'IRoundedProps',
        'IElevationProps',
        'IBgColorProps',
        'IColorProps',
        'IBorderProps',
    ],
    props: [
        {
            name: 'overlaps',
            type: 'Array<string>',
            optional: true,
            descriptionFallback: 'List of layout item names whose space is allowed to overlap the main content area.',
        },
        {
            name: 'fullHeight',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'When true, the layout stretches to fill the full viewport height.',
        },
    ],
    usedBy: [
        { slug: 'layout', name: 'Layout', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/layout.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_layout_props.example',
            titleFallback: 'Basic full-height layout with an overlapping app bar',
            code: `<OrigamLayout full-height :overlaps="['app-bar']" bg-color="surface">
    <OrigamAppBar name="app-bar" />
    <OrigamMain>Content</OrigamMain>
</OrigamLayout>`,
            lang: 'html',
        },
    ],
}
