import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ADJACENT_INNER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-adjacent-inner-props',
    name: 'IAdjacentInnerProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_adjacent_inner_props.description',
    descriptionFallback: 'Props for icons and avatars rendered INSIDE the input chrome (prepend-inner, append-inner) plus the clearable icon and its toggle.',
    definition: `export interface IAdjacentInnerProps {
    appendInnerAvatar?: string
    appendInnerIcon?: TIcon
    prependInnerAvatar?: string
    prependInnerIcon?: TIcon
    clearIcon?: TIcon
    clearable?: boolean
}`,
    extends: [],
    props: [
        { name: 'appendInnerAvatar', type: 'string', optional: true, descriptionFallback: 'URL of an avatar image rendered inside the input at the trailing edge.' },
        { name: 'appendInnerIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon rendered inside the input at the trailing edge.' },
        { name: 'prependInnerAvatar', type: 'string', optional: true, descriptionFallback: 'URL of an avatar image rendered inside the input at the leading edge.' },
        { name: 'prependInnerIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon rendered inside the input at the leading edge.' },
        { name: 'clearIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon used for the clear button (defaults to mdi-close-circle).' },
        { name: 'clearable', type: 'boolean', optional: true, descriptionFallback: 'Displays a clear button inside the input that resets the model value.' },
    ],
    usedBy: [
        { slug: 'use-adjacent-inner', name: 'useAdjacentInner', kind: 'composable' },
        { slug: 'input', name: 'Input', kind: 'component' },
        { slug: 'field', name: 'Field', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/adjacent.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_adjacent_inner_props.example',
            titleFallback: 'Input with inner prepend icon and clearable',
            code: `<OrigamInput
    prepend-inner-icon="mdi-magnify"
    clearable
    clear-icon="mdi-close"
/>`,
            lang: 'vue',
        },
    ],
}
