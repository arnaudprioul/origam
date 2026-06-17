import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TOUCHSTART_UTIL_DOC: IUtilDoc = {
    slug: 'touchstart',
    name: 'touchstart',
    category: 'Commons',
    icon: 'mdi-gesture-tap',
    descriptionKey: 'utils.catalog.touchstart.description',
    descriptionFallback: 'Handle the `touchstart` phase of a gesture: record the starting X/Y coordinates from the first changed touch point and call the optional `start` callback on the wrapper.',
    signature: `function touchstart(event: TouchEvent, wrapper: TTouchWrapper): void`,
    params: [
        {
            name: 'event',
            type: 'TouchEvent',
            required: true,
            descriptionKey: 'utils.detail.touchstart.param_event',
            descriptionFallback: 'The native TouchEvent fired by the browser. `changedTouches[0]` is used to read the initial position.',
        },
        {
            name: 'wrapper',
            type: 'TTouchWrapper',
            required: true,
            descriptionKey: 'utils.detail.touchstart.param_wrapper',
            descriptionFallback: 'The shared gesture state object. `touchstartX` and `touchstartY` are written, and `wrapper.start` is called when defined.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.touchstart.returns',
        descriptionFallback: 'Side-effectful — mutates the wrapper and calls the optional callback. Returns nothing.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/touch.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.touchstart.example_basic',
            titleFallback: 'Pair with touchend to detect a swipe',
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
    related: ['touchend', 'touchmove'],
}
