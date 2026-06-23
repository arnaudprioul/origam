import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_EXPANSION_PANELS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-expansion-panels-props',
    name: 'IExpansionPanelsProps',
    category: 'Components',
    descriptionKey: 'interfaces.catalog.i_expansion_panels_props.description',
    descriptionFallback: 'Props for the expansion-panels container — controls layout (flat, accordion, popout, inset), icon overrides, and inherits color, density, border, rounded, elevation, lazy and active surfaces.',
    definition: `export interface IExpansionPanelsProps extends IColorProps, IBgColorProps, ITagProps, ICommonsComponentProps, IGroupProps, IDensityProps, IRoundedProps, IBorderProps, IPaddingProps, IMarginProps, ILazyProps, ILoaderProps, IElevationProps, IActiveProps, IHoverProps {
    flat?: boolean
    items?: Array<IExpansionPanelProps>
    accordion?: boolean
    popout?: boolean
    inset?: boolean
    expandIcon?: TIcon
    collapseIcon?: TIcon
    hideActions?: boolean
}`,
    extends: [
        'IColorProps',
        'IBgColorProps',
        'ITagProps',
        'ICommonsComponentProps',
        'IGroupProps',
        'IDensityProps',
        'IRoundedProps',
        'IBorderProps',
        'IPaddingProps',
        'IMarginProps',
        'ILazyProps',
        'ILoaderProps',
        'IElevationProps',
        'IActiveProps',
        'IHoverProps',
    ],
    props: [
        { name: 'flat', type: 'boolean', optional: true, descriptionFallback: 'Remove the default elevation from every child panel.' },
        { name: 'items', type: 'Array<IExpansionPanelProps>', optional: true, descriptionFallback: 'Declarative items array — each entry maps to an IExpansionPanelProps object.' },
        { name: 'accordion', type: 'boolean', optional: true, descriptionFallback: 'Allow only one panel to be open at a time (accordion mode).' },
        { name: 'popout', type: 'boolean', optional: true, descriptionFallback: 'Expand the open panel to a larger width than its siblings.' },
        { name: 'inset', type: 'boolean', optional: true, descriptionFallback: 'Reduce the open panel width to create an inset effect.' },
        { name: 'expandIcon', type: 'TIcon', optional: true, descriptionFallback: 'Override the default expand chevron icon.' },
        { name: 'collapseIcon', type: 'TIcon', optional: true, descriptionFallback: 'Override the default collapse chevron icon.' },
        { name: 'hideActions', type: 'boolean', optional: true, descriptionFallback: 'Hide the expand/collapse action icons on every panel header.' },
    ],
    usedBy: [
        { slug: 'expansion-panels', name: 'ExpansionPanels', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ExpensionPanel/expansion-panels.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_expansion_panels_props.example',
            titleFallback: 'Accordion-mode panels with custom icons',
            code: `<OrigamExpansionPanels accordion expand-icon="mdi-plus" collapse-icon="mdi-minus">
    <OrigamExpansionPanel>Panel A</OrigamExpansionPanel>
    <OrigamExpansionPanel>Panel B</OrigamExpansionPanel>
</OrigamExpansionPanels>`,
            lang: 'vue',
        },
    ],
}
