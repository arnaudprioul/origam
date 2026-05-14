import type {
    IBorderProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IMarginProps,
    IPaddingProps,
    ITagProps
} from '../../interfaces'

export interface ITitleProps extends ITagProps, ICommonsComponentProps, IColorProps, IBgColorProps, IDensityProps, IPaddingProps, IMarginProps, IBorderProps {
    text?: string
}
