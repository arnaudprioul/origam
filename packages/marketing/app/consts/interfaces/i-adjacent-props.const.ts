import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ADJACENT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-adjacent-props',
    name: 'IAdjacentProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_adjacent_props.description',
    descriptionFallback: 'Props for icons and avatars placed OUTSIDE the component chrome (prepend, append) — used by buttons, list items, cards and similar surface components.',
    definition: `export interface IAdjacentProps {
    appendAvatar?: string
    appendIcon?: TIcon
    prependAvatar?: string
    prependIcon?: TIcon
}`,
    extends: [],
    props: [
        { name: 'appendAvatar', type: 'string', optional: true, descriptionFallback: 'URL of an avatar image rendered at the trailing edge of the component.' },
        { name: 'appendIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon rendered at the trailing edge of the component.' },
        { name: 'prependAvatar', type: 'string', optional: true, descriptionFallback: 'URL of an avatar image rendered at the leading edge of the component.' },
        { name: 'prependIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon rendered at the leading edge of the component.' },
    ],
    usedBy: [
        { slug: 'use-adjacent', name: 'useAdjacent', kind: 'composable' },
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'list-item', name: 'ListItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/adjacent.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_adjacent_props.example',
            titleFallback: 'Button with prepend and append icons',
            code: `<OrigamBtn prepend-icon="mdi-check" append-icon="mdi-chevron-down">
    Submit
</OrigamBtn>`,
            lang: 'vue',
        },
    ],
}
