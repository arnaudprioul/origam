import { POSITION } from '@origam/enums'
import type { IOptions } from '@origam/interfaces'
import type { TPosition } from '@origam/types'

export const positionList: Array<IOptions<TPosition>> = [
    { label: '(none)', value: undefined },
    { label: 'Static', value: POSITION.STATIC },
    { label: 'Relative', value: POSITION.RELATIVE },
    { label: 'Absolute', value: POSITION.ABSOLUTE },
    { label: 'Fixed', value: POSITION.FIXED },
    { label: 'Sticky', value: POSITION.STICKY },
]
