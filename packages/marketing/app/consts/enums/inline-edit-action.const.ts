import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const INLINE_EDIT_ACTION_ENUM_DOC: IEnumDoc = {
    slug: 'inline-edit-action',
    name: 'INLINE_EDIT_ACTION',
    category: 'Form & Input',
    descriptionKey: 'enums.catalog.inline_edit_action.description',
    descriptionFallback: 'Identifies action buttons rendered by OrigamInlineEdit (edit, confirm, cancel).',
    definition: `export enum INLINE_EDIT_ACTION {
    EDIT    = 'edit',
    CONFIRM = 'confirm',
    CANCEL  = 'cancel',
}`,
    values: [
        { value: 'INLINE_EDIT_ACTION.EDIT', descriptionKey: 'enums.detail.inline_edit_action.edit', descriptionFallback: 'Activates the inline edit mode.' },
        { value: 'INLINE_EDIT_ACTION.CONFIRM', descriptionKey: 'enums.detail.inline_edit_action.confirm', descriptionFallback: 'Confirms and saves the inline edit value.' },
        { value: 'INLINE_EDIT_ACTION.CANCEL', descriptionKey: 'enums.detail.inline_edit_action.cancel', descriptionFallback: 'Cancels the inline edit and reverts the value.' },
    ],
    usedBy: [
        { slug: 'inline-edit', name: 'InlineEdit', propName: 'showActions (internal)' },
    ],
    sourceFile: 'packages/ds/src/enums/InlineEdit/inline-edit-action.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.inline_edit_action.example',
            titleFallback: 'Using INLINE_EDIT_ACTION for data-cy attributes',
            code: `import { INLINE_EDIT_ACTION } from 'origam'

// Used internally for data-cy and aria-label
const actionLabel = INLINE_EDIT_ACTION.CONFIRM`,
            lang: 'typescript',
        },
    ],
}
