import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TOUCH_STORED_HANDLERS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-touch-stored-handlers',
    name: 'ITouchStoredHandlers',
    category: 'Touch & Gesture',
    descriptionKey: 'interfaces.catalog.i_touch_stored_handlers.description',
    descriptionFallback: 'Internal store of raw DOM event listeners attached by the v-touch directive — kept on the element so they can be correctly removed on directive unmount.',
    definition: `export interface ITouchStoredHandlers {
    touchstart: (e: TouchEvent) => void
    touchend: (e: TouchEvent) => void
    touchmove: (e: TouchEvent) => void
}`,
    extends: [],
    props: [
        { name: 'touchstart', type: '(e: TouchEvent) => void', optional: false, descriptionFallback: 'Raw touchstart listener stored for removeEventListener on unmount.' },
        { name: 'touchend', type: '(e: TouchEvent) => void', optional: false, descriptionFallback: 'Raw touchend listener stored for removeEventListener on unmount.' },
        { name: 'touchmove', type: '(e: TouchEvent) => void', optional: false, descriptionFallback: 'Raw touchmove listener stored for removeEventListener on unmount.' },
    ],
    usedBy: [
        { slug: 'touch', name: 'v-touch', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/touch.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_touch_stored_handlers.example',
            titleFallback: 'Internal usage in the v-touch directive lifecycle',
            code: `// Stored on el._touchHandlers by the directive mounted hook
const stored: ITouchStoredHandlers = {
    touchstart: (e) => { /* … */ },
    touchend:   (e) => { /* … */ },
    touchmove:  (e) => { /* … */ },
}

// Removed on unmount
el.removeEventListener('touchstart', stored.touchstart)
el.removeEventListener('touchend',   stored.touchend)
el.removeEventListener('touchmove',  stored.touchmove)`,
            lang: 'typescript',
        },
    ],
}
