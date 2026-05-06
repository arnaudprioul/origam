import { IColorProps, ICommonsComponentProps } from '../../interfaces'

export interface IFileFieldDragNDropItemProps extends ICommonsComponentProps {
    file: File
    index: number
    progress?: number
    fileIcon?: string
    removeIcon?: string
    disabled?: boolean
    readonly?: boolean
    color?: IColorProps['color']
    showSize?: boolean | 1000 | 1024
}

export interface IFileFieldDragNDropItemEmits {
    (e: 'click:remove', value: { file: File, index: number }): void
}

export interface IFileFieldDragNDropItemSlots {
    default?: () => any
}
