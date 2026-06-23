import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const TEXTAREA_TOOLBAR_POSITION_ENUM_DOC: IEnumDoc = {
    slug: 'textarea-toolbar-position',
    name: 'TEXTAREA_TOOLBAR_POSITION',
    category: 'Form & Input',
    descriptionKey: 'enums.catalog.textarea_toolbar_position.description',
    descriptionFallback: 'TypeScript enum for where the rich-text toolbar is rendered relative to the editable surface — top, bottom, or floating.',
    definition: `export enum TEXTAREA_TOOLBAR_POSITION {
    TOP      = 'top',
    BOTTOM   = 'bottom',
    FLOATING = 'floating',
}`,
    values: [
        { value: 'TEXTAREA_TOOLBAR_POSITION.TOP', descriptionKey: 'enums.detail.textarea_toolbar_position.top', descriptionFallback: 'Toolbar appears above the editable surface.' },
        { value: 'TEXTAREA_TOOLBAR_POSITION.BOTTOM', descriptionKey: 'enums.detail.textarea_toolbar_position.bottom', descriptionFallback: 'Toolbar appears below the editable surface.' },
        { value: 'TEXTAREA_TOOLBAR_POSITION.FLOATING', descriptionKey: 'enums.detail.textarea_toolbar_position.floating', descriptionFallback: 'Toolbar is sticky inside the Field shell — stays visible while the editable surface scrolls.' },
    ],
    usedBy: [
        { slug: 'textarea-field', name: 'TextareaField', propName: 'toolbarPosition' },
    ],
    sourceFile: 'packages/ds/src/enums/Textarea/textarea-toolbar-position.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.textarea_toolbar_position.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { TEXTAREA_TOOLBAR_POSITION } from 'origam'

const position: TEXTAREA_TOOLBAR_POSITION = TEXTAREA_TOOLBAR_POSITION.FLOATING`,
            lang: 'typescript',
        },
    ],
}
