import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_KEYBOARD_EVENT_UTIL_DOC: IUtilDoc = {
    slug: 'is-keyboard-event',
    name: 'isKeyboardEvent',
    category: 'Commons',
    icon: 'mdi-keyboard-outline',
    descriptionKey: 'utils.catalog.is_keyboard_event.description',
    descriptionFallback: 'Type guard that narrows a TRippleEvent to KeyboardEvent by checking constructor.name. Used internally by the ripple system to apply a square ripple on keyboard activation.',
    signature: `function isKeyboardEvent(e: TRippleEvent): e is KeyboardEvent`,
    params: [
        {
            name: 'e',
            type: 'TRippleEvent',
            required: true,
            descriptionKey: 'utils.detail.is_keyboard_event.param_e',
            descriptionFallback: 'The event to classify, typed as TRippleEvent (union of MouseEvent, TouchEvent, KeyboardEvent). The check uses constructor.name for reliable cross-frame detection.',
        },
    ],
    returns: {
        type: 'e is KeyboardEvent',
        descriptionKey: 'utils.detail.is_keyboard_event.returns',
        descriptionFallback: 'true and narrows e to KeyboardEvent when the event originated from the keyboard; false for mouse and touch events.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/ripple.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_keyboard_event.example_basic',
            titleFallback: 'Branching ripple behaviour on keyboard vs pointer',
            code: `import { isKeyboardEvent, isTouchEvent } from 'origam'

function handleRipple(e: TRippleEvent) {
    if (isKeyboardEvent(e)) {
        // square ripple centred on element
    } else if (isTouchEvent(e)) {
        // circular ripple at touch point
    } else {
        // circular ripple at mouse position
    }
}`,
            lang: 'typescript',
        },
    ],
    related: ['is-touch-event', 'is-ripple-enabled'],
}
