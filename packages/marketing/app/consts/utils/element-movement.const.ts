import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ELEMENT_MOVEMENT_UTIL_DOC: IUtilDoc = {
    slug: 'element-movement',
    name: 'elementMovement',
    category: 'Parallax',
    icon: 'mdi-cursor-move',
    descriptionKey: 'utils.catalog.element_movement.description',
    descriptionFallback: 'Computes the X/Y translation offset to apply to a parallax target element based on cursor or scroll position, a strength multiplier, and optional min/max clamps.',
    signature: `function elementMovement(action: IParallaxElementMovement): { x: number, y: number, target: HTMLElement | null }`,
    params: [
        {
            name: 'action',
            type: 'IParallaxElementMovement',
            required: true,
            descriptionKey: 'utils.detail.element_movement.param_action',
            descriptionFallback: 'Configuration object that includes the current cursor/scroll position (x, y), the origin point (originX, originY defaults 50), a strength multiplier, optional clamp values (minX, maxX, minY, maxY), the event type, and the target element.',
        },
    ],
    returns: {
        type: '{ x: number, y: number, target: HTMLElement | null }',
        descriptionKey: 'utils.detail.element_movement.returns',
        descriptionFallback: 'An object with the computed x and y translation offsets and the target element reference.',
    },
    sourceFile: 'packages/ds/src/utils/Parallax/parallax-element.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.element_movement.example_basic',
            titleFallback: 'Compute parallax offset',
            code: `import { elementMovement } from 'origam'

const offset = elementMovement({
    x: 0.6,
    y: 0.4,
    target: document.querySelector('.layer'),
    strength: 20,
    originX: 50,
    originY: 50,
})
// Apply: element.style.transform = \`translate(\${offset.x}px, \${offset.y}px)\``,
            lang: 'typescript',
        },
    ],
    related: ['element-to-viewport'],
}
