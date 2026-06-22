import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SYSTEM_BAR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-system-bar-props',
    name: 'ISystemBarProps',
    category: 'Layout',
    descriptionKey: 'interfaces.catalog.i_system_bar_props.description',
    descriptionFallback: 'Props for <OrigamSystemBar> — a thin status strip at the top of the viewport (OS-style). Participates in layout, supports color, elevation, border, dimension and rounded facets, plus a window mode that reduces height.',
    definition: `export interface ISystemBarProps extends ICommonsComponentProps, ITagProps, IElevationProps, IColorProps, IBgColorProps, ILayoutItemProps, IRoundedProps, IBorderProps, IDimensionProps {
    window?: boolean
}`,
    extends: [
        'ICommonsComponentProps',
        'ITagProps',
        'IElevationProps',
        'IColorProps',
        'IBgColorProps',
        'ILayoutItemProps',
        'IRoundedProps',
        'IBorderProps',
        'IDimensionProps',
    ],
    props: [
        { name: 'window', type: 'boolean', optional: true, descriptionFallback: 'Activates the window-chrome variant — slightly taller strip typically used inside a simulated OS window frame.' },
    ],
    usedBy: [
        { slug: 'system-bar', name: 'SystemBar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/SystemBar/system-bar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_system_bar_props.example',
            titleFallback: 'System bar with window mode and custom color',
            code: `<OrigamSystemBar window bgColor="surface" color="on-surface">
  <OrigamIcon icon="mdi-wifi" />
  <OrigamIcon icon="mdi-battery" />
  <span>9:41 AM</span>
</OrigamSystemBar>`,
            lang: 'html',
        },
    ],
}
