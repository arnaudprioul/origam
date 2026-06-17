import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_VELOCITY_DOC: IComposableDoc = {
    slug: 'use-velocity',
    name: 'useVelocity',
    domain: 'Commons',
    icon: 'mdi-speedometer',
    descriptionKey: '',
    descriptionFallback: 'Tracks touch-event samples per finger (identified by touch.identifier) in circular buffers and computes the instantaneous velocity vector at touchend via impulse-velocity analysis. Used by useTouch to decide whether a fling gesture is fast enough to open or close a drawer.',
    signature: `function useVelocity(): {
  addMovement: (e: TouchEvent) => void
  endTouch: (e: TouchEvent) => void
  getVelocity: (id: number) => {
    x: number
    y: number
    direction: 'left' | 'right' | 'up' | 'down'
  }
}`,
    params: [],
    returns: [
        {
            name: 'addMovement',
            type: '(e: TouchEvent) => void',
            descriptionKey: '',
            descriptionFallback: 'Record a touchstart or touchmove event sample. Each touch point is tracked independently. Call this on every touchmove to build a time-stamped sample history.',
        },
        {
            name: 'endTouch',
            type: '(e: TouchEvent) => void',
            descriptionKey: '',
            descriptionFallback: 'Clear the circular buffer for all changed touches. Call at touchstart before starting a new gesture to discard leftover samples from a previous interaction.',
        },
        {
            name: 'getVelocity',
            type: '(id: number) => { x: number; y: number; direction: string }',
            descriptionKey: '',
            descriptionFallback: 'Compute the velocity vector for the given touch identifier from the recent sample history. Returns px/ms values for x and y axes and the dominant direction string. Throws if no samples are found for the id.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Fling detection in a custom swipeable',
            code: `<script setup lang="ts">
import { useVelocity } from 'origam'

const { addMovement, endTouch, getVelocity } = useVelocity()

function onTouchstart(e: TouchEvent) {
    endTouch(e)
    addMovement(e)
}

function onTouchmove(e: TouchEvent) {
    addMovement(e)
}

function onTouchend(e: TouchEvent) {
    addMovement(e)
    const vel = getVelocity(e.changedTouches[0].identifier)
    if (Math.abs(vel.x) > 400) {
        console.log('Fling detected:', vel.direction)
    }
}
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-touch'],
    consumedInterfaces: [],
    noteFallback: 'useVelocity is a low-level primitive consumed internally by useTouch. The HISTORY constant controls the circular buffer size (number of samples kept) and HORIZON controls the time window (ms) over which velocity is computed. Direct use is rarely needed — prefer useTouch for drawer gestures.',
}
