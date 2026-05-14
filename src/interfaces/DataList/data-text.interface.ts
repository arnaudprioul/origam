import type {
    IAdjacentProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IMarginProps,
    IPaddingProps
} from "../../interfaces";

export interface IDataTextProps extends ICommonsComponentProps, IAdjacentProps, IDensityProps, IMarginProps, IPaddingProps, IColorProps, IBgColorProps {
    text: string | number
}
