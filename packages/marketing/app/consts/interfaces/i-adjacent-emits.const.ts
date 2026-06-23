import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ADJACENT_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-adjacent-emits',
    name: 'IAdjacentEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_adjacent_emits.description',
    descriptionFallback: 'Click events emitted when the user clicks the outer prepend or append slots of a component.',
    definition: `export interface IAdjacentEmits {
    (e: 'click:append', event: MouseEvent): void
    (e: 'click:prepend', event: MouseEvent): void
}`,
    extends: [],
    props: [
        { name: 'click:append', type: '(e: \'click:append\', event: MouseEvent) => void', optional: false, descriptionFallback: 'Fired when the user clicks the append slot area.' },
        { name: 'click:prepend', type: '(e: \'click:prepend\', event: MouseEvent) => void', optional: false, descriptionFallback: 'Fired when the user clicks the prepend slot area.' },
    ],
    usedBy: [
        { slug: 'use-adjacent', name: 'useAdjacent', kind: 'composable' },
        { slug: 'field', name: 'Field', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/adjacent.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_adjacent_emits.example',
            titleFallback: 'Listening to adjacent click events',
            code: `<OrigamField
    prepend-icon="mdi-magnify"
    append-icon="mdi-close"
    @click:prepend="onSearch"
    @click:append="onClear"
/>`,
            lang: 'vue',
        },
    ],
}
