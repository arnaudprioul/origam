import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ADJACENT_INNER_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-adjacent-inner-emits',
    name: 'IAdjacentInnerEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_adjacent_inner_emits.description',
    descriptionFallback: 'Click events for icons rendered INSIDE the input chrome — clear button, password toggle and similar inner-surface actions.',
    definition: `export interface IAdjacentInnerEmits {
    (e: 'click:appendInner', event: MouseEvent): void
    (e: 'click:prependInner', event: MouseEvent): void
    (e: 'click:clear', event: MouseEvent): void
}`,
    extends: [],
    props: [
        { name: 'click:appendInner', type: '(e: \'click:appendInner\', event: MouseEvent) => void', optional: false, descriptionFallback: 'Fired when the inner append icon is clicked.' },
        { name: 'click:prependInner', type: '(e: \'click:prependInner\', event: MouseEvent) => void', optional: false, descriptionFallback: 'Fired when the inner prepend icon is clicked.' },
        { name: 'click:clear', type: '(e: \'click:clear\', event: MouseEvent) => void', optional: false, descriptionFallback: 'Fired when the clear button inside the input is clicked.' },
    ],
    usedBy: [
        { slug: 'use-adjacent-inner', name: 'useAdjacentInner', kind: 'composable' },
        { slug: 'input', name: 'Input', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/adjacent.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_adjacent_inner_emits.example',
            titleFallback: 'Listening to inner adjacent click events',
            code: `<OrigamInput
    clearable
    @click:clear="handleClear"
    @click:append-inner="togglePassword"
/>`,
            lang: 'vue',
        },
    ],
}
