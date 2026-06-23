import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const BIND_PROPS_UTIL_DOC: IUtilDoc = {
    slug: 'bind-props',
    name: 'bindProps',
    category: 'Commons',
    icon: 'mdi-link-variant',
    descriptionKey: 'utils.catalog.bind_props.description',
    descriptionFallback: 'Imperatively apply a props record to a DOM element: event handlers (onXxx keys) are attached via addEventListener with deduplication, attribute keys are set or removed via setAttribute / removeAttribute.',
    signature: 'function bindProps(el: HTMLElement, props: Record<string, any>): void',
    params: [
        {
            name: 'el',
            type: 'HTMLElement',
            required: true,
            descriptionKey: 'utils.detail.bind_props.param_el',
            descriptionFallback: 'The target DOM element to receive the props.',
        },
        {
            name: 'props',
            type: 'Record<string, any>',
            required: true,
            descriptionKey: 'utils.detail.bind_props.param_props',
            descriptionFallback: 'Object of prop key-value pairs. Keys starting with "on" are treated as event listeners; others are set as attributes. A null/undefined value removes the attribute or the listener.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.bind_props.returns',
        descriptionFallback: 'No return value. Mutations are applied directly to the element.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/bindProps.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.bind_props.example_basic',
            titleFallback: 'Apply attributes and listeners to a custom element',
            code: `import { bindProps } from 'origam'

const el = document.querySelector('.my-widget')!
bindProps(el, {
    'data-active': 'true',
    'aria-label': 'Close',
    onClick: () => console.log('clicked'),
})

// Remove the attribute later
bindProps(el, { 'data-active': null })`,
            lang: 'typescript',
        },
    ],
    related: ['attached-root', 'bind-scroll'],
}
