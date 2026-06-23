import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const KEYBOARD_RIPPLE_HIDE_UTIL_DOC: IUtilDoc = {
    slug: 'keyboard-ripple-hide',
    name: 'keyboardRippleHide',
    category: 'Commons',
    icon: 'mdi-keyboard-off-outline',
    descriptionKey: 'utils.catalog.keyboard_ripple_hide.description',
    descriptionFallback: 'Clears the internal keyboard-ripple flag and immediately hides the ripple effect in response to a keyboard event. Counterpart to keyboardRippleShow.',
    signature: `function keyboardRippleHide(e: KeyboardEvent): void`,
    params: [
        {
            name: 'e',
            type: 'KeyboardEvent',
            required: true,
            descriptionKey: 'utils.detail.keyboard_ripple_hide.param_e',
            descriptionFallback: 'The originating keyboard event (typically keyup) used to locate the target element for ripple teardown.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.keyboard_ripple_hide.returns',
        descriptionFallback: 'No return value. Resets the keyboard-ripple flag and hides the ripple.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/ripple.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.keyboard_ripple_hide.example_basic',
            titleFallback: 'Attach keyboard ripple to a button',
            code: `import { keyboardRippleShow, keyboardRippleHide } from 'origam'

const el = document.querySelector('button')!
el.addEventListener('keydown', keyboardRippleShow)
el.addEventListener('keyup',   keyboardRippleHide)`,
            lang: 'typescript',
        },
    ],
    related: ['keyboard-ripple-show'],
}
