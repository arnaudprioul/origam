import type {
    IBorderProps,
    ICommonsComponentProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

export interface ICardTextProps extends ICommonsComponentProps, ITagProps, IBorderProps, IRoundedProps, IPaddingProps, IMarginProps {
    text?: string | number
}
