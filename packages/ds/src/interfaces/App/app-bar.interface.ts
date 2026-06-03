import type { ICommonsComponentEmits, IImgProps, ILayoutItemProps, IScrollProps, IToolbarProps } from '../../interfaces'

import type { TBlock } from "../../types"

/**
 * A docked AppBar's cross-axis size (`width` for a top/bottom bar) is owned by
 * the layout engine — it always spans `calc(100% - reservedLeft - reservedRight)`
 * so `main` / drawers offset correctly. Exposing `width` / `minWidth` /
 * `maxWidth` would be a lie (the layout overrides them), so they're omitted
 * from the surface. `height` stays: it defines the bar's reserved thickness.
 */
export interface IAppBarProps extends Omit<IToolbarProps, 'width' | 'minWidth' | 'maxWidth'>, ILayoutItemProps, IScrollProps {
    location?: TBlock
    image?: IImgProps
}

/** Emits fired by `<OrigamAppBar>` — v-model on the rail/expanded state. */
export interface IAppBarEmits extends ICommonsComponentEmits {}
