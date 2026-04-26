import type { IColorProps, ICommonsComponentEmits, ICommonsComponentProps, ICommonsComponentSlots, ISelectionControlGroupProps } from '../../interfaces'
import type { TColor, TIcon } from '../../types'

export interface ISelectionControlProps extends ICommonsComponentProps, Partial<Omit<ISelectionControlGroupProps, 'items'>>, IColorProps {
    label?: string
    trueValue?: any
    falseValue?: any
    value?: any
    required?: boolean
}

export interface ISelectionControlEmits extends ICommonsComponentEmits {
    (e: 'click:label', event: MouseEvent): void
}

export interface ISelectionControlSlots extends ICommonsComponentSlots {
    default?: (model: any, textColorStyles: TColor, backgroundColorStyles: TColor, icon: TIcon, props: any) => any
    label?: () => any
    input?: (props: any, icon: TIcon, textColorStyles: TColor, backgroundColorStyles: TColor, model: any) => any
}
