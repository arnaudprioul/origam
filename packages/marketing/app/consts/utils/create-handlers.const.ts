import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CREATE_HANDLERS_UTIL_DOC: IUtilDoc = {
    slug: 'create-handlers',
    name: 'createHandlers',
    category: 'Commons',
    icon: 'mdi-gesture-swipe',
    descriptionKey: 'utils.catalog.create_handlers.description',
    descriptionFallback: 'Builds the internal touch-event handler map (touchstart, touchend, touchmove) from a set of directional callbacks. Used by the v-touch directive to bridge raw touch events with high-level swipe/drag gestures.',
    signature: `function createHandlers(value?: ITouchHandlers): ITouchStoredHandlers`,
    params: [
        {
            name: 'value',
            type: 'ITouchHandlers',
            required: false,
            defaultValue: '{}',
            descriptionKey: 'utils.detail.create_handlers.param_value',
            descriptionFallback: 'An object of optional directional callbacks: left, right, up, down, start, move, end.',
        },
    ],
    returns: {
        type: 'ITouchStoredHandlers',
        descriptionKey: 'utils.detail.create_handlers.returns',
        descriptionFallback: 'An object with touchstart, touchend, and touchmove native event handlers ready to be bound to a DOM element.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/touch.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.create_handlers.example_basic',
            titleFallback: 'Build touch handlers for swipe detection',
            code: `import { createHandlers } from 'origam'

const handlers = createHandlers({
  left: () => console.log('swiped left'),
  right: () => console.log('swiped right'),
})
el.addEventListener('touchstart', handlers.touchstart)`,
            lang: 'typescript',
        },
    ],
    related: [],
}
