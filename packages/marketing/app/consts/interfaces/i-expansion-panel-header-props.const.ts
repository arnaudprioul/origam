import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_EXPANSION_PANEL_HEADER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-expansion-panel-header-props',
    name: 'IExpansionPanelHeaderProps',
    category: 'Disclosure',
    descriptionKey: 'interfaces.catalog.i_expansion_panel_header_props.description',
    descriptionFallback: 'Props for the clickable header row of OrigamExpansionPanel. Controls the expand/collapse icons, focusability, static mode, readonly state, title text and all visual surface properties.',
    definition: `export interface IExpansionPanelHeaderProps extends IColorProps, IBgColorProps, ITagProps, ICommonsComponentProps, IDensityProps, IRoundedProps, IBorderProps, IPaddingProps, IMarginProps, IAdjacentProps, IRippleProps, IActiveProps, IHoverProps {
    expandIcon?: TIcon
    collapseIcon?: TIcon
    hideActions?: boolean
    focusable?: boolean
    static?: boolean
    readonly?: boolean
    title?: string
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
        'IAdjacentProps',
        'IRippleProps',
        'IActiveProps',
        'IHoverProps',
    ],
    props: [
        { name: 'expandIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon shown when the panel is collapsed (indicating it can be expanded).' },
        { name: 'collapseIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon shown when the panel is expanded (indicating it can be collapsed).' },
        { name: 'hideActions', type: 'boolean', optional: true, descriptionFallback: 'Hide the expand/collapse chevron icon entirely.' },
        { name: 'focusable', type: 'boolean', optional: true, descriptionFallback: 'Add a visible focus ring on the header when it receives keyboard focus.' },
        { name: 'static', type: 'boolean', optional: true, descriptionFallback: 'Render the header without interactive behaviour — useful for purely decorative panels.' },
        { name: 'readonly', type: 'boolean', optional: true, descriptionFallback: 'Prevent the user from toggling the panel open/closed.' },
        { name: 'title', type: 'string', optional: true, descriptionFallback: 'Header label text. Override via the default slot for richer markup.' },
    ],
    usedBy: [
        { slug: 'expansion-panel-header', name: 'OrigamExpansionPanelHeader', kind: 'component' },
        { slug: 'expansion-panel', name: 'OrigamExpansionPanel', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ExpensionPanel/expansion-panel-header.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_expansion_panel_header_props.example',
            titleFallback: 'Custom expand/collapse icons',
            code: `<OrigamExpansionPanelHeader
    expand-icon="mdi-chevron-down"
    collapse-icon="mdi-chevron-up"
    title="Advanced settings"
/>`,
            lang: 'html',
        },
    ],
}
