import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const HOVER_CONST_DOC: IConstDoc = {
    slug: 'hover',
    name: 'HOVER',
    category: 'Internals',
    descriptionKey: 'consts.catalog.hover.description',
    descriptionFallback: 'Handler object used internally by the v-hover directive. Exposes show() and hide() methods that add or remove the configured CSS class on the target element when hover state changes.',
    definition: `export const HOVER = {
    show(_e: THoverEvent, el: IHoverHtmlElement, value: IHoverOptions) {
        if (!el?._hover?.enabled) return
        el.classList.add(value.class)
    },
    hide(el: IHoverHtmlElement | null, value: IHoverOptions) {
        if (!el?._hover?.enabled) return
        el.classList.remove(value.class)
    }
}`,
    values: [
        { value: 'show()', descriptionKey: 'consts.detail.hover.show', descriptionFallback: 'Adds value.class to the element when hover begins.' },
        { value: 'hide()', descriptionKey: 'consts.detail.hover.hide', descriptionFallback: 'Removes value.class from the element when hover ends.' },
    ],
    usedBy: [
        { name: 'v-hover' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/hover.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.hover.example',
            titleFallback: 'Internal usage in v-hover (informational)',
            code: `// Internal use only — consumed by the v-hover directive.
// Use <origam-hover> or v-hover in templates instead.`,
            lang: 'typescript',
        },
    ],
}
