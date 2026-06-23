import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const TOUCH_EVENTS_ENUM_DOC: IEnumDoc = {
    slug: 'touch-events',
    name: 'TOUCH_EVENTS',
    category: 'Interaction & Events',
    descriptionKey: 'enums.catalog.touch_events.description',
    descriptionFallback: 'TypeScript enum for native touch DOM event names — touchstart, touchend, touchmove.',
    definition: `export enum TOUCH_EVENTS {
    TOUCH_START = 'touchstart',
    TOUCH_END   = 'touchend',
    TOUCH_MOVE  = 'touchmove',
}`,
    values: [
        { value: 'TOUCH_EVENTS.TOUCH_START', descriptionKey: 'enums.detail.touch_events.touch_start', descriptionFallback: 'Fires when one or more touch points are placed on the touch surface.' },
        { value: 'TOUCH_EVENTS.TOUCH_END', descriptionKey: 'enums.detail.touch_events.touch_end', descriptionFallback: 'Fires when one or more touch points are removed from the touch surface.' },
        { value: 'TOUCH_EVENTS.TOUCH_MOVE', descriptionKey: 'enums.detail.touch_events.touch_move', descriptionFallback: 'Fires when one or more touch points are moved along the touch surface.' },
    ],
    usedBy: [
        { slug: 'infinite-scroll', name: 'InfiniteScroll', propName: 'touchEvents' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/touch.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.touch_events.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { TOUCH_EVENTS } from 'origam'

element.addEventListener(TOUCH_EVENTS.TOUCH_START, onTouchStart)`,
            lang: 'typescript',
        },
    ],
}
