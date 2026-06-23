import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CYCLIC_MOVEMENT_UTIL_DOC: IUtilDoc = {
    slug: 'cyclic-movement',
    name: 'cyclicMovement',
    category: 'Commons',
    icon: 'mdi-sine-wave',
    descriptionKey: 'utils.catalog.cyclic_movement.description',
    descriptionFallback: 'Computes a sinusoidal parallax offset (x, y) from a reference position relative to a shape or the viewport. Used by the parallax system to create cyclic, depth-driven motion.',
    signature: `function cyclicMovement(cycleData: IParallaxElementCicle): TPoint`,
    params: [
        {
            name: 'cycleData',
            type: 'IParallaxElementCicle',
            required: true,
            descriptionKey: 'utils.detail.cyclic_movement.param_cycle_data',
            descriptionFallback: 'Configuration object: referencePosition (current pointer/scroll position), shape (bounding rect of the element), event type (\'scroll\' | \'mousemove\'), cycles (frequency multiplier), and strength (amplitude factor).',
        },
    ],
    returns: {
        type: 'TPoint',
        descriptionKey: 'utils.detail.cyclic_movement.returns',
        descriptionFallback: 'A { x, y } point representing the computed CSS transform offset in pixels.',
    },
    sourceFile: 'packages/ds/src/utils/Parallax/parallax-element.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.cyclic_movement.example_basic',
            titleFallback: 'Used internally by OrigamParallaxElement',
            code: `import { cyclicMovement } from 'origam'

const offset = cyclicMovement({
  referencePosition: { x: mouseX, y: mouseY },
  shape: el.getBoundingClientRect(),
  event: 'mousemove',
  cycles: 1,
  strength: 0.05,
})
// → { x: 2.3, y: -1.1 }`,
            lang: 'typescript',
        },
    ],
    related: [],
}
