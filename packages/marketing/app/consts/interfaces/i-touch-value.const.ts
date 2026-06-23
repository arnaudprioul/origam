import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TOUCH_VALUE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-touch-value',
    name: 'ITouchValue',
    category: 'Touch & Gesture',
    descriptionKey: 'interfaces.catalog.i_touch_value.description',
    descriptionFallback: 'The binding value accepted by the v-touch directive — extends ITouchHandlers with optional parent-element delegation and addEventListener options.',
    definition: `export interface ITouchValue extends ITouchHandlers {
    parent?: boolean
    options?: AddEventListenerOptions
}`,
    extends: ['ITouchHandlers'],
    props: [
        { name: 'parent', type: 'boolean', optional: true, descriptionFallback: 'When true, event listeners are attached to the element\'s parent instead of the element itself.' },
        { name: 'options', type: 'AddEventListenerOptions', optional: true, descriptionFallback: 'Options forwarded verbatim to addEventListener (capture, passive, once).' },
    ],
    usedBy: [
        { slug: 'touch', name: 'v-touch', kind: 'composable' },
        { slug: 'i-touch-directive-binding', name: 'ITouchDirectiveBinding', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/touch.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_touch_value.example',
            titleFallback: 'Full v-touch binding with passive listener',
            code: `<div v-touch="{
    left: onLeft,
    right: onRight,
    parent: false,
    options: { passive: true },
}">
    Swipe area
</div>`,
            lang: 'html',
        },
    ],
}
