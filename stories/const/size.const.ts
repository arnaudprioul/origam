import { SIZES } from '@origam/enums'
import type { IOptions } from '@origam/interfaces'
import type { TSize } from '@origam/types'

export const sizeList: Array<IOptions<TSize>> = [
    { label: '(none)', value: undefined },
    { label: 'X-Small', value: SIZES.X_SMALL },
    { label: 'Small', value: SIZES.SMALL },
    { label: 'Default', value: SIZES.DEFAULT },
    { label: 'Large', value: SIZES.LARGE },
    { label: 'X-Large', value: SIZES.X_LARGE },
]
