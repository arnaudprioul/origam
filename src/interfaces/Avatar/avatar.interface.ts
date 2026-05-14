import type {
    IActiveProps,
    IBorderProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IHoverProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ISizeProps,
    ISrcObject,
    ITagProps
} from '../../interfaces'

import type { TIcon } from '../../types'

export interface IAvatarProps extends ICommonsComponentProps, IDensityProps, IRoundedProps, ISizeProps, ITagProps, IColorProps, IBgColorProps, IPaddingProps, IMarginProps, IBorderProps, IElevationProps, IHoverProps, IActiveProps {
    start?: boolean,
    end?: boolean,
    /**
     * Renders an icon inside the avatar (centered). Mutually exclusive
     * with `image` and `text`: image wins, then icon, then text.
     */
    icon?: TIcon,
    image?: string | ISrcObject,
    text?: string
}
