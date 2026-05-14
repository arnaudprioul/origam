import type {
    IAdjacentInnerProps,
    IAdjacentProps,
    IBorderProps,
    IChipProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IFieldProps,
    IFiltersProps,
    IInputProps,
    IItemProps,
    ILazyProps,
    IListProps,
    IMarginProps,
    IMenuProps,
    IPaddingProps,
    IRoundedProps,
    ITextFieldProps,
    ITransitionComponentProps
} from '../../interfaces'

import type { TIcon } from '../../types'

export interface ISelectProps extends ICommonsComponentProps, IColorProps, IBgColorProps, ITextFieldProps, IDensityProps, IAdjacentProps, IAdjacentInnerProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IItemProps, ITransitionComponentProps, IFiltersProps, ILazyProps {
    chips?: boolean
    closableChips?: boolean
    hideNoData?: boolean
    hideSelected?: boolean
    listProps?: IListProps
    menu?: boolean
    menuIcon?: TIcon
    menuProps?: IMenuProps
    chipProps?: IChipProps
    multiple?: boolean
    noDataText?: string
    openOnClear?: boolean

    autocomplete?: boolean
    autoSelectFirst?: boolean | string
    clearOnSelect?: boolean
    divider?: string
    search?: string
    closeText?: string
    openText?: string
}
