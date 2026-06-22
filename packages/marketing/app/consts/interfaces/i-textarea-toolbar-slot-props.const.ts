import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TEXTAREA_TOOLBAR_SLOT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-textarea-toolbar-slot-props',
    name: 'ITextareaToolbarSlotProps',
    category: 'Component Slots',
    descriptionKey: 'interfaces.catalog.i_textarea_toolbar_slot_props.description',
    descriptionFallback: 'Public payload exposed by the #toolbar slot of OrigamTextareaField. Consumers can render a fully custom toolbar while still reusing the core formatting machinery.',
    definition: `export interface ITextareaToolbarSlotProps {
    format: (command: TTextareaToolbarCommand, value?: string) => void
    isFormat: (command: TTextareaToolbarCommand) => boolean
    items: ReadonlyArray<TTextareaToolbarCommand>
    active: ITextareaRichActiveState
}`,
    extends: [],
    props: [
        { name: 'format', type: '(command: TTextareaToolbarCommand, value?: string) => void', optional: false, descriptionFallback: 'Execute a formatting command. Pass a URL as the second argument for link insertion.' },
        { name: 'isFormat', type: '(command: TTextareaToolbarCommand) => boolean', optional: false, descriptionFallback: 'Query whether a given command is currently active at the caret position.' },
        { name: 'items', type: 'ReadonlyArray<TTextareaToolbarCommand>', optional: false, descriptionFallback: 'Ordered list of toolbar commands configured via the toolbar prop.' },
        { name: 'active', type: 'ITextareaRichActiveState', optional: false, descriptionFallback: 'Reactive snapshot of the currently active formatting commands at the caret.' },
    ],
    usedBy: [
        { slug: 'textarea-field', name: 'TextareaField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Textarea/textarea-toolbar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_textarea_toolbar_slot_props.example',
            titleFallback: 'Custom toolbar using the slot payload',
            code: `<OrigamTextareaField v-model="html" mode="rich">
    <template #toolbar="{ format, isFormat, items, active }">
        <button
            v-for="cmd in items"
            :key="cmd"
            :aria-pressed="isFormat(cmd)"
            @click="format(cmd)"
        >{{ cmd }}</button>
    </template>
</OrigamTextareaField>`,
            lang: 'vue',
        },
    ],
}
