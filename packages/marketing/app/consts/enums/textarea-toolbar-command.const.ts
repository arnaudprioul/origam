import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const TEXTAREA_TOOLBAR_COMMAND_ENUM_DOC: IEnumDoc = {
    slug: 'textarea-toolbar-command',
    name: 'TEXTAREA_TOOLBAR_COMMAND',
    category: 'Form & Input',
    descriptionKey: 'enums.catalog.textarea_toolbar_command.description',
    descriptionFallback: 'TypeScript enum for rich-text toolbar command identifiers — bold, italic, link, lists, headings, code, clear-format.',
    definition: `export enum TEXTAREA_TOOLBAR_COMMAND {
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
    CLEAR_FORMAT  = 'clear-format',
}`,
    values: [
        { value: 'TEXTAREA_TOOLBAR_COMMAND.BOLD', descriptionKey: 'enums.detail.textarea_toolbar_command.bold', descriptionFallback: 'Toggle bold formatting on the selection.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.ITALIC', descriptionKey: 'enums.detail.textarea_toolbar_command.italic', descriptionFallback: 'Toggle italic formatting on the selection.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.UNDERLINE', descriptionKey: 'enums.detail.textarea_toolbar_command.underline', descriptionFallback: 'Toggle underline formatting on the selection.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.LINK', descriptionKey: 'enums.detail.textarea_toolbar_command.link', descriptionFallback: 'Insert or edit a hyperlink on the selection.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.LIST_BULLET', descriptionKey: 'enums.detail.textarea_toolbar_command.list_bullet', descriptionFallback: 'Toggle an unordered (bullet) list.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.LIST_ORDERED', descriptionKey: 'enums.detail.textarea_toolbar_command.list_ordered', descriptionFallback: 'Toggle an ordered (numbered) list.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.HEADING_1', descriptionKey: 'enums.detail.textarea_toolbar_command.heading_1', descriptionFallback: 'Apply heading level 1 to the current block.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.HEADING_2', descriptionKey: 'enums.detail.textarea_toolbar_command.heading_2', descriptionFallback: 'Apply heading level 2 to the current block.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.HEADING_3', descriptionKey: 'enums.detail.textarea_toolbar_command.heading_3', descriptionFallback: 'Apply heading level 3 to the current block.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.HEADING', descriptionKey: 'enums.detail.textarea_toolbar_command.heading', descriptionFallback: 'Generic heading command (cycles through heading levels).' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.CODE_INLINE', descriptionKey: 'enums.detail.textarea_toolbar_command.code_inline', descriptionFallback: 'Toggle inline code formatting on the selection.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.CLEAR_FORMAT', descriptionKey: 'enums.detail.textarea_toolbar_command.clear_format', descriptionFallback: 'Strip all formatting from the selection.' },
    ],
    usedBy: [
        { slug: 'textarea-field', name: 'TextareaField', propName: 'toolbar' },
    ],
    sourceFile: 'packages/ds/src/enums/Textarea/textarea-toolbar-command.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.textarea_toolbar_command.example',
            titleFallback: 'Building a custom toolbar subset',
            code: `import { TEXTAREA_TOOLBAR_COMMAND } from 'origam'

const toolbar = [
    TEXTAREA_TOOLBAR_COMMAND.BOLD,
    TEXTAREA_TOOLBAR_COMMAND.ITALIC,
    TEXTAREA_TOOLBAR_COMMAND.LINK,
]`,
            lang: 'typescript',
        },
    ],
}
