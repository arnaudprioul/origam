import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TOUCH_HANDLERS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-touch-handlers',
    name: 'ITouchHandlers',
    category: 'Touch & Gesture',
    descriptionKey: 'interfaces.catalog.i_touch_handlers.description',
    descriptionFallback: 'Named callback map for the v-touch directive — one optional handler per lifecycle event (start, end, move) and per swipe direction (left, right, up, down).',
    definition: `export interface ITouchHandlers {
    start?: (wrapperEvent: { originalEvent: TouchEvent } & ITouchData) => void
    end?: (wrapperEvent: { originalEvent: TouchEvent } & ITouchData) => void
    move?: (wrapperEvent: { originalEvent: TouchEvent } & ITouchData) => void
    left?: (wrapper: ITouchData) => void
    right?: (wrapper: ITouchData) => void
    up?: (wrapper: ITouchData) => void
    down?: (wrapper: ITouchData) => void
}`,
    extends: [],
    props: [
        { name: 'start', type: '(wrapperEvent: { originalEvent: TouchEvent } & ITouchData) => void', optional: true, descriptionFallback: 'Called when a touch gesture starts.' },
        { name: 'end', type: '(wrapperEvent: { originalEvent: TouchEvent } & ITouchData) => void', optional: true, descriptionFallback: 'Called when a touch gesture ends.' },
        { name: 'move', type: '(wrapperEvent: { originalEvent: TouchEvent } & ITouchData) => void', optional: true, descriptionFallback: 'Called on every touchmove event.' },
        { name: 'left', type: '(wrapper: ITouchData) => void', optional: true, descriptionFallback: 'Called when the gesture is recognised as a leftward swipe.' },
        { name: 'right', type: '(wrapper: ITouchData) => void', optional: true, descriptionFallback: 'Called when the gesture is recognised as a rightward swipe.' },
        { name: 'up', type: '(wrapper: ITouchData) => void', optional: true, descriptionFallback: 'Called when the gesture is recognised as an upward swipe.' },
        { name: 'down', type: '(wrapper: ITouchData) => void', optional: true, descriptionFallback: 'Called when the gesture is recognised as a downward swipe.' },
    ],
    usedBy: [
        { slug: 'touch', name: 'v-touch', kind: 'composable' },
        { slug: 'i-touch-value', name: 'ITouchValue', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/touch.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_touch_handlers.example',
            titleFallback: 'Using swipe direction handlers with v-touch',
            code: `<div v-touch="{ left: onSwipeLeft, right: onSwipeRight }">
    Swipe me
</div>`,
            lang: 'html',
        },
    ],
}
