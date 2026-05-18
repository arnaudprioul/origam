import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentEmits,
    ICommonsComponentProps,
    IDatePickerControlsProps,
    IDatePickerHeaderProps,
    IDatePickerMonthProps,
    IDatePickerMonthsProps,
    IDatePickerYearsProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IPickerProps,
    IRoundedProps
} from "../../interfaces"

import type { TDateMode } from "../../types"

export interface IDatePickerProps extends ICommonsComponentProps, IColorProps, IBorderProps, IRoundedProps, IElevationProps, IPaddingProps, IMarginProps, IPickerProps, IDatePickerControlsProps, IDatePickerMonthProps, IDatePickerMonthsProps, IDatePickerYearsProps, IDatePickerHeaderProps {
    modelValue?: string | Date | Array<string | Date>
}

/** Emits fired by `<OrigamDatePicker>` — main v-model + the three navigation
 *  channels (month / year / viewMode) the controls and tables push up. */
export interface IDatePickerEmits extends ICommonsComponentEmits {
    (e: 'update:month', value: number): void
    (e: 'update:year', value: number): void
    (e: 'update:viewMode', value: TDateMode): void
}
