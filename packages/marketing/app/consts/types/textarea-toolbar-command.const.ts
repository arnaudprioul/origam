import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const TEXTAREA_TOOLBAR_COMMAND_TYPE_DOC: ITypeDoc = {
    slug: 'textarea-toolbar-command',
    name: 'TTextareaToolbarCommand',
    kind: 'type',
    category: 'Form & Input',
    descriptionKey: 'types.catalog.textarea_toolbar_command.description',
    descriptionFallback: 'Identifiers for every rich-text toolbar command — drives the toolbar contract, the format emit payload and the keyboard shortcut map.',
    definition: `export type TTextareaToolbarCommand = \`\${TEXTAREA_TOOLBAR_COMMAND}\`

// Where TEXTAREA_TOOLBAR_COMMAND is:
export enum TEXTAREA_TOOLBAR_COMMAND {
    BOLD          = 'bold',
    ITALIC        = 'italic',
    UNDERLINE     = 'underline',
    LINK          = 'link',
    LIST_BULLET   = 'list-bullet',
    LIST_ORDERED  = 'list-ordered',
    HEADING_1     = 'heading-1',
    HEADING_2     = 'heading-2',
    HEADING_3     = 'heading-3',
    HEADING       = 'heading',
    CODE_INLINE   = 'code-inline',
    CLEAR_FORMAT  = 'clear-format'
}`,
    values: [
        {
            value: 'bold',
            descriptionKey: 'types.detail.textarea_toolbar_command.bold',
            descriptionFallback: 'Toggles bold on the current selection. Keyboard shortcut: Ctrl/Cmd+B.',
        },
        {
            value: 'italic',
            descriptionKey: 'types.detail.textarea_toolbar_command.italic',
            descriptionFallback: 'Toggles italic on the current selection. Keyboard shortcut: Ctrl/Cmd+I.',
        },
        {
            value: 'underline',
            descriptionKey: 'types.detail.textarea_toolbar_command.underline',
            descriptionFallback: 'Toggles underline on the current selection. Keyboard shortcut: Ctrl/Cmd+U.',
        },
        {
            value: 'link',
            descriptionKey: 'types.detail.textarea_toolbar_command.link',
            descriptionFallback: 'Opens the link editor for the current selection — inserts or edits an anchor tag.',
        },
        {
            value: 'list-bullet',
            descriptionKey: 'types.detail.textarea_toolbar_command.list_bullet',
            descriptionFallback: 'Wraps the current block in an unordered list item.',
        },
        {
            value: 'list-ordered',
            descriptionKey: 'types.detail.textarea_toolbar_command.list_ordered',
            descriptionFallback: 'Wraps the current block in an ordered (numbered) list item.',
        },
        {
            value: 'heading-1',
            descriptionKey: 'types.detail.textarea_toolbar_command.heading_1',
            descriptionFallback: 'Applies H1 block format to the current paragraph.',
        },
        {
            value: 'heading-2',
            descriptionKey: 'types.detail.textarea_toolbar_command.heading_2',
            descriptionFallback: 'Applies H2 block format to the current paragraph.',
        },
        {
            value: 'heading-3',
            descriptionKey: 'types.detail.textarea_toolbar_command.heading_3',
            descriptionFallback: 'Applies H3 block format to the current paragraph.',
        },
        {
            value: 'heading',
            descriptionKey: 'types.detail.textarea_toolbar_command.heading',
            descriptionFallback: 'Generic heading command — cycles or opens a heading picker depending on toolbar configuration.',
        },
        {
            value: 'code-inline',
            descriptionKey: 'types.detail.textarea_toolbar_command.code_inline',
            descriptionFallback: 'Wraps the selection in a <code> span for inline monospace formatting.',
        },
        {
            value: 'clear-format',
            descriptionKey: 'types.detail.textarea_toolbar_command.clear_format',
            descriptionFallback: 'Strips all inline formatting (bold, italic, underline, link, code) from the current selection.',
        },
    ],
    usedBy: [
        { slug: 'textarea', name: 'Textarea', propName: 'toolbar' },
    ],
    sourceFile: 'packages/ds/src/enums/Textarea/textarea-toolbar-command.enum.ts',
    examples: [
        {
            titleKey: 'types.detail.textarea_toolbar_command.example',
            titleFallback: 'Custom toolbar with a subset of commands',
            code: `<origam-textarea
  :toolbar="['bold', 'italic', 'link', 'list-bullet', 'clear-format']"
  output="html"
  v-model="content"
/>`,
            lang: 'html',
        },
    ],
}
