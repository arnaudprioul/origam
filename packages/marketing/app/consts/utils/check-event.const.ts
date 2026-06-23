import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CHECK_EVENT_UTIL_DOC: IUtilDoc = {
    slug: 'check-event',
    name: 'checkEvent',
    category: 'Commons',
    icon: 'mdi-cursor-pointer',
    descriptionKey: 'utils.catalog.check_event.description',
    descriptionFallback: 'Determines whether a MouseEvent occurred outside the bound element and its included elements, honouring ShadowRoot boundaries. Used internally by the v-click-outside directive.',
    signature: `function checkEvent(
  e: MouseEvent,
  el: HTMLElement,
  binding: IClickOutsideDirectiveBinding
): boolean`,
    params: [
        {
            name: 'e',
            type: 'MouseEvent',
            required: true,
            descriptionKey: 'utils.detail.check_event.param_e',
            descriptionFallback: 'The mouse event to evaluate.',
        },
        {
            name: 'el',
            type: 'HTMLElement',
            required: true,
            descriptionKey: 'utils.detail.check_event.param_el',
            descriptionFallback: 'The root element the directive is bound to.',
        },
        {
            name: 'binding',
            type: 'IClickOutsideDirectiveBinding',
            required: true,
            descriptionKey: 'utils.detail.check_event.param_binding',
            descriptionFallback: 'The directive binding object, which may include a handler callback, a closeConditional guard, and an include list of additional elements.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.check_event.returns',
        descriptionFallback: 'true when the event is a genuine outside click that should trigger the handler; false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/clickOutside.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.check_event.example_basic',
            titleFallback: 'Used by the v-click-outside directive',
            code: `import { checkEvent } from 'origam'

document.addEventListener('mousedown', (e) => {
  const outside = checkEvent(e, myEl, binding)
  if (outside) console.log('clicked outside')
}, true)`,
            lang: 'typescript',
        },
    ],
    related: ['check-is-active'],
}
