import type { IColorProps, ICommonsComponentProps } from '../../interfaces'

export interface IFileFieldDragNDropItemProps extends ICommonsComponentProps, IColorProps {
    file: File
    index: number
    progress?: number
    fileIcon?: string
    removeIcon?: string
    disabled?: boolean
    readonly?: boolean
    showSize?: boolean | 1000 | 1024
}

export interface IFileFieldDragNDropItemEmits {
    (e: 'click:remove', value: { file: File, index: number }): void
}

export interface IFileFieldDragNDropItemSlots {
    default?: () => any
}
