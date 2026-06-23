import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DRAWER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-drawer-props',
    name: 'IDrawerProps',
    category: 'Layout',
    descriptionKey: 'interfaces.catalog.i_drawer_props.description',
    descriptionFallback: 'Props for OrigamDrawer — the side navigation panel. Covers permanent, temporary, rail and expand-on-hover modes, layout reservation (push), viewport positioning (clipped), resize/route watchers and all visual surface props.',
    definition: `export interface IDrawerProps extends ITagProps, ICommonsComponentProps, IBorderProps, IElevationProps, ILayoutItemProps, IRoundedProps, IColorProps, IBgColorProps, IDensityProps, IPaddingProps, IMarginProps, ITransitionComponentProps, IScrimProps, IActiveProps, IHoverProps {
    disableResizeWatcher?: boolean
    disableRouteWatcher?: boolean
    expandOnHover?: boolean
    floating?: boolean
    modelValue?: boolean
    permanent?: boolean | null
    rail?: boolean | null
    railWidth?: number | string
    temporary?: boolean
    touchless?: boolean
    width?: number | string
    sticky?: boolean
    push?: boolean | null
    clipped?: boolean | null
}`,
    extends: [
        'ITagProps',
        'ICommonsComponentProps',
        'IBorderProps',
        'IElevationProps',
        'ILayoutItemProps',
        'IRoundedProps',
        'IColorProps',
        'IBgColorProps',
        'IDensityProps',
        'IPaddingProps',
        'IMarginProps',
        'ITransitionComponentProps',
        'IScrimProps',
        'IActiveProps',
        'IHoverProps',
    ],
    props: [
        { name: 'disableResizeWatcher', type: 'boolean', optional: true, descriptionFallback: 'Disable the internal ResizeObserver that auto-closes a temporary drawer on viewport shrink.' },
        { name: 'disableRouteWatcher', type: 'boolean', optional: true, descriptionFallback: 'Disable automatic close on route change (useful when the drawer should persist across navigation).' },
        { name: 'expandOnHover', type: 'boolean', optional: true, descriptionFallback: 'Expand a rail drawer to full width when the pointer enters it.' },
        { name: 'floating', type: 'boolean', optional: true, descriptionFallback: 'Remove the border/shadow that separates the drawer from the content area for a seamless look.' },
        { name: 'modelValue', type: 'boolean', optional: true, descriptionFallback: 'v-model open/closed state. Ignored for permanent drawers.' },
        { name: 'permanent', type: 'boolean | null', optional: true, descriptionFallback: 'Always visible; ignores modelValue and overlay behaviour.' },
        { name: 'rail', type: 'boolean | null', optional: true, descriptionFallback: 'Collapse the drawer to icon-only width.' },
        { name: 'railWidth', type: 'number | string', optional: true, descriptionFallback: 'Override the icon-only collapsed width when rail is true.' },
        { name: 'temporary', type: 'boolean', optional: true, descriptionFallback: 'Show a scrim behind the drawer and close on outside click or Escape.' },
        { name: 'touchless', type: 'boolean', optional: true, descriptionFallback: 'Disable swipe-to-open/close gesture handling.' },
        { name: 'width', type: 'number | string', optional: true, descriptionFallback: 'Override the default expanded drawer width.' },
        { name: 'sticky', type: 'boolean', optional: true, descriptionFallback: 'Keep the drawer visible while the user scrolls (position: sticky semantics).' },
        { name: 'push', type: 'boolean | null', optional: true, descriptionFallback: 'When true, adjacent layout items offset themselves to make room. null (default) derives from permanent.' },
        { name: 'clipped', type: 'boolean | null', optional: true, descriptionFallback: 'When true, the drawer slots below top-anchored layout items (e.g. AppBar). null derives from HTML declaration order.' },
    ],
    usedBy: [
        { slug: 'drawer', name: 'OrigamDrawer', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Drawer/drawer.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_drawer_props.example',
            titleFallback: 'Rail drawer that expands on hover',
            code: `<OrigamDrawer :rail="true" :expand-on-hover="true" color="surface">
    <!-- nav items -->
</OrigamDrawer>`,
            lang: 'html',
        },
    ],
}
