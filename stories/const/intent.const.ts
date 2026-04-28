import type { IOptions } from '@origam/interfaces'
import type { TIntent } from '@origam/types'

export const intentList: Array<IOptions<TIntent>> = [
    { label: '(none)', value: undefined },
    { label: 'Neutral', value: 'neutral' },
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
    { label: 'Ghost', value: 'ghost' },
    { label: 'Success', value: 'success' },
    { label: 'Warning', value: 'warning' },
    { label: 'Danger', value: 'danger' },
    { label: 'Info', value: 'info' },
]
