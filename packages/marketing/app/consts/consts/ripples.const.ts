import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const RIPPLES_CONST_DOC: IConstDoc = {
    slug: 'ripples',
    name: 'RIPPLES',
    category: 'Interaction & Animation',
    descriptionKey: 'consts.catalog.ripples.description',
    descriptionFallback: 'Low-level ripple controller used internally by v-ripple. Exposes show() and hide() methods that create, animate, and remove the ripple DOM elements on the target element.',
    definition: `export const RIPPLES = {
    show(e: TRippleEvent, el: IRippleHtmlElement, value: IRippleOptions = {}) {
        // Creates container + animation spans, appends to el,
        // sets position:relative if needed, then adds CSS animation classes.
        // … (truncated — ~35 lines)
    },
    hide(el: IRippleHtmlElement | null) {
        // Finds the most recent animation element, marks isHiding,
        // waits Math.max(250 - elapsed, 0) ms, then fades and removes it.
        // … (truncated — ~20 lines)
    }
}`,
    values: [
        { value: 'show(e, el, value?)', descriptionKey: 'consts.detail.ripples.show', descriptionFallback: 'Spawns and starts the expand animation of a new ripple on the target element.' },
        { value: 'hide(el)', descriptionKey: 'consts.detail.ripples.hide', descriptionFallback: 'Triggers the fade-out animation and removes the ripple element from the DOM after the delay.' },
    ],
    usedBy: [
        { name: 'ripple.util' },
        { name: 'v-ripple' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/ripple.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.ripples.example',
            titleFallback: 'Triggering a ripple manually on a DOM element',
            code: `import { RIPPLES } from 'origam'

// Start the ripple on pointer-down
el.addEventListener('pointerdown', (e) => RIPPLES.show(e, el))
// Fade it out on pointer-up
el.addEventListener('pointerup', () => RIPPLES.hide(el))`,
            lang: 'typescript',
        },
    ],
}
