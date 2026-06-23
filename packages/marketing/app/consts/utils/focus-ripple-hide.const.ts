import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FOCUS_RIPPLE_HIDE_UTIL_DOC: IUtilDoc = {
    slug: 'focus-ripple-hide',
    name: 'focusRippleHide',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.focus_ripple_hide.description',
    descriptionFallback: 'FocusEvent handler that hides the keyboard-triggered ripple when the element loses focus. Paired with the ripple directive — only acts when a keyboard ripple is currently active.',
    signature: `function focusRippleHide(e: FocusEvent): void`,
    params: [
        {
            name: 'e',
            type: 'FocusEvent',
            required: true,
            descriptionKey: 'utils.detail.focus_ripple_hide.param_e',
            descriptionFallback: 'The blur FocusEvent emitted when the interactive element loses keyboard focus.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.focus_ripple_hide.returns',
        descriptionFallback: 'No return value — triggers ripple cleanup as a side effect.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/ripple.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.focus_ripple_hide.example_basic',
            titleFallback: 'Attach to a button blur handler',
            code: `import { focusRippleHide } from 'origam'

// Inside a component template:
// <button @blur="focusRippleHide">Click me</button>`,
            lang: 'typescript',
        },
    ],
    related: ['focus-child', 'focusable-children'],
}
