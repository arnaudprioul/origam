import type { ICommonsComponentEmits, IImgProps, ILayoutItemProps, IScrollProps, IToolbarProps } from '../../interfaces'

import type { TBlock } from "../../types"

export interface IAppBarProps extends IToolbarProps, ILayoutItemProps, IScrollProps {
    location?: TBlock
    image?: IImgProps
}

/** Emits fired by `<OrigamAppBar>` — v-model on the rail/expanded state. */
export interface IAppBarEmits extends ICommonsComponentEmits {}
