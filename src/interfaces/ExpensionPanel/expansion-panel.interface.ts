import type {
    IActiveProps,
    IBgColorProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IExpansionPanelContentProps,
    IExpansionPanelHeaderProps,
    IGroupItemProps,
    IHoverProps,
    ILazyProps,
    ILoaderProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

export interface IExpansionPanelProps extends ITagProps, ICommonsComponentProps, IDensityProps, IColorProps, IBgColorProps, IBorderProps, IPaddingProps, IMarginProps, IElevationProps, IRoundedProps, IGroupItemProps, IExpansionPanelHeaderProps, IExpansionPanelContentProps, ILazyProps, ILoaderProps, IActiveProps, IHoverProps {
}
