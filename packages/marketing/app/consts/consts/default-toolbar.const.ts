import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const DEFAULT_TOOLBAR_CONST_DOC: IConstDoc = {
    slug: 'default-toolbar',
    name: 'DEFAULT_TOOLBAR',
    category: 'Form & Input',
    descriptionKey: 'consts.catalog.default_toolbar.description',
    descriptionFallback: 'Default ordered list of toolbar commands surfaced by OrigamTextarea when `mode="rich"` is set and no custom `toolbar` prop is provided. Order is meaningful — it drives the visual layout left-to-right.',
    definition: `export const DEFAULT_TOOLBAR: ReadonlyArray<TTextareaToolbarCommand> = [
    TEXTAREA_TOOLBAR_COMMAND.BOLD,
    TEXTAREA_TOOLBAR_COMMAND.ITALIC,
    TEXTAREA_TOOLBAR_COMMAND.UNDERLINE,
    TEXTAREA_TOOLBAR_COMMAND.LINK,
    TEXTAREA_TOOLBAR_COMMAND.LIST_BULLET,
    TEXTAREA_TOOLBAR_COMMAND.LIST_ORDERED,
    TEXTAREA_TOOLBAR_COMMAND.HEADING,
    TEXTAREA_TOOLBAR_COMMAND.CODE_INLINE,
    TEXTAREA_TOOLBAR_COMMAND.CLEAR_FORMAT
]`,
    values: [
        { value: 'TEXTAREA_TOOLBAR_COMMAND.BOLD', descriptionKey: 'consts.detail.default_toolbar.bold', descriptionFallback: 'Toggles bold formatting on the selected text.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.ITALIC', descriptionKey: 'consts.detail.default_toolbar.italic', descriptionFallback: 'Toggles italic formatting on the selected text.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.UNDERLINE', descriptionKey: 'consts.detail.default_toolbar.underline', descriptionFallback: 'Toggles underline formatting on the selected text.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.LINK', descriptionKey: 'consts.detail.default_toolbar.link', descriptionFallback: 'Inserts or edits a hyperlink.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.LIST_BULLET', descriptionKey: 'consts.detail.default_toolbar.list_bullet', descriptionFallback: 'Inserts an unordered (bullet) list.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.LIST_ORDERED', descriptionKey: 'consts.detail.default_toolbar.list_ordered', descriptionFallback: 'Inserts an ordered (numbered) list.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.HEADING', descriptionKey: 'consts.detail.default_toolbar.heading', descriptionFallback: 'Inserts a heading element.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.CODE_INLINE', descriptionKey: 'consts.detail.default_toolbar.code_inline', descriptionFallback: 'Wraps the selection in an inline code element.' },
        { value: 'TEXTAREA_TOOLBAR_COMMAND.CLEAR_FORMAT', descriptionKey: 'consts.detail.default_toolbar.clear_format', descriptionFallback: 'Removes all formatting from the selected text.' },
    ],
    usedBy: [
        { name: 'OrigamTextarea', slug: 'textarea' },
    ],
    sourceFile: 'packages/ds/src/consts/Textarea/textarea.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.default_toolbar.example',
            titleFallback: 'Customising the toolbar',
            code: `import { DEFAULT_TOOLBAR, TEXTAREA_TOOLBAR_COMMAND } from 'origam'

// Remove CLEAR_FORMAT and add TABLE at the end
const toolbar = [
  ...DEFAULT_TOOLBAR.filter(c => c !== TEXTAREA_TOOLBAR_COMMAND.CLEAR_FORMAT),
  TEXTAREA_TOOLBAR_COMMAND.TABLE
]`,
            lang: 'typescript',
        },
    ],
}
