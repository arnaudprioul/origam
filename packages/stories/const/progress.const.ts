import { PROGRESS_TYPE } from '@origam/enums'
import type { IOptions } from '@origam/interfaces'
import type { TProgressType } from '@origam/types'

/**
 * Options list for the `type` prop of OrigamProgress (the dispatcher
 * component that picks circular vs linear). Mirrors the same shape as
 * `sizeList` / `intentList` / `tagList` so HstSelect can consume it.
 */
export const progressTypeList: Array<IOptions<TProgressType>> = [
    { label: 'Circular', value: PROGRESS_TYPE.CIRCULAR },
    { label: 'Linear', value: PROGRESS_TYPE.LINEAR },
]
