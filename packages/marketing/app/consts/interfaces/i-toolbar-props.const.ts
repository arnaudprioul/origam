import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TOOLBAR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-toolbar-props',
    name: 'IToolbarProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_toolbar_props.description',
    descriptionFallback: 'Full props contract for <OrigamToolbar>. Horizontal action bar with collapse, flat, floating, and sticky modes, plus the full color/border/elevation/spacing surface.',
    definition: `export interface IToolbarProps extends ITagProps, ICommonsComponentProps, IBorderProps, IRoundedProps, IElevationProps, IDensityProps, IColorProps, IBgColorProps, IPaddingProps, IMarginProps, IPositionProps, IDimensionProps, IActiveProps, IHoverProps {
    collapse?: boolean
    flat?: boolean
    floating?: boolean
    title?: string
    modelValue?: boolean
}`,
    extends: [
        'ITagProps', 'ICommonsComponentProps', 'IBorderProps', 'IRoundedProps',
        'IElevationProps', 'IDensityProps', 'IColorProps', 'IBgColorProps',
        'IPaddingProps', 'IMarginProps', 'IPositionProps', 'IDimensionProps',
        'IActiveProps', 'IHoverProps',
    ],
    props: [
        { name: 'collapse', type: 'boolean', optional: true, descriptionFallback: 'Collapse the toolbar to its minimum width (icon-only mode). Useful for side navigation headers.' },
        { name: 'flat', type: 'boolean', optional: true, descriptionFallback: 'Remove the elevation shadow to visually merge the toolbar into the page background.' },
        { name: 'floating', type: 'boolean', optional: true, descriptionFallback: 'Detach the toolbar from the viewport edge so it floats above content.' },
        { name: 'title', type: 'string', optional: true, descriptionFallback: 'Text rendered as the toolbar heading/label. Shorthand for the #title slot.' },
        { name: 'modelValue', type: 'boolean', optional: true, descriptionFallback: 'Controls the visible / expanded state of the toolbar via v-model.' },
    ],
    usedBy: [
        { slug: 'toolbar', name: 'Toolbar', kind: 'component' },
        { slug: 'app-bar', name: 'AppBar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Toolbar/toolbar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_toolbar_props.example',
            titleFallback: 'Elevated floating toolbar',
            code: `<OrigamToolbar
    title="Dashboard"
    elevation="md"
    color="primary"
    floating
/>`,
            lang: 'vue',
        },
    ],
}
