import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RICH_TOOLBAR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-rich-toolbar-props',
    name: 'IRichToolbarProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_rich_toolbar_props.description',
    descriptionFallback: 'Props for the internal <OrigamRichToolbar> sub-component of OrigamTextareaField. Kept package-private so the API can evolve without breaking external consumers. Exposes the command list, current active-format state, optional position, and disabled flag.',
    definition: `export interface IRichToolbarProps {
    items: ReadonlyArray<TTextareaToolbarCommand>
    active: ITextareaRichActiveState
    position?: TTextareaToolbarPosition
    disabled?: boolean
}`,
    extends: [],
    props: [
        { name: 'items', type: 'ReadonlyArray<TTextareaToolbarCommand>', optional: false, descriptionFallback: 'Ordered list of toolbar command identifiers to render as buttons. Passed down from the parent TextareaField.' },
        { name: 'active', type: 'ITextareaRichActiveState', optional: false, descriptionFallback: 'Map of currently active formatting states (bold, italic, link, …) — drives the pressed/active visual on each button.' },
        { name: 'position', type: 'TTextareaToolbarPosition', optional: true, descriptionFallback: 'Vertical placement of the toolbar relative to the textarea — "top" or "bottom". Default "top".' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disables all toolbar buttons when the parent TextareaField is disabled.' },
    ],
    usedBy: [
        { slug: 'textarea-field', name: 'TextareaField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Textarea/textarea-toolbar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_rich_toolbar_props.example',
            titleFallback: 'Rendering the rich toolbar with a custom command set',
            code: `<OrigamRichToolbar
    :items="['bold', 'italic', 'link']"
    :active="activeState"
    position="bottom"
/>`,
            lang: 'html',
        },
    ],
}
