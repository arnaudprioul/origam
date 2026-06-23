import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_COMPOSING_IGNORE_KEY_UTIL_DOC: IUtilDoc = {
    slug: 'is-composing-ignore-key',
    name: 'isComposingIgnoreKey',
    category: 'Commons',
    icon: 'mdi-keyboard-outline',
    descriptionKey: 'utils.catalog.is_composing_ignore_key.description',
    descriptionFallback: 'Returns true when a keyboard event is fired during IME composition (isComposing) AND the key is one of the keys that should be swallowed during composition (Enter, etc.). Used by text inputs to avoid premature confirmation while the user is still typing CJK characters.',
    signature: 'function isComposingIgnoreKey(e: KeyboardEvent): boolean',
    params: [
        {
            name: 'e',
            type: 'KeyboardEvent',
            required: true,
            descriptionKey: 'utils.detail.is_composing_ignore_key.param_e',
            descriptionFallback: 'The keyboard event. Both e.isComposing and e.key are inspected.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_composing_ignore_key.returns',
        descriptionFallback: 'true when e.isComposing is true and e.key is in COMPOSITION_IGNORE_KEYS; false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/autocomplete.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_composing_ignore_key.example_basic',
            titleFallback: 'Guard Enter during IME composition',
            code: `import { isComposingIgnoreKey } from 'origam'

function onKeydown(e: KeyboardEvent) {
  if (isComposingIgnoreKey(e)) return  // ignore Enter during CJK input
  if (e.key === 'Enter') submit()
}`,
            lang: 'typescript',
        },
    ],
    related: ['check-event'],
}
