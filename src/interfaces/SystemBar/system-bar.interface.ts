import type {
    IBorderProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDimensionProps,
    IElevationProps,
    ILayoutItemProps,
    IRoundedProps,
    ITagProps
} from "../../interfaces"

export interface ISystemBarProps extends ICommonsComponentProps, ITagProps, IElevationProps, IColorProps, IBgColorProps, ILayoutItemProps, IRoundedProps, IBorderProps, IDimensionProps {
    window?: boolean
}
