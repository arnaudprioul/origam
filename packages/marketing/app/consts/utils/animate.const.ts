import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ANIMATE_UTIL_DOC: IUtilDoc = {
    slug: 'animate',
    name: 'animate',
    category: 'Commons',
    icon: 'mdi-motion-play-outline',
    descriptionKey: 'utils.catalog.animate.description',
    descriptionFallback: 'Safe wrapper around the Web Animations API. Falls back to a resolved-promise stub when the browser does not support Element.animate() or when an exception is thrown.',
    signature: `function animate(
  el: Element,
  keyframes: Array<Keyframe> | PropertyIndexedKeyframes | null,
  options?: number | KeyframeAnimationOptions
): Animation | { finished: Promise<void> }`,
    params: [
        {
            name: 'el',
            type: 'Element',
            required: true,
            descriptionKey: 'utils.detail.animate.param_el',
            descriptionFallback: 'The DOM element to animate.',
        },
        {
            name: 'keyframes',
            type: 'Array<Keyframe> | PropertyIndexedKeyframes | null',
            required: true,
            descriptionKey: 'utils.detail.animate.param_keyframes',
            descriptionFallback: 'Keyframe descriptors in WAAPI format — either an array of Keyframe objects or a property-indexed object.',
        },
        {
            name: 'options',
            type: 'number | KeyframeAnimationOptions',
            required: false,
            descriptionKey: 'utils.detail.animate.param_options',
            descriptionFallback: 'Duration in milliseconds (number) or a full KeyframeAnimationOptions object controlling easing, delay, fill, etc.',
        },
    ],
    returns: {
        type: 'Animation | { finished: Promise<void> }',
        descriptionKey: 'utils.detail.animate.returns',
        descriptionFallback: 'The native Animation object, or a stub with a resolved finished promise when the API is unavailable.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/animation.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.animate.example_basic',
            titleFallback: 'Fade-in an element',
            code: `import { animate } from 'origam'

const el = document.querySelector('.my-card')!
const anim = animate(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: 'ease-out' })
await anim.finished`,
            lang: 'typescript',
        },
    ],
    related: ['calculate-impulse-velocity'],
}
