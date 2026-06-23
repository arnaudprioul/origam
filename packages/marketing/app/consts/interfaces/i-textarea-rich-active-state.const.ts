import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TEXTAREA_RICH_ACTIVE_STATE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-textarea-rich-active-state',
    name: 'ITextareaRichActiveState',
    category: 'State & Interaction',
    descriptionKey: 'interfaces.catalog.i_textarea_rich_active_state.description',
    descriptionFallback: 'Reactive state describing which rich-text toolbar commands are currently active at the caret position. Used by the toolbar to render aria-pressed state and the visual active class.',
    definition: `export interface ITextareaRichActiveState {
    bold: boolean
    italic: boolean
    underline: boolean
    code: boolean
    link: boolean
    listBullet: boolean
    listOrdered: boolean
    heading: 0 | 1 | 2 | 3
}`,
    extends: [],
    props: [
        { name: 'bold', type: 'boolean', optional: false, descriptionFallback: 'Whether the bold command is active at the current caret position.' },
        { name: 'italic', type: 'boolean', optional: false, descriptionFallback: 'Whether the italic command is active at the current caret position.' },
        { name: 'underline', type: 'boolean', optional: false, descriptionFallback: 'Whether the underline command is active at the current caret position.' },
        { name: 'code', type: 'boolean', optional: false, descriptionFallback: 'Whether the inline code command is active at the current caret position.' },
        { name: 'link', type: 'boolean', optional: false, descriptionFallback: 'Whether the cursor is inside a link at the current caret position.' },
        { name: 'listBullet', type: 'boolean', optional: false, descriptionFallback: 'Whether the cursor is inside an unordered list.' },
        { name: 'listOrdered', type: 'boolean', optional: false, descriptionFallback: 'Whether the cursor is inside an ordered list.' },
        { name: 'heading', type: '0 | 1 | 2 | 3', optional: false, descriptionFallback: 'Active heading level at the caret (0 = no heading, 1 = h1, 2 = h2, 3 = h3).' },
    ],
    usedBy: [
        { slug: 'textarea-field', name: 'TextareaField', kind: 'component' },
        { slug: 'use-textarea-rich', name: 'useTextareaRich', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Textarea/textarea-rich.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_textarea_rich_active_state.example',
            titleFallback: 'Consuming active state in the toolbar slot',
            code: `<OrigamTextareaField v-model="text" mode="rich">
    <template #toolbar="{ active }">
        <button :aria-pressed="active.bold">B</button>
        <button :aria-pressed="active.italic">I</button>
    </template>
</OrigamTextareaField>`,
            lang: 'vue',
        },
    ],
}
