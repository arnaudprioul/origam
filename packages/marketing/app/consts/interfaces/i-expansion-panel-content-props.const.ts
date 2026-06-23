import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_EXPANSION_PANEL_CONTENT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-expansion-panel-content-props',
    name: 'IExpansionPanelContentProps',
    category: 'Disclosure',
    descriptionKey: 'interfaces.catalog.i_expansion_panel_content_props.description',
    descriptionFallback: 'Props for the collapsible body of OrigamExpansionPanel. Controls the rendered content, lazy mounting, loader state and all visual surface properties (color, border, padding, rounded …).',
    definition: `export interface IExpansionPanelContentProps extends IColorProps, IBgColorProps, ITagProps, ICommonsComponentProps, IDensityProps, IRoundedProps, IBorderProps, IPaddingProps, IMarginProps, ILazyProps, ILoaderProps {
    content?: string | Component
}`,
    extends: [
        'IColorProps',
        'IBgColorProps',
        'ITagProps',
        'ICommonsComponentProps',
        'IDensityProps',
        'IRoundedProps',
        'IBorderProps',
        'IPaddingProps',
        'IMarginProps',
        'ILazyProps',
        'ILoaderProps',
    ],
    props: [
        { name: 'content', type: 'string | Component', optional: true, descriptionFallback: 'Static content to render inside the body. Accepts a plain string or a Vue component. The default slot always wins over this prop.' },
    ],
    usedBy: [
        { slug: 'expansion-panel-content', name: 'OrigamExpansionPanelContent', kind: 'component' },
        { slug: 'expansion-panel', name: 'OrigamExpansionPanel', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ExpensionPanel/expansion-panel-content.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_expansion_panel_content_props.example',
            titleFallback: 'Lazy-mounted content area',
            code: `<OrigamExpansionPanelContent :lazy="true" color="surface">
    <!-- mounted only when first opened -->
    <p>Panel body</p>
</OrigamExpansionPanelContent>`,
            lang: 'html',
        },
    ],
}
