import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RIPPLE_HIDE_UTIL_DOC: IUtilDoc = {
    slug: 'ripple-hide',
    name: 'rippleHide',
    category: 'Commons',
    icon: 'mdi-water-off',
    descriptionKey: 'utils.catalog.ripple_hide.description',
    descriptionFallback: 'Trigger the hide animation for an active ripple on a mouse/touch end or leave event. Handles the special case where a touchend arrives before the show-timer fires, committing and then queuing the hide.',
    signature: `function rippleHide(e: Event): void`,
    params: [
        {
            name: 'e',
            type: 'Event',
            required: true,
            descriptionKey: 'utils.detail.ripple_hide.param_e',
            descriptionFallback: 'The DOM event whose currentTarget holds the element with ripple state (_ripple). Supported types: mouseup, mouseleave, touchend, touchcancel, keyup, blur, dragstart.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.ripple_hide.returns',
        descriptionFallback: 'No return value. Triggers the RIPPLES.hide() animation on the element and clears the show timer.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/ripple.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.ripple_hide.example_basic',
            titleFallback: 'Wire hide to pointer release events',
            code: `import { rippleHide } from 'origam'

el.addEventListener('mouseup', rippleHide)
el.addEventListener('mouseleave', rippleHide)
el.addEventListener('touchend', rippleHide, { passive: true })`,
            lang: 'typescript',
        },
    ],
    related: ['ripple-cancel-show', 'ripple-remove-listeners'],
}
