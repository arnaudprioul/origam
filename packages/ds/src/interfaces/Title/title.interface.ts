import type {
    IBorderProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IMarginProps,
    IPaddingProps,
    ITagProps
} from '../../interfaces'
import type { TFontWeight } from '../../types'

export interface ITitleProps extends ITagProps, ICommonsComponentProps, IColorProps, IBgColorProps, IDensityProps, IPaddingProps, IMarginProps, IBorderProps {
    text?: string
    /**
     * Font weight token. Maps to `--origam-font__weight---{weight}`
     * (regular 400 · medium 500 · semibold 600 · bold 700 · extrabold 800 · black 900).
     * When unset, the title keeps its theme `--origam-title---font-weight`.
     */
    weight?: TFontWeight
}
