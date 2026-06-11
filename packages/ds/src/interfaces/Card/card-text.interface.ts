import type {
    IBorderProps,
    ICommonsComponentProps,
    IDensityProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

export interface ICardTextProps extends ICommonsComponentProps, ITagProps, IBorderProps, IRoundedProps, IPaddingProps, IMarginProps, IDensityProps {
    text?: string | number
}
