import type {
    IActiveProps,
    IBgColorProps,
    IColorProps, ICommonsComponentEmits, ICommonsComponentProps, ISelectionControlGroupProps,
    IHoverProps
} from '../../interfaces'
import type { TIcon } from '../../types'

export interface ISelectionControlProps extends ICommonsComponentProps, Partial<Omit<ISelectionControlGroupProps, 'items'>>, IColorProps, IBgColorProps, IActiveProps, IHoverProps {
    label?: string
    trueValue?: any
    falseValue?: any
    value?: any
    required?: boolean
}

export interface ISelectionControlEmits extends ICommonsComponentEmits {
    (e: 'click:label', event: MouseEvent): void
}

export interface ISelectionControlSlots {
    default?: (model: any, icon: TIcon, props: any) => any
    label?: () => any
    input?: (props: any, icon: TIcon, model: any) => any
}
