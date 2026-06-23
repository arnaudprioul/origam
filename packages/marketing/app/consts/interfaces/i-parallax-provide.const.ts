import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PARALLAX_PROVIDE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-parallax-provide',
    name: 'IParallaxProvide',
    category: 'Motion & Parallax',
    descriptionKey: 'interfaces.catalog.i_parallax_provide.description',
    descriptionFallback: 'Provide context exposed by OrigamParallax to its OrigamParallaxElement children via Vue inject. Carries reactive refs for audio data, pointer event position, movement state, easing and container shape.',
    definition: `export interface IParallaxProvide {
    audioData: Ref<any>
    eventData: Ref<TPoint>
    movement: Ref<{ x: number, y: number, target?: IBox | DOMRect }>
    isMoving: Ref<boolean>
    event: Ref<TParallaxEvent>
    duration: Ref<number>
    easing: Ref<string>
    shape: Ref<IBox | null>
}`,
    extends: [],
    props: [
        { name: 'audioData', type: 'Ref<any>', optional: false, descriptionFallback: 'Reactive audio analysis data (frequency/amplitude array) when the parallax is driven by audio input.' },
        { name: 'eventData', type: 'Ref<TPoint>', optional: false, descriptionFallback: 'Reactive current pointer/mouse position as a normalised TPoint { x, y }.' },
        { name: 'movement', type: 'Ref<{ x: number, y: number, target?: IBox | DOMRect }>', optional: false, descriptionFallback: 'Reactive current movement vector plus optional target bounding box. Consumed by OrigamParallaxElement to compute transforms.' },
        { name: 'isMoving', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True while a pointer/scroll movement is in progress.' },
        { name: 'event', type: 'Ref<TParallaxEvent>', optional: false, descriptionFallback: 'The active event type (scroll | move | audio…) driving this parallax instance.' },
        { name: 'duration', type: 'Ref<number>', optional: false, descriptionFallback: 'Transition duration (ms) shared with all children for interpolation.' },
        { name: 'easing', type: 'Ref<string>', optional: false, descriptionFallback: 'CSS timing-function string shared with children for transition easing.' },
        { name: 'shape', type: 'Ref<IBox | null>', optional: false, descriptionFallback: 'Bounding box of the host parallax container, updated on resize. Null before mount.' },
    ],
    usedBy: [
        { slug: 'parallax', name: 'Parallax', kind: 'component' },
        { slug: 'parallax-element', name: 'ParallaxElement', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Parallax/parallax.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_parallax_provide.example',
            titleFallback: 'Injecting the parallax context in a child component',
            code: `import { inject } from 'vue'
import type { IParallaxProvide } from 'origam'

const parallax = inject<IParallaxProvide>('parallax')
if (parallax) {
    watch(parallax.isMoving, (v) => console.log('moving', v))
}`,
            lang: 'typescript',
        },
    ],
}
