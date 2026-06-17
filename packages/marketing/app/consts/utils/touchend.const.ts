import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TOUCHEND_UTIL_DOC: IUtilDoc = {
    slug: 'touchend',
    name: 'touchend',
    category: 'Commons',
    icon: 'mdi-gesture-tap',
    descriptionKey: 'utils.catalog.touchend.description',
    descriptionFallback: 'Handle the `touchend` phase of a gesture: record the ending X/Y coordinates, call the optional `end` callback, then delegate to `handleGesture` to fire the directional callbacks (left, right, up, down).',
    signature: `function touchend(event: TouchEvent, wrapper: TTouchWrapper): void`,
    params: [
        {
            name: 'event',
            type: 'TouchEvent',
            required: true,
            descriptionKey: 'utils.detail.touchend.param_event',
            descriptionFallback: 'The native TouchEvent fired by the browser. `changedTouches[0]` is used to read the end position.',
        },
        {
            name: 'wrapper',
            type: 'TTouchWrapper',
            required: true,
            descriptionKey: 'utils.detail.touchend.param_wrapper',
            descriptionFallback: 'The shared gesture state object. `touchendX` and `touchendY` are written; `wrapper.end` is called when defined, then `handleGesture` evaluates the directional callbacks.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.touchend.returns',
        descriptionFallback: 'Side-effectful — mutates the wrapper and fires callbacks. Returns nothing.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/touch.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.touchend.example_basic',
            titleFallback: 'Detect a left swipe with touchend',
            code: `import { touchstart, touchend } from 'origam'

const wrapper = {
  touchstartX: 0, touchstartY: 0,
  touchendX: 0,   touchendY: 0,
  touchmoveX: 0,  touchmoveY: 0,
  offsetX: 0,     offsetY: 0,
  left: () => console.log('swiped left'),
}

el.addEventListener('touchstart', e => touchstart(e, wrapper))
el.addEventListener('touchend',   e => touchend(e, wrapper))`,
            lang: 'typescript',
        },
    ],
    related: ['touchstart', 'touchmove'],
}
