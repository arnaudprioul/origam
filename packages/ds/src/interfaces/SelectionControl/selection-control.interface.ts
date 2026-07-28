import type {
    IActiveProps,
    IBgColorProps,
    IBorderProps,
    IColorProps, ICommonsComponentEmits, ICommonsComponentProps, IDensityProps, IElevationProps, ISelectionControlGroupProps,
    IHoverProps,
    IRoundedProps
} from '../../interfaces'
import type { TColor, TIcon } from '../../types'

/**
 * `border` / `rounded` / `elevation` (props-first, issue #241): declared
 * here (rather than left to `ICheckboxProps` / `IRadioProps` alone) because
 * `OrigamSelectionControl` is the component that owns the actual visual
 * surface these props target — the circular `__input` box holding the
 * glyph. `OrigamCheckboxBtn` / `OrigamRadioBtn` forward their own values
 * down via `filterProps`, same relay pattern as `ISwitchTrackProps`.
 */
export interface ISelectionControlProps extends ICommonsComponentProps, Partial<Omit<ISelectionControlGroupProps, 'items'>>, IColorProps, IBgColorProps, IActiveProps, IHoverProps, IDensityProps, IBorderProps, IRoundedProps, IElevationProps {
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
