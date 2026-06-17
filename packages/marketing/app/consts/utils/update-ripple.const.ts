import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const UPDATE_RIPPLE_UTIL_DOC: IUtilDoc = {
    slug: 'update-ripple',
    name: 'updateRipple',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.update_ripple.description',
    descriptionFallback: 'Sync the v-ripple directive\'s internal state when its binding changes. Hides an active ripple when disabled and attaches or replaces the event listeners that trigger ripple animations.',
    signature: `function updateRipple(
  el: IRippleHtmlElement,
  binding: IRippleDirectiveBinding,
  wasEnabled: boolean
): void`,
    params: [
        {
            name: 'el',
            type: 'IRippleHtmlElement',
            required: true,
            descriptionKey: 'utils.detail.update_ripple.param_el',
            descriptionFallback: 'The DOM element carrying the _ripple internal state bag.',
        },
        {
            name: 'binding',
            type: 'IRippleDirectiveBinding',
            required: true,
            descriptionKey: 'utils.detail.update_ripple.param_binding',
            descriptionFallback: 'Vue directive binding; value enables/disables the ripple and may carry { class, center, circle }; modifiers.center and modifiers.circle override the geometry.',
        },
        {
            name: 'wasEnabled',
            type: 'boolean',
            required: true,
            descriptionKey: 'utils.detail.update_ripple.param_was_enabled',
            descriptionFallback: 'Whether the directive was enabled before this update. Prevents double-registration of listeners.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.update_ripple.returns',
        descriptionFallback: 'No return value. Mutates element listeners and _ripple state in place.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/ripple.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.update_ripple.example_basic',
            titleFallback: 'Directive updated hook',
            code: `import { updateRipple } from 'origam'

const vRipple = {
    updated(el, binding) {
        const wasEnabled = el._ripple?.enabled ?? false
        updateRipple(el, binding, wasEnabled)
    },
}`,
            lang: 'typescript',
        },
    ],
    related: ['update-hover'],
}
