import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_TOUCH_EVENT_UTIL_DOC: IUtilDoc = {
    slug: 'is-touch-event',
    name: 'isTouchEvent',
    category: 'Commons',
    icon: 'mdi-gesture-tap',
    descriptionKey: 'utils.catalog.is_touch_event.description',
    descriptionFallback: 'Type guard that narrows a TRippleEvent to TouchEvent by checking constructor.name. Used internally by the ripple system to position the ripple at the touch contact point.',
    signature: `function isTouchEvent(e: TRippleEvent): e is TouchEvent`,
    params: [
        {
            name: 'e',
            type: 'TRippleEvent',
            required: true,
            descriptionKey: 'utils.detail.is_touch_event.param_e',
            descriptionFallback: 'The event to classify, typed as TRippleEvent (union of MouseEvent, TouchEvent, KeyboardEvent). The check uses constructor.name for reliable cross-frame detection.',
        },
    ],
    returns: {
        type: 'e is TouchEvent',
        descriptionKey: 'utils.detail.is_touch_event.returns',
        descriptionFallback: 'true and narrows e to TouchEvent when the event originated from a touch gesture; false for mouse and keyboard events.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/ripple.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_touch_event.example_basic',
            titleFallback: 'Detecting touch to set ripple origin',
            code: `import { isTouchEvent, isKeyboardEvent } from 'origam'

function getRippleOrigin(e: TRippleEvent) {
    if (isTouchEvent(e)) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    if (isKeyboardEvent(e)) {
        return null // centred ripple
    }
    return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY }
}`,
            lang: 'typescript',
        },
    ],
    related: ['is-keyboard-event', 'is-ripple-enabled'],
}
