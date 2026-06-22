import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MAIN_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-main-props',
    name: 'IMainProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_main_props.description',
    descriptionFallback: 'Props for <OrigamMain> — the primary content area in the application layout. Registers itself with the layout system to respect AppBar/Drawer offsets, and exposes the full color, spacing, border, rounded, dimension, and elevation surface.',
    definition: `export interface IMainProps extends ITagProps, ICommonsComponentProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IDimensionProps, IElevationProps, IBgColorProps, IColorProps {
    scrollable?: boolean
}`,
    extends: ['ITagProps', 'ICommonsComponentProps', 'IPaddingProps', 'IMarginProps', 'IBorderProps', 'IRoundedProps', 'IDimensionProps', 'IElevationProps', 'IBgColorProps', 'IColorProps'],
    props: [
        {
            name: 'scrollable',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Enables internal scrolling on the main area instead of relying on the body scroll, useful for fixed-height layouts.',
        },
    ],
    usedBy: [
        { slug: 'main', name: 'Main', kind: 'component' },
        { slug: 'app', name: 'App', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Main/main.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_main_props.example',
            titleFallback: 'Scrollable main area with custom padding',
            code: `<OrigamApp>
    <OrigamAppBar />
    <OrigamMain scrollable padding="4">
        <!-- page content -->
    </OrigamMain>
</OrigamApp>`,
            lang: 'vue',
        },
    ],
}
