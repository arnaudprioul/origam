import type { IAdjacentProps, IClickEmits, IColorProps, ICommonsComponentProps, IDensityProps } from "../../interfaces"

import type { TTransitionProps } from "../../types"

export interface IDatePickerHeaderProps extends ICommonsComponentProps, IColorProps, IAdjacentProps, IDensityProps {
    header?: string
    transition?: TTransitionProps
}

/** Emits fired by `<OrigamDatePickerHeader>` — click on the header text. */
export interface IDatePickerHeaderEmits extends IClickEmits {}
