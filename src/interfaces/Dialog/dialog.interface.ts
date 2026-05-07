import type { ICardProps, ICommonsComponentProps, IOverlayProps, IStatusProps } from '../../interfaces'
import type { TSize } from '../../types'

export interface IDialogProps extends ICommonsComponentProps, IOverlayProps, ICardProps, IStatusProps {
    fullscreen?: boolean
    retainFocus?: boolean
    scrollable?: boolean
    size?: TSize
}
