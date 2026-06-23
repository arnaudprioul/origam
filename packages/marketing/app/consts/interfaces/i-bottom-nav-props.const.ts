import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BOTTOM_NAV_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-bottom-nav-props',
    name: 'IBottomNavProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_bottom_nav_props.description',
    descriptionFallback: 'Props contract for <OrigamBottomNav> — a fixed navigation bar with item buttons, supporting grow mode, placement position, transition, and the full cross-cutting surface (color, bgColor, border, elevation, margin, dimension, density, rounded, layout, group, hover, active).',
    definition: `export interface IBottomNavProps extends ITagProps, ICommonsComponentProps, IColorProps, IBgColorProps, IPaddingProps, IBorderProps, IElevationProps, IMarginProps, IDimensionProps, IDensityProps, IRoundedProps, ILayoutItemProps, IGroupProps, IHoverProps, IActiveProps, ITransitionComponentProps {
    grow?: boolean
    mode?: TMode
    items?: Array<IBtnProps>
    position?: TBottomNavPosition
}`,
    extends: [
        'ITagProps',
        'ICommonsComponentProps',
        'IColorProps',
        'IBgColorProps',
        'IPaddingProps',
        'IBorderProps',
        'IElevationProps',
        'IMarginProps',
        'IDimensionProps',
        'IDensityProps',
        'IRoundedProps',
        'ILayoutItemProps',
        'IGroupProps',
        'IHoverProps',
        'IActiveProps',
        'ITransitionComponentProps',
    ],
    props: [
        { name: 'grow', type: 'boolean', optional: true, descriptionFallback: 'Make each item button grow to fill the available width equally.' },
        { name: 'mode', type: 'TMode', optional: true, descriptionFallback: 'Display mode of the bottom nav bar.' },
        { name: 'items', type: 'Array<IBtnProps>', optional: true, descriptionFallback: 'Array of button props used to render nav items declaratively.' },
        { name: 'position', type: 'TBottomNavPosition', optional: true, default: "'start'", descriptionFallback: 'Horizontal placement of the bar when it does not span the full width: start (inline-start), center or end (inline-end).' },
    ],
    usedBy: [
        { slug: 'bottom-nav', name: 'BottomNav', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/BottomNav/bottom-nav.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_bottom_nav_props.example',
            titleFallback: 'Declarative bottom nav with grow items',
            code: `<OrigamBottomNav
  :items="navItems"
  grow
  color="primary"
  position="center"
/>`,
            lang: 'html',
        },
    ],
}
