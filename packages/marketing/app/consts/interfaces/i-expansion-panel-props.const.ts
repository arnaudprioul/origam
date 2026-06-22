import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_EXPANSION_PANEL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-expansion-panel-props',
    name: 'IExpansionPanelProps',
    category: 'Components',
    descriptionKey: 'interfaces.catalog.i_expansion_panel_props.description',
    descriptionFallback: 'Full prop surface for a single expansion-panel item — combines density, color, border, padding, margin, elevation, rounded, group membership, header/content sub-interfaces, lazy loading, loader state, active and hover.',
    definition: `export interface IExpansionPanelProps extends ITagProps, ICommonsComponentProps, IDensityProps, IColorProps, IBgColorProps, IBorderProps, IPaddingProps, IMarginProps, IElevationProps, IRoundedProps, IGroupItemProps, IExpansionPanelHeaderProps, IExpansionPanelContentProps, ILazyProps, ILoaderProps, IActiveProps, IHoverProps {
}`,
    extends: [
        'ITagProps',
        'ICommonsComponentProps',
        'IDensityProps',
        'IColorProps',
        'IBgColorProps',
        'IBorderProps',
        'IPaddingProps',
        'IMarginProps',
        'IElevationProps',
        'IRoundedProps',
        'IGroupItemProps',
        'IExpansionPanelHeaderProps',
        'IExpansionPanelContentProps',
        'ILazyProps',
        'ILoaderProps',
        'IActiveProps',
        'IHoverProps',
    ],
    props: [],
    usedBy: [
        { slug: 'expansion-panel', name: 'ExpansionPanel', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ExpensionPanel/expansion-panel.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_expansion_panel_props.example',
            titleFallback: 'Single expansion panel with color and elevation',
            code: `<OrigamExpansionPanel color="primary" elevation="2">
    <template #title>Panel title</template>
    Panel content
</OrigamExpansionPanel>`,
            lang: 'vue',
        },
    ],
}
