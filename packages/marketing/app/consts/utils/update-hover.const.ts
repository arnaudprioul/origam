import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const UPDATE_HOVER_UTIL_DOC: IUtilDoc = {
    slug: 'update-hover',
    name: 'updateHover',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.update_hover.description',
    descriptionFallback: 'Sync the v-hover directive\'s internal state on an element when its binding value or modifiers change. Adds or removes the hover class and mouse/touch listeners accordingly.',
    signature: `function updateHover(
  el: IHoverHtmlElement,
  binding: IHoverDirectiveBinding,
  wasEnabled: boolean,
  name: string
): void`,
    params: [
        {
            name: 'el',
            type: 'IHoverHtmlElement',
            required: true,
            descriptionKey: 'utils.detail.update_hover.param_el',
            descriptionFallback: 'The DOM element that carries the _hover internal state bag.',
        },
        {
            name: 'binding',
            type: 'IHoverDirectiveBinding',
            required: true,
            descriptionKey: 'utils.detail.update_hover.param_binding',
            descriptionFallback: 'Vue directive binding; its value determines enabled state and optional callbacks; modifiers.stop enables ripple-stop mode.',
        },
        {
            name: 'wasEnabled',
            type: 'boolean',
            required: true,
            descriptionKey: 'utils.detail.update_hover.param_was_enabled',
            descriptionFallback: 'Whether the directive was enabled before this update. Used to avoid double-attaching listeners.',
        },
        {
            name: 'name',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.update_hover.param_name',
            descriptionFallback: 'The component block name used to build the hover class, e.g. "origam-btn" produces class "origam-btn--hover".',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.update_hover.returns',
        descriptionFallback: 'No return value. Mutates the element\'s event listeners and _hover state in place.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/hover.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.update_hover.example_basic',
            titleFallback: 'Directive updated hook',
            code: `import { updateHover } from 'origam'

const vHover = {
    updated(el, binding) {
        const wasEnabled = el._hover?.enabled ?? false
        updateHover(el, binding, wasEnabled, 'my-component')
    },
}`,
            lang: 'typescript',
        },
    ],
    related: ['update-ripple'],
}
