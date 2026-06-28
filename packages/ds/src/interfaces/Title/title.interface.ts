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
import type { TFontFamily, TFontSize, TFontWeight, TLetterSpacing, TLineHeight } from '../../types'

export interface ITitleProps extends ITagProps, ICommonsComponentProps, IColorProps, IBgColorProps, IDensityProps, IPaddingProps, IMarginProps, IBorderProps {
    text?: string
    /**
     * Font family token. Maps to `--origam-font__family---{family}`
     * (sans · mono · serif).
     * When unset, the title keeps its theme `--origam-title---font-family`.
     */
    family?: TFontFamily
    /**
     * Font size token. Maps to `--origam-font__size---{size}`
     * (xs · sm · md · lg · xl · 2xl · 3xl · 4xl · 5xl).
     * Overrides the density-driven font-size when set; density remains active when unset.
     */
    size?: TFontSize
    /**
     * Font weight token. Maps to `--origam-font__weight---{weight}`
     * (regular 400 · medium 500 · semibold 600 · bold 700 · extrabold 800 · black 900).
     * When unset, the title keeps its theme `--origam-title---font-weight`.
     */
    weight?: TFontWeight
    /**
     * Line-height token. Maps to `--origam-font__lineHeight---{lineHeight}`
     * (none 1 · tight 1.25 · snug 1.375 · normal 1.5 · relaxed 1.625 · loose 2).
     * When unset, the title keeps its theme `--origam-title---line-height`.
     */
    lineHeight?: TLineHeight
    /**
     * Letter-spacing token. Maps to `--origam-font__letterSpacing---{letterSpacing}`
     * (tight -0.025em · normal 0em · wide 0.0094em · wider 0.0125em · widest 0.0893em).
     * When unset, the title keeps its theme `--origam-title---letter-spacing`.
     */
    letterSpacing?: TLetterSpacing
}
