import { TDirectionBoth } from "../../types"

export interface IBorderProps {
    border?: boolean | number | string | TDirectionBoth | Array<TDirectionBoth>
    borderTop?: boolean | number | string
    borderLeft?: boolean | number | string
    borderBottom?: boolean | number | string
    borderRight?: boolean | number | string
    borderBlock?: boolean | number | string
    borderInline?: boolean | number | string
    borderColor?: string
    borderStyle?: string
}
