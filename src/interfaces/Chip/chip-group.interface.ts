import type {
    IBorderProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IGroupProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ISlideGroupProps,
    ITagProps
} from '../../interfaces'

export interface IChipGroupProps extends ICommonsComponentProps, ITagProps, IGroupProps, IColorProps, IBgColorProps, IMarginProps, IPaddingProps, IBorderProps, IRoundedProps, ISlideGroupProps {
    column?: boolean
    filter?: boolean
    valueComparator?: (a: any, b: any) => boolean
}
