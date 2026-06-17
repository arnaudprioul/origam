import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_ON_UTIL_DOC: IUtilDoc = {
    slug: 'is-on',
    name: 'isOn',
    category: 'Commons',
    icon: 'mdi-lightning-bolt',
    descriptionKey: 'utils.catalog.is_on.description',
    descriptionFallback: 'Returns true when a prop key is a Vue event listener name — i.e. starts with "on" followed by an uppercase letter. Used to separate event handlers from regular props when forwarding attrs.',
    signature: `function isOn(key: string): boolean`,
    params: [
        {
            name: 'key',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.is_on.param_key',
            descriptionFallback: 'The prop key string to test against the Vue event handler pattern (e.g. "onClick", "onUpdate:modelValue").',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_on.returns',
        descriptionFallback: 'true when the key matches the /^on[^a-z]/ pattern (Vue event listener convention); false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_on.example_basic',
            titleFallback: 'Filtering event handlers from other attrs',
            code: `import { isOn } from 'origam'

isOn('onClick')              // → true
isOn('onUpdate:modelValue')  // → true
isOn('onsubmit')             // → false (lowercase after "on")
isOn('class')                // → false
isOn('disabled')             // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-object'],
}
