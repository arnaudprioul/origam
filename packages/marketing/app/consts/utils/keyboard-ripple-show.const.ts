import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const KEYBOARD_RIPPLE_SHOW_UTIL_DOC: IUtilDoc = {
    slug: 'keyboard-ripple-show',
    name: 'keyboardRippleShow',
    category: 'Commons',
    icon: 'mdi-keyboard-outline',
    descriptionKey: 'utils.catalog.keyboard_ripple_show.description',
    descriptionFallback: 'Triggers the ripple effect on Enter or Space keydown, setting the internal keyboard-ripple flag. No-ops for any other key.',
    signature: `function keyboardRippleShow(e: KeyboardEvent): void`,
    params: [
        {
            name: 'e',
            type: 'KeyboardEvent',
            required: true,
            descriptionKey: 'utils.detail.keyboard_ripple_show.param_e',
            descriptionFallback: 'The keydown KeyboardEvent. Only Enter and Space activate the ripple.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.keyboard_ripple_show.returns',
        descriptionFallback: 'No return value. Activates the ripple effect when the key matches Enter or Space.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/ripple.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.keyboard_ripple_show.example_basic',
            titleFallback: 'Attach keyboard ripple to a button',
            code: `import { keyboardRippleShow, keyboardRippleHide } from 'origam'

const el = document.querySelector('button')!
el.addEventListener('keydown', keyboardRippleShow)
el.addEventListener('keyup',   keyboardRippleHide)`,
            lang: 'typescript',
        },
    ],
    related: ['keyboard-ripple-hide'],
}
