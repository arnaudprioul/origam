import { VARIANT } from '@origam/enums'
import type { IOptions } from '@origam/interfaces'
import type { TVariant } from '@origam/types'

export const variantList: Array<IOptions<TVariant>> = [
    { label: '(none)', value: undefined },
    { label: 'Flat', value: VARIANT.FLAT },
    { label: 'Elevated', value: VARIANT.ELEVATED },
    { label: 'Tonal', value: VARIANT.TONAL },
    { label: 'Outlined', value: VARIANT.OUTLINED },
    { label: 'Text', value: VARIANT.TEXT },
    { label: 'Plain', value: VARIANT.PLAIN },
    { label: 'Ghost', value: VARIANT.GHOST },
]
