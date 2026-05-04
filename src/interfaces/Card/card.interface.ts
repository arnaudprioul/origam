import type {
    IAdjacentProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IDimensionProps,
    IElevationProps,
    ILinkProps,
    ILoaderProps,
    ILocationProps,
    IMarginProps,
    IPaddingProps,
    IPositionProps,
    IRippleProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

import type { TCardType } from '../../types'

// `IColorProps` exposes `color` / `bgColor` / hover / active colour
// hooks. Pre-fix `ICardProps` did NOT extend it, so a consumer
// `<origam-card color="primary">` was silently a no-op despite Card's
// SCSS reading `var(--origam-card---color)` / `--background`.
// Reported by the user in the audit pass that surfaced the Switch
// `color` regression.
export interface ICardProps extends ICommonsComponentProps, ITagProps, IBorderProps, IColorProps, IDensityProps, IDimensionProps, IElevationProps, ILoaderProps, ILocationProps, IPositionProps, IRoundedProps, IMarginProps, IPaddingProps, ILinkProps, IRippleProps, IAdjacentProps {
    disabled?: boolean
    flat?: boolean
    hover?: boolean
    image?: string
    link?: boolean
    subtitle?: string | number
    text?: string | number
    title?: string | number
    type?: TCardType
}
