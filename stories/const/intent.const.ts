import type { TIntent } from '@origam/types'
import type { IOptions } from '@stories/interfaces'

/**
 * The eight semantic intents accepted by `useColorEffect` (and therefore by
 * every component that exposes a `color` prop). The legacy raw-hex path is
 * deprecated since v2.0 and will be removed in v3 — story controls should
 * stay on this list.
 */
export const intentList: Array<IOptions<TIntent | undefined>> = [
    { label: 'Default (none)', value: undefined },
    { label: 'Neutral',  value: 'neutral' },
    { label: 'Primary',  value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
    { label: 'Ghost',    value: 'ghost' },
    { label: 'Success',  value: 'success' },
    { label: 'Warning',  value: 'warning' },
    { label: 'Danger',   value: 'danger' },
    { label: 'Info',     value: 'info' }
]
