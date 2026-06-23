import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const UNBIND_PROPS_UTIL_DOC: IUtilDoc = {
    slug: 'unbind-props',
    name: 'unbindProps',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.unbind_props.description',
    descriptionFallback: 'Remove event listeners and attributes previously applied to a DOM element via bindProps(). Mirrors the bind step for clean teardown in custom directives.',
    signature: `function unbindProps(el: HTMLElement, props: Record<string, any>): void`,
    params: [
        {
            name: 'el',
            type: 'HTMLElement',
            required: true,
            descriptionKey: 'utils.detail.unbind_props.param_el',
            descriptionFallback: 'The target DOM element from which listeners and attributes will be removed.',
        },
        {
            name: 'props',
            type: 'Record<string, any>',
            required: true,
            descriptionKey: 'utils.detail.unbind_props.param_props',
            descriptionFallback: 'The same props object that was passed to bindProps(). Event handler keys (onXxx) remove the corresponding listener; other keys remove the attribute.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.unbind_props.returns',
        descriptionFallback: 'Does not return a value. The element is mutated in place.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/bindProps.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.unbind_props.example_basic',
            titleFallback: 'Teardown in a custom directive',
            code: `import { bindProps, unbindProps } from 'origam'

const props = { onClick: handleClick, 'aria-label': 'Close' }

// Mount phase
bindProps(el, props)

// Unmount phase — removes listener and attribute
unbindProps(el, props)`,
            lang: 'typescript',
        },
    ],
    related: ['bind-props'],
}
