import type { ComputedRef, Ref } from 'vue'
import type { IColorProps, ICommonsComponentProps, IDensityProps, ISizeProps } from '../../interfaces'
import type { TIcon } from '../../types'
import type { TStepperItemStatus, TStepperOrientation } from '../../types'

export interface IStepperItem {
    title: string
    subtitle?: string
    icon?: TIcon
    status?: TStepperItemStatus
}

export interface IStepperProps extends ICommonsComponentProps, IColorProps, ISizeProps, IDensityProps {
    items?: IStepperItem[]
    modelValue?: number
    orientation?: 'horizontal' | 'vertical'
    clickable?: boolean
    showConnectors?: boolean
}

export interface IStepperProvide {
    modelValue: Ref<number>
    orientation: ComputedRef<TStepperOrientation>
    clickable: ComputedRef<boolean>
    color: ComputedRef<string | undefined>
}

export interface IStepperItemProps extends ICommonsComponentProps {
    index?: number
    title?: string
    subtitle?: string
    icon?: TIcon
    status?: TStepperItemStatus
    clickable?: boolean
}
