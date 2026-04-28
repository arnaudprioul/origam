import { DENSITY } from '@origam/enums'
import type { IOptions } from '@origam/interfaces'
import type { TDensity } from '@origam/types'

export const densityList: Array<IOptions<TDensity>> = [
    { label: '(none)', value: undefined },
    { label: 'Default', value: DENSITY.DEFAULT },
    { label: 'Compact', value: DENSITY.COMPACT },
    { label: 'Comfortable', value: DENSITY.COMFORTABLE },
]
