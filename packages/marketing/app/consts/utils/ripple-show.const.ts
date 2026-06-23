import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RIPPLE_SHOW_UTIL_DOC: IUtilDoc = {
    slug: 'ripple-show',
    name: 'rippleShow',
    category: 'Commons',
    icon: 'mdi-gesture-tap',
    descriptionKey: 'utils.catalog.ripple_show.description',
    descriptionFallback: 'Trigger the ripple animation on an element in response to a pointer or keyboard event. Handles touch vs. mouse distinctions and respects the stop-propagation flag.',
    signature: `function rippleShow(e: TRippleEvent): void`,
    params: [
        {
            name: 'e',
            type: 'TRippleEvent',
            required: true,
            descriptionKey: 'utils.detail.ripple_show.param_e',
            descriptionFallback: 'The triggering event (MouseEvent, TouchEvent, or KeyboardEvent). The element is read from e.currentTarget.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.ripple_show.returns',
        descriptionFallback: 'No return value. The ripple animation is applied as a side-effect on the element.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/ripple.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.ripple_show.example_basic',
            titleFallback: 'Attach to a mousedown listener',
            code: `import { rippleShow, rippleHide } from 'origam'

el.addEventListener('mousedown', rippleShow)
el.addEventListener('mouseup', rippleHide)`,
            lang: 'typescript',
        },
    ],
    related: ['ripple-stop', 'ripple-transform'],
}
