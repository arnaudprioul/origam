import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RIPPLE_CANCEL_SHOW_UTIL_DOC: IUtilDoc = {
    slug: 'ripple-cancel-show',
    name: 'rippleCancelShow',
    category: 'Commons',
    icon: 'mdi-gesture-tap-hold',
    descriptionKey: 'utils.catalog.ripple_cancel_show.description',
    descriptionFallback: 'Cancel a pending ripple show on a touch/mouse move event. Clears the show-timer commit and the pending timeout so a ripple that has not yet appeared is silently discarded.',
    signature: `function rippleCancelShow(e: MouseEvent | TouchEvent): void`,
    params: [
        {
            name: 'e',
            type: 'MouseEvent | TouchEvent',
            required: true,
            descriptionKey: 'utils.detail.ripple_cancel_show.param_e',
            descriptionFallback: 'The pointer move event whose currentTarget holds the ripple state object. If the element has no _ripple state or no pending show, the call is a no-op.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.ripple_cancel_show.returns',
        descriptionFallback: 'No return value. Side-effects: clears showTimerCommit and showTimer on the element ripple state.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/ripple.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.ripple_cancel_show.example_basic',
            titleFallback: 'Wire cancel-show to touchmove',
            code: `import { rippleCancelShow } from 'origam'

el.addEventListener('touchmove', rippleCancelShow, { passive: true })`,
            lang: 'typescript',
        },
    ],
    related: ['ripple-hide', 'ripple-remove-listeners'],
}
