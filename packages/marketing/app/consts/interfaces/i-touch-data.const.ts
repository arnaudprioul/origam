import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TOUCH_DATA_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-touch-data',
    name: 'ITouchData',
    category: 'Touch & Gesture',
    descriptionKey: 'interfaces.catalog.i_touch_data.description',
    descriptionFallback: 'Touch coordinate snapshot passed to every v-touch handler — records start, move, and end positions plus the X/Y offset deltas.',
    definition: `export interface ITouchData {
    touchstartX: number
    touchstartY: number
    touchmoveX: number
    touchmoveY: number
    touchendX: number
    touchendY: number
    offsetX: number
    offsetY: number
}`,
    extends: [],
    props: [
        { name: 'touchstartX', type: 'number', optional: false, descriptionFallback: 'clientX of the touchstart event.' },
        { name: 'touchstartY', type: 'number', optional: false, descriptionFallback: 'clientY of the touchstart event.' },
        { name: 'touchmoveX', type: 'number', optional: false, descriptionFallback: 'clientX of the most recent touchmove event.' },
        { name: 'touchmoveY', type: 'number', optional: false, descriptionFallback: 'clientY of the most recent touchmove event.' },
        { name: 'touchendX', type: 'number', optional: false, descriptionFallback: 'clientX of the touchend event.' },
        { name: 'touchendY', type: 'number', optional: false, descriptionFallback: 'clientY of the touchend event.' },
        { name: 'offsetX', type: 'number', optional: false, descriptionFallback: 'Horizontal displacement from start to end (touchendX - touchstartX).' },
        { name: 'offsetY', type: 'number', optional: false, descriptionFallback: 'Vertical displacement from start to end (touchendY - touchstartY).' },
    ],
    usedBy: [
        { slug: 'touch', name: 'v-touch', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/touch.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_touch_data.example',
            titleFallback: 'Reading swipe direction from ITouchData',
            code: `import type { ITouchData } from 'origam'

function onSwipe(data: ITouchData) {
    if (data.offsetX > 50) console.log('swiped right')
    if (data.offsetX < -50) console.log('swiped left')
}`,
            lang: 'typescript',
        },
    ],
}
