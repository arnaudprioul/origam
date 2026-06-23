import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TOUCHMOVE_UTIL_DOC: IUtilDoc = {
    slug: 'touchmove',
    name: 'touchmove',
    category: 'Commons',
    icon: 'mdi-gesture-swipe',
    descriptionKey: 'utils.catalog.touchmove.description',
    descriptionFallback: 'Handle the `touchmove` phase of a gesture: record the current pointer X/Y coordinates and call the optional `move` callback on the wrapper.',
    signature: `function touchmove(event: TouchEvent, wrapper: TTouchWrapper): void`,
    params: [
        {
            name: 'event',
            type: 'TouchEvent',
            required: true,
            descriptionKey: 'utils.detail.touchmove.param_event',
            descriptionFallback: 'The native TouchEvent. `changedTouches[0]` is read for the current position.',
        },
        {
            name: 'wrapper',
            type: 'TTouchWrapper',
            required: true,
            descriptionKey: 'utils.detail.touchmove.param_wrapper',
            descriptionFallback: 'The shared gesture state object. `touchmoveX` and `touchmoveY` are written; `wrapper.move` is called when defined.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.touchmove.returns',
        descriptionFallback: 'Side-effectful — mutates the wrapper and calls the optional move callback. Returns nothing.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/touch.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.touchmove.example_basic',
            titleFallback: 'Track pointer position during a drag',
            code: `import { touchstart, touchmove, touchend } from 'origam'

const wrapper = {
  touchstartX: 0, touchstartY: 0,
  touchendX: 0,   touchendY: 0,
  touchmoveX: 0,  touchmoveY: 0,
  offsetX: 0,     offsetY: 0,
  move: (w) => console.log('dx:', w.touchmoveX - w.touchstartX),
}

el.addEventListener('touchstart', e => touchstart(e, wrapper))
el.addEventListener('touchmove',  e => touchmove(e, wrapper))
el.addEventListener('touchend',   e => touchend(e, wrapper))`,
            lang: 'typescript',
        },
    ],
    related: ['touchstart', 'touchend'],
}
