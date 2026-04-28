import { JUSTIFY } from '@origam/enums'
import type { IOptions } from '@origam/interfaces'
import type { TJustify } from '@origam/types'

export const justifyList: Array<IOptions<TJustify>> = [
    { label: '(none)', value: undefined },
    { label: 'Start', value: JUSTIFY.START },
    { label: 'End', value: JUSTIFY.END },
    { label: 'Center', value: JUSTIFY.CENTER },
    { label: 'Space between', value: JUSTIFY.SPACE_BETWEEN },
    { label: 'Space around', value: JUSTIFY.SPACE_AROUND },
    { label: 'Space evenly', value: JUSTIFY.SPACE_EVENLY },
]
