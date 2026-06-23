import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BTN_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-btn-props',
    name: 'IBtnProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_btn_props.description',
    descriptionFallback: 'Props for <OrigamBtn> — the primary action component. Supports all visual surfaces (color, bgColor, border, elevation, rounded, size, density, dimension, padding, margin), link navigation, ripple, loader, position, location, group membership, adjacent icons, status, hover, and variant.',
    definition: `export interface IBtnProps extends ICommonsComponentProps, IColorProps, IBgColorProps, IBorderProps, IDensityProps, IDimensionProps, IElevationProps, IRoundedProps, ITagProps, ISizeProps, ILinkProps, IRippleProps, ILoaderProps, IPositionProps, ILocationProps, IGroupItemProps, IPaddingProps, IMarginProps, IAdjacentProps, IStatusProps, IHoverProps, IVariantProps {
    active?: boolean
    flat?: boolean
    icon?: boolean | TIcon
    block?: boolean
    slim?: boolean
    stacked?: boolean
    text?: string
}`,
    extends: [
        'ICommonsComponentProps',
        'IColorProps',
        'IBgColorProps',
        'IBorderProps',
        'IDensityProps',
        'IDimensionProps',
        'IElevationProps',
        'IRoundedProps',
        'ITagProps',
        'ISizeProps',
        'ILinkProps',
        'IRippleProps',
        'ILoaderProps',
        'IPositionProps',
        'ILocationProps',
        'IGroupItemProps',
        'IPaddingProps',
        'IMarginProps',
        'IAdjacentProps',
        'IStatusProps',
        'IHoverProps',
        'IVariantProps',
    ],
    props: [
        { name: 'active', type: 'boolean', optional: true, descriptionFallback: 'Forces the active (pressed) visual state.' },
        { name: 'flat', type: 'boolean', optional: true, descriptionFallback: 'Deprecated — use variant="flat" instead. Kept for backward compatibility.' },
        { name: 'icon', type: 'boolean | TIcon', optional: true, descriptionFallback: 'Icon-only mode when boolean true, or explicit icon name. Removes text padding and makes the button square.' },
        { name: 'block', type: 'boolean', optional: true, descriptionFallback: 'Makes the button span the full width of its container.' },
        { name: 'slim', type: 'boolean', optional: true, descriptionFallback: 'Reduces horizontal padding for a compact appearance.' },
        { name: 'stacked', type: 'boolean', optional: true, descriptionFallback: 'Stacks icon above text in a column layout.' },
        { name: 'text', type: 'string', optional: true, descriptionFallback: 'Button label text — alternative to default slot.' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'btn-group', name: 'BtnGroup', kind: 'component' },
        { slug: 'bottom-nav', name: 'BottomNav', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Btn/btn.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_btn_props.example',
            titleFallback: 'Primary action button with icon',
            code: `<OrigamBtn
  color="primary"
  variant="filled"
  prepend-icon="mdi-check"
  size="md"
  rounded="md"
>
  Save
</OrigamBtn>`,
            lang: 'html',
        },
    ],
}
