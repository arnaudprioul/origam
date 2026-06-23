import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CALCULATE_UTIL_DOC: IUtilDoc = {
    slug: 'calculate',
    name: 'calculate',
    category: 'Commons',
    icon: 'mdi-ripple',
    descriptionKey: 'utils.catalog.calculate.description',
    descriptionFallback: 'Compute the position (centerX, centerY), radius, and initial scale of a ripple effect from a pointer or keyboard event on a target element.',
    signature: `function calculate(
  e: TRippleEvent,
  el: IRippleHtmlElement,
  value?: IRippleOptions
): { radius: number; scale: number; x: string; y: string; centerX: string; centerY: string }`,
    params: [
        {
            name: 'e',
            type: 'TRippleEvent',
            required: true,
            descriptionKey: 'utils.detail.calculate.param_e',
            descriptionFallback: 'The triggering event (MouseEvent, TouchEvent, or KeyboardEvent). Keyboard events produce a centered ripple.',
        },
        {
            name: 'el',
            type: 'IRippleHtmlElement',
            required: true,
            descriptionKey: 'utils.detail.calculate.param_el',
            descriptionFallback: 'The host element extended with ripple state (_ripple). Used to obtain dimensions and configuration.',
        },
        {
            name: 'value',
            type: 'IRippleOptions',
            required: false,
            defaultValue: '{}',
            descriptionKey: 'utils.detail.calculate.param_value',
            descriptionFallback: 'Optional ripple options (center flag, circle mode). When center is true, the ripple always originates from the element center.',
        },
    ],
    returns: {
        type: '{ radius: number; scale: number; x: string; y: string; centerX: string; centerY: string }',
        descriptionKey: 'utils.detail.calculate.returns',
        descriptionFallback: 'Geometry values used to position and size the ripple pseudo-element via CSS custom properties.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/ripple.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.calculate.example_basic',
            titleFallback: 'Calculate ripple geometry from a click',
            code: `import { calculate } from 'origam'
// Typically called internally by the v-ripple directive:
el.addEventListener('mousedown', (e) => {
    const { radius, scale, centerX, centerY } = calculate(e, el)
    el.style.setProperty('--ripple-radius', \`\${radius}px\`)
    el.style.setProperty('--ripple-center-x', centerX)
    el.style.setProperty('--ripple-center-y', centerY)
})`,
            lang: 'typescript',
        },
    ],
    related: ['animate', 'calculate-impulse-velocity'],
}
