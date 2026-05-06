import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps,
    ITransitionComponentProps
} from '../../interfaces'

export interface IMessagesProps extends ICommonsComponentProps, ITagProps, ITransitionComponentProps, IColorProps, IBorderProps, IPaddingProps, IMarginProps, IRoundedProps, IDensityProps, IElevationProps {
    active?: boolean
    messages?: Array<string> | string
}

export interface IMessagesEmits {
}

export interface IMessagesSlots {
    default?: (data: { message: string }) => any
}
