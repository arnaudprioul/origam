import type { ICommonsComponentProps } from "../../interfaces"

import type { TDateMode, TIcon } from "../../types"

export interface IDatePickerControlsProps extends ICommonsComponentProps {
    active?: string | Array<string>
    disabled?: boolean
    disabledMonth?: boolean
    disabledYear?: boolean
    disabledNext?: boolean
    disabledPrev?: boolean
    nextIcon?: TIcon
    prevIcon?: TIcon
    modeIcon?: TIcon
    text?: string,
    viewMode?: TDateMode
}

/** Emits fired by `<OrigamDatePickerControls>` — clicks on the five
 *  toolbar buttons (year / month / prev / next / text label). */
export interface IDatePickerControlsEmits {
    (e: 'click:year', event: MouseEvent): void
    (e: 'click:month', event: MouseEvent): void
    (e: 'click:prev', event: MouseEvent): void
    (e: 'click:next', event: MouseEvent): void
    (e: 'click:text', event: MouseEvent): void
}
