import type {
    IActiveProps,
    IBgColorProps,
    IColorProps, ICommonsComponentEmits, ICommonsComponentProps, IDensityProps, ISelectionControlGroupProps,
    IHoverProps
} from '../../interfaces'
import type { TColor, TIcon } from '../../types'

export interface ISelectionControlProps extends ICommonsComponentProps, Partial<Omit<ISelectionControlGroupProps, 'items'>>, IColorProps, IBgColorProps, IActiveProps, IHoverProps, IDensityProps {
    label?: string
    trueValue?: any
    falseValue?: any
    value?: any
    required?: boolean
    /** @deprecated Use the `active` object prop instead. Kept for back-compat. */
    activeColor?: TColor
    /** @deprecated Use the `active` object prop instead. Kept for back-compat. */
    activeBgColor?: TColor
}

export interface ISelectionControlEmits extends ICommonsComponentEmits {
    (e: 'click:label', event: MouseEvent): void
}

export interface ISelectionControlSlots {
    default?: (data: { model: any, color?: TColor, bgColor?: TColor, icon?: TIcon, props: any }) => any
    label?: () => any
    input?: (data: { model: any, color?: TColor, bgColor?: TColor, icon?: TIcon, props: any, textColorStyles?: any, backgroundColorStyles?: any }) => any
}
