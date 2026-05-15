import type {
    ICommonsComponentProps,
    IGroupItemProps,
    ITagProps
} from '../../interfaces'

import type { TIcon } from '../../types'

/**
 * Props for `<OrigamTab>` — a single registered tab inside an
 * `<OrigamTabs>` tablist.
 *
 * The slot scope is the default text label. Optional `icon` /
 * `appendIcon` render at the leading / trailing edge respectively.
 *
 * ARIA wiring (`role="tab"`, `aria-selected`, `aria-controls`, `id`,
 * `tabindex`) is computed inside the component — consumers only
 * provide `value` (the canonical identifier) and `disabled`.
 */
export interface ITabProps extends ICommonsComponentProps, ITagProps, IGroupItemProps {
    tag?: string
    icon?: TIcon
    appendIcon?: TIcon
}
