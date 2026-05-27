import { ALIGN } from '@origam/enums'
import type { IOptions } from '@origam/interfaces'
import type { TAlign } from '@origam/types'

export const alignList: Array<IOptions<TAlign>> = [
    { label: '(none)', value: undefined },
    { label: 'Start', value: ALIGN.START },
    { label: 'End', value: ALIGN.END },
    { label: 'Center', value: ALIGN.CENTER },
    { label: 'Baseline', value: ALIGN.BASELINE },
    { label: 'Stretch', value: ALIGN.STRETCH },
]
