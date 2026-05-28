import type {
    IAdjacentEmits,
    IAdjacentProps,
    IBorderProps,
    ICommonsComponentProps,
    IDensityProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

export interface ICardHeaderProps extends ITagProps, ICommonsComponentProps, IBorderProps, IRoundedProps, IPaddingProps, IMarginProps, IDensityProps, IAdjacentProps {
    subtitle?: string | number
    title?: string | number
}

/** Emits fired by `<OrigamCardHeader>` — clicks on prepend/append slots. */
export interface ICardHeaderEmits extends IAdjacentEmits {}
