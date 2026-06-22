import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RICH_TOOLBAR_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-rich-toolbar-emits',
    name: 'IRichToolbarEmits',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_rich_toolbar_emits.description',
    descriptionFallback: 'Emit signature for the internal <OrigamRichToolbar> sub-component of OrigamTextareaField. Surfaces a single "format" event carrying the command id and an optional value (URL for link insertion) so the textarea can apply the formatting to its content model.',
    definition: `export interface IRichToolbarEmits {
    (e: 'format', command: TTextareaToolbarCommand, value?: string): void
}`,
    extends: [],
    props: [
        { name: 'format', type: '(command: TTextareaToolbarCommand, value?: string) => void', optional: false, descriptionFallback: 'Fired when a toolbar button is activated. command identifies the formatting action; value is present only for commands that need a URL or similar secondary input (e.g. link insertion).' },
    ],
    usedBy: [
        { slug: 'textarea-field', name: 'TextareaField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Textarea/textarea-toolbar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_rich_toolbar_emits.example',
            titleFallback: 'Handling the format event in a custom toolbar',
            code: `<OrigamRichToolbar
    :items="toolbarItems"
    :active="activeState"
    @format="(cmd, val) => applyFormat(cmd, val)"
/>`,
            lang: 'html',
        },
    ],
}
