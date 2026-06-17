import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const DIRECTIVE_UTIL_DOC: IUtilDoc = {
    slug: 'directive',
    name: 'directive',
    category: 'Commons',
    icon: 'mdi-gesture-tap-button',
    descriptionKey: 'utils.catalog.directive.description',
    descriptionFallback: 'Click-outside handler invoked on each document click event. Calls the bound handler when the last mousedown was outside the element and the binding passes the active check. Internal helper for v-click-outside.',
    signature: `function directive(e: MouseEvent, el: HTMLElement, binding: IClickOutsideDirectiveBinding): void`,
    params: [
        {
            name: 'e',
            type: 'MouseEvent',
            required: true,
            descriptionKey: 'utils.detail.directive.param_e',
            descriptionFallback: 'The click MouseEvent fired on the document.',
        },
        {
            name: 'el',
            type: 'HTMLElement',
            required: true,
            descriptionKey: 'utils.detail.directive.param_el',
            descriptionFallback: 'The element the directive is bound to.',
        },
        {
            name: 'binding',
            type: 'IClickOutsideDirectiveBinding',
            required: true,
            descriptionKey: 'utils.detail.directive.param_binding',
            descriptionFallback: 'The Vue directive binding. Its value is either the handler function or an object { handler, closeConditional }.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.directive.returns',
        descriptionFallback: 'Returns nothing. Invokes the bound handler as a side-effect when the outside-click condition is met.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/clickOutside.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.directive.example_basic',
            titleFallback: 'Used internally by v-click-outside',
            code: `// This function is the internal click handler used by v-click-outside.
// In application code, use the directive directly:
import { vClickOutside } from 'origam'

// In a Vue template:
// <div v-click-outside="onOutsideClick">…</div>`,
            lang: 'typescript',
        },
    ],
    related: ['find-children-with-provide'],
    noteKey: 'utils.detail.directive.note',
    noteFallback: 'This is a low-level internal helper. Prefer the v-click-outside directive in application code.',
}
