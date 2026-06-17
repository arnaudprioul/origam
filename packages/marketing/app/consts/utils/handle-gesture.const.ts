import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HANDLE_GESTURE_UTIL_DOC: IUtilDoc = {
    slug: 'handle-gesture',
    name: 'handleGesture',
    category: 'Commons',
    icon: 'mdi-gesture-swipe',
    descriptionKey: 'utils.catalog.handle_gesture.description',
    descriptionFallback: 'Processes a completed touch gesture described by a TTouchWrapper and fires the appropriate directional callback (left, right, up, down) when the swipe distance and ratio meet the threshold. Mutates the wrapper offsetX/offsetY fields in place.',
    signature: `function handleGesture(wrapper: TTouchWrapper): void`,
    params: [
        {
            name: 'wrapper',
            type: 'TTouchWrapper',
            required: true,
            descriptionKey: 'utils.detail.handle_gesture.param_wrapper',
            descriptionFallback: 'A touch state object carrying touchstartX/Y, touchendX/Y, offsetX/Y and optional directional callbacks (left, right, up, down).',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.handle_gesture.returns',
        descriptionFallback: 'Nothing. Fires callback(s) on the wrapper when the gesture threshold is met.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/touch.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.handle_gesture.example_basic',
            titleFallback: 'Detect a left swipe',
            code: `import { handleGesture } from 'origam'

const wrapper = {
  touchstartX: 300, touchendX: 260,
  touchstartY: 100, touchendY: 102,
  offsetX: 0, offsetY: 0,
  left: (w) => console.log('swiped left', w),
}
handleGesture(wrapper)  // → fires wrapper.left`,
            lang: 'typescript',
        },
    ],
    related: ['hover-show', 'hover-hide'],
}
