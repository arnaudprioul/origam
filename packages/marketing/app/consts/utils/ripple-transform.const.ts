import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RIPPLE_TRANSFORM_UTIL_DOC: IUtilDoc = {
    slug: 'ripple-transform',
    name: 'rippleTransform',
    category: 'Commons',
    icon: 'mdi-gesture-tap',
    descriptionKey: 'utils.catalog.ripple_transform.description',
    descriptionFallback: 'Apply a CSS transform string to a ripple-enabled element, setting both the standard and WebKit-prefixed properties simultaneously.',
    signature: `function rippleTransform(el: IRippleHtmlElement, value: string): void`,
    params: [
        {
            name: 'el',
            type: 'IRippleHtmlElement',
            required: true,
            descriptionKey: 'utils.detail.ripple_transform.param_el',
            descriptionFallback: 'The DOM element that hosts the ripple. It must carry the _ripple metadata object.',
        },
        {
            name: 'value',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.ripple_transform.param_value',
            descriptionFallback: 'The full CSS transform string to apply, e.g. "scale(2) translate(0, 0)".',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.ripple_transform.returns',
        descriptionFallback: 'No return value. Mutates el.style.transform and el.style.webkitTransform.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/ripple.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.ripple_transform.example_basic',
            titleFallback: 'Scale a ripple element',
            code: `import { rippleTransform } from 'origam'

rippleTransform(el, 'scale(1.5) translate(0, 0)')
// → el.style.transform         = 'scale(1.5) translate(0, 0)'
// → el.style.webkitTransform  = 'scale(1.5) translate(0, 0)'`,
            lang: 'typescript',
        },
    ],
    related: ['ripple-show', 'ripple-stop'],
}
